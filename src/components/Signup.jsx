import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Signup =(e)=>{
    //initialize the hooks
    const [username,setUsername]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[phone,setPhone]=useState('')
    const[loading,setLoading]=useState('')
    const[success,setSuccess]=useState('')
    const[error,setError]=useState('')


    const submit=async (e)=>{
      e.preventDefault()
      setLoading('please wait as we upload your details')
      try{
        const data = new FormData()
        data.append('username',username)
        data.append('email',email)
        data.append('password',password)
        data.append('phone',phone)

        const response=await axios.post('https://neista.pythonanywhere.com/api/signup',data)

        setLoading('')
        setSuccess(response.data.success)
        setUsername('')
        setEmail('')
        setPassword('')
        setPhone()

      }catch(error){
        setSuccess('')
        setLoading('')
        setError('oops something happened!!🤣')
      }

    }
    return(
        <div className='row justify-content-center mt-4'>
            <div className='col-md-6 card shadow p-4'>
            <form onSubmit={submit}>
                {loading}
                {success}
                {error}
                <h2>Sign Up</h2>
                <input type="text" 
                placeholder='Enter Username'
                className='form-control mt-3'
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                required
                />  
                
                <input type="Email" 
                placeholder='Enter Email'
                className='form-control mt-3'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
                /> 
            
                <input type="password" 
                placeholder='Enter password'
                className='form-control mt-3'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
                /> 
                
                <input type="tel" 
                placeholder='Enter phone'
                className='form-control mt-3'
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
                required
                />
                
                 <br />
            <button
            type='submit'
             className="btn bg-primary my-3 px-5">Sign up 🚀
            </button>
            <p>
                Already have an account?
                <Link to='/Signin'>Sign in</Link>
            </p>
            </form>
            </div>
        </div>
    )
}
export default Signup