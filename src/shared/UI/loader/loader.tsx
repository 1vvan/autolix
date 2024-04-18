import clsx from "clsx";
import React from "react";
import { Oval } from 'react-loader-spinner';

interface LoaderProps {
    isFull?: boolean
}

export const Loader: React.FC<LoaderProps> = ({isFull = false}) => {
    return(
        <div className={clsx("w-full dark:bg-dark-bg flex items-center justify-center", {
            'h-screen': isFull
        })}>
            <Oval
            height="80"
            width="80"
            color="purple"
            />
        </div>
    )
}