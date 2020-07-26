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

class  shopByPrice extends Component {

    constructor(props){
      super(props);
      this.state = {
       categories :[]
      };
    };
  

  componentDidMount() {
    fetch('/api/shopbyprice')
      .then(response => {        
        return response.json();
      })
      .then((data) => {        
data && 
        this.setState({
          categories: data.map(item=>({
            catname: item._id,
            price: item.price, 
            img:item.catimg,           
          }))
        });
      })
.catch((err)=>console.log(err))
  }   


  render() {
const shimmerstyle = {
  height:isMobile?'30vh':'50vh',
   width:isMobile?'40vw':'20vw'
}
    
const ShimmerCards = () =>{
  return(
    <div className="d-flex p-2">
    <div className="comment dark  br animate w100 mx-2 my-2" style={shimmerstyle}/>
    <div className="comment dark  br animate w100 mx-2 my-2" style={shimmerstyle}/>
    <div className="comment dark  br animate w100 mx-2 my-2" style={shimmerstyle}/>
    <div className="comment dark  br animate w100 mx-2 my-2" style={shimmerstyle}/>
    <div className="comment dark  br animate w100 mx-2 my-2" style={shimmerstyle}/>
</div>
  )
}
    const {categories} = this.state;
    const cards = categories.length>0 && categories.map(x => {
    return(
      <Link to={`/productslist/${encodeURI(x.catname)}`}>
        <div className=" wow animated slideInRight shadow-sm mx-md-3 mx-3 mb-5 px-md-1 px-3 py-1 text-center" 
            style = {{width: isMobile?'45vw':'15vw',
            color:'#c6a45b',
            background:'#000',
            border:'solid 0.5px #c6a45b',
            borderRadius:' 0px',
            height:'100px',
            alignItems: 'center',}}>
          <h6 className="text-uppercase text-center ">{x.catname}</h6> 
          <small className="text-upper"> starting from</small><br/>
          <p className="text-uppercase text-decoration-none h4  "> ₹{x.price}</p>   
          </div>
      </Link>
    )
    })
    return(
      <div style = {{display:'flex',
                     flexFlow:'row nowrap', 
                      background:'#ffff0',
                      justifyContent: 'left'}} className="my-4">{categories.length>1  ? cards:<ShimmerCards/>}</div>
    )
  }
} 

export default shopByPrice;