import React,{useState} from 'react'
import Routeer from './route'
import {BrowserRouter,Route ,Switch} from "react-router-dom";
//  import 'bootstrap/dist/css/bootstrap.min.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as dotenv from 'dotenv';

dotenv.config()
toast.configure()

const  App=(props) =>{
  let{history,location}=props
  const [user, setUser]=useState();
  
  return (
    <>
    <div>
      
<BrowserRouter>
<Switch>
        <Route path="/" ><Routeer user={user} setUser={setUser}  /></Route>
        </Switch>
      </BrowserRouter>
  
    </div>
    </>
  );
}

export default App;
