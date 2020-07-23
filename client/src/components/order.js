import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import moment from 'moment';
import {FiTruck} from 'react-icons/fi'
import {GoVerified, GoPackage} from 'react-icons/go'

import StarRatings from "react-star-ratings";
import LoadingGif from './Loading-gif'
import {
  isMobile
} from "react-device-detect";
import { Link } from 'react-router-dom';
import {Container, Badge, Input, Form, FormGroup, Label, Button} from 'reactstrap';
import Particles from 'react-particles-js';
class order extends Component {
  constructor(props){
    super(props);
    this.state={
      apiList: []
    }
  }

  async componentDidMount() {
    try {
      const response = await axios.get(`/api/orders/${this.props.match.params.pid}`)
      const apiList = await response.data;
      !apiList ?  window.location.href = "/notfound":'';
      this.setState({ apiList })
      console.log(apiList)      
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const stylesColor = (color) => ({
      textDecoration: 'underline',
      textDecorationColor: color
    })
    const { stylesTab1 } = this.props
    const { apiList } = this.state
    return (
     <div style={{paddingTop: '20px', paddingBottom:'20px', minHeight:'100vh',  background: "#fff",}}>
      <div className="d-flex flex-row p-1  my-3 justify-content-center align-items-center"> 
     
     <GoVerified  className="display-4" style={{color:this.state.apiList.approved==undefined || this.state.apiList.approved=="approved" || this.state.apiList.approved=="delivered"?"dodgerblue":'grey'}} /><hr  style={{width:'20vw',margin: '1rem 2rem'}}  />
     <FiTruck className="display-4" style={{color:this.state.apiList.approved=="approved"|| this.state.apiList.approved=="delivered"?"dodgerblue":'grey'}} /><hr  style={{width:'20vw',margin: '1rem 2rem'}}  />
     <GoPackage className="display-4" style={{color:this.state.apiList.approved=="delivered"?"dodgerblue":'grey'}} />
   </div>
    <div id="printableForm" className="d-flex flex-column" style={{textAlign:'center', alignItems:'center', justifyContent:'center'}}>
         <img src="/images/HD.jpg" width="100" />
         <p>   Thank you for shopping with us.<br/> Your order has been {this.state.apiList.approved==undefined?"placed": this.state.apiList.approved}. </p>           
      </div>
      

       {apiList.length == 0?<h1> <LoadingGif/></h1> : 
      <div className="container my-2 px-md-5">
          <Table className="offset-md-2 col-md-8 text-left rounded bordered"><tbody>
              <tr><td>Ref.No : </td><td>{this.state.apiList.ref}</td></tr>             
              <tr><td>Ordered On:</td><td>{moment.utc(this.state.apiList.createdAt).format("MM-D-YYYY, h:mm:ss a")}</td></tr>
              <tr><td>Order:</td><td>{this.state.apiList.order.map(item=> <div>{`x${item.quantity} - ${item.titleItem}  ([${item.selectedSize}, ${item.selectedColor}] Rs.${item.price})`}<small>id: {item.idItem}</small></div>)}</td></tr>
              <tr><td>Amount:</td><td>{'Rs.'+this.state.apiList.totalAmount}</td></tr>
              <tr><td>Delivery Amount:</td><td>{'Rs.'+this.state.apiList.totalDelivery}</td></tr>
              <tr><td>Email: </td><td>{this.state.apiList.customerinfo.email}</td></tr>
              <tr><td>Name:</td><td>{this.state.apiList.customerinfo.firstName+" "+this.state.apiList.customerinfo.lastName}</td></tr>             
              <tr><td>Address:</td><td>{this.state.apiList.customerinfo.address1 + ' ' +this.state.apiList.customerinfo.address2}</td></tr>       
              <tr><td>City</td><td>{this.state.apiList.customerinfo.city}</td></tr>
              <tr><td>PostalCode</td><td>{this.state.apiList.customerinfo.postalCode}</td></tr>
              <tr><td>Contact</td><td>{this.state.apiList.customerinfo.phoneNumber}</td></tr>
              </tbody></Table>
               </div>
  }
  <Button onClick={()=>window.location.href="/"} className="bg-primary fa fa-home offset-1"> Go to Homepage </Button> 
  <Button onClick={()=>window.print()} className="bg-primary fa fa-home offset-1 mr-2 fa fa-download"> Print Order form</Button> 

      </div>
    )
  }
};
export default order;