import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Adjust path as needed
import { collection, addDoc, getDocsFromServer, query, orderBy, limit } from 'firebase/firestore';

const Neighbourhood = () => {
  const [location, setLocation] = useState('');
  const [incidentType, setIncidentType] = useState('');
  const [description, setDescription] = useState('');
  const [incidents, setIncidents] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchIncidents = async () => {
      setFetching(true);
      try {
        const incidentsRef = collection(db, 'incidents');
        const q = query(incidentsRef, orderBy('date', 'desc'), limit(3));
        const querySnapshot = await getDocsFromServer(q);

        const incidentsData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            date: new Date(data.date).toLocaleString(),
          };
        });

        setIncidents(incidentsData);
      } catch (error) {
        console.error("Error fetching incidents: ", error);
      } finally {
        setFetching(false);
      }
    };

    fetchIncidents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const now = new Date();
    const newIncident = {
      location,
      incidentType,
      description,
      date: now.toISOString()
    };

    try {
      const docRef = await addDoc(collection(db, 'incidents'), newIncident);
      setIncidents(prev => [{
        id: docRef.id,
        ...newIncident,
        date: now.toLocaleString()
      }, ...prev.slice(0, 3)]); // Keep max 3

      setLocation('');
      setIncidentType('');
      setDescription('');
    } catch (error) {
      console.error("Error adding incident: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="NW">
      <h1>Neighbourhood Watch</h1>
      <h2>Report suspicious activity and keep your area safe</h2>

      <div className="report-form-container">
        <form className="incident-form" onSubmit={handleSubmit}>
          <label>
            Location:
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              disabled={submitting}
            >
              <option value="">-- Select Area --</option>
              <option value="Yelankha">Yelankha</option>
              <option value="Koramangala">Koramangala</option>
              <option value="Electronic City">Electronic City</option>
              <option value="Whitefield">Whitefield</option>
            </select>
          </label>

          <label>
            Incident Type:
            <select
              value={incidentType}
              onChange={(e) => setIncidentType(e.target.value)}
              required
              disabled={submitting}
            >
              <option value="">-- Select Type --</option>
              <option value="Theft">Theft</option>
              <option value="Vandalism">Vandalism</option>
              <option value="Suspicious Activity">Suspicious Activity</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              placeholder="Describe the incident..."
              required
              disabled={submitting}
            />
          </label>

          <button type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </div>

      <div className="recent-incidents">
        <h2>Recent Incidents</h2>
        {fetching && incidents.length === 0 ? (
          <p>Loading incidents...</p>
        ) : incidents.length === 0 ? (
          <p>No incidents reported yet.</p>
        ) : (
          <ul>
            {incidents.map((incident) => (
              <li key={incident.id} className="incident-item">
                <strong>Area:</strong> {incident.location}<br />
                <strong>Type:</strong> {incident.incidentType}<br />
                <strong>Date:</strong> {incident.date}<br />
                <strong>Description:</strong> {incident.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Neighbourhood;
