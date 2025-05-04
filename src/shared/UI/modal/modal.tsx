import clsx from "clsx";
import React from "react";
import { Loader } from "../loader/loader";

interface ModalProps {
  showModal: boolean;
  setShowModal: (boolean) => void;
  title: string;
  onSave?: (any) => void;
  bodyClassNames: string;
  isDisabledSave?: boolean; 
  isLoading?: boolean;
  isShowSave?: boolean;
  width?: string;
}

export const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({ showModal, setShowModal, title, children, onSave = () => {}, bodyClassNames, isDisabledSave, isLoading, isShowSave = true, width = 'w-auto' }) => {
  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className={`relative ${width} my-6 mx-auto`}>
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-dark-border outline-none focus:outline-none">
                <div className="flex items-start justify-between gap-5 p-5 border-b border-solid border-gray-200 dark:border-gray-700  rounded-t">
                  <h3 className="text-3xl font-semibold text-black dark:text-gray-300">
                    {title}
                  </h3>
                  {isLoading && <Loader/>}
                </div>
                <div className={clsx("relative p-6", bodyClassNames)}>
                  {children}
                </div>
                <div className="flex items-center justify-end gap-4 px-6 py-2 border-t border-solid border-gray-200 dark:border-gray-700 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase py-2 text-sm outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  {isShowSave && (
                    <button
                      className={clsx("bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150", {
                        'opacity-50': isDisabledSave
                      })}
                      disabled={isDisabledSave}
                      type="button"
                      onClick={onSave}
                    >
                      Save
                    </button>
                  )}
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