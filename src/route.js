import React from 'react'
import { Switch, Route, BrowserRouter as Router,Redirect } from "react-router-dom";
import Login from './components/login/login'
import Register from './components/register/register'
import Dashboard from './components/dashboard/dashboard'
import Header from './components/Header/header'
import Listing from './components/dashboard/listing'
import Farmer from './components/Farmer/farmer'
import FPO from './components/FPO/fpo'
import Megafpo from './components/megafpo/megafpo';
import Sendotp from './components/numberverification/sendotp'
import Verifyotp from './components//numberverification/verifyotp'
import Buyer from './components/Buyer/buyer';
import FieldListing from './components/listing/fieldListing'
import OrchidListing from './components/listing/orchidListing'
const Routers = (props) => {
  let { user, setUser } = props
  // const isLoggedin = localStorage.getItem('token')
  // console.log(isLoggedin);

  return (
    <div>
      
         
         <Router>
        <Route path="/dashboard" >  <Dashboard user={user} setUser={setUser} /></Route>
        <Route path="/field-listing" > <FieldListing user={user} setUser={setUser}  /></Route>
           <Route path="/orchid-listing" > <OrchidListing user={user} setUser={setUser}  /></Route>
           <Route path="/listing" > <Listing user={user} setUser={setUser} /></Route>
     

          <Route path="/" exact={true} ><Megafpo user={user} setUser={setUser} /></Route>
          <Route path="/login" exact={true} ><Login user={user} setUser={setUser} /></Route>
          <Route path="/register" ><Register user={user} setUser={setUser} /></Route>
          <Route path="/farmer" ><Farmer user={user} setUser={setUser} /></Route>
          <Route path="/buyer" ><Buyer user={user} setUser={setUser} /></Route>
          <Route path="/send-otp" ><Sendotp user={user} setUser={setUser} /></Route>
          <Route path="/verify-otp" ><Verifyotp user={user} setUser={setUser} /></Route>
          <Route path="/fpo/co-opertive" ><FPO user={user} setUser={setUser} /></Route>

          {/* </Header> */}
          {/* <Route path="/" exact={true} component={Login} />
         <Route path="/register" component={Register} />
         <Route path="/dashboard" component={Dashboard } /> */}
        </Router>
      
    </div>



  )
}
export default Routers;