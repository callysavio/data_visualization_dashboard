import React from 'react'
import BasicRadarChartD3 from '../Charts/BasicRadarChart'
import IntensityTable from '../Tables/IntensityTable'

function Relevance({data}) {
  return (
    <div className='pages-contaner'>
      <h2 className='main-header'>Analytics and data statistics by relevances</h2>
      <BasicRadarChartD3 data={data} />
      <IntensityTable/>
    </div>
  )
}

export default Relevance
