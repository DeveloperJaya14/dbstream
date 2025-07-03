import React, { useEffect, useState } from "react";
import './App.css';
import StatsGrid from "./StatsGrid.jsx"; // 🔹 Import the StatsGrid component


function App() {
  const staticJson = {
    totalMsg: 100006,
    totalSuccessMsg: 100006,
    totalFailedMsg: 0,
    topicStats: [
      { topic: "dlq-topic", totalMessages: 3, consumedMessages: 3 },
      { topic: "dlq-topic", totalMessages: 3, consumedMessages: 3 }
    ]
  };

  const [data, setData] = useState(staticJson);
  const [error, setError] = useState(null);

  const fetchData = () => {
    fetch("http://localhost:9009/api/streams/stats") // 🔁 Replace with your API
      .then((res) => {
        if (!res.ok) {
          throw new Error("API error: " + res.status);
        }
        return res.json();
      })
      .then((apiData) => {
        setData(apiData);
        setError(null);
      })
      .catch((err) => {
        console.error("API call failed. Using static data.", err);
        setError("API failed. Displaying fallback data.");
        setData(staticJson);
      });
  };

  useEffect(() => {
    fetchData(); // 🔹 Initial fetch

    const interval = setInterval(() => {
      fetchData(); // 🔄 Auto refresh every 10 seconds
    }, 10000);

    return () => clearInterval(interval); // Cleanup
  }, []);

  const handleManualRefresh = () => {
    fetchData(); // 🔘 Manual refresh
  };

  return (
    <div className="App">
      <div style={{ padding: '10px', textAlign: 'right' }}>
        <button
          onClick={handleManualRefresh}
          style={{
            padding: '8px 16px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          🔄 Refresh Now
        </button>
      </div>

      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
      <StatsGrid data={data} />
    </div>
  );
}

export default App;

