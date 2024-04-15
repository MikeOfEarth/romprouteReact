import { Container, Navbar, NavbarBrand } from "react-bootstrap"
import { NavLink } from "react-router-dom"

import { UserContext } from "../contexts/UserContext"
import { useContext } from "react"


export default function Header() {

  const {user} = useContext(UserContext)

  return (
    <Navbar id="headerBar">
      <Container id="logoSide">  
        <NavbarBrand as={NavLink} to='/' id="logo">
          <img
          alt=""
          src="https://i.imgur.com/WtiDITL.png"
          width="85"
          height="45"
          className="d-inline-block align-top"
          />
        </NavbarBrand>
      </Container>
      <Container id="menuCluster">
        <NavLink to='/home'>Feed</NavLink>
        <NavLink to='/router'>Router</NavLink>
        {user.username?
              <></>:
              <NavLink to='/' id='conditionalHeaderLogin'>Login</NavLink>}

        <NavbarBrand as={NavLink} to='/user' id="profilePic">
        <Container id="headerNameIdentifier">
            {user.username?
              <>
                <h4 id="headerUsername">{user.username}</h4><br/>
                <p>logged in</p>
              </>:<></>}
          </Container>          
          {user.picture?
            <>            
              <img id="proPic"
              alt=""
              src={user.picture}
              width="45"
              height="45"
              className="d-inline-block align-top"
              />
            </>:
            <>
              <img id="proPic"
              alt=""
              src="https://i.imgur.com/Y3dJG7O.png"
              width="45"
              height="45"
              className="d-inline-block align-top"
              />
            </>
          }
        </NavbarBrand>
      </Container>
    </Navbar>
  )
}
