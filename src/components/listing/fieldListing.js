import React, { useState, useEffect } from 'react'
import { Link, useHistory } from "react-router-dom";
import './listing.css'
import { apiPath } from '../../config'
import axios from 'axios'
let Months = [
    { name: "January" },
    { name: "February" },
    { name: "March" },
    { name: "April" },
    { name: "May" },
    { name: "June" },
    { name: "July" },
    { name: "August" },
    { name: "September" },
    { name: "October" },
    { name: "November" },
    { name: "December" }
];

export default function FieldListing(props) {
    const token = localStorage.getItem("token")

    console.log(token);
    let history = useHistory()
    const [Type, setType] = useState("");
    const [fieldName, setfieldName] = useState("");
    const [variety, setvariety] = useState("");
    const [sewingMonth, setsewingMonth] = useState("");
    const [harvestMonth, setharvestMonth] = useState("");
    const [expectedYield, setexpectedYield] = useState(0);
    const [expectedRate, setexpectedRate] = useState(0);
    const [error, setError] = useState("");
    const ExpectedRate = (value) => {
        setexpectedRate(parseInt(value))
    }
    const ExpectedYield = (value) => {
        setexpectedYield(parseInt(value))
    }
    const AddListing = async (e) => {
        e.preventDefault();
        let payLoad = {
            Type: Type, fieldName: fieldName, variety: variety, sewingMonth: sewingMonth,
            harvestMonth: harvestMonth, expectedYield: expectedYield, expectedRate: expectedRate
        }; console.log(payLoad);
        try {
            const resp = await axios.post(apiPath + "Field-Listings", payLoad,
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            history.push("/dashboard")
            console.log("resp", resp.data);
        }
        catch (err) {
            console.log("error", err.response);
        }
    }
    useEffect(() => {
        if (!token) {
            history.push("/")
        }

    }, [])
    const logout = () => {
        window.localStorage.clear()
        history.push('/')
    }
    return (
        <>
            <div className='dashboardHeader'>
                <h1>Megafpo.com</h1>
                <div></div>
                <div></div>
                <button className="logoutbuttanforclear" onClick={() => logout()}>Logout</button>
            </div>
            <div className='fieldssformmaindiv'>
                <form className='fieldssformss   fieldlistingformheight' onSubmit={(event) => AddListing(event)}>
                <div className='fieldssformmaindiv'>
<div className='fieldssforminnerdivstyel'>
<label for="">Type</label>
 <select placeholder='select Month' onChange={event => setType(event.target.value)}>
 <option value="" disabled selected>Select Type</option>
 <option value="Fruit">Fruit</option>
<option value="Vegetable">Vegetable</option>
</select><br />
    
<label for="">Variety</label>
 <input type="text" placeholder='Setvariety' onChange={event => setvariety(event.target.value)} /><br />
    
 <label for="">Sowing Month</label>
                    <select placeholder='select Month' onChange={event => setsewingMonth(event.target.value)}>
                        <option value="" disabled selected>Select Month</option>
                        {Months.map(month => (
                            <>

                                <option value={month.name}>{month.name}</option>
                            </>
                        ))}
                    </select><br />
  <label for="">Expected Rate</label>
 <input type="number" placeholder='Expected Rate' onChange={event => ExpectedRate(event.target.value)}/><br/>

    </div>
                   
    <div className="fieldssforminnerdivsecondstyle">
     {Type === "Fruit" ?
                        <>
                            <label for="">FieldName</label>
                            <select placeholder='select Fruit' onChange={event => setfieldName(event.target.value)}>
                                <option value="" disabled selected>Select Fruit</option>
                         
                                 <option value="Strawberry">Strawberry</option>
                                      <option value="Muskmelon">Muskmelon</option>
                                        <option value="Watermelon">Watermelon</option>
                                           </select><br />
                        </>
                        :
                        <>
                            <label for="">FieldName</label>
                            <select placeholder='select Vegitable' onChange={event => setfieldName(event.target.value)}>
                                <option value="" disabled selected>Select Vegitable</option>
                                <option value="Potato">Potato</option>
                                        <option value="Tomato">Tomato</option>
                                        <option value="Cabbage">Cabbage</option>
                                        <option value="Cauliflower">Cauliflower</option>
                                        <option value="Brinjal">Brinjal</option>
                                        <option value="Cucumber">Cucumber</option>
                                        <option value="Carrot">Carrot</option>
                                        <option value="Peas">Peas</option>
                                        <option value="Radish">Radish</option>
                                        <option value="ladyfinger">ladyfinger</option>
                                        <option value="BottleGourd">BottleGourd</option>
                                        <option value="BitterGourd">BitterGourd</option>
                                        <option value="Capsicum">Capsicum</option>
                                        <option value="Spinach">Spinach</option>
                                        <option value="Beetroot">Beetroot</option>
                                        <option value="Broccoli">Broccoli</option>
                                        <option value="Greenbean">Greenbean</option>
                                        <option value="Corn">Corn</option>
                                       <option value="Pumpkin">Pumpkin</option>
                                        <option value="Mushroom">Mushroom</option>
                                        <option value="AppleGourd">AppleGuard</option>
                                        <option value="PointedGourd">PointedGourd</option>
                                        <option value="RidgedGourd">RidgedGourd</option>
                                    
                            </select><br />
                        </>
                    }

<label for="">Expected Yield</label>
<div style={{width: '400px'}}>
    <input type="number" style={{width: '245px'}} placeholder='Expected Yield' onChange={event => ExpectedYield(event.target.value)} />
    
    
<select placeholder='select' style={{width: '100px'}} id="select-weight" >
                                <option value="" disabled selected>Select</option>
                                <option value="KG">KG</option>
                                        <option value="QUINTAL">QUINTAL</option>
                                        <option value="TON">TON</option>
                                        <option value="BAGS">BAGS</option>
                                        <option value="BOX">BOX</option>
                                        
                                     
                            </select>
                            </div>
                            <br /> 
<label for="">Harvest Month</label>
                    <select placeholder='select Month' onChange={event => setharvestMonth(event.target.value)}>
                        <option value="" disabled selected>Select Month</option>
                        {Months.map(month => (
                            <option value={month.name} >{month.name}</option>

                        ))}
                    </select>    
              </div>
                    </div><br/>
                    <button type="submit" className='fieldssformersubmitbutton'>Add Field</button>
                </form>
            </div>
        </>
    )
}
