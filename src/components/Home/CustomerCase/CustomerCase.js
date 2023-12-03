import React from 'react'
import './CustomerCase.scss'

const CustomerCase = () => {
    return (
        <div className='m-0 py-5' id='customer-case-bg'>
            <div className="mx-4 mx-md-5 py-5">
                <div className='text-center pt-3'>
                    <h2>Customer Case</h2>
                    <p>Here, use a paragraph to introduce the case of the service.</p>
                </div>
                <div className='row pb-2 pt-5'>
                    <div className="col-md-3 my-2 my-md-0">
                        <div className="card p-2">
                            <img src={require('../../../assets/images/Screenshot 2023-11-14 161929.png')} className="card-img-top rounded-0" alt="..." />
                            <div className="card-body text-center py-2">
                                <p className="card-title p-0 m-0">Meezan Bank</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 my-2 my-md-0">
                        <div className="card p-2">

                            <img src={require('../../../assets/images/Screenshot 2023-11-14 165329.png')} className="card-img-top rounded-0" alt="..." />
                            <div className="card-body text-center py-2">
                                <p className="card-title p-0 m-0">Meezan Bank</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 my-2 my-md-0">
                        <div className="card p-2">
                            <img src={require('../../../assets/images/Screenshot 2023-11-14 161929.png')} className="card-img-top rounded-0" alt="..." />
                            <div className="card-body text-center py-2">
                                <p className="card-title p-0 m-0">Meezan Bank</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 my-2 my-md-0">
                        <div className="card p-2">
                            <img src={require('../../../assets/images/Screenshot 2023-11-14 165329.png')} className="card-img-top rounded-0" alt="..." />
                            <div className="card-body text-center py-2">
                                <p className="card-title p-0 m-0">Meezan Bank</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Second Row */}
                <div className='row pb-5 pt-2'>
                    <div className="col-md-3 my-2 my-md-0">
                        <div className="card p-2">
                            <img src={require('../../../assets/images/Screenshot 2023-11-14 161929.png')} className="card-img-top rounded-0" alt="..." />
                            <div className="card-body text-center py-2">
                                <p className="card-title p-0 m-0">Meezan Bank</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 my-2 my-md-0">
                        <div className="card p-2">
                            <img src={require('../../../assets/images/Screenshot 2023-11-14 165329.png')} className="card-img-top rounded-0" alt="..." />
                            <div className="card-body text-center py-2">
                                <p className="card-title p-0 m-0">Meezan Bank</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 my-2 my-md-0">
                        <div className="card p-2">
                            <img src={require('../../../assets/images/Screenshot 2023-11-14 161929.png')} className="card-img-top rounded-0" alt="..." />
                            <div className="card-body text-center py-2">
                                <p className="card-title p-0 m-0">Meezan Bank</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 my-2 my-md-0">
                        <div className="card p-2">
                            <img src={require('../../../assets/images/Screenshot 2023-11-14 165329.png')} className="card-img-top rounded-0" alt="..." />
                            <div className="card-body text-center py-2">
                                <p className="card-title p-0 m-0">Meezan Bank</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerCase