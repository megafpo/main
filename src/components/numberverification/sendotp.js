import React ,{useState}from 'react'
import axios from 'axios';
import {apiPath} from '../../config'
import './verification.css'
import {  Link ,useHistory} from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
export default function Sendotp() {
    let history=useHistory()
    var email= localStorage.getItem('email')
   

    const [number, setNumber] = useState("");
    const [phoneValidator, setphoneValidator] = useState(false);
const sendotp=async (e)=>{
    if (!number ||number.length < 10||number.length>10) {
        setphoneValidator(true)
    }
    else{
        let payLoad = {
            
            phoneNumber:"+91"+ number,email:email
        };
        try {
            const resp=await  axios.post(apiPath + "auth/sendOtp", payLoad);
            localStorage.setItem("number",'+91'+number);
            history.push("/verify-otp")
            console.log("res",resp.data);
        } catch (error) {
            if(error.response.data.message === "user with this number not found" ){
                toast("Enter Correct Number")
            }
            else if (error.response.data.message === "User is Already Verified") {
                toast("User is Already Verified");
                history.push("/login")
            } else {
                toast(error.response.data.message);
            }
        }
     
    
    }

}
  return (
      <>
      <div className='verificationHeader'>
      <h1>Megafpo.com</h1>
    </div>
      <div className='verificationmaindiv'>
      
    <div className='verifynumberheading' >Number Verification</div>
    <div className='numberverify'>
    <input type="number" name="number" placeholder="enter valid number except +91"
                    onChange={event => {
                        setphoneValidator(false);
                        setNumber(event.target.value)
                    }}
                />
                {phoneValidator ?
                    <p className="help is-danger required-field-text">{number ? "number should be 10digit except +91" : "This field is required"}</p> : <p className="help is-danger required-field-text"></p>}
<button className='otpbutton' onClick={()=>sendotp()}>send OTP</button>
    </div>
    </div>
    </>
  )
}
