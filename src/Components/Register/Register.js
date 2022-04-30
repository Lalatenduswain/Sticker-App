import React, {useState} from 'react'
import getURL from '../../utils/fetchURL';
import {Link, useNavigate} from "react-router-dom";
import './Register.css'
import swal from "sweetalert"
import GoogleLogin from 'react-google-login'
import Navbar from '../Home/Navbar'
import Loader from '../Loader/loader';
import { useForm } from "react-hook-form";

function Register() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();
    const [user, setUser] = useState({
        username:"", emailId:"", password:"", firstName:"", lastName:""
    })
    const [loading, setLoading] = useState(false);
    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value
        setUser({...user, [name]:value});
    }
    const responseGoogle = async (response) => {
        const url = getURL(window.location.hostname);
        // console.log(response)
        setLoading(true)
        const res = await fetch(`${url}/auth/googleSignin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
                'Origin': 'https://indiacares.co.in'
            },
            body: JSON.stringify({
                tokenId: response.tokenId
            })
        })
        const data = await res.json();
        setLoading(false)
        if(res.status===201){
            swal({
                title: "Good job!",
                text: "You have been registered verify your email and continue with login",
                icon: "success",
                button: "Continue",
            });
            navigate("/login");
        }
        else if(res.status === 200){
            swal({
                title: "Good job!",
                text: "You have been logged in successfully",
                icon: "success",
                button: "Continue",
            });
            localStorage.setItem("Authorization-Token",data.token);
            navigate("/");
        }
        else if(res.status === 503){
            swal({
                title: "Good job!",
                text: "ou are already registered , please login to continue",
                icon: "success",
                button: "Continue",
            });
            localStorage.setItem("Authorization-Token",data.token);
            navigate("/");
        }
        else{
            swal({
                title: "Error Occured!!!",
                text: "Not able to register your account",
                icon: "error",
                button: "Continue",
            });
            navigate("/register");
        }
    }
    const PostData = async(e) => {
        e.preventDefault();
        setLoading(true)
        const {username, emailId, password, firstName, lastName} = user;
        const url = getURL(window.location.hostname);
        const res = await fetch(`${url}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username, emailId, password, firstName, lastName
            })
        })
        const data = await res.json();
        setLoading(false)
        // console.log(data);

        if(res.status === 201) {
            swal({
                title: "Good job!",
                text: "You have been registered verify your email and continue with login",
                icon: "success",
                button: "Continue",
              });
              //console.log("registration successful");
            navigate("/login");
        }
        else{
            swal({
                title: "Error Occured",
                text: `${data.message}`,
                icon: "error",
                button: "Continue",
              });
        }
    }
    return (
        <div>
        { loading ? (
            <div><Loader/></div>
        ) : (
            <div class="register__page">
            
            <div class="right__content">
            </div>
            <div class="left__content">
                <div class="title">
                    <h1>Create Account</h1>
                </div>
                <div class="signin__options">
                    <div class="login__google">
                    <GoogleLogin
    
                                clientId="657719004738-cr0uqumrit7g29ba8vrmpb32sj7oal6d.apps.googleusercontent.com"
                                render={(renderProps) => (
                                    <button onClick={renderProps.onClick} disabled={renderProps.disabled} className='google__btn'>
                                        <div class="login__google">
                                      <img src={require('../../Images/image 2.png').default} alt=""/>
                                      <p>Continue with Google</p>
                                      </div>
                                    </button>
                                  )}
    
                                buttonText="Login"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                    </div>
                </div>
                <div class="or">- OR -</div>
                <form action="POST" class="login__form">
                    <input type="text"
                    {...register("userName", { required: true, maxLength: 10 })} 
                    placeholder="User Name" name="username" value={user.username} onChange={handleInputs}/>
                    {errors.userName && <p className="forgot-error">Please provide a valid username</p>}
                    <input type="emailId" 
                    {...register("email",{required:true,
                        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    })}
                    placeholder="Email Address" name="emailId" value={user.emailId} onChange={handleInputs} required="true" />
                    {errors.email && <p className="forgot-error">Please provide a valid email</p>}
                    <input type="password" 
                    {...register("password",{required:true})}
                    placeholder="Password" name="password" value={user.password} onChange={handleInputs} required="true"/>
                    {errors.password && <p className="forgot-error">Please provide a password</p>}
                    {/* <input type="password" placeholder="Confirm Password" name="cpassword" value={user.cpassword} onChange={handleInputs}/> */}
                    <input 
                    {...register("firstName", { required: true, maxLength: 20,minLength:1})} 
                    type="text" placeholder="First Name" name="firstName" value={user.firstName} onChange={handleInputs} required="true"/>
                    {errors.firstName && <p className="forgot-error">Please provide a first name</p>}
                    <input 
                    {...register("lastName", { required: true, maxLength: 20,minLength:1})} 
                    type="text" placeholder="Last Name" name="lastName" value={user.lastName} onChange={handleInputs} required="true"/>
                    {errors.lastName && <p className="forgot-error">Please provide a last name</p>}
                    
                    <button type="submit" value="register" onClick={handleSubmit(PostData)}>Create Account</button>
                </form>
                <p class="no__account"> Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
        )}
    </div>
    )
}

export default Register
