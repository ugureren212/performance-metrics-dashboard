import AreaLineChart from "./AreaLineChart";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import { useState, useEffect } from "react";
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
        <h2>Fund Performance</h2>
        <h1>Performance</h1>
      </header>
      <div>
        {fundData ? (
          <AreaLineChart chartData={fundData} />
        ) : (
          <h1>Bar chart loading...</h1>
        )}
      </div>
      <div>
        {fundData ? (
          <BarChart chartData={fundData} />
        ) : (
          <h1>Bar chart loading...</h1>
        )}
      </div>
      <div>
        {fundData ? (
          <LineChart chartData={fundData} />
        ) : (
          <h1>Line chart loading...</h1>
        )}
      </div>
    </div>
  );
}

export default App;
