import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postToAPI } from "../utils/postToAPI.ts";

function Login({ setLoginInfo }: { setLoginInfo: React.Dispatch<React.SetStateAction<UserLogin | null>> }) {
    const [userName, setUserName] = useState<string | undefined>(undefined);
    const [userPassword, setUserPassword] = useState<string | undefined>(undefined);
    const nav = useNavigate();

    const handleSubmit = async (e: any): Promise<undefined> => {
        e.preventDefault();
        console.log(userName);
        console.log(userPassword);
      postToAPI("login/", {"username": userName, "password": userPassword}).then(data => {
            console.log(data)
            if (data == "Success"){
                setLoginInfo({
                    name: userName,
                    userName: userName,
                    photo: userPassword,
                });
            localStorage.setItem('loginInfo', JSON.stringify({
                    name: userName,
                    userName: userName,
                    photo: userPassword,
                }))
                nav('/')
            } else{
                    alert(data)
                }
          })
    }
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-auto w-auto relative bottom-20"
                        src="https://i.ibb.co/4TbbVBw/Can-1-removebg-preview.png"
                        alt="Inventory Management"
                    />
                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 relative bottom-40">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm relative bottom-40">
                    <form className="space-y-6" onSubmit={handleSubmit}>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e: React.ChangeEvent<any>) => setUserName(e.target.value)}
                                />
                            </div>
                        </div>


                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e: React.ChangeEvent<any>) => setUserPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Login */}
                        <div className="relative">
                            <button
                                type="submit"
                                className="flex w-1/2 justify-center rounded-md bg-indigo-600 px-2 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>


                </div>
            </div>
        </>
    )
}

export default Login;
