import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../context';

const FilterComponent = () => {
  const { fetchData, records } = useContext(GlobalContext);

  const [selectedEndYear, setSelectedEndYear] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedPest, setSelectedPest] = useState('');
  const [selectedSource, setSelectedSource] = useState('');
  const [selectedSwot, setSelectedSwot] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const [endYearOptions, setEndYearOptions] = useState([]);
  const [topicOptions, setTopicOptions] = useState([]);
  const [sectorOptions, setSectorOptions] = useState([]);
  const [regionOptions, setRegionOptions] = useState([]);
  const [pestOptions, setPestOptions] = useState([]);
  const [sourceOptions, setSourceOptions] = useState([]);
  const [swotOptions, setSwotOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    if (Array.isArray(records)) {
      const uniqueEndYears = [...new Set(records.map((item) => item.end_year))];
      setEndYearOptions(uniqueEndYears);

      const uniqueTopics = [...new Set(records.map((item) => item.topic))];
      setTopicOptions(uniqueTopics);

      const uniqueSectors = [...new Set(records.map((item) => item.sector))];
      setSectorOptions(uniqueSectors);

      const uniqueRegions = [...new Set(records.map((item) => item.region))];
      setRegionOptions(uniqueRegions);

      const uniquePests = [...new Set(records.map((item) => item.pestle))];
      setPestOptions(uniquePests);

      const uniqueSources = [...new Set(records.map((item) => item.source))];
      setSourceOptions(uniqueSources);

      const uniqueSwots = [...new Set(records.map((item) => item.swot))];
      setSwotOptions(uniqueSwots);

      const uniqueCountries = [...new Set(records.map((item) => item.country))];
      setCountryOptions(uniqueCountries);

      const uniqueCities = [...new Set(records.map((item) => item.city))];
      setCityOptions(uniqueCities);
    }
  }, [records]);

  const handleApplyFilters = () => {
    document.getElementById("filter-component").style.display = "none";
    const filters = {
      end_year: selectedEndYear,
      topic: selectedTopic,
      sector: selectedSector,
      region: selectedRegion,
      pestle: selectedPest,
      source: selectedSource,
      swot: selectedSwot,
      country: selectedCountry,
      city: selectedCity,
    };

    fetchData(filters);
  };

  const closeFilter = () => {
    document.getElementById('filter-component').style.display = 'none';
  };

  return (
    <div id="filter-component">
      <i className="fa fa-times" id="close-filter" onClick={closeFilter}></i>

      <p>
        End Year:
        <select
          value={selectedEndYear}
          onChange={(e) => setSelectedEndYear(e.target.value)}
        >
          <option key="all" value="">All</option>
          {endYearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </p>

      <p>
        Topic:
        <select
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
        >
          <option key="all" value="">All</option>
          {topicOptions.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </p>

      <p>
        Sector:
        <select
          value={selectedSector}
          onChange={(e) => setSelectedSector(e.target.value)}
        >
          <option key="all" value="">All</option>
          {sectorOptions.map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </select>
      </p>

      <p>
        Region:
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option key="all" value="">All</option>
          {regionOptions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </p>

      <p>
        PEST:
        <select
          value={selectedPest}
          onChange={(e) => setSelectedPest(e.target.value)}
        >
          <option key="all" value="">All</option>
          {pestOptions.map((pest) => (
            <option key={pest} value={pest}>
              {pest}
            </option>
          ))}
        </select>
      </p>

      <p>
        Source:
        <select
          value={selectedSource}
          onChange={(e) => setSelectedSource(e.target.value)}
        >
          <option key="all" value="">All</option>
          {sourceOptions.map((source) => (
            <option key={source} value={source}>
              {source}
            </option>
          ))}
        </select>
      </p>

      <p>
        SWOT:
        <select
          value={selectedSwot}
          onChange={(e) => setSelectedSwot(e.target.value)}
        >
          <option key="all" value="">All</option>
          {swotOptions.map((swot) => (
            <option key={swot} value={swot}>
              {swot}
            </option>
          ))}
        </select>
      </p>

      <p>
        Country:
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option key="all" value="">All</option>
          {countryOptions.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </p>

      <p>
        City:
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option key="all" value="">All</option>
          {cityOptions.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </p>

      <button onClick={handleApplyFilters}>Apply Filters</button>
    </div>
  );
};

export default FilterComponent;
