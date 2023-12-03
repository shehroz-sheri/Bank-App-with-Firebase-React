import React from 'react'
import { Link } from 'react-router-dom'

const ProdSer = () => {
    return (
        <div className='container'>
            <div className='text-center' style={{ marginTop: '80px', marginBottom: '80px' }}>
                <h2 className='mt-5 mb-3'>Products and Services</h2>
                <div className='row' style={{ flexWrap: '' }}>
                    <Link className='text-decoration-none text-black prod-cards rounded py-5 col-md-4'>
                        <div className='mx-2 px-1'>
                            <img className='mb-3' style={{ width: '28%', height: '' }} src={require("../../../assets/images/WBnVOjtIlGWbzyQivuyq.png")} alt="" />
                            <h4>One-stop business access</h4>
                            <p className='text-muted my-1 pt-2' style={{ fontSize: '.9rem' }}>The efficiency of payment, settlement and accounting access products quadruples</p>
                        </div>
                    </Link>
                    <Link className='text-decoration-none text-black prod-cards rounded py-5 col-md-4'>
                        <div className='mx-2 px-1'>
                            <img className='mb-3' style={{ width: '28%', height: 'auto' }} src={require("../../../assets/images/YPMsLQuCEXtuEkmXTTdk.png")} alt="" />
                            <h4>One-stop risk monitoring during events</h4>
                            <p className='text-muted my-1 pt-2' style={{ fontSize: '.9rem' }}>The efficiency of payment, settlement and accounting access products quadruples</p>
                        </div>
                    </Link>
                    <Link className='text-decoration-none text-black prod-cards rounded py-5 col-md-4'>
                        <div className='mx-2 px-1'>
                            <img className='mb-3' style={{ width: '28%', height: 'auto' }} src={require("../../../assets/images/EkXWVvAaFJKCzhMmQYiX.png")} alt="" />
                            <h4>One-stop data operation</h4>
                            <p className='text-muted my-1 pt-2' style={{ fontSize: '.9rem' }}>The efficiency of payment, settlement and accounting access products quadruples</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ProdSer