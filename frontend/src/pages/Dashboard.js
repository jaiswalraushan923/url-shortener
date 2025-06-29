// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { logout } from '../utils/auth';

// function Dashboard() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <div style={{ textAlign: 'center', marginTop: '100px' }}>
//       <h2>Welcome to Dashboard 🎉</h2>
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// }

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';

function Dashboard() {
  const navigate = useNavigate();
  const [longUrl, setLongUrl] = useState('');
  const [shortened, setShortened] = useState('');
  const [myUrls, setMyUrls] = useState([]);

  const [selectedUrl, setSelectedUrl] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [urlAnalytics, setUrlAnalytics] = useState([]);
  const [totalClicks, setTotalClicks] = useState({});

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleShorten = async () => {
    try {
      const res = await API.post('/api/urls/shorten', { originalUrl: longUrl });
      setShortened(res.data.shortUrl);
      fetchMyUrls();
    } catch (err) {
      alert('Failed to shorten URL.');
    }
  };

  const fetchMyUrls = async () => {
    try {
      const res = await API.get('/api/urls/myurls');
      setMyUrls(res.data);
    } catch (err) {
      console.error('Error fetching URLs:', err);
    }
  };

  useEffect(() => {
    fetchMyUrls();
  }, []);

  const handleFetchUrlAnalytics = async () => {
    if (!selectedUrl || !startDate || !endDate) {
      alert("Please fill all fields");
      return;
    }
    try {
      const res = await API.get(`/api/urls/analytics/${selectedUrl}`, {
        params: { startDate, endDate }
      });
      setUrlAnalytics(res.data);
    } catch (err) {
      alert('Error fetching URL analytics');
    }
  };

  const handleFetchTotalClicks = async () => {
    if (!startDate || !endDate) {
      alert("Please fill both dates");
      return;
    }
    try {
      const res = await API.get('/api/urls/totalClicks', {
        params: {
          startDate: startDate.split('T')[0],
          endDate: endDate.split('T')[0]
        }
      });
      setTotalClicks(res.data);
    } catch (err) {
      alert('Error fetching total clicks');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>

      <div style={{ marginTop: '40px' }}>
        <h3>Shorten a New URL</h3>
        <input
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter a long URL"
          style={{ width: '300px', padding: '8px' }}
        />
        <button onClick={handleShorten}>Shorten</button>

        {shortened && (
          <p>
            Short URL:{" "}
            <a href={`https://url-shortener-6kbq.onrender.com/${shortened}`} target="_blank" rel="noreferrer">
              {shortened}
            </a>
          </p>
        )}
      </div>

      <hr style={{ margin: '40px 0' }} />

      <div>
        <h3>My URLs</h3>
        {myUrls.length === 0 ? (
          <p>No URLs yet</p>
        ) : (
          <table border="1" style={{ margin: 'auto' }}>
            <thead>
              <tr>
                <th>Original URL</th>
                <th>Short URL</th>
                <th>Clicks</th>
              </tr>
            </thead>
            <tbody>
              {myUrls.map((url) => (
                <tr key={url.id}>
                  <td>{url.originalUrl}</td>
                  <td>
                    <a
                      href={`https://url-shortener-6kbq.onrender.com/${url.shortUrl}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {url.shortUrl}
                    </a>
                  </td>
                  <td>{url.clickCount || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <hr style={{ margin: '40px 0' }} />

      <div>
        <h3>Analytics</h3>

        <div>
          <label>Select Short URL: </label>
          <select value={selectedUrl} onChange={(e) => setSelectedUrl(e.target.value)}>
            <option value="">--Choose--</option>
            {myUrls.map((url) => (
              <option key={url.id} value={url.shortUrl}>{url.shortUrl}</option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: '10px' }}>
          <label>Start: </label>
          <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <label style={{ marginLeft: '20px' }}>End: </label>
          <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>

        <div style={{ marginTop: '10px' }}>
          <button onClick={handleFetchUrlAnalytics}>Get URL Clicks</button>
          <button style={{ marginLeft: '10px' }} onClick={handleFetchTotalClicks}>Get Total Clicks</button>
        </div>

        <div style={{ marginTop: '20px' }}>
          <h4>Click Events for <code>{selectedUrl}</code></h4>
          {urlAnalytics.length === 0 ? <p>No data</p> : (
            <ul>
              <div style={{ marginTop: '20px' }}>
  <h4>Click Count for <code>{selectedUrl}</code></h4>
  {urlAnalytics.length === 0 ? (
    <p>No data</p>
  ) : (
    <ul>
      {urlAnalytics.map((e, i) => (
        <li key={i}>
          {e.clickDate}: {e.count} click(s)
        </li>
      ))}
    </ul>
  )}
</div>

            </ul>
          )}
        </div>

        <div style={{ marginTop: '20px' }}>
          <h4>Total Clicks (by Date)</h4>
          {Object.keys(totalClicks).length === 0 ? <p>No data</p> : (
            <ul>
              {Object.entries(totalClicks).map(([date, count]) => (
                <li key={date}>{date}: {count} click(s)</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
