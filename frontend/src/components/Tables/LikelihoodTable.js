// LikelihoodTable.js
import React, { useMemo, useState } from 'react';

const LikelihoodTable = ({ data, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust the number of items per page as needed

  const sortedLikelihoodData = useMemo(() => {
    // Count the occurrence of each likelihood value
    const likelihoodCounts = data.reduce((counts, item) => {
      const likelihood = item.likelihood;
      counts[likelihood] = (counts[likelihood] || 0) + 1;
      return counts;
    }, {});

    // Sort the likelihood values in descending order
    const sortedLikelihood = Object.keys(likelihoodCounts).sort((a, b) => b - a);

    // Calculate the percentage occurrence of each likelihood value
    const likelihoodData = sortedLikelihood.map((likelihood) => ({
      likelihood: +likelihood, // Convert likelihood to number
      count: likelihoodCounts[likelihood],
      percentage: (likelihoodCounts[likelihood] / data.length) * 100,
    }));

    return likelihoodData;
  }, [data]);

  const totalPages = Math.ceil(sortedLikelihoodData.length / itemsPerPage);
  const paginatedData = sortedLikelihoodData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="likelihood-table">
      {loading ? (
        <p id="loading">Loading...</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Likelihood</th>
                <th>Count</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <tr key={item.likelihood}>
                  <td>{item.likelihood}</td>
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
        </>
      )}
    </div>
  );
};

export default LikelihoodTable;
