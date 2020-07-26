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
    <Row>
  <Col xs={6}  md={3} className="text-small">
    <div style={{paddingTop:'10px'}}>Contact </div>
        <div style={{paddingTop:'10px'}}><small><a href="tel:99166 20394">99166 20394</a> </small></div>
        <div className="mt-3" style={{paddingTop:'1px', textAlign: 'left',}}><a href="https://instagram.com/myindiaoffers"><span className="fa fa-instagram mx-2 " style={{color:"#000"}}/></a><span className="fa fa-facebook mx-2 " style={{color:"#000"}}/> <span className="fa fa-youtube-play mx-2" style={{color:"#000"}}/><span className="fa fa-envelope mx-2" style={{color:"#000"}}/><span className="fa fa-phone mx-2" style={{color:"#000"}}/></div>
        <div style={{ paddingTop:'10px'}}><small>Your address here <br/> address line 2</small></div>
  </Col>
  <Col xs={6}  className="text-small border-left pl-4 mt-5">
  <div style={{ paddingTop:'10px'}}><small>Privacy Policy</small></div>
        <div style={{ paddingTop:'10px'}}><small>Terms and Conditions</small></div>
        <div style={{ paddingTop:'10px'}}><small>Developed by <a href="https://www.myindiaoffers.com/">WAR</a></small></div>
        </Col>
   </Row>
</Container>
  </div>    
)

export default Footer