import { useState } from "react"
import Post from "./Post"

export const Posts = () => {

    const [ posts, setPosts ] = useState([])

    useState( () => {
        (async ()=>{
            const res = await fetch('https://romp-router-backend.onrender.com/post/')
            if(res.ok){
                const data = await res.json()
                setPosts(data.reverse());
                return
            }
            console.error('failed to get posts')
        })()
    }, [])
  
    return (
      
        <div >
            {posts.length > 0 ? posts.map((post) => {
                return <Post key={post.id} post={post} />
            }) : <p>No Posts to Display</p>}
        </div>
            
    )
}