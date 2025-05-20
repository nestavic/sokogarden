import React, { useState } from 'react'
import {Link,useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signin =()=>{
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[loading,setLoading]=useState("")
    const[success,setSuccess]=useState("")
    const[error,setError]=useState("")
    const navigate=useNavigate()

    const submit =async (e)=>{
        e.preventDefault()
        setLoading('please wait...')

        try{
            //create form data
            const data=new FormData()
            data.append('email',email)
            data.append('password',password)
            
            const response =await axios.post("https://neista.pythonanywhere.com/api/signin",data)
            setLoading('')

            if(response.data.user){
                setSuccess(response.data.success)

                //to do save the details to local storage
                localStorage.setItem("user",JSON.stringify(response.data.user))

                navigate("/")
                
            }else{
                setError("Login Failed")
            }
        }   
        catch(error){
            setLoading("")
            setError("Something went wrong!")
        }
    }
    return(
        <div className='row justify-content-center p-4'>
            <div className="col-md-6 card shadow">
            <form onSubmit={submit}>
                <h2>Sign in</h2>

                {loading}
                {success}
                {error}
                <input 
                type="email"
                placeholder='Your Email'
                className='form-control mt-3'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
                />
                <input 
                type="password" 
                placeholder='Enter password'
                className='form-control mt-3'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
                />

            <button
            type='submit'
             className="btn bg-primary my-3 px-5">Sign in 🥂
            </button>
            <p>
                Don't have an account?
                <Link to="/Signup">Sign UP</Link>
            </p>
            </form>
            </div>
        </div>

    )
}
export default Signin