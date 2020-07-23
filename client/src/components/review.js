import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import StarRatings from "react-star-ratings";
import {
  isMobile
} from "react-device-detect";
import { Link } from 'react-router-dom';
import {Container, Badge, Input, Form, FormGroup, Label, Button} from 'reactstrap';
import Particles from 'react-particles-js';

class  review extends Component {
  constructor(props){
    super(props);
    this.changeRating = this.changeRating.bind(this);
    this.state={
      apiList:[],
      rating:0,
      Name:'',
      Review:'',
      stars:0,
      product:[]
        }
  }

  changeRating( newRating) {
    this.setState({
      rating: newRating, 
    });
}

onSubmit = (rating, Name, Review, product) => {    
    axios.post('/api/review', {
      Name,
      rating,
      Review , 
      product ,
    })
    .then(
        localStorage.setItem("review", Name)
      //window.location.reload(true)
    )
    .catch(function (error) {
      console.log(error);
    });
  }

  async componentDidMount() {
    try {
      const response = await axios.get('/api/review')
      const apiList = await response.data;
      apiList && this.setState({ apiList })
      this.setState({stars :((this.state.apiList.map((item)=>item.rating).reduce((a, b) => a+b , 0))/this.state.apiList.length)})
    } catch (error) {
      console.log(error);
    }
  }
  onChangeName = (e) => this.setState({Name: e.target.value})
  onChangeReview = (e) => this.setState({Review: e.target.value})
  

  render() {
    const stylesColor = (color) => ({
      textDecoration: 'underline',
      textDecorationColor: color
    })

    const { stylesTab2 } = this.props
    const { apiList, Name, Review, rating, stars } = this.state
   const {admin} = this.props
   const star_component = <div style={{textAlign:'center', width:'100%'}}> { apiList.length>0? <StarRatings style={{color:'#fff', position:'absolute',
   padding:'20px', width:'100%',textAlign:'center'}}
    rating={stars}
           starDimension="15px"
           starSpacing="10px"
           starRatedColor="#ffbf00"            
           numberOfStars={5} 
name="rating" /> :'No reviews yet' } 
<Badge pill>{stars.toFixed(1)} /{apiList.length} reviews </Badge></div>
    return (
       admin=="true"?<div style={{paddingTop: '50px', paddingBottom:'50px'}}>
<h1> Vastram Fashions Customer Reviews </h1>
{star_component}
<Table responsive striped bordered hover size="sm" style={{fontSize:'14px'}}>
        <thead style={stylesTab2}>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Rating</th>
            <th>Review</th>
            <th>product</th>
            </tr>
        </thead>
        <tbody>
        {
          apiList.map((x, index)=>
            <tr key={x._id}>
              <th scope="row">{index+1}</th>
              <td>{x.Name}</td>
              <td><StarRatings  starDimension="15px" starRatedColor="#ffbf00" rating={x.rating}/></td>
              <td>{x.Review}</td>  
              <td>{x.product}</td>              
            </tr>
            )
          }
        </tbody>
      </Table>
       </div> :
        localStorage.getItem('review')!=null ? 
        <div style={{paddingTop: '5px', paddingBottom:'10px',position:'relative', background:'#000'}}>
            {star_component} <Particles  params={{
	    "particles": {
	        "number": {
	            "value": 10
	        },
	        "size": {
	            "value": 2
            },
            "color":{
                "value":"#ffbf00"
            },
	    },
	    "interactivity": {
	        "events": {
	            "onhover": {
	                "enable": true,
	                "mode": "push"
	            }
	        }
	    }
	}}/>
        <h2 style={{color:'#fff',padding:'20px', width:'100%',top:'30px',textAlign:'center', position: isMobile?'absolute':'', top:isMobile?'20px':'0px'}}>Your review has been submitted, {localStorage.getItem("review")}<br/><br/>
       <Button style={{ textAlign:'center'}} onClick={()=>localStorage.clear('review')} >
         <Link to="/" style={{color:'#fff', textDecoration:'none'}}>Go Home</Link></Button> 
       </h2></div>:
      <div style={{paddingTop: '5px', 
                  paddingBottom:'10px',
                  background:'#000'}}>
     <h3 style={{color:'#fff',
                padding:'20px',
                width:'100%',
                textAlign:'center'}}>
        Review {this.props.product?this.props.product.title: "Aries Fashion"}</h3>   
        {star_component}
   
    <Container style={{background:'#fff', padding:'20px 10px'}}>
    <Form >
        <FormGroup>
          <Label for="name">Your name</Label>
          <Input placeholder='Your name here' value={this.state.Name} onChange={this.onChangeName} />
        </FormGroup>
        <FormGroup>
        <StarRatings 
         rating={this.state.rating}
                starDimension="35px"
                starSpacing="5px"
                starRatedColor="#ffbf00"
                changeRating={this.changeRating}
                numberOfStars={5}
                name="rating" />
        </FormGroup>
        <FormGroup>
          <Label for="review">Review</Label>
          <Input placeholder='What do you have to say?' value={this.state.Review} onChange={this.onChangeReview} />
        </FormGroup>
        <FormGroup>
        <button style={{boxShadow: '4px 6px 0px 0px black',
    margin: '10px',
    outline: 'none',
    width: '90%',
    padding: '10px',
    textAlign: 'center',
    border: 'solid 2px #fff',
    color: '#000',
    fontWeight: 'bolder',
    textShadow: '1px 1px 1px #fff',
    backgroundColor: '#ffbf00'}} onClick={()=>this.onSubmit(
        rating, Name, Review , this.props.product?this.props.product._id:''
        )}>Submit Review</button>
        </FormGroup>
        </Form>
    </Container>
           </div>
    )
  }
}
export default review
