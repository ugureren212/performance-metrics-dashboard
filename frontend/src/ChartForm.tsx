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

    fetch("http://localhost:3030/fundData", {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(graphData),
    });
  }

  return (
    <>
      <h3>some type of form</h3>
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
        <label htmlFor="deleteData">
          Delete plotted data. Select from right panel:
        </label>
        <button id="deleteData">Delete plotted data</button>
      </form>
    </>
  );
}

export default ChartForm;
