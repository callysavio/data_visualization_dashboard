import React from "react";
import IntensityDistributionChart from "../Charts/IntensityDistributionChart";
import BarChart from "../Charts/BarChart";
import CountryChart from "../Charts/CountryChart";
import RelevanceLikelihood from "../Charts/RelevanceLikelihood";
import EnvironmentalRadarChart from "../Charts/EnvironmentalRadarChart";

function Analytics({ data }) {
  return (
    <>
      <div className="charts-container">
        <h2 className="main-header">Key genaral Analytics and data statistics</h2>
        <div className="chart" id="intensity-by-sector">
          <h3>Intensity distribution by sector</h3>
          <IntensityDistributionChart data={data} />
        </div>

        <div className="chart">
          <h3>Intensity of some topics in Energy Sector</h3>
          <BarChart data={data} />
        </div>

        <div className="chart">
          <h3>Energy Sector Topics Distribution (USA)</h3>
          <CountryChart data={data} />
        </div>

        <div className="chart">
          <h3>
            Polymerization will remain top 3 end-users in the global n-Hexane
            Market. Relevance vs Likelihood
          </h3>
          <RelevanceLikelihood data={data} />
        </div>

        <div className="chart">
          <h3>Environmental RadarChart</h3>
          <EnvironmentalRadarChart data={data} />
        </div>
      </div>
    </>
  );
}

export default Analytics;
