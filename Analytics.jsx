import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#FF8042', '#0088FE', '#00C49F', '#FFBB28'];

const Analytics = ({ reports }) => {
  const typeCount = reports.reduce((acc, report) => {
    acc[report.incidentType] = (acc[report.incidentType] || 0) + 1;
    return acc;
  }, {});
  const pieData = Object.keys(typeCount).map(type => ({
    name: type,
    value: typeCount[type]
  }));
  const monthCount = reports.reduce((acc, report) => {
    const date = new Date(report.timestamp);
    const month = date.toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});
  const barData = Object.keys(monthCount).map(month => ({
    name: month,
    incidents: monthCount[month]
  }));

  return (
    <div className="analytics-container">
      <h1>Crime Analytics Dashboard</h1>

      <div className="stats-box">
        <div className="stat">
          <h3>Total Crimes</h3>
          <p>{reports.length}</p>
        </div>
        <div className="stat">
          <h3>Types Reported</h3>
          <p>{Object.keys(typeCount).length}</p>
        </div>
        <div className="stat">
          <h3>Recent Location</h3>
          <p>{reports[0]?.location || 'None'}</p>
        </div>
      </div>

      <div className="chart-container">
        <div className="bar-chart">
          <h3>Incidents Over Time</h3>
          <BarChart width={400} height={300} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="incidents" fill="#8884d8" />
          </BarChart>
        </div>

        <div className="pie-chart">
          <h3>Incident Breakdown</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
