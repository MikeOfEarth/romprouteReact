import { useState, useContext } from "react"
import { APIContext } from "../../contexts/APIContext";
import emailjs from '@emailjs/browser';
import { toast } from "react-toastify";

export default function EmailForm() {
  const [fromName, setFromName] = useState('')
  const [toName, setToName ] = useState('')
  const [toEmail, setToEmail ] = useState('')
  const [sent, setSent ] = useState(false)
  const [ message, setMessage ] = useState('')
  const {postPlaces, setPostPlaces} = useContext(APIContext)
  const EJserve=(import.meta.env.VITE_EJ_SR)

  
  async function sendEmail(e){
    toast.success('Email Sent from'+fromName+' to '+toName)
    e.preventDefault()
    let messageString=''
    let from=fromName
    let to=toName
    let email=toEmail
    for (let i=0;i<postPlaces.length;i++){
        console.log(postPlaces)
        console.log(postPlaces[i].time)
        messageString+=(postPlaces[i]['name']+' at '+postPlaces[i]['address']+'\n')
        console.log(messageString)         
    }

    const datas={
        service_id: EJserve,
        template_id:"template_h785efe",
        user_id: 'VcIctpprWxL8gWztE',
        template_params: {
            from_name: from,
            to_name: to,
            message: messageString,
            to_email: email
        }
    }
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        type: 'POST',
        data: JSON.stringify(datas),
        contentType: 'application/json'
    })
    if (res.ok){
        console.log('message sent')
        return
    }
    console.log('errror again')  
  }

  return (
    <div>
        <h1>Who are you going to invite?</h1>
        <form action="" id='invite-form' onSubmit={sendEmail}>
            <label htmlFor="fromName"></label>From<br />
            <input type="text" name='fromName' onChange={setFromName}/><br />
            <label htmlFor="toName"></label>Invitee<br />
            <input type="text" name='toName' onChange={setToName}/><br />
            <label htmlFor="toEmail"></label>Email<br />
            <input type="text" name='toEmail' onChange={setToEmail}/><br />
            <input type="submit" value={'Invite'} id='loginFormSubmit'/>
        </form>
        {/* <button onClick={formatBody}>Set Message</button>         */}
    </div>
  )

}
