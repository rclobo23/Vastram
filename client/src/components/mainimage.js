import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isBrowser, isMobile, MobileOnlyView } from "react-device-detect";
import LoadingGif from './Loading-gif';
import ButtonLinkGenderPage from './Button-link-gender-page'
import Image, { Shimmer } from 'react-shimmer';
import HeadingStyle from './headstyle'
import {Animated} from "react-animated-css";
import CarouselHomepage from './Carousel-homepage'


class MainImage extends Component {

    constructor(props){
      super(props);
      this.state = {     
      bg: 'https://firebasestorage.googleapis.com/v0/b/ariesfashion5.appspot.com/o/images%2Fheader?alt=media&token=cf1f832e-88d0-4d0d-9750-54ac971593ae',
      mbg:'https://firebasestorage.googleapis.com/v0/b/ariesfashion5.appspot.com/o/images%2Fmobile?alt=media&token=aa566f44-84cc-4357-8f49-fba6d064c11e' ,
      mainimage:"https://firebasestorage.googleapis.com/v0/b/vastramproject.appspot.com/o/images%2Fmainheader?alt=media&token=dbdc67fc-f57e-4563-9842-d4b3e1f43dfa" 
    };
   
    };

    render() {
      
       const bannerCoverPc = {
        backgroundImage: 'linear-gradient(0deg, #000, #000c) ,url(/images/bg.jpg)',
         backgroundSize: 'contain',
         height: '67vh',
        }
      const bannerCoverMobile = {
          backgroundImage: 'linear-gradient(10deg, #000, #000e) ,url(/images/bg.jpg)',
          backgroundSize: 'contain',
          
        }
      
 return(
  <div className="animated fadeIn row mx-0" style={isMobile? bannerCoverMobile : bannerCoverPc}>
    <Animated style={isMobile?{
      display:'flex',
          flexFlow:'column-reverse wrap'}:""} className="col-md-6 text-center" animationIn={isMobile?"zoomIn":"zoomIn"} animationOut="fadeOut" isVisible={true} >
    
          <div className="my-4">
  {/* <img src={this.state.mainimage} classname="offset-4" style={{width:'80%'}}/> */}
  <video width={isMobile?"320":"480"} height={isMobile?"240":'260'} autoPlay={false} controls={true}>
    <source src="/images/video.mp4" type="video/mp4"/>
    <img src={this.state.mainimage} classname="offset-4" style={{width:'80%'}}/>
  </video>
   </div>
         <div className={isMobile?"d-flex flex-row-wrap justify-content-around":''}>
              <ButtonLinkGenderPage gender={'men'} content='Mens' className="animated slideInDown" /> 
              <ButtonLinkGenderPage gender={'women'} content='Womens' className="animated slideIn" />
        </div>
    </Animated>    
    <div className="col-md-6 mt-0 ">
      <div style={{height:'40vh', }}>
     {/*  <MobileOnlyView><HeadingStyle color="white" headtext="Trending"/></MobileOnlyView> */}
        <CarouselHomepage/>
        </div>
    </div>
  </div>
   )
 }

}
export  default MainImage
