/* import logo from './logo.svg';
import './App.css'; */

import react, {useState, useEffect} from 'react'

import { useHistory } from "react-router";
import config from './config'

function App() {

  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState('')
  const [errorTimeout, setErrorTimeout] = useState(false)
  const [btnText, setBtnText] = useState('Send OTP')
  const [phone, setPhone] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [successTimeout, setSuccessTimeout] = useState(false)


  useEffect(() => {
    
  }, [])

  const getPhone = (e) => {
    let phone = e.target.value.trim();
    if(phone == "") {
      setSuccessMsg('')
      setErrorMsg('Please enter valid 10 digit number.')
      setTimeout(() => {
        setBtnText('Send OTP');
        setErrorMsg('')
      }, 3000);
    } else {
      setPhone(phone)
    }
  }

  const sendOTP = () => {
    /* fetch(config.apiURL, {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
       "phone": phone
      })
    })
    .then(res => res.json())
    .then(
      (result) => {
        setBtnText('Send OTP');
        console.log(result);
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        setBtnText('Send OTP');
        setError(error);
      }
    ) */

    if(phone == "") {
      setSuccessMsg('')
      setErrorMsg('Please enter valid 10 digit number.')
      if(!errorTimeout){
        setErrorTimeout(setTimeout(() => {
          setBtnText('Send OTP');
          setErrorMsg('')
          clearTimeout(errorTimeout)
          setErrorTimeout(false)
        }, 3000));
      }
    } else {
      setBtnText('Sending ...')
      setErrorMsg('')
      setSuccessMsg(`An SMS has been sent to ${phone}. Please check.`)
      if(!successTimeout){
        setSuccessTimeout(setTimeout(() => {
          setBtnText('Send OTP');
          setSuccessMsg('')
          setSuccessTimeout(false)
          history.push('/validate-otp')
        }, 3000));
      }
    }
  }

  return (
    <div className="w-full max-w-sm m-10">
      {errorMsg && <div className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md mb-4" role="alert">
        <div className="flex">
          <div className="py-1"></div>
          <div>
            <p className="font-bold">Success !</p>
            <p className="text-sm">{errorMsg}</p>
          </div>
        </div>
      </div>}
      {successMsg && <div className="bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md mb-4" role="alert">
        <div className="flex">
          <div className="py-1"></div>
          <div>
            <p className="font-bold">Success !</p>
            <p className="text-sm">{successMsg}</p>
          </div>
        </div>
      </div>}
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="phone">
              Phone
            </label>
          </div>
          <div className="md:w-2/3">
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="phone" type="text" value={phone} pattern="\d{10}" onChange={(e) => getPhone(e)} placeholder="Phone" />
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
              type="button"
              onClick={() => sendOTP()}
            >
              {btnText}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
