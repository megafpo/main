import React, { useEffect } from 'react'
import './dashboard.css'
import { Link, useHistory} from "react-router-dom";
export default function Dashboard() {
  let history = useHistory();
  let token=localStorage.getItem("token")
 const logout=()=>{
  window.localStorage.clear()
history.push('/')
 }
 useEffect(()=>{
   if(!token){
     history.push("/")
   }

 },[])

  return (
    <>
    <div className='dashboardHeader'>
      <h1>Megafpo.com</h1>
      <div></div>
      <div></div>
      <button  className="logoutbuttanforclear"onClick={()=>logout()}>Logout</button>
    </div>
    <div className='dashboardmaindiv'>
      <div>
      <h1 className='dashboardheading'>Dashboard</h1> 
      </div>
      <div>
        <Link to="/listing">
        <button className='dasboardbtn'><strong>+</strong></button>
        </Link>
        <p className='dashboardparagraph'>Create Listing</p>
      </div>
    </div>
    </>
  )
}
