import React from "react";
import { useThemeContext } from "../contexts/ThemeContext";

interface menuProps {
  dateRange: string;
  setDateRange: (dateRange: string) => void;
  device: string;
  setDevice: (device: string) => void;
}

const Menu: React.FC<menuProps> = ({
  dateRange,
  setDateRange,
  device,
  setDevice,
}) => {
  const { toggleTheme, isDarkMode, mounted } = useThemeContext();

  const handleDateRangeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDateRange(event.target.value);
  };

  const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDevice(event.target.value);
  };

  return (
    <div className="lg:col-span-2 md:col-span-2 sm:col-span-1 card">
      <label className="flex items-center justify-end">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={mounted && isDarkMode}
          onChange={toggleTheme}
        />
        <div className="relative w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:dark:bg-gray-500 after:dark:border-gray-500 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
      </label>
      <form className="text-gray-500 p-4 flex flex-col gap-2">
        <label className="inline-block" htmlFor="dateRange">
          Select Date Range:
        </label>
        <select
          className="p-2 border-2 border-gray-200 dark:border-gray-500 rounded-xl dark:bg-black"
          id="dateRange"
          value={dateRange}
          onChange={handleDateRangeChange}
        >
          <option value="lastDay">Last Day</option>
          <option value="lastWeek">Last Week</option>
          <option value="last30Days">Last 30 Days</option>
          <option value="all">All</option>
        </select>
        <label htmlFor="device">Select Device:</label>
        <select
          className="border-2 border-gray-200 dark:border-gray-500 rounded-xl dark:bg-black p-2"
          id="device"
          value={device}
          onChange={handleDeviceChange}
        >
          <option value="core2">Core2</option>
          <option value="esp8266">ESP8266</option>
        </select>
      </form>
    </div>
  );
};

export default Menu;
