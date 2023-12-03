import React from 'react'
import Hero from '../../components/Home/Hero'
import ProdSer from '../../components/Home/ProdSer/ProdSer'
import CustomerCase from '../../components/Home/CustomerCase/CustomerCase'
import Services from '../../components/Home/Services/Services'

const Home = () => {
    return (
        <>
            <Hero />
            <ProdSer />
            <CustomerCase />
            <Services />
        </>
    )
}

export default Home