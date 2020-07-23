import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isBrowser, isMobile } from "react-device-detect";
import LoadingGif from './Loading-gif';
import ButtonLinkGenderPage from './Button-link-gender-page'
import Image, { Shimmer } from 'react-shimmer'


class Bannertext extends Component {

    constructor(props){
      super(props);
      this.state = {
       bannertext:''
      };
      
    };
    componentDidMount() {
    fetch(`/api/variables`)
    .then(response => {        
      return response.json();
    })
    .then((data) => {      
      this.setState({
        bannertext: data[0].bannertext                   
        })
      });  
  }

    render() {
 
 return(
  this.state.bannertext ?
    <p className="text-center mb-0 py-1" style={{wordSpacing:'1px',background:'lightcoral', color:"#000", width:'100%', fontFamily:'Open Sans'}}><small>{this.state.bannertext}</small></p>
    :<div/>
   )
 }

}
export  default Bannertext
