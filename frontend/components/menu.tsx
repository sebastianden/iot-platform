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
      <form className="text-gray-500 p-4 flex flex-col gap-2">
        <label className="inline-block" htmlFor="dateRange">
          Select Date Range:
        </label>
        <select
          className="p-2 border-2 border-gray-200 rounded-xl"
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
          className="border-2 border-gray-200 rounded-xl p-2"
          id="device"
          value={device}
          onChange={handleDeviceChange}
        >
          <option value="core2">Core2</option>
          {/* Add more device options here as needed */}
        </select>
      </form>
    </div>
  );
};

export default Menu;
