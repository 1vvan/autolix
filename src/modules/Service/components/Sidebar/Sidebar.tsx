import clsx from 'clsx';
import React from 'react';
import { clientServicePages } from '../../pages';

const Sidebar = ({selectedPage, setSelectedPage}) => {
    return (
        <div className='w-1/5 flex flex-col gap-4 h-lvh py-20 border-r border-dark-border absolute top-0 left-0'>
            {clientServicePages.map((page) => (
                <div 
                    className={clsx(
                        'cursor-pointer px-12 py-3 border-b-2 border-transparent md:hover:bg-violet_light md:hover:dark:bg-violet_light md:hover:text-violet_light transition-all duration-300 hover:dark:bg-gray-800 text-center',
                        {
                            "font-sf-pro font-bold md:border-violet_light text-black md:text-violet_light  dark:text-white md:hover:text-white":
                            selectedPage === page.id,
                            "font-sf-pro text-black md:text-gray400 md:hover:text-white dark:text-gray-500":
                            selectedPage !== page.id,
                        }
                    )}
                    key={page.id}
                    onClick={() => setSelectedPage(page.id)}
                >
                    {page.label}
                </div>
            ))}
        </div>
    );
}

export default Sidebar;
