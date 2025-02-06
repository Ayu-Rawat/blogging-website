import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(login(userData));
                navigate("/login");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex justify-center bg-[#000000]">
            <div className="w-full max-w-md  rounded-lg shadow-md p-8">
                <h2 className="text-center text-3xl font-semibold text-[#ffffff]">Sign up to create an account</h2>
                <p className="mt-2 text-center text-sm text-gray-500">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                    >
                        Login
                    </Link>
                </p>
                {error && <p className="mt-4 text-center text-sm text-red-500">{error}</p>}

                <form onSubmit={handleSubmit(create)} className="mt-6 space-y-4">
                    <Input
                        placeholder="Enter your full name"
                        className="border-gray-300 text-gray-900"
                        {...register("name", { required: true })}
                    />
                    <Input
                        placeholder="Enter your email"
                        type="email"
                        className="border-gray-300 text-gray-900"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                            },
                        })}
                    />
                    <Input
                        type="password"
                        placeholder="Enter your password"
                        className="border-gray-300 text-gray-900"
                        {...register("password", { required: true })}
                    />
                    <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white"
                    >
                        Create Account
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
