import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isBrowser, isMobile } from "react-device-detect";
import LoadingGif from './Loading-gif';
import ButtonLinkGenderPage from './Button-link-gender-page'
import Image, { Shimmer } from 'react-shimmer'

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
    Row,
    Col,
    Button,
    Card, 
    CardImg, 
    CardBody, 
    Alert,
    Container
  } from 'reactstrap';
  
  const styles = {
    cardTitle: {
      display: 'flex',
      justifyContent: 'center',
      fontSize: '20px'
    },
    cardBtn: {
      textAlign:'center'
    },
    card: {
      margin: '20px',
      alignItems: 'center',
      justifyContent:'center',
    }
  };
  
  
class SpecificGender extends Component {

    constructor(props){
      super(props);
      this.state = {
       dataload:[], 
       payload:[],  
       catname:'',
       image:''
      };
      
    };
    componentDidMount() {
    var cardTitle = [] , imgSrc = []
    fetch(`/api/subcats/${this.props.gender}`)
    .then(response => {        
      return response.json();
    })
    .then((data) => {      
      this.setState({
        catname: data.catname,
        image:data.images,
        dataload: data.subcats.map(item=>({
          cardTitle: item,                     
        }))
      });
    return this.state.dataload
    })
    .then((dataload) => {  
dataload.map((item)=>{
  fetch(`/api/category/imgfromtag/${item.cardTitle}`)
  .then(response => {       
    return response.json()
  })
  .then((data) => {     
     data.tags.map((item , i)=>(
        cardTitle.push(item)  ,
        imgSrc.push(data.images[i])                  
      ))
      this.setState({
        payload: cardTitle.map((item, i)=>({
          cardTitle: item,      
          imgSrc: imgSrc[i]           
        }))
      });   
      console.log(this.state.payload);   
    })
  .catch((err)=> console.log("err", err))
})
    });

  }

  componentWillReceiveProps() {
    var cardTitle = [] , imgSrc = []
    fetch(`/api/subcats/${this.props.gender}`)
    .then(response => {        
      return response.json();
    })
    .then((data) => {      
      this.setState({
        dataload: data.subcats.map(item=>({
          cardTitle: item,                     
        }))
      });
    return this.state.dataload
    })
    .then((dataload) => {  
dataload.map((item)=>{
  fetch(`/api/category/imgfromtag/${item.cardTitle}`)
  .then(response => {        
    return response.json();
  })
  .then((data) => {     
     data.tags.map((item , i)=>(
        cardTitle.push(item)  ,
        imgSrc.push(data.images[i])                  
      ))
  .catch((err)=>console.log("err", err))
      this.setState({
        payload: cardTitle.map((item, i)=>({
          cardTitle: item,      
          imgSrc: imgSrc[i]           
        }))
      });   
      console.log(this.state.payload);   
    });
})
    });

  } 

    render() {
    const {dataload, payload} = this.state;
    const gender = this.props.gender 
    const cards = payload.map(x => {
    return(
        <Col md="4" style={styles.card} key={x.imgSrc}>
        
            <div className="shadow mx-2 mt-3 my-1" style={styles.cardBtn} onClick={()=>oneKeywordForFilter(x)}>
              <Link to={`/productslist/${x.cardTitle}/`}>
                <CardImg src={x.imgSrc} alt="Card image cap"  />
                  <b> {x.cardTitle} </b>
              </Link>
            </div>  
        
      </Col>
   )
    })
    return(
    <div>
      <div style = {{display:'flex',height:'50vh', flexFlow:isMobile?'row nowrap':'column nowrap', width:'90%',}}> {cards}</div>
    </div>
    )
  }
} 
export default SpecificGender;
