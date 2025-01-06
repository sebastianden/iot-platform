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
