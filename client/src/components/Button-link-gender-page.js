import PropTypes from 'prop-types';
import React from 'react'
import {
  isMobile
} from "react-device-detect";
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom' 

const propTypes = {
  gender: PropTypes.string.isRequired
};

const styles = (imgsrc) => ({
  centerButtons: {
    textAlign: 'center',
    padding: '30px',
    height: '350px'
  },
  buttonStylePc: {
    margin:'10px',
    padding: '5px 10px',
    background:'#000',    
    color:'#c6a45b',
    border: '0px', 
     borderRadius:'20px 0px 20px 0px', 
    boxShadow:'-3px 3px 0px 0px #c6a45b, 3px -3px 0px 0px #c6a45b',
    
  },
  buttonStyleMobile: {
    width:'23vw',
    margin:'5px',
    padding: '5px 5px ',    
    marginTop: "20px",
    background:'#000',    
    color:'#c6a45b',
    border: '0px', 
    borderRadius:'20px 0px 20px 0px', 
    boxShadow:'-3px 3px 0px 0px #c6a45b, 3px -3px 0px 0px #c6a45b',
  }
})

const ButtonLinkGenderPage = ({gender, content=gender}) => {

  const {buttonStylePc, buttonStyleMobile } = styles
  const g_id = gender==='men'?'5e4aac0b4ce4394540654b41':
  gender==='women'?'5e4aacf04ce4394540654b42':
  '5deb348532d44a0424c736fa'
  return <Link to={`/category/${g_id}`} className="text-white"><Button size="md" color="light" style={isMobile ?styles(`/images/${gender}Cat.jpg`).buttonStyleMobile : styles(`/images/${gender}Cat.jpg`).buttonStylePc} >{content}</Button></Link>
}

ButtonLinkGenderPage.propTypes = propTypes;

export default ButtonLinkGenderPage