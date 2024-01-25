import React from 'react'
import YearLineChart from '../Charts/YearLineChart'
import YearStatisticsTable from '../Tables/YearTable'

function Year({data}) {
  return (
    <div className='pages-contaner'>
      <h2 className='main-header'>Analytics and data statistics by Year</h2>
      <YearLineChart data={data} />
      <YearStatisticsTable data={data} />
    </div>
  )
}

export default Year
