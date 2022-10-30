import React ,{useState}from 'react'
import './login.css';
import {  Link ,useHistory} from "react-router-dom";
import axios from 'axios';
import {apiPath} from '../../config'
import {validateEmail} from '../commoncomponent/utils'
import {toast} from 'react-toastify';
import cookie from 'react-cookie'
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
const Login=(props) =>{
    let history=useHistory()
    const [email, setEmail] = useState("");
    const [emailValidator, setEmailValidator] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordValidator, setPasswordValidator] = useState(false);
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState("");
    // const [btnText,setBtnText]=useState("Signin");

    const userAuthentication = async (e) => {
        e.preventDefault();
        if (!email || !validateEmail(email) || !password || password.length < 8) {

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
            let payLoad = { email: email, password: password };
          try{
          const resp=await  axios.post(apiPath + "auth/login", payLoad);
          localStorage.setItem('token', resp.data.access_token.access_token);
           
             history.push('/dashboard')
          
        
          console.log("resp",resp.data);
        }
                catch(err)
               
               {
                   
                if (err.response.data.message === "Please Verify Your Phone Number first") {
                toast(err.response.data.message)
                history.push("/send-otp")
              } else {
                   console.log(err.response.data.message);
                   toast(err.response.data.message)
              }
           
             }
         }
    };
    return (
        <>
       
        <h1 className='mainheading'>LOGIN</h1>
        <div className="login">
            <input type="email" name="email" placeholder="enter email"
             onChange={event => {
                setEmailValidator(false);
                setEmail(event.target.value)
            }}
            />
            {emailValidator ?
                            <p className="help is-danger required-field-text">{email ? "Invalid email address" : "This field is required"}</p> : <p className="help is-danger required-field-text"></p>}
            <input type="password"name="password" placeholder="enter password"
             onChange={event => {
                setPasswordValidator(false);
                setPassword(event.target.value)
            }}
        />
        {passwordValidator ?
            <p className="help is-danger required-field-text">{password ? "Password length should be 8 characters" : "This field is required"}</p> : <p className="help is-danger required-field-text"></p>}
            <Link to={"/dashboard"}>
            <button className="loginbutton " onClick={(event) => userAuthentication(event)}>Login </button>
            </Link>
            {/* <div></div> */}
            {/* <Link to={"/verify-number"}>
            <button className="loginbutton ">Verify Number</button>
            </Link> */}
        </div>
        </>
    )
}
export default Login;