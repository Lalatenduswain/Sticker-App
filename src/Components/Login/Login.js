import React, { useState } from "react";
import getURL from "../../utils/fetchURL";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import GoogleLogin from "react-google-login";
import Loader from "../Loader/loader";
import { useForm } from "react-hook-form";

function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [user, setUser] = useState({
        emailId: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState();
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();
    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
    };
    const responseGoogle = async (response) => {
        const url = getURL(window.location.hostname);
        setLoading(true);
        const res = await fetch(`${url}/auth/googleSignin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tokenId: response.tokenId,
            }),
        });
        const data = await res.json();
        setLoading(false);
        // console.log(res.status);
        if (res.status === 201) {
            swal({
                title: "Login failed!!!",
                text: "You haven't created the account , Please register first.",
                icon: "error",
                button: "Register here",
            });
            //console.log("registration successful");
            navigate("/register");
        } else if (res.status === 200) {
            swal({
                title: "Good job!",
                text: "You have been logged in successfully",
                icon: "success",
                button: "Continue",
            });
            navigate("/profile");
            localStorage.setItem("Authorization-Token", data.token);
        } else {
            swal({
                title: "Error Occured!!!",
                text: "Not able to register your account",
                icon: "error",
                button: "Continue",
            });
            navigate("/");
        }
    };
    const forgotPassword = async (e) => {
        e.preventDefault();
        const url = getURL(window.location.hostname);
        await fetch(`${url}/auth/recover`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
            }),
        }).then(async (res) => {
            const data = await res.json();
            if (res.status === 200) {
                swal({
                    title: "Good job!",
                    text: `${data.message}`,
                    icon: "success",
                    button: "Continue",
                });
            } else {
                swal({
                    title: "Error Occured",
                    text: "Please Provide An Email!",
                    icon: "error",
                    button: "Continue",
                });
            }
        });
    };
    const PostData = async (e) => {
        e.preventDefault();
        console.log("Submit")
        const { emailId, password } = user;
        const url = getURL(window.location.hostname);
        setLoading(true);
        const res = await fetch(`${url}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                emailId,
                password,
            }),
        });
        const data = await res.json();
        setLoading(false);
        console.log(data);
        if (res.status === 200) {
            swal({
                title: "Good job!",
                text: "You have logged in successfully",
                icon: "success",
                button: "Continue",
            });
            if (data.user.role === "admin") {
                navigate("/admin/AllCampaigns");
            } else {
                navigate("/profile");
            }
            localStorage.setItem("Authorization-Token", data.token);
        } else if (res.status === 401 || res.status === 500) {
            navigate("/login");
            swal({
                title: "Error Occured",
                text: `${data.message}`,
                icon: "error",
                button: "Continue",
            });
        } else {
            navigate("/login");
            swal({
                title: "Error Occured",
                text: "Please provide email and password",
                icon: "error",
                button: "Continue",
            });
        }
    };

    return (
        <>
            <div>
                {loading ? (
                    <div>
                        <Loader />
                    </div>
                ) : (
                    <div>
                        <div class="login__page">
                            <div class="right__content">
                            </div>
                            <div class="left__content">
                                <div class="title">
                                    <h1>Login</h1>
                                </div>
                                <div class="signin__options">
                                    <GoogleLogin
                                        clientId="657719004738-cr0uqumrit7g29ba8vrmpb32sj7oal6d.apps.googleusercontent.com"
                                        render={(renderProps) => (
                                            <button
                                                onClick={renderProps.onClick}
                                                disabled={renderProps.disabled}
                                                className="google__btn"
                                            >
                                                <div class="login__google">
                                                    <img
                                                        src={
                                                            require("../../Images/image 2.png")
                                                                .default
                                                        }
                                                        alt=""
                                                    />
                                                    <p>Continue with Google</p>
                                                </div>
                                            </button>
                                        )}
                                        buttonText="Login"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={"single_host_origin"}
                                    />
                                </div>
                                <div class="or">- OR -</div>
                                <form action="POST" className="login__form">
                                    <input
                                        required
                                        type="email"
                                        placeholder="Email Address"
                                        name="emailId"
                                        value={user.emailId}
                                        onChange={handleInputs}
                                    />
                                    {errors.email && <p className="forgot-error">Please provide a valid email</p>}
                                    <input
                                    {...register("password",{required:true})}
                                        required
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={user.password}
                                        onChange={handleInputs}
                                    />
                                    {errors.password && <p className="forgot-error">Please provid a password</p>}
                                    <p
                                        className="forgot__password"
                                        onClick={() => setModal(true)}
                                    >
                                        Did you Forgot your Password?
                                    </p>
                                    <button type="submit"
                                    onClick={PostData}>
                                        Login
                                    </button>
                                </form>
                                <p class="no__account">
                                    {" "}
                                    Don't have an account?{" "}
                                    <Link to="/register">Register</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Login;
