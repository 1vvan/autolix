import clsx from "clsx";
import React from "react";
import { Oval } from 'react-loader-spinner';

interface LoaderProps {
    isFull?: boolean
}

export const Loader: React.FC<LoaderProps> = ({isFull = false}) => {
    return(
        <div className={clsx("flex items-center justify-center", {
            'h-screen dark:bg-dark-bg w-full': isFull
        })}>
            <Oval
            height={isFull ? "80" : '32'}
            width={isFull ? "80" : '32'}
            color="purple"
            />
        </div>
    )
}