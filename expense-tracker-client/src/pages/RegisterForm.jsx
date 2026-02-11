import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";

const API_URL="http://localhost:5000/api/v1";

function RegisterForm(){
    const [password,setPassword]=useState('');
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const navigate = useNavigate();

    const handleRegister =async (e)=>{
        e.preventDefault()
        try{
            const res=await fetch(`${API_URL}/register`,{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({name,email,password})
            });
            const data = await res.json()
            if(data.success){
                localStorage.setItem('token',data.token)
                navigate('/dashboard')
                console.log("token:",data.token)
            }else{
                alert(data.error)
            }
        }catch(error){
            alert('login failed')
        }
    }

        return(
            <>
            <h1>Register form</h1>
            <div>
                <form onSubmit={handleRegister}>
                    <label htmlFor="">Name</label>
                    <input type="text" value={name} placeholder="Enter your name " onChange={(e)=>setName(e.target.value)} required style={{padding:'10px'}} />

                    <label htmlFor="">email</label>
                    <input type="email" value={email} placeholder="Enter your email " onChange={(e)=>setEmail(e.target.value)} required style={{padding:'10px'}} />

                    <label htmlFor="">Password</label>
                    <input type="password" value={password} placeholder="Enter your password " onChange={(e)=>setPassword(e.target.value)} required style={{padding:'10px'}} />

                    <button type="submit">Register</button>
                </form>
            </div>
            </>
        )

    
}

export default RegisterForm;