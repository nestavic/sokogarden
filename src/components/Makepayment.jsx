import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const Makepayment =()=>{

    const{product}=useLocation().state || {}
    const[phone,setPhone]=useState("")
    const[message,setMessage]=useState("")

    const submit =async (e)=>{
     e.preventDefault()

     setMessage('please wait as we process...')

     const data =new FormData()
     data.append("phone",phone)
     data.append("amount",product.product_cost)

     const response=await axios.post('https://neista.pythonanywhere.com/api/mpesa_payment',data)

     setMessage(response.data.message)
    }
    return(
        <div className='row justify-content-center m-4️'>
            <div className='col-md-6 card shadow p-4'>
            <form onSubmit={submit}>
                <h2 className='text-success'>LIPA NA M-PESA</h2>
                {message}
                <input 
                type="tel" 
                placeholder='Enter Phone Number'
                className='form-control'
                onChange={(e)=>{setPhone(e.target.value)}}
                value={phone}
                />
                <p className='text-start'>Enter Phone number to pay from starts with 25457207717</p>
                <button 
                type="submit" 
                className="btn btn-success mt-4 w-50">
                  Pay Now 🚀
                </button>

            </form>
            </div>
        </div>
    )
}
export default Makepayment