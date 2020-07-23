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

class  shopByNew extends Component {

    constructor(props){
      super(props);
      this.state = {
       categories :[]
      };
    };
  

  componentDidMount() {
    fetch('/api/productsdata')
      .then(response => {        
        return response.json();
      })
      .then((data) => {        
        this.setState({
          categories: data.map(item=>({
            _id: item._id,
            price: item.price, 
            img:item.images[0],  
            title: item.title,    
            sizes: item.size,     
          }))
        });
      });
  }   

  render() {
    const {categories} = this.state;
    const shimmerstyle = {
      height:isMobile?'40vw':'40vh',
       width:isMobile?'40vw':'20vw'
    }
    const ShimmerCards = () =>{
      return(
        <div className="d-flex p-2">
        <div className="comment br animate w100 mx-2 my-2" style={shimmerstyle}/>
        <div className="comment br animate w100 mx-2 my-2" style={shimmerstyle}/>
        <div className="comment br animate w100 mx-2 my-2" style={shimmerstyle}/>
        <div className="comment br animate w100 mx-2 my-2" style={shimmerstyle}/>
        <div className="comment br animate w100 mx-2 my-2" style={shimmerstyle}/>
    
    </div>
      )
    }
    const cards = categories.map(x => {
    return(
      <Link to={`/item/${x._id}/${x.title.split(' ').join('-')}`}>
      <div className=" wow animated slideInRight shadow-sm rounded mx-3 mb-5 p-1" 
          style = {{width: isMobile?'55vw':'20vw',
          background:'#000',
          color:'#fff',
          alignItems: 'justify',
          justifyContent:'left'}}>  
    <img  style = {{position:'relative',
                    width:'100%',
                    height:'100%',                    
                }} src={x.img}/>
    <p className="d-inline my-3 mx-2" style={{position:'relative', fontSize: '20px', width: 'fit-content', background:'darkred',  color: 'white', fontWeight:"bold", textDecoration:'none'}}>₹{x.price}</p>
    { x.sizes.length> 0 &&  x.sizes.map((item, i)=> i<5 && <small>{item}{i<x.sizes.length-1 && " | "}</small>)}
             </div> </Link>
    )
    })
    return(
      <div style = {{display:'flex',
      flexFlow:'row nowrap', 
       background:'#fff',
       justifyContent: 'left'}}>{categories.length>0?cards:<ShimmerCards/>}</div>
    )
  }
} 

export default shopByNew;