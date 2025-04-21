import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
  return (
    <div>
      <div className="navbar">
        <div className="navbar-l">
          <p>Namma Suraksha</p>
        </div>
        <div className="navbar-r">
          <button className='lang'>Lang</button>
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/signup')}>Sign-Up</button>
        </div>
      </div>
        <div className='body'>
            <h1>Be Aware! Be Alert! Namma Suraksha</h1>
            <h2>Help keep your neighbourhood and yourself safe by reporting crimes</h2>
            <div className='buttons'>
            <button className='rc' onClick={() => navigate('/neighbourhood')}>Neighbourhood</button>
            <button className='vc' onClick={() => navigate('/analytics')}> View Analytics</button>
            </div>
        </div>
        <div className="info-section">
        <div className="info-block">
            <h3>Emergency Alerts</h3>
            <p>Get real-time alerts for emergencies in your area to stay aware and safe.</p>
        </div>
        <div className="info-block">
            <h3>Crime Analytics</h3>
            <p>Track and analyze crime trends in your locality with smart visual tools.</p>
        </div>
</div>
    </div>
  )
}

export default Home
