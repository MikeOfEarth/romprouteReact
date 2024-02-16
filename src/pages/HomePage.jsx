import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

import Header from '../components/Header'
import Body from '../components/Body'
import { Posts } from '../components/Posts'
import { Container } from 'react-bootstrap'
import PlaceQuery from '../components/PlaceQuery'

export default function HomePage({children}) {
  const { user } = useContext(UserContext)

  // useEffect(()=>{
  //   if (userState.username==false){
  //     useNavigate('/')
  //      return
  //   }
  // },[])

  const { updateUser, user: userState } = useContext(UserContext)
  console.log(user.username)

  return (
  <>
    <Header/>
           
    <Container className='posts'><Posts ></Posts></Container>
    
  </>
  )
}
