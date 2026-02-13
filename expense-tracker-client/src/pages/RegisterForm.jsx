import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

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

        return (
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0,0,0,0.2)",
                }}
            >
                <div
                    style={{
                        background: "rgba(24,24,27,0.95)",
                        borderRadius: "24px",
                        boxShadow:
                            "0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 1.5px 8px 0 #000a inset",
                        padding: "40px 32px 32px 32px",
                        maxWidth: "370px",
                        width: "100%",
                        border: "1.5px solid #232526",
                        backdropFilter: "blur(8px)",
                    }}
                >
                    <h1
                        style={{
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: "2.1rem",
                            marginBottom: "18px",
                            letterSpacing: "-1px",
                            textAlign: "center",
                            textShadow: "0 2px 16px #000a",
                        }}
                    >
                        Register
                    </h1>
                    <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                        <label htmlFor="name" style={{ color: "#bdbdbd", fontWeight: 500, fontSize: "1rem" }}>
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{
                                padding: "12px 16px",
                                borderRadius: "10px",
                                border: "1.5px solid #333",
                                background: "#232526",
                                color: "#fff",
                                fontSize: "1rem",
                                outline: "none",
                                marginBottom: "6px",
                                boxShadow: "0 1px 4px #0002",
                                transition: "border 0.2s, box-shadow 0.2s",
                            }}
                            required
                        />
                        <label htmlFor="email" style={{ color: "#bdbdbd", fontWeight: 500, fontSize: "1rem" }}>
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                padding: "12px 16px",
                                borderRadius: "10px",
                                border: "1.5px solid #333",
                                background: "#232526",
                                color: "#fff",
                                fontSize: "1rem",
                                outline: "none",
                                marginBottom: "6px",
                                boxShadow: "0 1px 4px #0002",
                                transition: "border 0.2s, box-shadow 0.2s",
                            }}
                            required
                        />
                        <label htmlFor="password" style={{ color: "#bdbdbd", fontWeight: 500, fontSize: "1rem" }}>
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                padding: "12px 16px",
                                borderRadius: "10px",
                                border: "1.5px solid #333",
                                background: "#232526",
                                color: "#fff",
                                fontSize: "1rem",
                                outline: "none",
                                marginBottom: "12px",
                                boxShadow: "0 1px 4px #0002",
                                transition: "border 0.2s, box-shadow 0.2s",
                            }}
                            required
                        />
                        <button
                            type="submit"
                            style={{
                                background: "linear-gradient(90deg, #232526 0%, #414345 100%)",
                                color: "#fff",
                                fontWeight: 600,
                                fontSize: "1.1rem",
                                border: "none",
                                borderRadius: "10px",
                                padding: "12px 0",
                                marginTop: "8px",
                                boxShadow: "0 2px 8px #0003",
                                cursor: "pointer",
                                letterSpacing: "0.5px",
                                transition: "background 0.2s, box-shadow 0.2s",
                            }}
                        >
                            Register
                        </button>
                    </form>
                    <div style={{ marginTop: '18px', textAlign: 'center' }}>
                        <span style={{ color: '#bdbdbd', fontSize: '1rem' }}>
                            Already registered?{' '}
                            <Link to="/login" style={{ color: '#ffc107', textDecoration: 'underline', fontWeight: 600 }}>
                                Login here
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        );

    
}

export default RegisterForm;