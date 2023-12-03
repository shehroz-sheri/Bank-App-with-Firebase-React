import React from 'react'
import { Link } from 'react-router-dom'

const Page404 = () => {
    return (
        <div className='d-flex align-items-center bg-dark py-5' style={{height: '80vh'}}>
            <div className='mx-auto text-light'>
                <h1 style={{ fontSize: '6rem' }}>404</h1>
                <strong style={{ fontSize: '1.2rem' }}>Oops! This Page Could Not Be Found</strong>
                <p className='text-secondary fs-6' style={{ maxWidth: '35rem' }}>Sorry but the page you are looking for does not exist, have been removed, name changed or is temporarily unavailable.</p>
                <Link className="btn btn-outline-info px-4 btn-sm" to={'/'}>Go to Home</Link>
            </div>
        </div>
    )
}

export default Page404