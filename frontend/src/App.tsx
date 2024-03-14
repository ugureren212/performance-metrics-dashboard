import PerformanceChart from "./PerformanceChart";
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
        { 
        (fundData)
          ? <PerformanceChart chartData={fundData} />
          : <h1>Chart loading...</h1>
        }
      </div>
    </div>
  );
}

export default App;
