import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

interface chartProp {
  chartData: chartData;
}

interface chartData {
  chartLabels: string[];
  baseMonthlyPerformance: number[];
  ltdPerformance: number[];
  ytdPerformance: number[];
}

// This function is used to create the configs necessary to create a area line chart in react-charjs
function AreaLineChart(props: chartProp) {
  const data = {
    labels: props.chartData.chartLabels,
    datasets: [
      {
        label: "Base monthly performance (%)",
        fill: true,
        data: props.chartData.baseMonthlyPerformance,
        backgroundColor: "rgba(0, 255, 0, 0.4)",
        borderColor: "green",
        yAxisID: "y",
      },
      {
        label: "Life to Date (%)",
        fill: true,
        data: props.chartData.ltdPerformance,
        backgroundColor: "rgba(255, 0, 0, 0.4)",
        borderColor: "red",
        yAxisID: "y",
      },
      {
        label: "Year to Date (%)",
        fill: true,
        data: props.chartData.ytdPerformance,
        backgroundColor: "rgba(0, 0, 255, 0.4)",
        borderColor: "blue",
        yAxisID: "y",
      },
    ],
  };

  const options = {
    maintainAçspectRatio: true,
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Fund Performance Details Chart",
      },
    },
    scales: {
      y: {
        grid: {
          color: "white",
        },
        type: "linear" as const,
        display: true,
        position: "left" as const,
      },
      x: {
        grid: {
          color: "white",
        },
      },
    },
  };

  return (
    <>
      <div id="areaLineChart">
        <Line options={options} data={data} />
      </div>
    </>
  );
}

export default AreaLineChart;
