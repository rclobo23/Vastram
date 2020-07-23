import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import {
  isMobile, MobileOnlyView, isBrowser
} from "react-device-detect";

const styles = {
    backgroundImage: 'linear-gradient(0deg, #dddd, #fff)',
    padding: '30px 5px 10px 5px', 
    color: '#000',
    textAlign: 'left',
  }
 
const Footer = () => (
  <div style={styles}>
    <Container>
      <Row>
        <Col md='12' style={{textAlign: 'center', paddingBottom:'1px'}}><b><small>All rights reserved</small></b></Col>
      </Row> 
      <Row>
        <Col md='12' style={{textAlign: 'center', paddingTop:'5px', paddingBottom:'5px'}}>Vastram Fashions</Col>
        <Col md="12" className="mt-3" style={{paddingTop:'1px', textAlign: 'center',}}><a href="https://instagram.com/myindiaoffers"><span className="fa fa-instagram mx-2 " style={{color:"#000"}}/></a><span className="fa fa-facebook mx-2 " style={{color:"#000"}}/> <span className="fa fa-youtube-play mx-2" style={{color:"#000"}}/><span className="fa fa-envelope mx-2" style={{color:"#000"}}/><span className="fa fa-phone mx-2" style={{color:"#000"}}/></Col>
      </Row>
 </Container>
  </div>    
)

export default Footer;