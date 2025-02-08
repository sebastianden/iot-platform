import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "chartjs-adapter-moment";
import { ChartData, ChartOptions, defaults } from "chart.js";

defaults.font.family = "'Geist', sans-serif";

interface DataPoint {
  value: number;
  timestamp: number;
}

interface LineChartProps {
  data: DataPoint[];
  label: string;
  borderColor: string;
  backgroundColor: string;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  label,
  borderColor,
  backgroundColor,
}) => {
  const chartData: ChartData<"line"> = {
    labels: data.map((d) => d.timestamp),
    datasets: [
      {
        label,
        data: data.map((d) => d.value),
        borderColor,
        backgroundColor,
        fill: true,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;
