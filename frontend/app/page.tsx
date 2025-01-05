"use client";

import useFetchData from "../hooks/useFetchData";
import LineChart from "../components/lineChart";

export default function Home() {
  const url =
    "https://j5v6xbmpld.execute-api.eu-central-1.amazonaws.com/prod/?from=0&to=1836074075717&device=core2";
  const { data, loading } = useFetchData(url);

  const temperature = data.map(({ temperature, timestamp }) => ({
    value: temperature,
    timestamp,
  }));
  const humidity = data.map(({ humidity, timestamp }) => ({
    value: humidity,
    timestamp,
  }));
  const pressure = data.map(({ pressure, timestamp }) => ({
    value: pressure,
    timestamp,
  }));

  return (
    <div className="flex p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex grow justify-items-center items-center">
        <div className="grow grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4">
          <div className="p-4 border-2 shadow-md hover:shadow-lg border-gray-200 rounded-xl">
            <LineChart
              data={temperature}
              label="Temperature (°C)"
              borderColor="#ff0000"
              backgroundColor="rgba(255, 152, 152, 0.2)"
            />
          </div>
          <div className="p-4 border-2 shadow-md hover:shadow-lg border-gray-200 rounded-xl">
            <LineChart
              data={humidity}
              label="Humidity (%)"
              borderColor="#0099ff"
              backgroundColor="rgba(88, 135, 255, 0.2)"
            />
          </div>
          <div className="p-4 border-2 shadow-md hover:shadow-lg border-gray-200 rounded-xl">
            <LineChart
              data={pressure}
              label="Pressure (hPa)"
              borderColor="rgba(255, 159, 64, 1)"
              backgroundColor="rgba(255, 159, 64, 0.2)"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
