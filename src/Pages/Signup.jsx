import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createAccount } from "../Redux/Slices/AuthSlice";
import { isEmail, isValidPassword } from "../Helpers/regexMatcher";



function Signup() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [previewImage, setPreviewImage] = useState("");

    const [signupData, setSignupData] = useState({
        fullName: "",
        email: "",
        password: "",
        avatar: ""
    });

    function handleUserInput(e) {
        const {name, value} = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        })
    }

    function getImage(event) {
        event.preventDefault();
        // getting the image
        const uplodedImage = event.target.files[0];

        if (uplodedImage) {
            setSignupData({
                ...signupData,
                avatar: uplodedImage
            });

            const fileReader = new FileReader();
            fileReader.readAsDataURL(uplodedImage);
            fileReader.addEventListener("load", function(){
                setPreviewImage(this.result);
            })

        }

    }

    async function createNewAccount(event) {
        event.preventDefault();
        if (!signupData.email || !signupData.password || !signupData.fullName || !signupData.avatar) {
            toast.error("Please fill all the details");
            return;
        }

        // checking name field length
        if (signupData.fullName.length < 5) {
            toast.error("Name should be atleast of 5 characters")
            return;
        }

        //checking valid email
        if(!isEmail(signupData.email)) {
            toast.error("Invalid email id");
            return;
        }

        //checking password validation
        if (!isValidPassword(signupData.password)) {
            toast.error("Password should be 6 - 16 character long with atleast a number and special character");
            return;
        }

        const formData = new FormData();
        formData.append("fullName", signupData.fullName);
        formData.append("email", signupData.email);
        formData.append("password", signupData.password);
        formData.append("avatar", signupData.avatar);

        // dispatch create account action

        const res = await dispatch(createAccount(formData));
        // console.log(res); if you want to response in inspect
        if(res?.payload?.success)
            navigate("/");

        setSignupData({
            fullName: "",
            email: "",
            password: "",
            avatar: ""
        })
        setPreviewImage("");

    }

    return(
        <HomeLayout>
            <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
                <form noValidate onSubmit={createNewAccount} className="flex flex-col justify-center items-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold">Registartion Page</h1>

                    <label htmlFor="image_uploads" className="cursor-pointer">
                        {previewImage ? (
                            <img className="w-24 h-24 rounded-full m-auto" src={previewImage} />
                        ) : (
                            <BsPersonCircle className="w-24 h-24 rounded-full m-auto"/>
                        )}
                    </label>

                    <input 
                        onChange={getImage}
                        className="hidden"
                        type="file"
                        name="image_uploads"
                        id="image_uploads"
                        accept=".jpg, .jpeg, .png .svg" 
                    />

                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="fullName" className="font-semibold"> Name </label>
                        <input 
                            type="text"
                            required
                            name="fullName"
                            id="fullName"
                            placeholder="Enter your name..."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={signupData.fullName}
                        />
                    </div>

                    

                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="email" className="font-semibold"> Email </label>
                        <input 
                            type="email"
                            required
                            name="email"
                            id="email"
                            placeholder="Enter your email..."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={signupData.email}
                        />
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="password" className="font-semibold"> Password </label>
                        <input 
                            type="password"
                            required
                            name="password"
                            id="password"
                            placeholder="Enter your password..."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={signupData.password}
                        />
                    </div>

                    <button type="submit" className="mt-2 w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out rounded-sm py-2 font-semibold text-lg cursor-pointer">
                        Create account
                    </button>

                    <p>
                        Already have an account ? <Link to="/login" className="link text-accent cursor-pointer" >Login</Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    )
}

export default Signup;