import * as fs from "fs";
import * as path from "path";
import { Request, Response } from "express";

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

export default returnFundData;
