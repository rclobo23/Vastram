import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { isBrowser, isMobile , getUA, deviceDetect} from "react-device-detect";
import { Table , Row , Col, Button} from 'reactstrap';
import {Doughnut,Line} from 'react-chartjs-2';
import CountUp from 'react-countup';

export default class AdminDashboard extends Component {
  constructor(props){
    super(props);
    this.state={
      apiList: []
    }
  }

  async componentDidMount() {
    try {
      const response = await axios.get('/api/orders')
      const apiList = await response.data;
      this.setState({ apiList })
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const stylesColor = (color) => ({
      textDecoration: 'underline',
      textDecorationColor: color
    })
    const { stylesTab1 } = this.props
    const { apiList } = this.state
    const totalAmount = (apiList.reduce((acc, x) => (acc + (x.totalAmount)), 0))
    const totalGST = (apiList.reduce((acc, x) => (acc + (x.totalAmount>100?x.totalAmount*0.12:x.totalAmount*0.05)), 0))

    const card = {
        background:'#fff',
        borderRadius:'5px',
        boxShadow:'1px 1px 20px lightgray',
        width:'auto',
        color:'#7b0b9c' ,
        padding:'10px', margin:'10px',
        borderBottom:'solid 2px #2a1f83'
    }
    const big={
        fontSize:'32px',
        fontFamily:'montserrat',
        textAlign:'right',
        fontWeight:'400'
    }
    return (
     <div style={{paddingTop: '50px', paddingBottom:'50px', background: "#fff", fontSize:"12px"}}>
       <h1>Aries Dashboard</h1>
       {apiList.length == 0?<h1> No orders yet</h1> : <Row className='container'>
      <Col sm="4"  className="container" style={card}><p style={{width:'100%'}}>Total Orders:
            <CountUp delay={1} end={apiList.length} style={big}> {apiList.length}</CountUp></p>
            <Button size="sm" outline={false} style={{margin:'10px'}} onClick={this.props.changeTab}> Show all orders</Button>
            <Button size="sm" onClick={this.props.changexTab}  style={{margin:'10px'}} > Show Custom orders</Button>

      </Col>
      <Col sm="4" style={card} primary = "darkred">Total Amount:
            <CountUp delay={1} decimals={2} end={totalAmount} style={big}>Rs.{totalAmount}</CountUp></Col>
      <Col sm="4" style={card} primary = "purple" >Total GST:
            <CountUp delay={1} decimals={2} end={totalGST} style={big}> Rs.{totalGST}</CountUp></Col>

    </Row>}
   
    <Row className="container">
        <Col sm="2" style={card} primary = "dodgerblue" onClick={this.props.change5Tab}>
            Promotions & Trending
        </Col>  
        <Col sm="2" style={card} primary = "darkred" onClick={this.props.change7Tab}>
            User Reviews
        </Col> 
        <Col sm="2" style={card} primary = "coral" onClick={this.props.change6Tab}>
            Categories and sub - categories
        </Col>  
        
    </Row>
      </div>
    )
  }
};
