import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';

function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/dashboard/metrics', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMetrics(response.data);
    } catch (err) {
      console.error('Failed to fetch metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      
      {metrics && (
        <>
          <div className="metrics-grid">
            <div className="metric-card">
              <h3>Total Trees</h3>
              <p className="metric-value">{metrics.totalTrees}</p>
            </div>
            <div className="metric-card">
              <h3>Total Visits</h3>
              <p className="metric-value">{metrics.totalVisits}</p>
            </div>
            <div className="metric-card">
              <h3>Required Visits</h3>
              <p className="metric-value">{metrics.requiredVisits}</p>
            </div>
            <div className="metric-card">
              <h3>Completed Visits</h3>
              <p className="metric-value">{metrics.completedVisits}</p>
            </div>
            <div className="metric-card overdue">
              <h3>Overdue Trees</h3>
              <p className="metric-value">{metrics.overdueCount}</p>
            </div>
          </div>

          <div className="charts-section">
            <div className="chart-container">
              <h3>Visits by Ward</h3>
              <table>
                <thead>
                  <tr><th>Ward</th><th>Visits</th></tr>
                </thead>
                <tbody>
                  {metrics.visitsByWard.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.ward}</td>
                      <td>{row.visits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="chart-container">
              <h3>Visits by Company</h3>
              <table>
                <thead>
                  <tr><th>Company</th><th>Visits</th></tr>
                </thead>
                <tbody>
                  {metrics.visitsByCompany.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.name}</td>
                      <td>{row.visits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;