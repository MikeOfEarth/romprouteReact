import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'

import QuerySidebar from './QuerySidebar'
import PostSidebar from './PostSidebar'

export default function Body({imgTag, qSidebar, pSidebar, children }) {

    return (
        <>
            <div id='underlay'>
                    <img id='bodyImage' src={imgTag} alt="" />
            </div>
            <Container id='body'>
                <Stack direction='horizontal' id='stack'>
                { qSidebar && <QuerySidebar /> }
                { pSidebar && <PostSidebar/>} 
                    <>
                        { children }
                    </>
                </Stack>
            </Container>
        </>
    )
}