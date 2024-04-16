import { useState } from "react";

function generateRandomGraphData() {
  const graphData: number[] = [];
  for (let i = 0; i < 12; i++) {
    const randomNumber = Math.random() * 100;
    graphData.push(Number(randomNumber.toFixed(2)));
  }
  return graphData;
}

function ChartForm() {
  const [graphData, setGraphData] = useState([1, 2, 3]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    fetch("http://localhost:3030/storeRandomChartData", {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(graphData),
    });
  }

  return (
    <>
      <h3>Add or delete random chart data</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="plotData">
          Click button to add random data to graph:
        </label>
        <button
          id="plotData"
          onClick={() => {
            setGraphData(generateRandomGraphData());
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
