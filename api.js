// let url = 'https://api.tomtom.com/search/2/geocode/http://localhost:5173/router.json?key=9cGI8U6eZFYxKL1GVOszIUGkPUFEhpsU'

// async function test(){
//     const res = await fetch(url)
//     if (res.ok){
//         const data = await res.json()
//         console.log(data)
//         return    
//     } 
//     console.error('failed to find place data')}

// test()
// let check='2300'
// let check2='2300'

// function timeChange(time){
//     let hr=time.slice(0,2)
//     let min=time.slice(2)
//     let shift=' am'
//     console.log(hr+' '+min)
//     if (Number(hr)>=12){
//         shift=' pm'
//         if (Number(hr)>12){
//             hr=Number(hr)-12
//             if (hr==12){
//                 shift=' am'
//             }
//         }        
//     } else {
//         if (hr[0]==0){
//             hr=hr.slice(1)
//         }        
//     }
//     console.log(`${hr}:${min}${shift}`)
    
//     return `${hr}:${min}${shift}`
// }
// timeChange(check2)

const res = await fetch("https://graph.facebook.com/v18.0/222242247647915/messages", {
  body: { "messaging_product": "whatsapp", "to": "15185261424", "type": "template", "template": { "name": "hello_world", "language": { "code": "en_US" } } },
  headers: {
    Authorization: "Bearer EAAZB0EEGrSL0BOZCjxbRgA45eCr9K3c4CoJgpNwUVvRmvJZCNsuewMXLgIQ5GdSRF5uxv8eVi3ANuoO98z6N12I4oBAy6t2zzMYGViUhfnKrioSA1P5ZA8kRLBxrLWH4CYdoI6UWpFvZCT953hqNpSJvs6LU8TOjw2CWjjFOMFBHmb3NBjmVCKClsUnfRsXELX899GUvZCVYs7JQLCi1cZAG6wZD",
    "Content-Type": "application/json"
  },
  method: "POST"
})

console.log(res)

