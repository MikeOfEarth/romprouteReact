import { useEffect, useState, useContext } from "react"
import { APIContext } from "../contexts/APIContext"
import { Button, Container } from "react-bootstrap"
import { FaShuffle} from "react-icons/fa6";
import { toast } from "react-toastify";
import { RotatingSquare } from "react-loader-spinner";
import { Checkmark } from 'react-checkmark'


export default function Place({location,data}) {
  const FSkey=(import.meta.env.VITE_FS_KEY)

  const pQid=(Object.keys(data)[0])
  const lat=location.split(' ')[0]
  const lon=location.split(' ')[1]
  
  let time= data[pQid].time
  let setTime = time
  if (setTime=='Now' || setTime=='Later'){
    setTime='open_now=true'
    console.log(setTime)
  } else {
    setTime=`open_at=6T${setTime}`
    console.log(setTime)
  }
  
  const categoryDict = {
    'Bar':{
      'Pub':"13018,13389,13006,13010,13007,13022",
      'Wine':'13008,13025',
      'Cocktail':'13021,13009,13017',
      'ANY':"13008,13025,13018,13389,13006,13010,13007,13021,13009,13017"},
    'Restaurant':{
      'American':'13068,13026,13314', 
      'Asian':"13263,13099,13289,13199",
      'Euro':'13236,13148,13310',
      'Hispanic':'13343,13297,13303'},
    'Nightlife':{
      'Music':"13017,13015,10039,10041,10040",
      'Comedy':'10010',
      'Nightclub':'10032,10013,10049',
      'ANY':'13017,13015,10039,10041,10040,10010,10032,10013,10049'}   
  }
  const mainCategory = data[pQid].category
  const catSetter = data[pQid].option  
  const catSet=categoryDict[mainCategory][catSetter]

  const [dataset, setDataset] = useState({})
  const [api, setApi ] = useState({place_id:'',name:'', address:'',photo:'',website:''})
  const [index , setIndex ] = useState(0)
  const [subCheck, setSubCheck] = useState(false)
  const {postPlaces, setPostPlaces} = useContext(APIContext)
  
  async function apiFillerOne(){
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `${FSkey}`
      }
    }
    let url = `https://api.foursquare.com/v3/places/search?query=${mainCategory}&ll=${location}&radius=10000&categories=${catSet}&exclude_all_chains=true&fields=fsq_id%2Cname%2Clocation%2Cdistance%2Cphotos%2Crating%2Cwebsite%2Cprice%2Ctastes&${setTime}&sort=RELEVANCE&limit=15`
    const res = await fetch(url,options)
    if (res.ok){
        const data = await res.json()
        console.log('data assignment from API call=====')        
        console.log(data)
        console.log(' ') 
        setDataset(data)
        return
    } 
    console.error('failed to find place data')
  }

  

  async function dataFiller(){

    let pullOne = {
      place_id:dataset.results[index].fsq_id,
      name:dataset.results[index].name,
      latlon:location,
      address:dataset.results[index].location.formatted_address,
      distance:(dataset.results[index].distance/1609).toFixed(1).concat(' mi'),
      price:(dataset.results[index].price),
      rating:`${dataset.results[index].rating}/10`,
      photo:dataset.results[index].photos[1].prefix+'400x400'+dataset.results[index].photos[1].suffix,
      website:dataset.results[index].website
    }
    
    console.log('   post assignment    ')
    setApi(pullOne)
  }
  
  useEffect(()=>{apiFillerOne()},[])
  useEffect(()=>{
    if (Object.keys(dataset).length>0){
      dataFiller()}},[index,dataset])
  useEffect(()=>{setPostPlaces([])},[])

  function shuffle(){
    if (index<=13){
      setIndex(index+1)
    } else {
      toast.error('Out of places, try a new search instead')
      setIndex(0)
    }
  }
  
  

  function timeChange(time){
    let hr=time.slice(0,2)
    let min=time.slice(2)
    let shift=' am'
    console.log(hr+' '+min)
    if (Number(hr)>=12){
        shift=' pm'
        if (Number(hr)>12){
            hr=Number(hr)-12
            if (hr==12){
                shift=' am'
            }
        }        
    } else {
        if (hr[0]==0){
            hr=hr.slice(1)
        }        
    }
    console.log(`${hr}:${min}${shift}`)
    
    return `${hr}:${min}${shift}`
  }

  function placeToPost(e){
    console.log(api)
    setSubCheck(true)
    toast.success((api.name).substring(0, 15)+' added')
    updatePostPlaces(api)
  }

  function updatePostPlaces(value) { 
    console.log('set post')
    console.log(value)    
    setPostPlaces([...postPlaces, value])
    }

  function checkPL(){
    console.log(postPlaces)
  }

  return (
    <>     
      <div className='placeQueryBox'>
      {subCheck==false?
        (api.photo? 
        <>
          {/* <Button onClick={dataFiller}></Button> */}
          {api.name==(api.name).substring(0, 35)?
          <h1 id="placeTitle">{(api.name).substring(0, 35)}</h1>
          :<h1 id="placeTitle">{(api.name).substring(0, 35)+'...'}</h1>}
          <img className="spotPhoto" src={api.photo} alt="" />
          <Container >
            {time=='Now' || time=='Later'?
              <h4>Eta: {time}</h4>:
              <h4>Eta: {timeChange(time)}</h4>}
            {api.distance+' away'}
          </Container>
          <Container className="bottomInfo" >
            <p>{api.rating}</p>
            <p>Price:{('$').repeat(api.price)}</p>
          </Container>
          <Container className="bottomInfo" >
            {api.website?
              <a target="_blank" href={api.website}>Website</a>:<></>}
            {api.address?
              <a target="_blank" href= {'https://www.google.com/maps/place/'+(api.address.replace(/\s+/g, '+').replace(/[{()}]/g, ''))}>Directions </a>:<></>}
          </Container>
          <Container>
            <Button className="placePost" variant='outline-warning' onClick={placeToPost}>Lock In</Button>
            <Button className="shuffleButt" variant='outline-danger' onClick={shuffle}>Shuffle <FaShuffle/></Button>  
          </Container>    
        </>:
        (<>
          <h2>Your night is<br/> now loading!</h2>
          <Container id="boxSpin">
            <RotatingSquare
            visible={true}
            height="150"
            width="150"
            color="#c1fff9"
            ariaLabel="rotating-square-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          </Container>
        </>)
        ):<div>
        <Checkmark size='xLarge'></Checkmark>
        <h4>Succesfully Added to Post</h4>
      </div>}
      {/* <Button onClick={checkPL}>checkSQ</Button> */}
      </div>
      
    </> 
  )
}

    {/* // .then(response => response.json())
    // .then(response => console.log(response))
    // .catch(err => console.error(err));
    // let url=`https://api.tomtom.com/search/2/poiSearch/${mainCategory}.json?key=${TTkey}&limit=15&countryset=US&lat=${lat}&lon=${lon}&radius=10000&categoryset=${catSet}&openingHours=nextSevenDays`
    // console.log(url)
    // const res = await fetch(url) */}