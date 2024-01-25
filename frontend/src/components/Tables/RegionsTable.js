import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../context';

const RegionDataTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // You can adjust this based on your preference
  const store = useContext(GlobalContext);
  const { records } = store;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = records.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(records.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1); // Reset to the first page when data changes
  }, [records]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Region</th>
            <th>Count</th>
            <th>Rate of Occurrence</th>
            <th>Number</th>
            <th>Percentage</th>
            {/* Add additional headers as needed */}
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              <td>{item.region}</td>
              <td>{item.count}</td>
              <td>{item.rateOfOccurrence}</td>
              <td>{item.number}</td>
              <td>{item.percentage}%</td>
              {/* Add additional cells with relevant information */}
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <span>Page {currentPage} of {totalPages}</span>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RegionDataTable;
