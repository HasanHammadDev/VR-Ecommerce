import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { RegisterAccount } from '../../Utility/api';
RegisterAccount

interface Inputs {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface PasswordCriteria {
    minLength: boolean;
    hasUpperCase: boolean;
    hasLowerCase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
}

interface RegisterResponse {
    success: boolean;
    message: string;
}

const Checkmark: React.FC<{ isVisible: boolean }> = ({ isVisible }) => (
    <svg
        className={`w-5 h-5 text-green-500 transition-transform transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
        ></path>
    </svg>
);

const Register: React.FC = () => {
    const navigate = useNavigate();
    const loginRoute: string = '/login';
    const [inputs, setInputs] = useState<Inputs>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errorMsg, setErrorMsg] = useState<string>('');
    const [passwordCriteria, setPasswordCriteria] = useState<PasswordCriteria>({
        minLength: false,
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
    });

    const handleChange = (name: keyof Inputs, value: string) => {
        setInputs(prevInputs => ({ ...prevInputs, [name]: value }));

        if (name === 'password') {
            setPasswordCriteria({
                minLength: value.length >= 8,
                hasUpperCase: /[A-Z]/.test(value),
                hasLowerCase: /[a-z]/.test(value),
                hasNumber: /[0-9]/.test(value),
                hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
            });
        }
    };

    const validatePassword = () => {
        return (
            passwordCriteria.minLength &&
            passwordCriteria.hasUpperCase &&
            passwordCriteria.hasLowerCase &&
            passwordCriteria.hasNumber &&
            passwordCriteria.hasSpecialChar
        );
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            if (!inputs.username || !inputs.email || !inputs.password || !inputs.confirmPassword) {
                setErrorMsg('All fields are required.');
                return;
            }
            const response: RegisterResponse = await RegisterAccount(inputs);
            if (!validatePassword()) {
                setErrorMsg('Password must meet all criteria.');
            } else if (inputs.password !== inputs.confirmPassword) {
                setErrorMsg('Passwords do not match.');
            } else if (!response.success) {
                setErrorMsg(response.message);
            } else {
                setErrorMsg('Account registered successfully. Redirecting to home page...');

                setTimeout(() => {
                    navigate('/');
                }, 2500);
            }
        } catch (error) {
            console.error('Registration error', error);
            setErrorMsg('Registration error, please try again!')
        }
    };

    return (
        <>
            <div className="bg-white min-h-screen flex items-center justify-center p-4">
                <form
                    className="bg-white shadow-xl flex flex-col border border-slate-700 rounded-lg p-8 w-full max-w-md"
                    onSubmit={handleSubmit}
                >
                    <div className="mb-4">
                        <label className="mb-2 text-gray-700 block" htmlFor="formBasicUsername">
                            Username <b>*</b>
                        </label>
                        <input
                            id="formBasicUsername"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('username', e.target.value)}
                            type="text"
                            placeholder="Enter Username"
                            value={inputs.username}
                            className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 text-gray-700 block" htmlFor="formBasicEmail">
                            Email <b>*</b>
                        </label>
                        <input
                            id="formBasicEmail"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('email', e.target.value)}
                            type="email"
                            placeholder="Enter Email"
                            value={inputs.email}
                            className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 text-gray-700 block" htmlFor="formBasicPassword">
                            Password <b>*</b>
                        </label>
                        <input
                            id="formBasicPassword"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('password', e.target.value)}
                            type="password"
                            placeholder="Enter Password"
                            value={inputs.password}
                            className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 text-gray-700 block" htmlFor="formBasicConfirmPassword">
                            Confirm Password <b>*</b>
                        </label>
                        <input
                            id="formBasicConfirmPassword"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('confirmPassword', e.target.value)}
                            type="password"
                            placeholder="Confirm Password"
                            value={inputs.confirmPassword}
                            className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-2">
                        <ul className="text-gray-600 flex flex-col items-start space-y-1">
                            <li className="flex items-center">
                                <Checkmark isVisible={passwordCriteria.minLength} />
                                <span className="ml-2">At least 8 characters</span>
                            </li>
                            <li className="flex items-center">
                                <Checkmark isVisible={passwordCriteria.hasUpperCase} />
                                <span className="ml-2">At least one uppercase letter</span>
                            </li>
                            <li className="flex items-center">
                                <Checkmark isVisible={passwordCriteria.hasLowerCase} />
                                <span className="ml-2">At least one lowercase letter</span>
                            </li>
                            <li className="flex items-center">
                                <Checkmark isVisible={passwordCriteria.hasNumber} />
                                <span className="ml-2">At least one number</span>
                            </li>
                            <li className="flex items-center">
                                <Checkmark isVisible={passwordCriteria.hasSpecialChar} />
                                <span className="ml-2">At least one special character</span>
                            </li>
                        </ul>
                    </div>

                    {errorMsg && (
                        <div className="text-red-500 mb-1 font-semibold text-center">
                            {errorMsg}
                        </div>
                    )}

                    <button
                        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
                        type="submit"
                    >
                        Register
                    </button>

                    <p className="text-gray-600 text-center mt-3">
                        Already have an account?{" "}
                        <Link to={loginRoute} className="text-blue-500 hover:text-blue-900 underline">
                            Back To Login
                        </Link>
                    </p>
                </form>
            </div>
        </>

    );
};

export default Register;
