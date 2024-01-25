// CountryTable.js
import React, { useMemo, useState } from 'react';

const CountryTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust the number of items per page as needed

  const countryStats = useMemo(() => {
    const countryCounts = data.reduce((counts, item) => {
      counts[item.country] = (counts[item.country] || 0) + 1;
      return counts;
    }, {});

    // Convert counts object to an array of objects
    const countryData = Object.keys(countryCounts).map((country) => ({
      country,
      count: countryCounts[country],
    }));

    // Sort the data by count in descending order
    countryData.sort((a, b) => b.count - a.count);

    // Calculate total occurrences
    const totalOccurrences = data.length;

    // Calculate percentages and extract region and impact
    const countryStats = countryData.map((item) => {
      const occurrences = data.filter((d) => d.country === item.country);
      const totalImpact = occurrences.reduce((sum, d) => sum + (d.impact === 'High' ? 1 : 0), 0);

      return {
        country: item.country,
        count: item.count,
        percentage: (item.count / totalOccurrences) * 100,
        region: occurrences[0].region,  // Assuming region is the same for all occurrences of a country
        impact: totalImpact > occurrences.length / 2 ? 'High' : 'Low',  // Example logic, modify as needed
      };
    });

    return countryStats;
  }, [data]);



  const totalPages = Math.ceil(countryStats.length / itemsPerPage);
  const paginatedData = countryStats.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="country-table">
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Occurrences</th>
            <th>Percentage</th>
            <th>Region</th>
            <th>Impact</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.country}>
              <td>{item.country}</td>
              <td>{item.count}</td>
              <td>{item.percentage.toFixed(2)}%</td>
              <td>{item.region}</td>
              <td>{item.impact}</td>
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

export default CountryTable;
