
import { useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { QueryContext } from '../contexts/QueryContext'
import { Button, Container } from 'react-bootstrap'
import { toast } from 'react-toastify'
import PlaceQuery from './PlaceQuery'
import Place from './Place'
import { nanoid } from 'nanoid'


export default function QueryContainer() {
    const { searchLocation, setSearchLocation, setSendQuery, sendQuery:apiCallList, setQueryList, queryList : activeList } = useContext(QueryContext)
    const navigate = useNavigate()
    const TTkey=(import.meta.env.VITE_TT_KEY)
     
    async function submitQuery(){
        if (searchLocation){
            // setSearchLocation(()=>{cityToLatLon(searchLocation)})
            let x=await cityToLatLon(searchLocation)
            setSearchLocation(x)
            
            navigate('/post')
        } else {
            toast.error('Please enter Location above')
        }
    }

    function backToQuery(){
        navigate('/router')
    }

    function deleter(e){
        setQueryList([])
        setSendQuery([])
    }

    function locationSet(e){
        setSearchLocation(e.target.value)
    }

    async function cityToLatLon(area){           
        let local = area.replace(/\s+/g, '%20')
        let url=`https://api.tomtom.com/search/2/geocode/${local}.json?key=${TTkey}`
        console.log(url)        
        const res = await fetch(url)
        if (res.ok){
            const data = await res.json()
            console.log(data.results[0].position)
            let latLon = `${data.results[0].position.lat},${data.results[0].position.lon}`        
            return latLon
        } 
        console.error('failed to find place data')}
    

    // function checkLocation(e){
    //     console.log(searchLocation)        
    // }
    return (
        <>  
            {useLocation().pathname=='/router'?
                activeList.length > 0 ? 
                    <div id='querySubmitDelete'>
                        <Button variant='outline-warning'  onClick={submitQuery}>Plan My Night</Button>
                        <Button variant="outline-danger" onClick={deleter}>Clear</Button>
                    </div>:<></>:<></>
                // <Button variant='outline-info' id='postSubmit'>Submit Post</Button>
            }
            {useLocation().pathname=='/router'?
                <Container id='queryContainer'>
                    <Container id='locationPlot'>
                    <label>Choose your location (City, State)<br/>
                        <input className='inputTime' placeholder='ex: Manhattan, NY' onChange={locationSet}></input>
                    </label>
                    {/* <button onClick={checkLocation}>location checker</button> */}
                </Container>
                {activeList.length > 0 ? 
                    activeList.map((queryPlace) => {
                    return <PlaceQuery key={queryPlace.placeData.pQid} category={queryPlace.placeData.category} pQid={queryPlace.placeData.pQid}/>
                }) : <p>[ - Please Add Stops To Begin - ]</p>}
            </Container>:useLocation().pathname=='/post'?
            <Container id='queryContainer'>
                {apiCallList.length > 0 ? 
                    apiCallList.map((placeCall) => {
                    return <Place key={nanoid()} location={searchLocation} data={placeCall}/>
                }) : <div id="emptyPostReturn">
                    <p>[ - Please Add Stops To Begin - ]</p>
                    <Button variant='outline-danger' onClick={backToQuery}>Return to Router</Button>
                </div>}
            </Container>:<></>}        
        </>
    )
}
