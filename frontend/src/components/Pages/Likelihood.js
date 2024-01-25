import React from 'react'
import BarChart from '../Charts/LikelihoodBarChart'
import LikelihoodTable from '../Tables/LikelihoodTable'

function Likelihood({data}) {
  return (
    <div className='pages-contaner'>
    <h2 className='main-header'>Likelihood in relationship with other data Analytics and statistics</h2>

      <BarChart data={data} />
      <LikelihoodTable data={data}/>
    </div>
  )
}

export default Likelihood
