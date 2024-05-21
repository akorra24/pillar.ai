const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Column 1
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Column 2
            </th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Column 3
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
              Data 1
            </td>
            <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
              Data 2
            </td>
            <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
              Data 3
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
              Data 4
            </td>
            <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
              Data 5
            </td>
            <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
              Data 6
            </td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
