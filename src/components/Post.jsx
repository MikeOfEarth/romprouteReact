import React from 'react'
import Place from './SinglePlace'
import { Container } from 'react-bootstrap'

export default function Post({post}) {
    console.log(post.places)
    return (
        <Container className="singlepost">
            <h2>{post.user.username} </h2><br />
            <div>
            {post['places'].length > 0 ? post['places'].map((place) => {
                return (
                    <>
                        <h4>{place.name}</h4>
                        <h3>{place.address}</h3>
                        <h3>{place.website}</h3>
                        <img src={place.photo}></img>
                    </>
                )
            }) : <></>}
            </div>
        

        </Container>
    )
}
