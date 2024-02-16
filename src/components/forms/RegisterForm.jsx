import { useState } from "react"
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate()
    const [user, setUser] = useState({ username: '', email: '', password: '' })
   
    async function registerUser(){
        const res = await fetch('http://127.0.0.1:5000/register',{
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        if(res.ok){
            const data = await res.json()
            console.log(data);
        }
    }

    function handleSubmit(e){
        e.preventDefault()
        registerUser()
        toast.success(`${user.username} created`)
        console.log(user, 'form submitted');
        setUser({username:'',email:'',password:''})
        navigate('/')
    }

    return (
        <Container id="registerForm">
            <h3>Register</h3>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label><br />
                <input className='formatInput' type="text" name='username' value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}  required/><br />
                <label htmlFor="email">Email</label><br />
                <input className='formatInput' type="email" name='email' value={user.email} onChange={(e)=> setUser({...user, email: e.target.value})} required/><br />
                <label htmlFor="password">Password</label><br />
                <input className='formatInput' type="password" name='password' value={user.password} onChange={(e)=> setUser({...user, password: e.target.value})} required/><br />
                <input type="submit" id="regSubmit" value={'Register'}/>
            </form>
        </Container>
    )

}