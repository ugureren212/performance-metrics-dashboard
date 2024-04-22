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
  chartData: RandomChartData[];
}

type RandomChartData = {
  chartID: string;
  chartColour: string;
  chartData: number[];
  chartLabels: string[];
};
type RandomChartDataset = {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  yAxisID: string;
};

// This function returns an indivisual dataset from all the indivisual randomly generated chart data stored in randomChartData.json
function chartDataset(chartDataCollection: RandomChartData[]) {
  const dataset: RandomChartDataset[] = [];
  chartDataCollection.map((chartData) => {
    const data: RandomChartDataset = {
      label: chartData.chartID,
      data: chartData.chartData,
      backgroundColor: chartData.chartColour,
      borderColor: chartData.chartColour,
      yAxisID: "y",
    };
    dataset.push(data);
  });

  return dataset;
}

// This function is used to create the configs necessary to create a area line chart in react-charjs
function RandomDataLineChart(props: chartProp) {
  const data = {
    // Used fixed labels for now. I might create a more dynamic system if I further develop this app.
    labels: props.chartData[0].chartLabels,
    datasets: chartDataset(props.chartData),
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
      <div id="areaLineChart">
        <Line options={options} data={data} />
      </div>
    </>
  );
}

export default RandomDataLineChart;
