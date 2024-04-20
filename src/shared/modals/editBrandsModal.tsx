import clsx from "clsx";
import React from "react";

export const EditBrandsModal = ({showModal, setShowModal, title, children, onSave, isDisabled}) => {
    return (
        <>
          {showModal ? (
            <>
              <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              >
                <div className="relative w-auto my-6 mx-auto max-w-3xl ">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-dark-border outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-gray-200 dark:border-gray-700  rounded-t">
                      <h3 className="text-3xl font-semibold text-black dark:text-gray-300">
                        {title}
                      </h3>
                    </div>
                    <div className={clsx("relative p-6")}>
                      {children}
                    </div>
                    <div className="flex items-center justify-end px-6 py-2 border-t border-solid border-gray-200 dark:border-gray-700 rounded-b">
                      <button
                        className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        className={clsx("bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150", {
                          'opacity-40': isDisabled
                        })}
                        type="button"
                        disabled={isDisabled}
                        onClick={onSave}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </>
      );
}