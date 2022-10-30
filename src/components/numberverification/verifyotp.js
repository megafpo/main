import React, { useState } from 'react'
import axios from 'axios';
import './verification.css'
import { apiPath } from '../../config'
import { Link, useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
export default function Verifyotp() {
    let history = useHistory()
    var number = localStorage.getItem('number')
    var email = localStorage.getItem('email')
    
    const [otp, setOTP] = useState("");
    const [otpValidator, setotpValidator] = useState(false);
    const verifyotp = async (e) => {
        if (!otp) {
            setotpValidator(true)
        }
        else {
            
            let payLoad = {
                Otp:otp, phoneNumber:number,emailAddress:email
            };
            try {
                const resp = await axios.post(apiPath + "auth/verifyOtp", payLoad);
                if (resp.data.message === "Otp is verified") {
                    toast("Congrats Otp verified")
                    history.push("/login")
                } else {
                    toast("please Enter Valid OTP")
                }

                console.log("res", resp.data);
            } catch (error) {
                if (error.response.data.message === "User is Already Verified") {
                    history.push("/login")
                } else {
                    toast(error.response.data.message);
                    console.log("error", error.response.data.message);
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

                <div className='verifynumberheading'>OTP Verification</div>
                <p className='verifymessageforno'>OTP Is send To Your No:{number}</p>
                <div className='numberverify'>
                    <input type="number" name="number" placeholder="enter OTP"
                        onChange={event => {
                            setotpValidator(false);
                            setOTP(event.target.value)
                        }}
                    />
                    {otpValidator ?
                        <p className="help is-danger required-field-text">{otp ? "Enter OTP" : "Enter OTP For Verification"}</p> : <p className="help is-danger required-field-text"></p>}
                    <button className='otpbutton' onClick={() => verifyotp()}>Verify OTP</button>
                    <Link to="/send-otp">
                        <button  className='otpbutton'>Resend OTP</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

