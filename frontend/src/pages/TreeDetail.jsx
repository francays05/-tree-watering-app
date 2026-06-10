import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/TreeDetail.css';

function TreeDetail() {
  const { treeId } = useParams();
  const [tree, setTree] = useState(null);
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTreeData();
  }, [treeId]);

  const fetchTreeData = async () => {
    try {
      const treeResponse = await axios.get(`http://localhost:5000/api/trees/${treeId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTree(treeResponse.data);

      const visitsResponse = await axios.get(`http://localhost:5000/api/visits/tree/${treeId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setVisits(visitsResponse.data);
    } catch (err) {
      console.error('Failed to fetch tree data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!tree) return <div>Tree not found</div>;

  return (
    <div className="tree-detail-container">
      <button onClick={() => navigate('/dashboard')}>← Back to Dashboard</button>
      
      <div className="tree-header">
        <h1>Tree {tree.tree_id}</h1>
        <span className={`status ${tree.status.toLowerCase()}`}>{tree.status}</span>
      </div>

      <div className="tree-info">
        <div className="info-section">
          <h3>Tree Information</h3>
          <p><strong>Species:</strong> {tree.species}</p>
          <p><strong>Cultivar:</strong> {tree.cultivar}</p>
          <p><strong>Ward:</strong> {tree.ward}</p>
          <p><strong>Location:</strong> {tree.road_site_name}</p>
          <p><strong>Planting Date:</strong> {new Date(tree.planting_date).toLocaleDateString()}</p>
          <p><strong>Required Visits:</strong> {tree.required_visits}</p>
          <p><strong>Coordinates:</strong> {tree.latitude}, {tree.longitude}</p>
        </div>
      </div>

      <div className="visits-section">
        <div className="section-header">
          <h3>Watering Visits ({visits.length})</h3>
          <button onClick={() => navigate(`/visit/${tree.id}`)}>+ New Visit</button>
        </div>

        {visits.length > 0 ? (
          <table className="visits-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Condition</th>
                <th>Notes</th>
                <th>Photo</th>
              </tr>
            </thead>
            <tbody>
              {visits.map(visit => (
                <tr key={visit.id}>
                  <td>{new Date(visit.visit_datetime).toLocaleString()}</td>
                  <td>{visit.condition}</td>
                  <td>{visit.notes}</td>
                  <td>
                    {visit.photo_url && (
                      <a href={visit.photo_url} target="_blank" rel="noreferrer">View Photo</a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No visits recorded yet</p>
        )}
      </div>
    </div>
  );
}

export default TreeDetail;