import Header from '../components/Header'
import Body from '../components/Body'
import PlaceQuery from '../components/PlaceQuery'
import QueryProvider from '../contexts/QueryContext'
import QueryContainer from '../components/QueryContainer'
import { APIContext } from '../contexts/APIContext'
import { useContext, useEffect } from 'react'

export default function PostPage() {
  

  return (
    <>  
      <Header/>
      <Body imgTag='src\assets\block3.png' qSidebar={false} pSidebar={true}>
        <QueryContainer> 
        </QueryContainer>
      </Body>
    </>  
  )
}