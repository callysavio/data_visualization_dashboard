import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Country from "./components/Pages/Country";
import Topics from "./components/Pages/Topics";
import IntensityPage from "./components/Pages/Intensity";
import Likelihood from "./components/Pages/Likelihood";
import Region from "./components/Pages/Region";
import Relevance from "./components/Pages/Relevance";
import Year from "./components/Pages/Year";
import City from "./components/Pages/City";
import "./App.css";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import Analytics from "./components/Pages/Analytics";
import { GlobalContext } from "./context";
import FilterComponent from "./components/FilterComponent";

function App() {
  const store = useContext(GlobalContext);
  const { errorDashboard, loading: { loadingDashboard }, records } = store;
  console.log(store, "store");
  console.log("loadingDashboard:", loadingDashboard); // Add this line for debugging

  return (
    <Router>
      <div className="App">
        <NavBar />
        <SearchBar />
        <FilterComponent/>

        {loadingDashboard ? (
          <p id="loading">Please be patient, data loading...</p>
        ) : errorDashboard ? (
          <p id="error">{errorDashboard}</p>
        ) : (
          <>  <Routes>
              <Route path="/" element={<Navigate to="/analytics" />} />
              <Route
                path="/analytics"
                element={<Analytics data={records} />}
              />{" "}
              <Route path="/city" element={<City />} />
              <Route path="/country" element={<Country data={records} />} />
              <Route
                path="/intensity"
                element={<IntensityPage data={records} />}
              />
              <Route
                path="/likelihood"
                element={<Likelihood data={records} />}
              />
              <Route path="/region" element={<Region data={records} />} />
              <Route path="/relevance" element={<Relevance data={records} />} />
              <Route path="/topics" element={<Topics data={records} />} />
              <Route path="/year" element={<Year data={records} />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
