import React from "react";
import LineChart from "./lineChart";

interface DataPoint {
  value: number;
  timestamp: number;
}

interface DataCardProps {
  data: DataPoint[];
  lastDataPoint: number | null;
  measurement: string;
  unit: string;
  fontColor: string;
  borderColor: string;
  backgroundColor: string;
}

const DataCard: React.FC<DataCardProps> = ({
  data,
  lastDataPoint,
  measurement,
  unit,
  fontColor,
  borderColor,
  backgroundColor,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 border-2 shadow-md hover:shadow-lg border-gray-200 rounded-xl">
      <p className="text-gray-500">{measurement}:</p>
      <div className="flex justify-center">
        <p className={`flex font-bold text-5xl ${fontColor}`}>
          {lastDataPoint}
        </p>
        <p className="flex text-2xl text-gray-500">{unit}</p>
      </div>
      <div className="flex-grow border-t-2 border-gray-200"></div>
      <div>
        <LineChart
          data={data}
          label={`${measurement} (${unit})`}
          borderColor={borderColor}
          backgroundColor={backgroundColor}
        />
      </div>
    </div>
  );
};

export default DataCard;
