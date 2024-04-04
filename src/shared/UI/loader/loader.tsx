import React from "react";
import { Oval } from 'react-loader-spinner';

export const Loader = () => {
    return(
        <div className="w-full h-screen dark:bg-dark-bg flex items-center justify-center">
            <Oval
            height="80"
            width="80"
            color="purple"
            />
        </div>
    )
}