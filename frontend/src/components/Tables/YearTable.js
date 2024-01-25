// YearStatisticsTable.js
import React, { useMemo, useState } from 'react';

const YearStatisticsTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const sortedYearData = useMemo(() => {
    // Count the occurrence of each year value
    const yearCounts = data.reduce((counts, item) => {
      counts[item.start_year] = (counts[item.start_year] || 0) + 1;
      counts[item.end_year] = (counts[item.end_year] || 0) + 1;
      return counts;
    }, {});

    // Sort the years in ascending order
    const sortedYears = Object.keys(yearCounts).sort((a, b) => a - b);

    // Calculate the percentage occurrence of each year value
    const yearData = sortedYears.map((year) => ({
      year: +year, // Convert year to number
      startYearCount: yearCounts[year] || 0,
      endYearCount: yearCounts[year] || 0,
      startYearPercentage: (yearCounts[year] / (data.length * 2)) * 100,
      endYearPercentage: (yearCounts[year] / (data.length * 2)) * 100,
    }));

    return yearData;
  }, [data]);

  const totalPages = Math.ceil(sortedYearData.length / itemsPerPage);
  const paginatedData = sortedYearData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="year-statistics-table">
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Start Year Count</th>
            <th>Start Year Percentage</th>
            <th>End Year Count</th>
            <th>End Year Percentage</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.year}>
              <td>{item.year}</td>
              <td>{item.startYearCount}</td>
              <td>{item.startYearPercentage.toFixed(2)}%</td>
              <td>{item.endYearCount}</td>
              <td>{item.endYearPercentage.toFixed(2)}%</td>
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

export default YearStatisticsTable;
