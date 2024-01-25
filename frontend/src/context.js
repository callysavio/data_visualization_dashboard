import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { constants } from './constants';

const GlobalContext = React.createContext();

const ContextStore = ({ children }) => {
  const [allDashboardData, setAllDashboardData] = useState(null);
  const [records, setRecords] = useState([]);
  const [error, setError] = useState({ errorDashboard: '' });
  const [loading, setLoading] = useState({ loadingDashboard: false });

  const fetchData = useCallback(async (query) => {
    try {
      setLoading((prev) => ({ ...prev, loadingDashboard: true }));
      const apiUrl = `${constants.backendBaseUrl}/api/allData?${getQueryString(query)}`;
      console.log('API URL:', apiUrl);
      
      const response = await axios.get(apiUrl);


      setAllDashboardData(response.data.data);
      setRecords(response.data.data.records);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError((prev) => ({ ...prev, errorDashboard: error.message }));
      
    } finally {
      setLoading((prev) => ({ ...prev, loadingDashboard: false }));
    }
  }, []);

  useEffect(() => {
    fetchData({});
  }, [fetchData]);

  const getQueryString = (query) => {
    const queryString = Object.entries(query)
      .filter(([key, value]) => value !== '')
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    return queryString;
  };

  const store = { allDashboardData, records, fetchData, error, loading };

  return (
    <GlobalContext.Provider value={store}>
      {children}
    </GlobalContext.Provider>
  );
};

export { ContextStore, GlobalContext };
