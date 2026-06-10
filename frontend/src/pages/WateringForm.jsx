import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/WateringForm.css';

function WateringForm() {
  const { treeId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    condition: 'Good',
    recommendation: '',
    notes: ''
  });
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      data.append('tree_id', treeId);
      data.append('condition', formData.condition);
      data.append('recommendation', formData.recommendation);
      data.append('notes', formData.notes);
      if (photo) {
        data.append('photo', photo);
      }

      await axios.post('http://localhost:5000/api/visits', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      navigate(`/tree/${treeId}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit visit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="watering-form-container">
      <h1>Record Watering Visit - Tree {treeId}</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="condition">Tree Condition</label>
          <select
            id="condition"
            name="condition"
            value={formData.condition}
            onChange={handleInputChange}
            required
          >
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
            <option value="Dead">Dead</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="recommendation">Recommendation</label>
          <textarea
            id="recommendation"
            name="recommendation"
            value={formData.recommendation}
            onChange={handleInputChange}
            placeholder="e.g., Needs more watering, Remove dead branches"
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Additional observations..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="photo">Photo Evidence (Required)</label>
          <input
            id="photo"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            required
          />
        </div>

        <div className="button-group">
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Visit'}
          </button>
          <button type="button" onClick={() => navigate(`/tree/${treeId}`)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default WateringForm;