import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { isBrowser, isMobile } from "react-device-detect";
import LoadingGif from './Loading-gif';
import ButtonLinkGenderPage from './Button-link-gender-page'
import { connect } from 'react-redux';
import { 
  sortArgsForFilter, 
  keywordsForFilter, 
  actionSizeForFilter,
  oneKeywordForFilter, 
  fetchDataApi,
  actionPriceRangeFilter,
  actionFillFilters
} from '../actions/DataFetchingActions';
import { 
  Container,
  Row,
  Col
} from 'reactstrap';
import '../style/shimmer.css';

class  shopByBrand extends Component {

    constructor(props){
      super(props);
      this.state = {
       categories :[]
      };
    };
  

  componentDidMount() {
    fetch('/api/shopbybrand')
      .then(response => {        
        return response.json();
      })
      .then((data) => {        
        this.setState({
          categories: data.map(item=>({
            catname: item._id,            
            img:item.catimg,           
          }))
        });
      });
  }   

  render() {
    const {categories} = this.state;
        
const ShimmerCards = () =>{
  return(
    <div className="d-flex p-2">
    <div className="profilePic br animate w100 mx-2 my-2" style={{height:'100px', width:'100px'}}/>
    <div className="profilePic br animate w100 mx-2 my-2" style={{height:'100px', width:'100px'}}/>
    <div className="profilePic br animate w100 mx-2 my-2" style={{height:'100px', width:'100px'}}/>
    <div className="profilePic br animate w100 mx-2 my-2" style={{height:'100px', width:'100px'}}/>
    <div className="profilePic br animate w100 mx-2 my-2" style={{height:'100px', width:'100px'}}/>
</div>
  )
}
    const cards = categories.map(x => { 
    return(  
      x.catname == null || x.catname == "" ? "":    
      <Link to={`/brand/${x.catname}`}>
        <div className=" wow animated slideInRight shadow-sm rounded-circle mx-2 mx-md-3 mb-3 text-center d-flex" 
            style = {{width: isMobile?'25vw':'10vw',
            color:'#fff',
            height:isMobile?'25vw':'10vw',            
            background:`#f${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}b`,
            alignItems: 'center',
            justifyContent:'center'}}>
          {x.catname}   
          </div>
      </Link>      
      )
    
    })
    return(
      <div className="container" style = {{display:'flex',
                     flexFlow:'row wrap', 
                      background:'#ffff0',
                      justifyContent: 'left'}}>{categories.length>1  ? cards:<ShimmerCards/>}</div>
    )
  }
} 

export default shopByBrand;