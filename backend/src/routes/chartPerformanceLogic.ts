import * as fs from "fs";
import * as path from "path";
import { Request, Response } from "express";

type RandomChartData = {
  chartID: string;
  chartColour: string;
  chartData: number[];
};

interface chartData {
  chartLabels: string[];
  baseMonthlyPerformance: number[];
  ltdPerformance: number[];
  ytdPerformance: number[];
}

export interface MonthlyData {
  year: number;
  month: number;
  pricePerShare: number;
  dividendPerShare: number;
}

const randomChartDataFilePath = path.resolve(
  __dirname,
  "../../data/randomChartData.json",
);

export function calculateChartLabels(data: MonthlyData[]) {
  const chartLabels: string[] = [];

  data.forEach((row) => {
    const date = new Date(Number(row.year), Number(row.month - 1));
    const monthString = date.toLocaleString("en-US", { month: "short" });
    chartLabels.push(`${monthString} ${row.year}`);
  });

  return chartLabels;
}

export function calculateBaseMonthlyPerformance(data: MonthlyData[]): number[] {
  const baseMonthlyPerformance: number[] = [];

  for (let i = 0; i < data.length; i++) {
    const currentMonth = data[i];
    const currentShareValue =
      currentMonth.pricePerShare + currentMonth.dividendPerShare;
    const previousMonth = i > 0 ? data[i - 1] : null;

    if (previousMonth) {
      const previousShareValue =
        previousMonth.pricePerShare + previousMonth.dividendPerShare;

      baseMonthlyPerformance.push(
        Number(
          Number(
            ((previousShareValue - currentShareValue) /
              ((previousShareValue + currentShareValue) / 2)) *
              100,
          ).toFixed(2),
        ),
      );
    } else {
      baseMonthlyPerformance.push(0);
    }
  }

  return baseMonthlyPerformance;
}

function calculateLTDPerformance(data: MonthlyData[]): number[] {
  const LifeToDatePerforamnce = [0];

  const firstMonth: MonthlyData = data[0];

  for (let i = 0; i < data.length; i++) {
    const currentMonth = data[i];
    const currentShareValue =
      currentMonth.pricePerShare + currentMonth.dividendPerShare;
    const firstMonthOfLifeShareValue =
      firstMonth.pricePerShare + firstMonth.dividendPerShare;

    LifeToDatePerforamnce.push(
      Number(
        ((currentShareValue - firstMonthOfLifeShareValue) /
          ((currentShareValue + firstMonthOfLifeShareValue) / 2)) *
          100,
      ),
    );
  }
  return LifeToDatePerforamnce;
}

function calculateYTDPerformance(data: MonthlyData[]): number[] {
  const yearToDatePerforamnce = [];

  let firstMonth: MonthlyData = data[0];

  for (let i = 0; i < data.length; i++) {
    const currentMonth = data[i];

    if (currentMonth.month != 1) {
      const currentShareValue =
        currentMonth.pricePerShare + currentMonth.dividendPerShare;
      const firstMonthShareValue =
        firstMonth.pricePerShare + firstMonth.dividendPerShare;

      yearToDatePerforamnce.push(
        Number(
          ((currentShareValue - firstMonthShareValue) /
            ((currentShareValue + firstMonthShareValue) / 2)) *
            100,
        ),
      );
    } else {
      yearToDatePerforamnce.push(0);
      firstMonth = data[i];
    }
  }

  return yearToDatePerforamnce;
}

function returnRandomChartData(req: Request, res: Response) {
  const readJsonFile = (filePath: string): Promise<RandomChartData[]> => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        try {
          const jsonData = JSON.parse(data) as RandomChartData[];
          resolve(jsonData);
        } catch (parseErr) {
          reject(parseErr);
        }
      });
    });
  };

  const filePath = randomChartDataFilePath;

  readJsonFile(filePath)
    .then((result) => {
      res.status(200);
      res.send(JSON.stringify(result));
      return result;
    })
    .catch((err) => {
      console.error("Error reading JSON file:", err);
      res.status(500).json({ message: "Error fetching data" });
    });
}

function readCSV(): MonthlyData[] {
  const data: MonthlyData[] = [];
  const csvFilePath = path.resolve(
    __dirname,
    "../../data/sample-fund-data.csv",
  );

  const fileContent = fs
    .readFileSync(csvFilePath, "utf-8")
    .split("\n")
    .filter((line) => line.trim() !== "");

  for (let i = 1; i < fileContent.length; i++) {
    const line = fileContent[i].trim();
    const [year, month, pricePerShare, dividendPerShare] = line.split(",");

    data.push({
      year: parseInt(year),
      month: parseInt(month),
      pricePerShare: parseFloat(pricePerShare),
      dividendPerShare: parseFloat(dividendPerShare),
    });
  }

  return data;
}

function returnFundData(req: Request, res: Response) {
  const chartLabels = calculateChartLabels(readCSV());
  const baseMonthlyPerformance = calculateBaseMonthlyPerformance(readCSV());
  const ltdPerformance = calculateLTDPerformance(readCSV());
  const ytdPerformance = calculateYTDPerformance(readCSV());
  const chartData: chartData = {
    chartLabels,
    baseMonthlyPerformance,
    ltdPerformance,
    ytdPerformance,
  };
  res.status(200);
  res.send(JSON.stringify(chartData));
}

function storeRandomChartData(req: Request, res: Response) {
  const message = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  fs.readFile(randomChartDataFilePath, "utf8", (err, data) => {
    if (err) throw err;

    const jsonArray = JSON.parse(data);

    jsonArray.push(message);

    const jsonString = JSON.stringify(jsonArray, null, 2);

    fs.writeFile(randomChartDataFilePath, jsonString, (err) => {
      if (err) throw err;
      console.log("Data appended to data.json");
    });
  });
}

export { returnFundData, storeRandomChartData, returnRandomChartData };
