import AreaLineChart from "./AreaLineChart";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import { useState, useEffect } from "react";
import ChartForm from "./ChartForm";
import "./style.css";

function App() {
  const [fundData, setfundData] = useState(null);

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

  return (
    <div className="App">
      <header className="App-header">
        {/* add start year and end year in heading */}
        <h2>Fund Performance between </h2>
      </header>
      <div className="grid-container">
        <div className="grid-item">
          {" "}
          {fundData ? (
            <AreaLineChart chartData={fundData} />
          ) : (
            <h1>Bar chart loading...</h1>
          )}
        </div>
        <div className="grid-item">
          <ChartForm />
        </div>
        <div className="grid-item">
          {fundData ? (
            <BarChart chartData={fundData} />
          ) : (
            <h1>Bar chart loading...</h1>
          )}
        </div>
        <div className="grid-item">
          {" "}
          {fundData ? (
            <LineChart chartData={fundData} />
          ) : (
            <h1>Line chart loading...</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
