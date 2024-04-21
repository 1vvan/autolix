import { useTheme } from "@/shared/theme-context/theme-context";
import { ROUTES } from "@/shared/constants/routes";
import lightLogo from '@icons/word_logo_light.png';
import darkLogo from '@icons/word_logo_dark.png';
import React from "react";
import { useRegister } from "./useRegister";

export const RegisterPage = () => {
    const { theme } = useTheme();
    const {models, commands} = useRegister()
    return (
        <>
            <div className="w-full flex min-h-screen flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8 dark:bg-dark-bg">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    {theme === "light" ? (
                            <img className="mx-auto h-10 w-auto" src={lightLogo} alt=""/>
                        ) : (
                            <img className="mx-auto h-10 w-auto" src={darkLogo} alt=""/>
                    )}
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-200">
                        Create account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST" noValidate>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                                    Full Name
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="full_name"
                                    name="full_name"
                                    type="text"
                                    autoComplete="current-full_name"
                                    value={models.registerData.full_name}
                                    onChange={(e) => commands.handleChangeRegData('full_name', e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {models.regErrors.full_name && <span className="text-red-500">{models.regErrors.full_name}</span>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={models.registerData.email}
                                    onChange={(e) => commands.handleChangeRegData('email', e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {models.regErrors.email && <span className="text-red-500">{models.regErrors.email}</span>}
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={models.registerData.password}
                                    onChange={(e) => commands.handleChangeRegData('password', e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {models.regErrors.password && <span className="text-red-500">{models.regErrors.password}</span>}
                        </div>

                        <div>
                            <button
                                type="submit"
                                onClick={commands.handleSubmitReg}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already a member?{' '}
                        <a href={ROUTES.login.path} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}