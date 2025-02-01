import { useState, useEffect } from "react";
import DataCard from "../components/dataCard";
import Menu from "../components/menu";
import { AuthSession, fetchAuthSession } from "aws-amplify/auth";

export default function Home() {
  const url = process.env.NEXT_PUBLIC_QUERY_API_URL;

  const [dateRange, setDateRange] = useState<string>("lastDay");
  const [device, setDevice] = useState<string>("core2");
  const [data, setData] = useState([]);
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    const getAuthSession = async () => {
      try {
        const session = await fetchAuthSession();
        setSession(session);
        console.log("Auth session:", session);
      } catch (error) {
        console.error("Error getting auth session", error);
        setSession(null);
      }
    };

    getAuthSession();
  }, []);

  useEffect(() => {
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

    const fetchData = async (
      from: number,
      to: number,
      device: string,
      idToken: string
    ) => {
      try {
        const response = await fetch(
          `${url}?from=${from}&to=${to}&device=${device}`,
          {
            headers: new Headers({
              Authorization: idToken,
            }),
          }
        );
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const { from, to } = getUnixTimeRange();

    // Get id token from the session and fetch data
    if (session && session.tokens && session.tokens.idToken) {
      const idToken = session.tokens.idToken.toString();
      fetchData(from, to, device, idToken);
    }
  }, [dateRange, device, session]);

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

  const battery = data.map(({ battery, timestamp }) => ({
    value: battery,
    timestamp,
  }));

  const lastBattery =
    battery.length > 0 ? parseInt(battery[battery.length - 1].value) : null;

  return (
    <div className="flex p-4">
      <main className="flex grow justify-items-center items-center">
        <div className="grow grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
          <Menu
            dateRange={dateRange}
            setDateRange={setDateRange}
            device={device}
            setDevice={setDevice}
          />
          <DataCard
            data={temperature}
            lastDataPoint={lastTemperature}
            measurement="Temperature"
            unit="°C"
            fontColor="text-red-500"
            borderColor="#ff0000"
            backgroundColor="rgba(255, 152, 152, 0.2)"
          />
          <DataCard
            data={humidity}
            lastDataPoint={lastHumidity}
            measurement="Humidity"
            unit="%"
            fontColor="text-blue-500"
            borderColor="#0099ff"
            backgroundColor="rgba(88, 135, 255, 0.2)"
          />
          <DataCard
            data={pressure}
            lastDataPoint={lastPressure}
            measurement="Pressure"
            unit="hPa"
            fontColor="text-orange-500"
            borderColor="rgba(255, 159, 64, 1)"
            backgroundColor="rgba(255, 159, 64, 0.2)"
          />
          <DataCard
            data={battery}
            lastDataPoint={lastBattery}
            measurement="Battery"
            unit="%"
            fontColor="text-green-500"
            borderColor="#06ce21"
            backgroundColor="rgba(115, 255, 64, 0.2)"
          />
        </div>
      </main>
    </div>
  );
}
