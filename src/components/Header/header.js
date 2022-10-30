import React from 'react'
import './header.css'
import { Link } from "react-router-dom";
export default function header() {
  let token = localStorage.getItem("token")
  return (
    <>
      <div class="container-fluid-1">
        <div class="box1 ">
          <h1 class="megalogo">Megafpo.com</h1>
        </div>
        <div class="box2">
          <button>Search</button>
          <input type="search" class="searchbar"></input>

        </div>
        <div class="box3">
          {token ?
            <div>
              <Link to="/dashboard">
                <button class="headerlogin" >Create Listing</button>
              </Link>
            </div>
            :
            <div class="logsignbtns">
              <Link to="/register">
                <button class="headersignup" >SIGN UP</button>
              </Link>
              <Link to="/login">
                <button class="headerlogin" >LOG IN</button>
              </Link>
            </div>
          }
        </div>
      </div>
      <div className='container-fluid-2'>
        <h2>Fruits</h2>
        <h2>Vegitables</h2>
        <h2>Food Grains</h2>
        <h2>Spices</h2>
      </div>
    </>
  )
}