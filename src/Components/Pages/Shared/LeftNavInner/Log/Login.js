import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../Contexts/AuthProvider';

const Login = ({ setIsModal, isModal }) => {

    const {

        register,
        handleSubmit,
        formState: { errors },
        reset,

    } = useForm();

    const [userEmail, setUserEmail] = useState("");
    const [loginError, setLoginError] = useState("");

    const [showPass, setShowPass] = useState(false);

    const { googleUser, loginUser, forgetPasswordEmail } = useContext(AuthContext);

    // const navigate = useNavigate();

    // const location = useLocation();

    // const from = location.state?.from?.pathname || '/';

    const googleProvider = new GoogleAuthProvider();

    const googleHandler = () => {
        googleUser(googleProvider)
            .then((result) => {
                const user = result.user;
                // console.log(user);
                // toast.success("Google Login Successful.");

                saveGoogleUser(user?.displayName, user?.email, user?.photoURL);
            })
            .catch((err) => {
                // console.error(err)
                setLoginError(err.code);
                toast.error(`Error = ${err.message}`);
            });
    };

    const handleLogin = (data) => {

        // console.log(data);

        setLoginError('');

        loginUser(data.email, data.password)
            .then((result) => {
                const user = result.user;
                // console.log(user);
                toast.success("Login Successful");
                reset();
                setUserEmail(null);
                // navigate(from, { replace: true });
            })
            .catch((err) => {
                // console.error(err)
                setLoginError(err.code);

                toast.error(`Login Error..!! = ${err}`);
            });
    };

    const saveGoogleUser = (
        userName,
        userEmail,
        userPhoto,
        university = "",
        address = "",
        Phone = "",
        Birthday = "",
        Gender = "",
    ) => {
        const user = {
            userName,
            userEmail,
            userPhoto,
            university,
            address,
            Phone,
            Birthday,
            Gender,
        };
        fetch("http://localhost:5000/users", {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then(data => {
                console.log('save-user = google', data);
                if (data.acknowledged) {

                    toast.success(`Google Login Successful, 'Email' = ${user.email}`);

                    // navigate(from, { replace: true });
                }

            });
    };

    const handleResetPassword = () => {
        forgetPasswordEmail(userEmail)
            .then(() => {

                setLoginError("");

                toast.success("Your Reset Password Email Sent, Check your Spam folder also.");

                reset();
                setUserEmail('');
            })
            .catch((err) => {
                // console.error(err);
                setLoginError(`Forgot Pass Error = ${err.code}`);

                toast.error(`Forgot Pass Error = ${err.code}`);
            });
        // console.log(userEmail);
    };

    const handleEmail = (e) => {
        // console.log(e.target.value);
        setUserEmail(e.target.value);
    };


    return (
        <section>

            <div className="w-full p-8 space-y-3 rounded-xl  text-blue-600 bg-black">

                <h1 className="text-3xl font-bold text-center">Login</h1>

                {/* <p className="text-center text-lg text-red-600">{loginError}</p> */}

                <div>
                    {
                        loginError &&
                        <p className='text-red-600 font-semibold text-xl'>
                            {loginError}
                        </p>
                    }
                </div>

                <form

                    className="space-y-6 ng-untouched ng-pristine ng-valid"
                    onSubmit={handleSubmit(handleLogin)}
                >

                    {/* Email */}
                    <div className="space-y-1 text-sm">

                        <label htmlFor="email" className="block text-lg text-gray-400">

                            Email

                        </label>

                        <input
                            type="email"

                            {...register("email", {
                                required: "Email is Required",
                            })}

                            id="email"

                            onChange={handleEmail}

                            placeholder="Email"
                            className="w-full px-4 py-3 rounded-md text-lg border-gray-200 focus:outline-none bg-white text-gray-900"
                        />

                        {
                            errors.email && (
                                <p
                                    role="alert"
                                    className="text-red-600 text-[15px] font-semibold"
                                >
                                    {errors.email?.message}
                                </p>
                            )
                        }

                    </div>

                    {/* Password */}
                    <div className="space-y-1 text-sm relative">

                        <label htmlFor="password" className="block text-lg text-gray-400">

                            Password

                        </label>

                        <input

                            type={showPass ? 'text' : "password"}

                            {...register("password", {
                                required: "Password is Required",
                                minLength: {
                                    value: 6,
                                    message: "Password Must be 6 char or longer."
                                }
                            })}

                            id="password"

                            placeholder="Password"
                            className="w-full px-4 py-3 rounded-md text-lg border-gray-200 focus:outline-none bg-white text-gray-900"
                        />

                        <div className="absolute right-2 top-[2.37rem] cursor-pointer bg-black rounded-full p-1 text-white hover:bg-primary hover:text-black"

                            onClick={() => setShowPass(!showPass)}
                        >
                            {
                                showPass ?
                                    <AiFillEye className='h-6 w-6 ' />
                                    :
                                    <AiFillEyeInvisible className='h-6 w-6 ' />
                            }
                        </div>

                        {
                            errors.password && (
                                <p
                                    role="alert"
                                    className="text-red-800 text-[15px] font-semibold"
                                >
                                    {errors.password?.message}
                                </p>
                            )
                        }

                        <div className="flex justify-end text-sm text-gray-800">
                            <span
                                className="cursor-pointer hover:text-blue-800 hover:underline"
                                onClick={handleResetPassword}
                            >
                                Forgot Password?
                            </span>
                        </div>

                    </div>

                    {/* <input
                        value="Login"
                        type="submit"
                        className="block w-full p-3 cursor-pointer text-center rounded-sm text-lg text-gray-900 bg-violet-400"
                    /> */}

                    <button className="block w-full p-3 text-center text-white bg-info rounded-lg font-medium hover:text-black hover:bg-blue-500 duration-1000">Login</button>

                </form>


                <div className="flex items-center pt-4 space-x-1">

                    <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>

                    <p className="px-3 text-md text-gray-800">
                        Login with social accounts
                    </p>

                    <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>

                </div>

                <div className="my-6 space-y-4">

                    <button
                        aria-label="Login with Google"
                        type="button"
                        className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md hover:bg-gray-800 transition-colors duration-700 hover:text-gray-200 border-gray-800"

                        onClick={googleHandler}
                    >

                        <FaGoogle className='text-3xl' />

                        <p>Login with Google</p>

                    </button>

                </div>

                <p className="text-sm text-center sm:px-6 text-gray-500">
                    Don't have an account?

                    <span

                        className="underline text-gray-800 cursor-pointer"
                        onClick={() => setIsModal(!isModal)}
                    >
                        Sign Up
                    </span>

                </p>

            </div>

        </section>
    );
};

export default Login;


