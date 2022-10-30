import React from 'react'
import './register.css';
import { Link } from "react-router-dom"
const Register = () => {

    return (

        <>

            <h1 className='mainheading'>Signup</h1>
            <div className="selectforsignup container-fluid">
                <Link to="/farmer">
                <div className='signupformer'>
                    <h1> As a Farmer</h1>
                </div>
                </Link>
                <Link to="/fpo/co-opertive">
                <div className='signupfpo'>
                    <h1> As a FPO</h1>
                </div>
                </Link>
                <Link to="/buyer">
                <div className='signupbuyer'>
                    <h1> As a Buyer</h1>
                </div>
                </Link>
            </div>
        </>
    )
}
export default Register;