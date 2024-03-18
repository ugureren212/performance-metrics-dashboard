import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
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

// This function is used to create the configs necessary to create a bar chart in react-charjs
function BarChart(props: chartProp) {
  const chartXLabels = props.chartData.chartLabels;

  const startDate = chartXLabels[0];
  const endDate = chartXLabels[chartXLabels.length - 1];

  const data = {
    labels: props.chartData.chartLabels,
    datasets: [
      {
        label: "Base monthly performance (%)",
        data: props.chartData.baseMonthlyPerformance,
        backgroundColor: "green",
      },
      {
        label: "Life to Date (%)",
        data: props.chartData.ltdPerformance,
        backgroundColor: "red",
      },
      {
        label: "Year to Date (%)",
        data: props.chartData.ytdPerformance,
        backgroundColor: "blue",
      },
    ],
  };

  const options = {
    maintainAspectRatio: true,
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
      <h3>
        Bar Chart from {startDate} - {endDate}
      </h3>
      <div id="barChart">
        <Bar options={options} data={data} />
      </div>
    </>
  );
}

export default BarChart;
