import React from 'react'
import RegionBubbleChart from '../Charts/RegionBubbleChart'
import RegionDataTable from '../Tables/RegionsTable'

function Region({data}) {
  return (
    <div className='pages-contaner'>
      <h2 className='main-header'> Analytics and data statistics by region</h2>
      <RegionBubbleChart data={data} />
      <RegionDataTable/>
    </div>
  )
}

export default Region
