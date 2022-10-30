import React, { useState } from 'react'
import '../dashboard/dashboard.css';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import axios from 'axios';
import { apiPath } from '../../config'
import { validateEmail } from '../commoncomponent/utils'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
const Login = (props) => {
    let  history  = useHistory()
    const [firstName, setFirstName] = useState("");
    const [firstnameValidator, setfirstnameValidator] = useState(false);
    const [lastName, setLastName] = useState("");
    const [lastnameValidator, setlastnameValidator] = useState(false);
    const [number, setPhoneNumber] = useState("");
    const [phoneValidator, setphoneValidator] = useState(false);
    const [email, setEmail] = useState("");
    const [emailValidator, setEmailValidator] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordValidator, setPasswordValidator] = useState(false);
    const [error, setError] = useState("");
    // const [btnText,setBtnText]=useState("Signin");

    const userAuthentication = async (e) => {
        e.preventDefault();
        if (!email || !validateEmail(email) || !password || password.length < 8 ||number.length < 10 ||number.length > 10) {

            if (!firstName) {
                setfirstnameValidator(true)
            }
            if (!lastName) {
                setlastnameValidator(true)
            }
            if (!number || number.length < 10 || number.length > 10) {
                setphoneValidator(true)
            }
            if (!email) {
                setEmailValidator(true)
            }
            if (!validateEmail(email)) {
                setEmailValidator(true)
            }
            if (!password || password.length < 8) {
                setPasswordValidator(true)
            }

        }
        else {
            // setBtnText("Loading");
            let payLoad = {
                emailAddress: email, password: password, firstName: firstName, lastName: lastName,
                phoneNumber:"+91"+ number
            };
            try {
                const resp=await  axios.post(apiPath + "Users/signup", payLoad);
                localStorage.setItem("number",'+91'+number);
                localStorage.setItem("email",email);
                history.push("/verify-otp");
                console.log("res",resp.data);
            } catch (error) {
                toast(error.response.data.message)
                if(error.response.data.message === "A user with this Email Address / Phone Number already Exists")
                {
                    history.push("/login");
                }
                console.log("error",error);
            }
         
        }
    };
    return (
        <>

            <div className='dashboardformHeader'>
                <h1>Megafpo.com</h1>
            </div>
            <div className="login">
                <input type="text" name="firstname" placeholder="enter Firstname"
                    onChange={event => {
                        setfirstnameValidator(false);
                        setFirstName(event.target.value)
                    }}
                />
                {firstnameValidator ?
                    <p className="help is-danger required-field-text">{firstName ? "Enter FirstName" : "This field is required"}</p> : <p className="help is-danger required-field-text"></p>}
                <input type="text" name="lastname" placeholder="enter Lastname"
                    onChange={event => {
                        setlastnameValidator(false);
                        setLastName(event.target.value)
                    }}
                />
                {lastnameValidator ?
                    <p className="help is-danger required-field-text">{lastName ? "Enter LastName" : "This field is required"}</p> : <p className="help is-danger required-field-text"></p>}
                <input type="email" name="email" placeholder="enter email"
                    onChange={event => {
                        setEmailValidator(false);
                        setEmail(event.target.value)
                    }}
                />
                {emailValidator ?
                    <p className="help is-danger required-field-text">{email ? "Invalid email address" : "This field is required"}</p> : <p className="help is-danger required-field-text"></p>}
                <input type="password" name="password" placeholder="enter password"
                    onChange={event => {
                        setPasswordValidator(false);
                        setPassword(event.target.value)
                    }}
                />
                {passwordValidator ?
                   
                   <p className="help is-danger required-field-text">{password ? "Password length should be 8 characters" : "This field is required"}</p> : <p className="help is-danger required-field-text"></p>}
               
 
               <input type="number" name="number" placeholder="enter valid number without +91"
                    onChange={event => {
                        setphoneValidator(false);
                        setPhoneNumber(event.target.value)
                    }}
                />
                {phoneValidator ?
                    <p className="help is-danger required-field-text">{number ? "Number length should be 10 digit axcept +91" : "This field is required"}</p> : <p className="help is-danger required-field-text"></p>}
               
                <Link to={"/dashboard"}>
                    <button className="loginbutton " onClick={(event) => userAuthentication(event)}>Signup </button>
                </Link>
                <div></div>
                {/* <Link to={"/verify-number"}>
                    <button className="loginbutton ">Verify Number</button>
                </Link> */}
            </div>
        </>
    )
}
export default Login;