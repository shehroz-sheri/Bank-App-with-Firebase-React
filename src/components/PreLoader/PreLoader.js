import React, { useEffect } from "react";
import './PreLoader.scss'
import { preLoaderAnim } from "./index";

const PreLoader = () => {
    useEffect(() => {
        preLoaderAnim();
    }, []);
    return (
        <div className="preloader">
            <div className="texts-container">
                <span>Inspiration, </span>
                <span>Discipline, </span>
                <span>Consistency</span>
            </div>
        </div>
    );
};

export default PreLoader;