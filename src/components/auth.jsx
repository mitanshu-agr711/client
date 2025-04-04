import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import login from "<div className="" />login.png"
const customer = ["New Customer", "Already Account"];

export default function CustomerInformation() {
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedElement, setSelectedElement] = useState("New Customer");
    const [formData, setFormData] = useState({
       
        userName: "",
        email: "",
        password: "",
    });
   
    // const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleOnClick = async () => {
        if (
            !formData.email ||
            !formData.password ||
            (selectedElement === "New Customer" && (!formData.firstName || !formData.secondName))
        ) {
            setErrorMessage("Please fill all required fields!");
            return;
        }
        setErrorMessage('');
        // API call code commented out
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
            <div className="justify-center items-center border-0 rounded-2xl p-0 w-auto h-auto md:w-4/5 lg:w-3/5 md:h-4/5 shadow-2xl bg-white overflow-hidden">
                <div className="flex w-full h-full justify-between">
                    <div className="w-1/2 hidden md:block bg-gradient-to-br from-blue-500 to-indigo-600">
                        <div className="h-full justify-center items-center flex-col flex space-y-8 p-8 text-white">
                            <img src='./login' alt="Logo" className="w-1/2 h-auto drop-shadow-lg" />
                            <h2 className="text-2xl font-bold text-center">Welcome Back!</h2>
                            <p className="text-center text-blue-100">Secure your account and manage your bookings with ease.</p>
                            <div className="w-full flex justify-center">
                                <div className="h-1 w-20 bg-blue-200 rounded-full"></div>
                            </div>
                            <div className="mt-4 bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                                <p className="italic text-sm">"The best experience for managing my bookings. Simple and efficient!"</p>
                                <p className="text-right mt-2 font-semibold">- Happy Customer</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 p-8 rounded-lg">
                        <div className="flex justify-center items-center mb-8">
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Customer Information
                            </h1>
                        </div>
                        
                        <div className="bg-gray-100 rounded-xl p-2 mb-8">
                            <ul className="flex justify-center items-center space-x-2 text-lg">
                                {customer.map((item) => (
                                    <li
                                        key={item}
                                        className={`p-3 rounded-lg cursor-pointer transition-all duration-300 w-1/2 text-center ${
                                            selectedElement === item
                                                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md transform scale-105"
                                                : "hover:bg-gray-200 text-gray-700"
                                        }`}
                                        onClick={() => setSelectedElement(item)}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-6 space-y-5">
                            {selectedElement === "New Customer" && (
                                <div className="grid grid-cols-2 gap-4">
                                   
                                    <input
                                        type="text"
                                        name="userName"
                                        placeholder="username"
                                        value={formData.userName}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                    />
                                </div>
                            )}
                            
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                />
                            </div>
                            
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                />
                            </div>
                            
                            {errorMessage && (
                                <div className="text-red-500 text-center bg-red-50 p-3 rounded-lg border border-red-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errorMessage}
                                </div>
                            )}
                            
                            <button
                                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform transition-all duration-300 hover:scale-105 shadow-lg"
                                onClick={handleOnClick}
                            >
                                {selectedElement === "New Customer" ? "Create Account" : "Sign In"}
                            </button>
                            
                            <div className="text-center text-gray-500 mt-4">
                                {selectedElement === "New Customer" ? 
                                    <p>By signing up, you agree to our <a href="#" className="text-blue-500 hover:underline">Terms of Service</a></p> :
                                    <p><a href="#" className="text-blue-500 hover:underline">Forgot your password?</a></p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
