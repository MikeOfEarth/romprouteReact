import { useEffect, useState, useContext } from 'react'
import { Button, Container } from 'react-bootstrap'
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Checkmark } from 'react-checkmark'

import { QueryContext } from '../contexts/QueryContext';
import { toast } from 'react-toastify';

export default function PlaceQuery({category,pQid}) {
  
  
  const categoryDict = {
    'Bar':['Pub','Wine','Cocktail','ANY'],
    'Restaurant':['American','Asian','Euro','Hispanic'],
    'Nightlife':['Music','Comedy','Nightclub','ANY']   
  }

  const [subCheck, setSubCheck] = useState(false)
  const [results, setResults] = useState({[pQid]:{'category':category, 'time':0, 'option':''}})
  const { setQueryList, sendQuery, setSendQuery, updateSendQuery } = useContext(QueryContext)
  
  
  function updateResults( value ) { 
    setResults({[pQid]:{...value}})
    }
  
  function timeSet(e){
    let currentOption=results[pQid].option
    console.log(currentOption)
     
    updateResults({'category':category, 'time':e.target.value, 'option':currentOption})     
  }

  function optionSet(e){
    let currentTime=results[pQid].time
    console.log(currentTime)
    updateResults({'category':category, 'time':currentTime, 'option':e.target.value})     
  }


        
  function submitResults(e){
    console.log(results)
    setSubCheck(true)
    toast.success(results[pQid].option+' '+results[pQid].category+' added')
    updateSendQuery(results)
  }

  function checkSQ(e){
    console.log(sendQuery)    
  }

  

  return (
    <div className='placeQueryBox'>
      <h1>{category}</h1>
      {subCheck==false?<>
        <Container className='queryButtonContainer'>
            <ToggleButtonGroup type="radio" key={pQid} name={pQid+"placeOptions"} >
                <ToggleButton  variant="outline-light" key={pQid+"tbg-radio-1"} id={pQid+"tbg-radio-1"} onChange={optionSet} value={categoryDict[category][0]}>
                    {categoryDict[category][0]}
                </ToggleButton>
                <ToggleButton variant="outline-light" key={pQid+"tbg-radio-2"} id={pQid+"tbg-radio-2"} onChange={optionSet} value={categoryDict[category][1]}>
                    {categoryDict[category][1]}
                </ToggleButton>
                <ToggleButton variant="outline-light" key={pQid+"tbg-radio-3"} id={pQid+"tbg-radio-3"} onChange={optionSet} value={categoryDict[category][2]}>
                    {categoryDict[category][2]}
                </ToggleButton>
                <ToggleButton variant="outline-light" key={pQid+"tbg-radio-4"} id={pQid+"tbg-radio-4"} onChange={optionSet} value={categoryDict[category][3]}>
                    {categoryDict[category][3]}
                </ToggleButton>
            </ToggleButtonGroup>
        </Container>
        <Container>
            <DropdownButton variant="outline-info" id="dropdown-item-button" title="When do we start?">
                <Dropdown.Item as="button" value='Now' onClick={timeSet}>Now</Dropdown.Item>
                <Dropdown.Item as="button" value='Later' onClick={timeSet}>Later</Dropdown.Item>
            </DropdownButton>
        </Container>
        <Container>
            {results[pQid]['time']==='Later' || (results[pQid]['time'] && Number.isInteger(Number(results[pQid]['time']))) ?
            <>
                <label>Pick A Time (24h Format)<br/>
                    <input className='inputTime' placeholder='ex: 0500,2234' maxLength={4} minLength={4} onChange={timeSet}></input>
                </label>
            </>:results[pQid]['time']==='Now'?
            <>Now? Let's Go!</>:
            <>Please Pick A Time</>}
        </Container>
        {results[pQid]['time'] && results[pQid]['option']?<Button variant="outline-info" onClick={submitResults}>Looks Good</Button>:<></>}
        </>:<div>
          <Checkmark size='xLarge'></Checkmark>
          <h4>Succesfully Queued</h4>
        </div>}
        {/* <Button onClick={checkSQ}>checkSQ</Button> */}
    </div>
    
  )
}