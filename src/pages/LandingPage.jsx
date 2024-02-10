import { Container } from "react-bootstrap"

import HomeLoginForm from "../components/forms/LoginForm"

export default function LandingPage() {
  return (
    <div id="landingPage">
        <Container id="landingOverlay">
            <Container id="textStack">
                <h1 id="mainText">ROMP <br/>
                ROUTER</h1>
                <HomeLoginForm/>
            </Container>
            <h2>Skip the planning on your next...</h2>
            <Container id="rollControl">
              <ul id="rollingList">
                <li className="rollingItem">Pub Crawl</li>
                <li className="rollingItem">Date Night</li>
                <li className="rollingItem">Club Hopping</li>
                <li className="rollingItem">Girls Night Out</li>
              </ul>
            </Container>
            <Container id="landingUnderText">
              <h3>Less "I don't care where we go" so you can get on with your night</h3>
            </Container>
        </Container>
    </div>
  )
}
