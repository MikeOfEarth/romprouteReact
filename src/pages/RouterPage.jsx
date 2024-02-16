import Header from '../components/Header'
import Body from '../components/Body'
import PlaceQuery from '../components/PlaceQuery'
import QueryProvider, { QueryContext } from '../contexts/QueryContext'
import QueryContainer from '../components/QueryContainer'
import { useEffect, useState, useContext } from 'react'
export default function RouterPage() {
  
  const {setSendQuery, setQueryList} = useContext(QueryContext)

  useEffect(() => {setSendQuery([])},[])
  useEffect(() => {setQueryList([])},[])
  
  return (
    <>  
      <Header/>
      <Body imgTag='src\assets\block2.png' qSidebar={true} pSidebar={false}>
        <QueryContainer> 
        </QueryContainer>
      </Body>
    </>  
  )
}
