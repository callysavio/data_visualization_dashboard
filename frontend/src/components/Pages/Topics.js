import React from 'react'
import IntensityHeatmap from '../Charts/IntensityHeatmap'
import IntensityHeatmapTable from '../Tables/TopicsTable'

function Topics({data}) {
  return (
    <div className='pages-contaner'>
    <h2 className='main-header'>Analytics and data statistics by Topics</h2>
      <IntensityHeatmap data={data} />
      <IntensityHeatmapTable/>
    </div>
  )
}

export default Topics
