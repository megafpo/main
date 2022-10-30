import axios from 'axios';
import { useState ,useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiPath } from '../../config';
import '../dashboard/dashboard.css';
import { districts } from "../district";
import { states } from "../state";
import { tehsils } from "../tehsil";


toast.configure()
let Sid, Did, Tid;
let duplicateDistrict = [];
let duplicateTehsil = [];
let duplicateVillage = [];
let Villages= [];
export default function FPO(props) {
  let history = useHistory()


  const [fpoName, setFpoName] = useState("");
  const [managerName, setManagerName] = useState("");
  const [number, setMobileNumber] = useState("");
  const [phoneValidator, setphoneValidator] = useState(false);
  const [password, setPassword] = useState("");
  const [DOR, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [actUnderRegistered, setActRegistered] = useState("");
  const [turnOver, setTurnOver] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [tehsil, setTehsile] = useState("");
  const [village, setVillage] = useState("");
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getVillagesFile();
}, []);

  const TurnOver = (value) => {
    console.log(value);
    setTurnOver(parseInt(value))
  }
  const PinCode = (value) => {
    setPincode(parseInt(value))
  }

  const getstate = (value) => {
    duplicateDistrict = [];
    duplicateTehsil = [];
    duplicateVillage = [];
    setState(value);
    const index = states.findIndex(state => state.name === value);
    Sid = states[index].Sid;
    duplicateDistrict = districts.filter(district => district.Sid === Sid)
  }
  const getdistrict = (value) => {
    duplicateTehsil = [];
    duplicateVillage = [];
    setDistrict(value);
    const index = districts.findIndex(district => district.name === value);
    Did = districts[index].Did;
    duplicateTehsil = tehsils.filter(tehsil => tehsil.Sid === Sid && tehsil.Did === Did)
  }
  const gettehsil = (value) => {
    duplicateVillage = [];
    setTehsile(value);
    const index = tehsils.findIndex(tehsil => tehsil.name === value);
    Tid = tehsils[index].Tid;
    duplicateVillage = Villages.filter(village => village.Sid === Sid && village.Did === Did && village.Tid === Tid)
  }
  const getVillage = (value) => {
    setVillage(value);
  }

  const getVillagesFile = async () => {
    const apiKey='AIzaSyBOXH2ToKpDv80eJaPvrPLyQLTYtRkhH54';
    // https://www.googleapis.com/drive/v3/files/fileId?key=[Your api key]
    // 1erxr77YFyWw-VHhaskzfbtFUp59ds5lE
    const url="https://www.googleapis.com/drive/v3/files/1p3ySUG2chiU7-H7HcapYjvKL1FkHRsbY?key=AIzaSyBOXH2ToKpDv80eJaPvrPLyQLTYtRkhH54&alt=media";

    const response = await axios.get(url);
Villages=response.data;

}

  const Signup = async (e) => {
    e.preventDefault();
    if (!number || number.length < 10 || number.length > 10) {
      setphoneValidator(true)
    }
    let payLoad = {
      emailAddress: email, password: password, fpoName: fpoName, managerName: managerName,
      phoneNumber: "+91" + number, DOR: DOR, actUnderRegistered: actUnderRegistered, turnOver: turnOver, state: state, district: district, tehsil: tehsil,
      village: village, pinCode: pincode
    };
    try {
      const resp = await axios.post(apiPath + "Fpo/signup", payLoad);
      localStorage.setItem("number", '+91' + number);
      localStorage.setItem("email", email);
      history.push("/verify-otp")
      console.log("resp", resp.data);
    }

    catch (err) {
      toast(err.response.data.message)
      console.log("error", err);
    }

  }
  return (
    <>
      <div className='dashboardformHeader'>
        <h1>Megafpo.com</h1>
      </div>
      <div className='dashboardformmaindiv'>
        <form className='farmerform' onLoad={()=>getVillagesFile()} onSubmit={(event) => Signup(event)}>
          <div className='farmerformmaindiv'>
            <div className='forminnerdivstyel'>

              <label for="">FPO Name</label>
              <input type="text" placeholder='Enter FPO Name' onChange={event => setFpoName(event.target.value)} /><br />

              <label for="">Director Name</label>
              <input type="text" placeholder='Enter FPO Director Name' onChange={event => setManagerName(event.target.value)} /><br />

              <label for="">Email</label>
              <input type="email" placeholder='Enter FPO Email' onChange={event => setEmail(event.target.value)} /><br />

              <label for="">Password</label>
              <input type="password" placeholder='Enter Valid Password' onChange={event => setPassword(event.target.value)} /><br />

              <label for="">Mobile Number</label>
              <input type="number" placeholder='Enter 10 Digit Mobile Number'
                onChange={event => {
                  setMobileNumber(event.target.value)
                  setphoneValidator(false);
                }} />
              {phoneValidator ?
                <p className="help is-danger required-field-text">
                  {number ? "Number length should be 10 digit axcept +91" : "This field is required"}
                </p> : <p className="help is-danger required-field-text"></p>}


              <label for="">Turn Over</label>
              <select onChange={event => TurnOver(event.target.value)}>
                <option value="" disabled selected>Select Turn Over</option>
                <option value="1">0-5 lakh</option>
                <option value="2">5-15 lakh</option>
                <option value="3">15-50 lakh</option>
                <option value="4">2cr-100 cr</option>
              </select><br />

              <label for="">Pincode</label>
              <input type="number" placeholder='Enter your area pincode' onChange={event => PinCode(event.target.value)} /><br />

            </div>
            <div className="forminnerdivsecondstyle">

              <label for="">Registration Date</label>
              <input type="date" placeholder='Enter FPO Incorporation Date' onChange={event => setDate(event.target.value)} /><br />

              <label for="">Act Registered</label>
              <select onChange={event => setActRegistered(event.target.value)}>
                <option value="" disabled selected>Select Act Registered</option>
                <option value="coOperativeAct">Co-Op Act</option>
                <option value="companyAct">Company Act</option>

              </select><br />

              <label for="">State</label>
              <select id="state" placeholder='select state' onChange={event => getstate(event.target.value)}>
                <option value="" disabled selected>Select State</option>
                {states.map(state => (
                  <option value={state.name}>{state.name}</option>
                ))}
              </select><br />

              <label for="">District</label>
              <select id="district" placeholder='select district' onChange={event => getdistrict(event.target.value)}>
                <option value="" disabled selected>Select District</option>
                {duplicateDistrict.map(district => (
                  <option value={district.name}>{district.name}</option>
                ))}

              </select><br />

              <label for="">Tehsil</label>
              <select id="tehsil" placeholder='select Tehsil' onChange={event => gettehsil(event.target.value)}>
                <option value="" disabled selected>Select Tehsil</option>
                {duplicateTehsil.map(tehsil => (
                  <option value={tehsil.name}>{tehsil.name}</option>
                ))}

              </select><br />


              <label for="">Village</label>
              <select id="village" placeholder='select Village' onChange={event => getVillage(event.target.value)}>
                <option value="" disabled selected>Select Village</option>
                {duplicateVillage.map(village => (
                  <option value={village.name}>{village.name}</option>
                ))}


              </select><br />
            </div>

          </div>
          <button type="submit" className='formersubmitbutton' >Signup</button>
        </form>
      </div>
    </>
  )
}
