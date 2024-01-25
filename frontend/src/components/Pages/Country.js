import React from 'react'
import CountryBarChart from '../Charts/CountryBarChart'
import CountryTable from '../Tables/CountryTable'
function Country({data}) {
  return (
    <div className='pages-contaner'>
      <h2 className='main-header'>Country Analytics and data statistics</h2>
      <CountryBarChart data={data} />
      <CountryTable data={data}/>
    </div>
  )
}

export default Country
