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
      textAlign:'center', 
      width:'100%',
      background:'#fff'
    },
    card: {
      margin: isMobile?'20px':'30px',
      alignItems: 'center',
      justifyContent:'center',
      
    }
  };
  
  
class subcatsList extends Component {

    constructor(props){
      super(props);
      this.state = {
       dataload:[], 
       payload:[],  
       catname:'',
       image:'',
       gender:''
      };
      
    };
    componentDidMount() {
      this.setState({gender:this.props.match.params.gender})
    var cardTitle = [] , imgSrc = []
    fetch(`/api/subcats/${this.props.match.params.gender}`)
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

  componentWillReceiveProps(nextProps) {
    if(nextProps.match.params.gender !==this.props.match.params.gender){
    var cardTitle = [] , imgSrc = []
    fetch(`/api/subcats/${nextProps.match.params.gender}`)
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
      console.log(this.state.dataload)
    return this.state.dataload
    })
    .then((dataload) => {  
        dataload.map((item)=>{
          fetch(`/api/category/imgfromtag/${item.cardTitle}`)
          .then(response => {        
            console.log("response", response)
            return response.json();
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
  } 

    render() {
    const {dataload, payload} = this.state;
    const {gender} = this.state
    const cards = payload.map(x => {
    return(
        <Col md="3" style={styles.card} key={x.imgSrc}>
        
            <div className="shadow mx-md-4 mt-3 " style={styles.cardBtn} onClick={()=>oneKeywordForFilter(x)}>
              <Link to={`/productslist/${x.cardTitle}/`}>
                <CardImg src={x.imgSrc} alt="Card image cap"  />
                  <b> {x.cardTitle} </b>
              </Link>
            </div>  
        
      </Col>
   )
    })
    return(
    <div className="pt-3" style={{backgroundImage:`linear-gradient(to bottom, #fefefeaa, #fff)`}}>
      <h5 className="mx-4 mx-md-5 my-3" style={{ fontFamily:'Open Sans'}}><Link to="/" style={{color:'#000',}}><span className="fa fa-home"/></Link> › {this.state.catname} Collections</h5>
      <div className="container p-4" style = {{ display:'flex',minHeight:'100vh', flexFlow:'row wrap', width:'100%',}}> {cards}</div>
    </div>
    )
  }
} 
const mapDispatchToProps = dispatch => ({oneKeywordForFilter: x => dispatch(oneKeywordForFilter(x))});
const mapStateToProps = state => ({oneKeywordForFilter: state.oneKeywordForFilter});

export default connect(mapStateToProps, mapDispatchToProps)(subcatsList);;