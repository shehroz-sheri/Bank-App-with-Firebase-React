import React from 'react'
import './Header.scss'
import { CgClose  } from "react-icons/cg";
import { Link } from 'react-router-dom';

const Banner = () => {
    const close = () => {
        var element = document.getElementById("banner");

        element.classList.remove("d-flex");
        element.classList.add("d-none");
    }

    return (
        <div className='d-flex bg-success' id='banner'>
            <div className='text-center text-light w-100 d-flex py-1 mx-3'>
                <p className='w-100 m-0'>Palestine needs your Help! <Link className='text-light' id='donate-btn'>Donate Now</Link>.</p>
                <CgClose onClick={close} className='my-auto' id='banner-close' />
            </div>
        </div>
    )
}

export default Banner