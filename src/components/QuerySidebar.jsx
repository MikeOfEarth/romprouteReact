import { useContext } from 'react'
import { QueryContext } from '../contexts/QueryContext'
import { Button, Container } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { nanoid } from 'nanoid'
import { useLocation } from 'react-router-dom'


export default function QuerySidebar() {

  const { updateQueryList, queryList : activeList } = useContext(QueryContext)
  function listAdder(e){
    
    let category=e.target.value
    if (activeList.length>=3){
      toast.error("Let's start with just three spots")
    } else {
      if (category!='SUPRISE'){
        updateQueryList({'category':category,'pQid':nanoid()} )
      } else {
        let suprise = Math.floor(Math.random()*2)+1
        console.log(suprise)        
        switch (suprise){
          case 1:
            updateQueryList({'category':'Bar','pQid':nanoid()})
            break;
          case 2:
            updateQueryList({'category':'Nightlife','pQid':nanoid()})
            break;
        }
      }
      
    }
  }

  function checkState(){
    console.log(activeList)    
  }

  return (
    <Container className='flex-column sidebar' id='querySidebar'>
      {useLocation().pathname=='/router'?  
        <>
          <h2>Add your stops here</h2>
          <hr></hr>
          <Container id='queryButtonStack'>
            <Button variant="outline-light" value={'Bar'} onClick={listAdder}>BAR</Button>
            <Button variant="outline-light" value={'Restaurant'} onClick={listAdder}>RESTAURANT</Button>
            <Button variant="outline-light" value={'Nightlife'} onClick={listAdder}>NIGHTLIFE</Button>
            <Button variant="outline-light" value={'SUPRISE'} onClick={listAdder}>SUPRISE ME</Button>
          </Container>
        </>:<>
          <h2>Add your stops here</h2>
          <hr></hr>
          <Container id='queryButtonStack'>
            <Button variant="outline-light" value={'Bar'} onClick={listAdder}>BAR</Button>
            <Button variant="outline-light" value={'Restaurant'} onClick={listAdder}>RESTAURANT</Button>
            <Button variant="outline-light" value={'Nightlife'} onClick={listAdder}>NIGHTLIFE</Button>
            <Button variant="outline-light" value={'SUPRISE'} onClick={listAdder}>SUPRISE ME</Button>
          </Container>
        </>}
        {/* <button onClick={checkState}> checker</button> */}
    </Container>
  )
}