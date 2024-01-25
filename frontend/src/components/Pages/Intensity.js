import React from 'react'
import MultiXAxesChart from '../Charts/MultiXAxesChart'
import IntensityAnalysis from '../Charts/IntensityAnalysis'
import ScatterPlotMatrix from '../Charts/PlotScatter'

function IntensityPage({ data }) {
  return (
    <div className='pages-contaner'>
      <h2 className='main-header'>Intensity Analytics and data statistics</h2>

      <IntensityAnalysis data={data} />
      <MultiXAxesChart data={data} />
      <ScatterPlotMatrix  data={data}/>
    </div>
  )
}

export default IntensityPage
