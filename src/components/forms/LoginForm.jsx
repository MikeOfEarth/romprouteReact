import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';

import { UserContext } from "../../contexts/UserContext"
import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';


export default function HomeLoginForm() {
  
    toast.done('totally')
    const [ isLogging, setIsLogging ] = useState(false)
    const [ user, setUser ] = useState({username:'',password:'',token:''})

    const { updateUser, user: userState } = useContext(UserContext)
    const navigate = useNavigate()

    if( isLogging ){
        console.log(user, 'user info');
        loginUser()
    }

    async function getUser(username){
        const res = await fetch('http://127.0.0.1:5000/user/'.concat(username))
        if (res.ok) {
            const data = await res.json()
            console.log(data);
            return data
        }
    }

    async function loginUser(){
        console.log(user, 'from req==========');
        const res = await fetch('http://127.0.0.1:5000/login',{
            method : "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        if (res.ok){
            const data = await res.json()

            if(data.token){
                const userData = await getUser(user.username)
                
                toast.success(user.username.concat(' logged in!'))
                updateUser({ username: user.username, token: data.token })
                
                navigate('/router')
                return
            }
        }
        toast.error('Invalid User Info/ Try Again')
        console.error("Login failed")
        setIsLogging(false)
    }

    useEffect(()=>{
        if (userState.username){
            navigate('/home')
            return
        }
    },[])

    function handleSubmit(e){
        e.preventDefault()
        const loginElement = e.currentTarget
        const loginForm = new FormData(loginElement)
        console.log(loginForm)
        setUser(
            Object.fromEntries(loginForm)
        )
        setIsLogging(true)        
    }
    return (
    <>
    <div id="homepageLogin">
        <h1>Get Out There</h1>
        <form action="" id='login-form' onSubmit={handleSubmit}>
            <label htmlFor="username"></label>Username<br />
            <input type="text" name='username'/><br />
            <label htmlFor="password"></label>Password<br />
            <input type="password" name={'password'} /><br />
            <div id="lowerform">
                <input type="submit" value={'Login'} id='loginFormSubmit'/>
                <Nav.Link href="/register" id='loginFormRegister'>...or Register</Nav.Link>
            </div> 
        </form>        
    </div>
    </>
  )
}
