import { useEffect, useState } from "react";

interface chartProp {
  chartData: RandomChartData[];
}

type RandomChartData = {
  chartID: string;
  chartColour: string;
  chartData: number[];
  chartLabels: string[];
};

function generateRandomChartData() {
  const chartID = new Date().getTime().toString(16);

  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  const chartColour = `rgb(${r}, ${g}, ${b})`;

  const chartData: number[] = [];
  const chartLabels: string[] = [];

  for (let i = 0; i < 12; i++) {
    const randomNumber = Math.random() * 100;
    chartData.push(Number(randomNumber.toFixed(2)));
    chartLabels.push(`Label ${i}`);
  }

  const chartDataObject: RandomChartData = {
    chartID,
    chartColour,
    chartData,
    chartLabels,
  };
  return chartDataObject;
}

function chartDataList(chartDataCollection: RandomChartData[]): string[] {
  const ChartIDList: string[] = [];
  chartDataCollection.map((chartData) => {
    ChartIDList.push(chartData.chartID);
  });
  return ChartIDList;
}

function ChartForm(props: chartProp) {
  const [chartData, setChartData] = useState<RandomChartData>({
    chartID: "",
    chartColour: "",
    chartData: [],
    chartLabels: [],
  });

  // Appends chartDataID to select form
  useEffect(() => {
    const chartSelect = document.getElementById(
      "chartSelect",
    ) as HTMLSelectElement;
    const chartList = chartDataList(props.chartData);
    chartList.forEach((chartID) => {
      chartSelect.options[chartSelect.options.length] = new Option(chartID);
    });
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    fetch("http://localhost:3030/storeRandomChartData", {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(chartData),
    });
  }

  return (
    <>
      <h3>Add or delete random chart data</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="plotData">
          Click button to add random data to chart:
        </label>
        <button
          id="plotData"
          onClick={() => {
            setChartData(generateRandomChartData());
          }}
        >
          Random plot data
        </button>
        <br></br>
        <label htmlFor="deleteData">
          Delete plotted data. Select from right panel:
        </label>
        <button id="deleteData">Delete plotted data</button>

        <br></br>
        <br></br>

        <label htmlFor="deleteData">
          Bellow is a list of currently plotted data. Feel free to select and
          delete the ones you do not want.
        </label>

        <br></br>

        <select size={10} id="chartSelect"></select>
      </form>
    </>
  );
}

export default ChartForm;
