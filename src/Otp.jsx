import React from 'react'

import react, {useState, useEffect} from 'react'

import { useHistory } from "react-router";

function Otp(props) {
    const history = useHistory()
    const [otp, setOtp] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [successTimeout, setSuccessTimeout] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [disabledClass, setDisabledClass] = useState('')

    useEffect(() => {
        if ('OTPCredential' in window) {
            //window.addEventListener('DOMContentLoaded', e => {
            alert("Window loaded.")
            const input = document.querySelector('input[id="otp"]');
            
            if (!input) return;
            const ac = new AbortController();
            //const form = input.closest('form');
            const verifyBtn = input.closest('form').querySelector('[name="verify"]');
            if (verifyBtn) {
                verifyBtn.addEventListener('click', e => {
                    ac.abort();
                });
            }
            navigator.credentials.get({
                otp: { transport:['sms'] },
                signal: ac.signal
            }).then(otp => {
                //input.value = otp.code;
                setOtp(otp.code)
                //alert(JSON.stringify(otp))
                //if (form) form.submit();
                verifyOtp();
                /* fetch(config.apiURL, {
                    method: 'POST',
                    mode: 'cors', // no-cors, *cors, same-origin
                    cache: 'no-cache',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify(otp)
                })
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result);
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        console.log(error);
                    }
                ) */
            }).catch(err => {
                console.log(err);
            });
            //});
        } else {
            alert('Your browser does not support WebOTPApi.');
        }
    }, [])

    const getOtp = (e) => {
        let otp = e.target.value.trim()
        setOtp(otp)
    }

    const verifyOtp = () => {
        setDisabled(true)
        setDisabledClass('disabled:opacity-50')
        setSuccessMsg(`OTP has been successfully verified !`)
        if(!successTimeout){
            setSuccessTimeout(setTimeout(() => {
                setSuccessMsg('')
                setSuccessTimeout(false)
                //history.push('/validate-otp')
            }, 5000));
        }
    }

    return (
        <>
            <div className="w-full max-w-sm m-10">
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
                    <div className="font-bold text-xl mb-2">Validate your OTP</div>
                    <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="otp">
                        OTP
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="otp" onChange={(e) => getOtp(e)} type="text" value={otp} pattern="\d{10}" placeholder="OTP" />
                    </div>
                    </div>
                    <div className="md:flex md:items-center">
                    <div className="md:w-1/3">
                        <button name="verify" onClick={() => verifyOtp()} disabled={disabled} className={`shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ${disabledClass}`} type="button" >
                            Verify
                        </button>
                    </div>
                    <div className="md:w-2/3">
                        <button name="verify" onClick={() => history.push('/')} className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" >
                            Back
                        </button>
                    </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Otp
