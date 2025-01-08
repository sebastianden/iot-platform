"use client";
import { useState, useEffect } from "react";

import useFetchData from "../hooks/useFetchData";
import LineChart from "../components/lineChart";

export default function Home() {
  const url = "https://j5v6xbmpld.execute-api.eu-central-1.amazonaws.com/prod/";

  const [dateRange, setDateRange] = useState<string>("all");
  const [device, setDevice] = useState<string>("core2");

  const handleDateRangeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDateRange(event.target.value);
  };

  const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDevice(event.target.value);
  };

  const getUnixTimeRange = (): { from: number; to: number } => {
    const now = Date.now();
    switch (dateRange) {
      case "lastDay":
        return { from: now - 86400000, to: now }; // 24 * 60 * 60 * 1000
      case "lastWeek":
        return { from: now - 604800000, to: now }; // 7 * 24 * 60 * 60 * 1000
      case "last30Days":
        return { from: now - 2592000000, to: now }; // 30 * 24 * 60 * 60 * 1000
      case "all":
      default:
        return { from: 0, to: now };
    }
  };

  const { from, to } = getUnixTimeRange();
  const { data, loading } = useFetchData(url, from, to, device);

  const temperature = data.map(({ temperature, timestamp }) => ({
    value: temperature,
    timestamp,
  }));

  const lastTemperature =
    temperature.length > 0
      ? parseInt(temperature[temperature.length - 1].value)
      : null;

  const humidity = data.map(({ humidity, timestamp }) => ({
    value: humidity,
    timestamp,
  }));

  const lastHumidity =
    humidity.length > 0 ? parseInt(humidity[humidity.length - 1].value) : null;

  const pressure = data.map(({ pressure, timestamp }) => ({
    value: pressure,
    timestamp,
  }));

  const lastPressure =
    pressure.length > 0 ? parseInt(pressure[pressure.length - 1].value) : null;

  return (
    <div className="flex p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex grow justify-items-center items-center">
        <div className="grow grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4">
          <div className="col-span-2 p-4 border-2 shadow-md hover:shadow-lg border-gray-200 rounded-xl">
            <div className="className=border-2 border-gray-200 rounded-xl p-4">
              <form className="text-gray-500">
                <label htmlFor="dateRange">Select Date Range:</label>
                <select
                  id="dateRange"
                  value={dateRange}
                  onChange={handleDateRangeChange}
                >
                  <option value="lastDay">Last Day</option>
                  <option value="lastWeek">Last Week</option>
                  <option value="last30Days">Last 30 Days</option>
                  <option value="all">All</option>
                </select>
              </form>
            </div>
            <div className="className=border-2 border-gray-200 rounded-xl p-4">
              <form>
                <label htmlFor="device">Select Device:</label>
                <select
                  id="device"
                  value={device}
                  onChange={handleDeviceChange}
                >
                  <option value="core2">Core2</option>
                  {/* Add more device options here as needed */}
                </select>
              </form>
            </div>
          </div>
          <div className="p-4 border-2 shadow-md hover:shadow-lg border-gray-200 rounded-xl">
            <LineChart
              data={temperature}
              label="Temperature (°C)"
              borderColor="#ff0000"
              backgroundColor="rgba(255, 152, 152, 0.2)"
            />
          </div>
          <div className="p-4 border-2 shadow-md hover:shadow-lg border-gray-200 rounded-xl">
            <p className="text-2xl text-gray-500">Temperature:</p>
            <div className="flex justify-center">
              <p className="flex font-bold text-5xl text-red-500">
                {lastTemperature}
              </p>
              <p className="flex text-2xl text-gray-500">°C</p>
            </div>
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
            <p className="text-2xl text-gray-500">Humidity:</p>
            <div className="flex justify-center">
              <p className="flex font-bold text-5xl text-blue-500">
                {lastHumidity}
              </p>
              <p className="flex text-2xl text-gray-500">%</p>
            </div>
          </div>
          <div className="p-4 border-2 shadow-md hover:shadow-lg border-gray-200 rounded-xl">
            <LineChart
              data={pressure}
              label="Pressure (hPa)"
              borderColor="rgba(255, 159, 64, 1)"
              backgroundColor="rgba(255, 159, 64, 0.2)"
            />
          </div>
          <div className="p-4 border-2 shadow-md hover:shadow-lg border-gray-200 rounded-xl">
            <p className="text-2xl text-gray-500">Pressure:</p>
            <div className="flex justify-center">
              <p className="flex font-bold text-5xl text-orange-500">
                {lastPressure}
              </p>
              <p className="flex text-2xl text-gray-500">hPa</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
