import React from "react";
import {Grid, Col, Row, Jumbotron} from "react-bootstrap";
let FontAwesome = require('react-fontawesome');
export default class HomePage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Jumbotron style={styles.jumbotronStyles}>
          <h1>Welcome To TourneyBrag</h1>
          <p>TourneyBrag is a website targeted toward competitive video game players and competition organizers. It will track player performance,
            styles, and interactions with other players while simplifying the process of organizing competitions and tournaments. Its goal is to
            provide an intuitive interface and continuous moderated service to players and organizers, to be valuable to all members of the
            competitive video-gaming community, and to be robust enough to handle the demands of an evolving and growing industry.</p>
        </Jumbotron>
        <Grid fluid>
          <Row style={styles.section}>
            <Col md={6}>
              <h3>Join Tournaments</h3>
              <FontAwesome
                  name='globe'
                  size='4x'
                  spin
                  style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
              />
              <hr style={styles.darkColor}/>
              <p>Tourneybrag offers you the ability to join tournaments to face-off against a players from around the world!</p>
            </Col>
            <Col md={6}>
              <h3>Interact With Players</h3>
              <FontAwesome
                  name='users'
                  size='4x'
                  style={{ textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)" }}
              />
              <hr style={styles.darkColor}/>
              <p>Do you want to view the stats of other players? How about becoming a player's fan? Or leaving comments for another
                 to see? Tourneybrag allows you to do all of that.</p>
            </Col>
          </Row>
          <Row style={styles.section}>
            <Col md={6}>
              <h3>Become A Player</h3>
              <FontAwesome
                name="gamepad"
                size="4x"
                style={{textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)"}}
              />
              <hr style={styles.darkColor} />
              <p>And join other gamers in tournaments featured around the world while showing off your awesome gaming stats!</p>
            </Col>
            <Col md={6}>
              <h3>Become An Organizer</h3>
              <FontAwesome
                  name="list-alt"
                  size="4x"
                  style={{textShadow: "0 1px 0 rgba(0, 0, 0, 0.1)"}}
              />
              <hr style={styles.darkColor} />
              <p>To create and host tournaments for players to join and compete in!</p>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const styles = {
  jumbotronStyles: {
    textAlign: "center",
    backgroundColor: "#3498db",
    color: "#ecf0f1",
    marginBottom: 0 + "px"
  },
  section: {
    textAlign: "center",
    backgroundColor: "#dddddd",
    padding: 20 + "px"
  },
  columnStyles: {
      fontSize: 1.5 + "rem",
      lineHeight: 1.5
  },
  buttonStyles: {
      backgroundColor: "#3498db",
      color: "#ecf0f1"
  },
  darkColor: {
    borderColor: "#222222"
  }
}