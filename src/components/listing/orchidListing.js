import React, { useState,useEffect } from 'react'
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
export default function OrchidListing(props) {
    let history = useHistory()
    let token = localStorage.getItem("token")
    const [Type, setType] = useState("");
    const [fieldName, setfieldName] = useState("");
    const [variety, setvariety] = useState("");
    const [establishmentYear, setestablishmentYear] = useState("");
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
            Type: Type, fieldName: fieldName, variety: variety, establishmentYear: establishmentYear,
            harvestMonth: harvestMonth, expectedYield: expectedYield, expectedRate: expectedRate
        };
        try {
            const resp = await axios.post(apiPath + "Orchid-Listings", payLoad,
                { headers: { 'Authorization': `Bearer ${token}` } });
            history.push("/dashboard")
            console.log("resp", resp.data);
        }
        catch (err) {
            console.log("error", err);
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

                            <label for="">Expected Yield</label>
                            <div style={{width: '400px'}}>
                            <input type="number"  style={{width: '240px'}}  placeholder='Expected Yield' onChange={event => ExpectedYield(event.target.value)} />
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

                            <label for="">Expected Rate</label>
                            <input type="number" placeholder='Expected Rate' onChange={event => ExpectedRate(event.target.value)
                            } /><br />
                        </div>
                        <div className="fieldssforminnerdivsecondstyle">
                            {Type === "Fruit" ?
                                <>
                                    <label for="">FieldName</label>
                                    <select placeholder='select Month' onChange={event => setfieldName(event.target.value)}>
                                        <option value="" disabled selected>Select Fruit</option>
                                        <option value="Apple">Apple</option>
                                        <option value="Orange">Orange</option>
                                        <option value="Banana">Banana</option>
                                        <option value="Avocado">Avocado</option>
                                        <option value="Peach">Peach</option>
                                        <option value="Pineapple">Pineapple</option>
                                        <option value="Mango">Mango</option>
                                        <option value="Grape">Grape</option>
                                        <option value="Kiwifruit">Kiwifruit</option>
                                        <option value="Apricot">Apricot</option>
                                        <option value="Cherry">Cherry</option>
                                        <option value="Grapefruit">Grapefruit</option>
                                      
                                       
                                    </select><br />
                                </>
                                :
                                <>
                                    <label for="">FieldName</label>
                                    <select placeholder='select Month' onChange={event => setfieldName(event.target.value)}>
                                        <option value="" disabled selected>Select Vegetable</option>
                                        <option value="Drumsticks">Drumsticks</option>
                                    </select><br />
                                </>
                            }


                            <label for="">Establishment Year</label>
                            <input type="date"  placeholder='Enter Establishment Year' onChange={event => setestablishmentYear(event.target.value)} /><br />

                            <label for="">Harvest Month</label>
                            <select placeholder='select Month' onChange={event => setharvestMonth(event.target.value)}>
                                <option value="" disabled selected>Select Month</option>
                                {Months.map(month => (
                                    <option value={month.name}>{month.name}</option>
                                ))}
                            </select><br />


                        </div>
                    </div>
                    <button type="submit" className='fieldssformersubmitbutton' >Add Field</button>
                </form>
            </div>
        </>
    )
}
