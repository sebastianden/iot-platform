import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "chartjs-adapter-moment";
import { ChartData, ChartOptions, defaults, Chart } from "chart.js";
import { useRef, useEffect, useState } from "react";

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
  const chartRef = useRef<Chart<"line"> | null>(null);
  const [gradientBg, setGradientBg] = useState<string | CanvasGradient>(backgroundColor);

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      const ctx = chart.canvas.getContext('2d');

      if (!ctx) return;

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);      // Extract RGB values from borderColor for the gradient
      const color = borderColor.replace('#', '');
      let r, g, b;

      if (borderColor.startsWith('#')) {
        // Handle hex color
        r = parseInt(color.substring(0, 2), 16);
        g = parseInt(color.substring(2, 4), 16);
        b = parseInt(color.substring(4, 6), 16);
      } else if (borderColor.startsWith('rgb')) {
        // Handle rgb/rgba color
        const matches = borderColor.match(/\d+/g);
        if (matches) {
          r = parseInt(matches[0]);
          g = parseInt(matches[1]);
          b = parseInt(matches[2]);
        }
      } else {
        // Fallback to a default color
        r = 99; g = 102; b = 241; // A nice blue
      }

      // Create gradient stops
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.4)`);    // Top: semi-transparent color
      gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.2)`);  // Middle: more transparent
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);      // Bottom: fully transparent

      setGradientBg(gradient);
    }
  }, [borderColor, chartRef.current?.height]);
  const chartData: ChartData<"line"> = {
    labels: data.map((d) => d.timestamp),
    datasets: [
      {
        label,
        data: data.map((d) => d.value),
        borderColor,
        backgroundColor: gradientBg,
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

  return <Line ref={chartRef} data={chartData} options={options} />;
};

export default LineChart;
