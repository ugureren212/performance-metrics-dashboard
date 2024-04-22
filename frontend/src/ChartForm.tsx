import { useState } from "react";

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

function ChartForm() {
  const [chartData, setChartData] = useState<RandomChartData>({
    chartID: "",
    chartColour: "",
    chartData: [],
    chartLabels: [],
  });

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

        <select size={10}>
          <option>Not Started</option>
          <option>In Progess</option>
          <option>Completed</option>
        </select>
      </form>
    </>
  );
}

export default ChartForm;
