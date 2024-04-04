import { useTheme } from "@/shared/theme-context/theme-context";
import { ROUTES } from "@/shared/constants/routes";
import lightLogo from '@icons/word_logo_light.png';
import darkLogo from '@icons/word_logo_dark.png';
import React from "react";
import { useLogin } from "./useLogin";

export const LoginPage = () => {
    const { theme } = useTheme();
    const {models, commands} = useLogin()
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
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST" noValidate>
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
                                    value={models.loginData.email}
                                    onChange={(e) => commands.handleChangeLoginData('email', e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {models.loginErrors.email && <span className="text-red-500">{models.loginErrors.email}</span>}
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
                                    value={models.loginData.password}
                                    onChange={(e) => commands.handleChangeLoginData('password', e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            {models.loginErrors.password && <span className="text-red-500">{models.loginErrors.password}</span>}
                        </div>

                        <div>
                            <button
                                type="submit"
                                onClick={commands.handleSubmitLogin}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <a href={ROUTES.register.path} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Register
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}