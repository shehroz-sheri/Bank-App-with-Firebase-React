import React from 'react'
import { Link } from 'react-router-dom'

const Services = () => {
    return (
        <div className='py-5'>
            <div className="container py-5">
                <div className="text-center my-4">
                    <h2>Ant Financial Cloud provides professional services</h2>
                    <p className='py-3'>Based on the powerful basic resources of Alibaba Cloud</p>
                </div>
                {/* First Row */}
                <div className="row py-md-5">
                    <div className="col-md-4 py-3 py-md-0">
                        <div className="row">
                            <div className="col-3">
                                <img className='w-75' src="https://zos.alipayobjects.com/rmsportal/ScHBSdwpTkAHZkJ.png" alt="" />
                            </div>
                            <div className="col-9">
                                <Link to={'/'} className='h4 text-decoration-none text-dark'>enterprise resource management</Link>
                                <p className='text-secondary py-2' style={{ fontSize: '.85rem' }}>Centralized orchestration, elastic scaling, continuous release and deployment of cloud resources, high availability and disaster recovery.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 py-3 py-md-0">
                        <div className="row">
                            <div className="col-3">
                                <img className='w-75' src="https://zos.alipayobjects.com/rmsportal/NKBELAOuuKbofDD.png" alt="" />
                            </div>
                            <div className="col-9">
                                <Link to={''} className='h4 text-decoration-none text-dark'>Cloud security</Link>
                                <p className='text-secondary py-2' style={{ fontSize: '.85rem' }}>A complete cloud security system built according to the security requirements of financial enterprises to ensure the security of financial applications and data in all aspects.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 py-3 py-md-0">
                        <div className="row">
                            <div className="col-3">
                                <img className='w-75' src="https://zos.alipayobjects.com/rmsportal/xMSBjgxBhKfyMWX.png" alt="" />
                            </div>
                            <div className="col-9">
                                <Link to={''} className='h4 text-decoration-none text-dark'>Cloud monitoring</Link>
                                <p className='text-secondary py-2' style={{ fontSize: '.85rem' }}>Centralized monitoring of distributed cloud environments, unified resource and application status views, intelligent analysis and fault location.</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Second Row */}
                <div className="row py-md-5">
                    <div className="col-md-4 py-3 py-md-0">
                        <div className="row">
                            <div className="col-3">
                                <img className='w-75' src="https://zos.alipayobjects.com/rmsportal/MNdlBNhmDBLuzqp.png" alt="" />
                            </div>
                            <div className="col-9">
                                <Link to={''} className='h4 text-decoration-none text-dark'>move</Link>
                                <p className='text-secondary py-2' style={{ fontSize: '.85rem' }}>One-stop mobile financial APP development and comprehensive monitoring; rich available components, dynamic release and fault hot repair.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 py-3 py-md-0">
                        <div className="row">
                            <div className="col-3">
                                <img className='w-75' src="https://zos.alipayobjects.com/rmsportal/UsUmoBRyLvkIQeO.png" alt="" />
                            </div>
                            <div className="col-9">
                                <Link to={''} className='h4 text-decoration-none text-dark'>Distributed middleware</Link>
                                <p className='text-secondary py-2' style={{ fontSize: '.85rem' }}>Financial-grade online transaction processing middleware, large-scale distributed computers, and tens of thousands of transactions/second concurrency capabilities strictly ensure the uniformity of transaction data.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 py-3 py-md-0">
                        <div className="row">
                            <div className="col-3">
                                <img className='w-75' src="https://zos.alipayobjects.com/rmsportal/ipwaQLBLflRfUrg.png" alt="" />
                            </div>
                            <div className="col-9">
                                <Link to={''} className='h4 text-decoration-none text-dark'>Big Data</Link>
                                <p className='text-secondary py-2' style={{ fontSize: '.85rem' }}>One-stop, full-cycle big data collaborative work platform, PB-level data processing, and millisecond-level data analysis tools.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services