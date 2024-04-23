import AreaLineChart from "./charts/AreaLineChart";
import BarChart from "./charts/BarChart";
import LineChart from "./charts/LineChart";
import RandomDataLineChart from "./charts/RandomDataLineChart";
import { useState, useEffect } from "react";
import ChartForm from "./ChartForm";
import "./style.css";

function App() {
  const [fundData, setfundData] = useState(null);
  const [randomChartData, setRandomChartData] = useState(null);

  // Fetches chart data from backend
  useEffect(() => {
    fetch("http://localhost:3030/fundData")
      .then((res) => {
        return res.json();
      })
      .then(async (data) => {
        setfundData(data);
      });
  }, []);

  // TODO: add proper error handling
  useEffect(() => {
    fetch("http://localhost:3030/randomChartData")
      .then((res) => {
        return res.json();
      })
      .then(async (data) => {
        setRandomChartData(data);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* add start year and end year in heading */}
        <h2>Fund Performance between </h2>
      </header>

      <div className="container">
        <div className="row">
          <div className="container-box big-container-box">
            {randomChartData ? (
              <RandomDataLineChart chartData={randomChartData} />
            ) : (
              <h1>Random data chart loading...</h1>
            )}
          </div>
          <div className="container-box small-container-box">
            {randomChartData ? (
              <ChartForm chartData={randomChartData} />
            ) : (
              <h1>Random data chart form loading...</h1>
            )}
          </div>
        </div>
        <div className="row">
          <div className="container-box">
            {" "}
            {fundData ? (
              <AreaLineChart chartData={fundData} />
            ) : (
              <h1>Bar chart loading...</h1>
            )}
          </div>
          <div className="container-box">
            {" "}
            {fundData ? (
              <BarChart chartData={fundData} />
            ) : (
              <h1>Bar chart loading...</h1>
            )}
          </div>
          <div className="container-box">
            {" "}
            {fundData ? (
              <LineChart chartData={fundData} />
            ) : (
              <h1>Line chart loading...</h1>
            )}
          </div>
          <div className="container-box">
            {" "}
            {fundData ? (
              <LineChart chartData={fundData} />
            ) : (
              <h1>Line chart loading...</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
