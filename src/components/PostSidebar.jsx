import { useContext, useState, useRef } from 'react'
import { APIContext } from '../contexts/APIContext'
import { Button, Container, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { nanoid } from 'nanoid'
import { useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import { MdOutlineMail } from "react-icons/md";
import emailjs from '@emailjs/browser';
import EmailForm from './forms/EmailForm'




export default function PostSidebar() {

  
  const navigate = useNavigate()
  const {postPlaces} = useContext(APIContext)
  const {user:activeUser} = useContext(UserContext)
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function checkState(){
    console.log(postPlaces)    
  }

  
  async function createPost(){
    console.log(postPlaces)
    console.log(activeUser)
    
    
    const res = await fetch('http://127.0.0.1:5000/post/',{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${activeUser.token}`
        },
        body: JSON.stringify({places_list: postPlaces})
    })
    if(res.ok){
        const data = await res.json()
        console.log(data);
        toast.success('Post created!')
        navigate('/home')
    }
    console.error('Post failed')
  }

  


  return (
    <Container className='flex-column sidebar' id='postSidebar'>
      {activeUser.username?  
        <>
          <h2>Post or Share?</h2>
          <hr></hr>
          <Container id='queryButtonStack'>
            <Button variant="outline-light" value={'Post'} onClick={createPost}>POST</Button>
            <Button variant="outline-light" value={'Share'} onClick={handleShow}>SHARE <MdOutlineMail /></Button>
          </Container>
        </>:<>
          <h2>Share Post or Log In to Save</h2>
          <hr></hr>
          <Container id='queryButtonStack'>
            <Button variant="outline-light" value={'Login'} onClick={()=>{navigate('/')}}> LOGIN </Button>
            <Button variant="outline-light" value={'Share'} onClick={handleShow}>SHARE <MdOutlineMail /></Button>
          </Container>
        </>}
        <Modal id="textPopup" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Share your plans</Modal.Title>
          </Modal.Header>
          <Container>
            <EmailForm></EmailForm>
          </Container>
          <Modal.Footer>
            <Button variant="outline-danger" onClick={handleClose}>
              Close
            </Button>
            <Button variant="ouline-info" onClick={handleClose}>
              Send Info
            </Button>
          </Modal.Footer>
        </Modal>
        {/* <button onClick={checkState}> checker</button> */}
    </Container>
  )
}