import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import {
  isMobile, MobileOnlyView, isBrowser
} from "react-device-detect";

const styles = {
    backgroundImage: 'linear-gradient(15deg, #fff, #fefefefe)',
    paddingTop: '50px',
    color: '#000',
    textAlign: 'left',
    zIndex:9999,
  }
 
const Footer = () => (
  <div style={styles}>
    <Container>
  <Row className="text-small">
        <Col md='8' style={{paddingTop:'10px'}}>Contact </Col> <Col md="4"/>
        <Col md='8' style={{paddingTop:'10px'}}><small><a href="tel:99166 20394">99166 20394</a> </small></Col>  <Col md="4"/>
        <Col md='8' style={{ paddingTop:'10px'}}><small>Privacy Policy</small></Col><Col md="4"/>
        <Col md='8' style={{ paddingTop:'10px'}}><small>WAR </small></Col> <Col md='8' style={{ paddingTop:'10px'}}><small>Terms and Conditions</small></Col>
        <Col md='8' style={{ paddingTop:'10px'}}><small>Your address here <br/> address line 2</small></Col> <Col md="4"/><Col md='8' style={{ paddingTop:'10px'}}><small>Developed by <a href="https://www.myindiaoffers.com/">WAR</a></small></Col><Col md="4"></Col>

      </Row>
    </Container>
  </div>    
)

export default Footer;