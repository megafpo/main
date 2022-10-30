import React ,{useEffect}from 'react'
import './dashboard.css'
import { Link, useHistory} from "react-router-dom";
export default function Listing() {
  let history = useHistory();
  let token=localStorage.getItem("token")
  useEffect(()=>{
    if(!token){
      history.push("/")
    }
 
  },[])
  const logout=()=>{
   window.localStorage.clear()
 history.push('/')
  }
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
      <h1 className='dashboardheading'>Listing Type</h1> 
      </div>
      <div className='dashboardlistingcontent'>
       <div className='listingceontent'>
           <Link to="/field-listing">
        <button type="radio" className='dasboardlistingbtn'></button>
        <label>Add Field</label>
        </Link>
        </div >
        <div className='listingceontent'> 
        <Link to="/orchid-listing">   
             <button type="radio" className='dasboardlistingbtn'></button>
        <label>Add Orchid</label>
        </Link>  
        </div>
 
       
      </div>
    </div>
    </>
  )
}
