import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../Contexts/AuthProvider';
import Loading from '../../Loader/Loading2';

const Register = ({ setIsModal, isModal }) => {

    const {

        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,

    } = useForm();

    const [showPass1, setShowPass1] = useState(false);
    const [showPass2, setShowPass2] = useState(false);

    const [signUpError, setSignUpError] = useState('');

    const [loading, setLoading] = useState(null);

    // const navigate = useNavigate();

    const imgbb = process.env.REACT_APP_imagebbAPI;

    const { createUser, updateUser, verifyUser } =
        useContext(AuthContext);


    const handleSignUp = (data) => {

        // console.log(data);

        setSignUpError('');

        if (data.password !== data.confirm) {
            setSignUpError("Password Doesn't match");
            toast.error(`Error = Your Password didn't match.`);
            alert("Password Doesn't match");
            return;
        }

        const image = data.photo[0];
        // console.log(image);
        const formData = new FormData();
        formData.append("image", image);
        // console.log(formData);
        const url = `https://api.imgbb.com/1/upload?key=${imgbb}`;
        fetch(url, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then((imgbb) => {

                //   console.log(imgbb);

                if (imgbb.success) {

                    createUser(data.email, data.password)
                        .then((result) => {
                            const user = result.user;
                            //   console.log(user);

                            setLoading(false);

                            const userInfo = {
                                displayName: data.name,
                                photoURL: imgbb.data.url,
                            };
                            updateUser(userInfo)
                                .then((result) => {

                                    //   console.log(userInfo);
                                    // toast.success("Account Created Successfully.");

                                    verifyUser().then(() => {
                                        saveUser(data.name, data.email, userInfo.photoURL);

                                        // toast.success("Verify Email sent, Check your Spam folder also.");
                                    });

                                    // reset();
                                })
                                .catch(err => console.error('UpdateProfile Error = ', err));
                        })
                        .catch(error => {
                            console.error('Error = ', error);

                            const errorCode = error.code;
                            const errorMessage = error.message;

                            console.error(' errorCode = ', errorCode,
                                '\n',
                                ' errorMessage = ', errorMessage);

                            toast.error(`Sign Up Error..!! = ${error}`);
                            setSignUpError(error.message);
                            setLoading(false);
                        });
                }
            });
    };

    const saveUser = (
        userName,
        userEmail,
        userPhoto,
        university = "",
        address = "",
        Phone = "",
        Birthday = "",
        Gender = ""
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
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then(data => {
                console.log('save-user', data);


                console.log('Update User Profile Successful');

                reset();

                toast.success(`Registration Successful, 'Email' = ${data.email}`);

                toast(`Update User Profile Successful, 'Name' = ${data.name} .. Please, Reload..`);

                // navigate('/');
            })
    };

    return (
        <section>

            {
                loading && <Loading />
            }

            <div className="w-full p-8 space-y-3 rounded-xl  text-gray-800">

                <h1 className="text-3xl font-bold text-center">Register</h1>

                {
                    signUpError &&
                    <p className='text-red-600 font-semibold text-xl'>
                        {signUpError}
                    </p>
                }


                <form
                    onSubmit={handleSubmit(handleSignUp)}
                    className="space-y-6 ng-untouched ng-pristine ng-valid"
                >

                    {/* Name */}
                    <div className="space-y-1 text-sm">

                        <label htmlFor="Name" className="block text-lg text-gray-400">
                            Name
                        </label>

                        <input
                            type="text"

                            {...register("name", { required: "Name is Required" })}

                            id="Name"

                            placeholder="Name"
                            className="w-full px-4 py-3 rounded-md text-lg border-gray-200 focus:outline-none bg-white text-gray-900"
                        />

                        {
                            errors.name && (
                                <p
                                    role="alert"
                                    className="text-red-800 text-[15px] font-semibold"
                                >
                                    {errors.name?.message}
                                </p>
                            )
                        }

                    </div>

                    {/* imgbb photoURL */}
                    <div className="space-y-1 text-sm">

                        <label htmlFor="photo" className="block text-lg text-gray-400">
                            Photo
                        </label>

                        <input
                            type="file"

                            {...register("photo", { required: "Image is Required" })}

                            id="photo"

                            className="file-input bg-white file-input-bordered file-input-ghost w-full"
                        />

                        {
                            errors.photo && (
                                <p
                                    role="alert"
                                    className="text-red-800 text-[15px] font-semibold"
                                >
                                    {errors.photo?.message}
                                </p>
                            )
                        }

                    </div>

                    {/* Email */}
                    <div className="space-y-1 text-sm">

                        <label htmlFor="email" className="block text-lg text-gray-400">
                            Email
                        </label>

                        <input
                            type="email"

                            {...register("email", { required: "Email is Required" })}

                            id="email"

                            placeholder="email"
                            className="w-full px-4 py-3 rounded-md text-lg border-gray-200 focus:outline-none bg-white text-gray-900"
                        />

                        {
                            errors.email && (
                                <p
                                    role="alert"
                                    className="text-red-800 text-[15px] font-semibold"
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
                            type={showPass1 ? 'text' : "password"}

                            {...register("password", {
                                required: "Password Is Required",
                                minLength: {
                                    value: 6,
                                    message: 'Password Must be 6 char or longer...'
                                },
                            })}

                            id="password"

                            placeholder="password"
                            className="w-full px-4 py-3 rounded-md text-lg border-gray-200 focus:outline-none bg-white text-gray-900"
                        />

                        <div className="absolute right-2 top-[2.37rem] cursor-pointer bg-black rounded-full p-1 text-white hover:bg-primary hover:text-black"

                            onClick={() => setShowPass1(!showPass1)}
                        >
                            {
                                showPass1 ?
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

                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-1 relative">

                        <label htmlFor="confirm" className="block text-black text-start font-semibold text-xl">Confirm Password</label>

                        <input

                            {...register("confirm", {
                                required: "Confirm Password is required",


                                validate: (val) => {
                                    if (watch('password') !== val) {
                                        return "Passwords Doesn't Match";
                                    }
                                },


                            })}

                            type={showPass2 ? 'text' : "password"}

                            name="confirm" id="confirm" placeholder="Confirm Password" className="w-full px-4 py-3 rounded-md outline-info bg-blue-100  text-black font-medium text-lg placeholder:text-info placeholder:font-medium placeholder:italic" />


                        <div className="absolute right-2 top-[2.37rem] cursor-pointer bg-black rounded-full p-1 text-white hover:bg-primary hover:text-black"

                            onClick={() => setShowPass2(!showPass2)}
                        >
                            {
                                showPass2 ?
                                    <AiFillEye className='h-6 w-6 ' />
                                    :
                                    <AiFillEyeInvisible className='h-6 w-6 ' />
                            }
                        </div>


                        {
                            errors.confirm &&
                            <p role="alert" className='text-red-600'>
                                {errors.confirm?.message}
                            </p>
                        }


                    </div>

                    {/* <button className="block w-full p-3 text-center rounded-sm text-lg text-gray-900 bg-violet-400 modal-action">
                        Sign Up
                    </button> */}

                    <button

                        className="disabled:bg-neutral block w-full p-3 text-center text-white bg-info rounded-lg font-medium hover:text-black hover:bg-blue-500 duration-1000">
                        Sign Up
                    </button>

                </form>

                <p className="text-sm text-center sm:px-6 text-gray-500">
                    Already have an account?

                    <span

                        className="underline text-gray-800 cursor-pointer"
                        onClick={() => setIsModal(!isModal)}
                    >
                        Sign In
                    </span>

                </p>

            </div>

        </section>
    );
};

export default Register;


