import React from 'react';
import './StatsGrid.css';

const StatsGrid = ({ data }) => {
  const { totalMsg, totalSuccessMsg, totalFailedMsg, topicStats } = data;

  return (
    <div className="stats-container">
      <h2>Message Summary</h2>
      <div className="summary-grid">
        <div className="card">
          <div className="label">Total Messages</div>
          <div className="value">{totalMsg}</div>
        </div>
        <div className="card">
          <div className="label">Successful Messages</div>
          <div className="value">{totalSuccessMsg}</div>
        </div>
        <div className="card">
          <div className="label">Failed Messages</div>
          <div className="value">{totalFailedMsg}</div>
        </div>
      </div>

      <h3>Topic Stats</h3>
      <table className="topic-table">
        <thead>
          <tr>
            <th>Topic</th>
            <th>Total Messages</th>
            <th>Consumed Messages</th>
          </tr>
        </thead>
        <tbody>
          {topicStats.map((topic, index) => (
            <tr key={index}>
              <td>{topic.topic}</td>
              <td>{topic.totalMessages}</td>
              <td>{topic.consumedMessages}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatsGrid;




