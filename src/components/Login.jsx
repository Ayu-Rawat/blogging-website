import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <div className="mb-6 flex justify-center">
                    <Logo width="80px" />
                </div>
                <h2 className="text-center text-3xl font-semibold text-gray-900">Sign in to your account</h2>
                <p className="mt-2 text-center text-sm text-gray-500">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-blue-600 hover:text-blue-500"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="mt-4 text-center text-sm text-red-500">{error}</p>}
                <form onSubmit={handleSubmit(login)} className="mt-6 space-y-4">
                    <Input
                        placeholder="Enter your email"
                        type="email"
                        className="border-gray-300 text-gray-900"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be valid",
                            },
                        })}
                    />
                    <Input
                        type="password"
                        placeholder="Enter your password"
                        className="border-gray-300 text-gray-900"
                        {...register("password", {
                            required: true,
                        })}
                    />
                    <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white"
                    >
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Login;
