import React from 'react'
import Header from '../components/Header'
import BestSeller from '../components/BestSeller'
import LatestCollection from '../components/LatestCollection'

const Home = () => {
  return (
    <div>
      <Header/>
      <BestSeller/>
      <LatestCollection/>
    </div>
  )
}

export default Home