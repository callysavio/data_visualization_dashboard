// IntensityHeatmapTable.js
import React, { useState} from 'react';

const IntensityHeatmapTable = ({ data }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div>No data available.</div>;
  }

  // Extract the top 15 topics
  const topTopics = data.slice(0, 15).map((entry) => entry.topic);

  // Filter the data for the top 15 topics
  const filteredData = data.filter((entry) => topTopics.includes(entry.topic));

  // Count the occurrence of each topic
  const topicCounts = filteredData.reduce((counts, item) => {
    const topic = item.topic;
    counts[topic] = (counts[topic] || 0) + 1;
    return counts;
  }, {});

  // Sort the topics by count in descending order
  const sortedTopics = Object.keys(topicCounts).sort((a, b) => topicCounts[b] - topicCounts[a]);

  // Calculate the percentage occurrence of each topic
  const sortedData = sortedTopics.map((topic) => ({
    topic,
    count: topicCounts[topic],
    percentage: (topicCounts[topic] / filteredData.length) * 100,
  }));

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="intensity-heatmap-table">
      <table>
        <thead>
          <tr>
            <th>Topic</th>
            <th>Count</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.topic}>
              <td>{item.topic}</td>
              <td>{item.count}</td>
              <td>{item.percentage.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default IntensityHeatmapTable;
