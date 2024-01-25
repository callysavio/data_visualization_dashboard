import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../context';
import * as d3 from 'd3';

const IntensityTable = () => {
  const store = useContext(GlobalContext);
  const { records } = store;

  // Pagination state
  const recordsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination variables
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

  // Calculate statistics for the displayed records
  const maxIntensity = d3.max(currentRecords, (d) => d.intensity);
  const minIntensity = d3.min(currentRecords, (d) => d.intensity);
  const averageIntensity = currentRecords.length > 0 ? d3.mean(currentRecords, (d) => d.intensity) : 0;
  const intensityPercentage =
    (currentRecords.filter((item) => item.intensity > 0).length / currentRecords.length) * 100;

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>Intensity Statistics</h2>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Intensity</th>
            <th>Relevance</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((record, index) => (
            <tr key={index}>
              <td>{indexOfFirstRecord + index + 1}</td>
              <td>{record.intensity}</td>
              <td>{record.intensity > 0 ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Intensity Statistics</h2>
      <p>Max Intensity: {maxIntensity}</p>
      <p>Min Intensity: {minIntensity}</p>
      <p>Average Intensity: {averageIntensity ? averageIntensity.toFixed(2) : 'N/A'}</p>
      <p>Intensity Percentage: {intensityPercentage.toFixed(2)}%</p>

      {/* Pagination */}
      <div>
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{`Page ${currentPage}`}</span>
        <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastRecord >= records.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default IntensityTable;
