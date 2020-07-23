import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Input , Col, Row} from 'reactstrap';

export default class AdminOrderDetails extends Component {
  constructor(props){
    super(props);
    this.state={
      apiList: [],
      fromdate: '',
      todate: '',
      loading:false
    }
  }

  async componentDidMount() {
    /* try {
      const response = await axios.get('/api/orders')
      const apiList = await response.data;
      this.setState({ apiList })
    } catch (error) {
      console.log(error);
    } */
  }
  onSubmit= (fromdate, todate)=>{
      this.setState({loading:true})
    const  from = new Date(fromdate);
    const  to = new Date(todate);
        axios.post('/api/ordersdate',
        {fromdate: from, todate: to})
        .then(response => {        
            console.log(response)
            this.setState({apiList:response.data})
      this.setState({loading:false})

          })
              
  }
onChangeFromDate = (e)=>{this.setState({fromdate:e.target.value})}
onChangeToDate = (e)=>{this.setState({todate:e.target.value}) && alert(this.state.todate)}
onChangeFromDateX = (e)=>{this.setState({fromdate:e})}
onChangeToDateX = (e)=>{this.setState({todate:e})}
  render() {
    const stylesColor = (color) => ({
      textDecoration: 'underline',
      textDecorationColor: color
    })
    const { stylesTab1 } = this.props
    const { apiList } = this.state
    return (        
     <div style={{paddingTop: '50px', paddingBottom:'50px', background: "#fff", fontSize:"12px"}}>
      <div className="container">
            <form>
        <Row form>
        <Col md={5}>
                <label>Enter start date:</label><Input type="date" value={this.state.fromdate} onChange={this.onChangeFromDate}></Input>
        </Col>
        <Col md={5}>
         <label>Enter End date:</label><Input type="date" value={this.state.todate} onChange={this.onChangeToDate}></Input>
        </Col> 
        <Col md={1}>
         <label> {this.state.loading && "loading"}  </label> <Button onClick={()=>this.onSubmit(this.state.fromdate, this.state.todate)}>Get Orders</Button>
        </Col> 
        </Row>
        <Row>
          <Col>
            <Button onClick={()=>this.onChangeFromDateX(new Date().setMonth(new Date().getMonth()-1)) ,()=> this.onChangeToDateX(new Date()) , ()=> this.onSubmit(this.state.fromdate, this.state.todate)}>This Month</Button>
          </Col>
        </Row>
            </form>
        </div>
       <h1>Customer orders</h1>
       {apiList.length == 0?<h1> No orders yet</h1> : 
      <Table responsive striped hover size="sm" style={{fontFamily:'Roboto' , size:'12'}}>
        <thead style={stylesTab1}>
          <tr >
            <th>#</th>
            <th>Id</th>
            <th>Ref</th>
            <th>Payment ID</th>
            <th>Date</th>
            <th>Order</th>
            <th>Order Amount</th>
            <th>Delivery Amount</th>
            <th>Email</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Country</th>
            <th>City</th>
            <th>Province</th>
            <th>Postal Code</th>
            <th>Phone Number</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
        {
          apiList.map((x, index)=>
            <tr key={x._id}>
              <th scope="row">{index+1}</th>
              <td>{x._id}</td>
              <td>{x.ref}</td>
              <td>{x.payment_id}</td>
              <td>{x.createdAt}</td>
              <td>{x.order.map(item=> <div>{`x${item.quantity} ${item.idItem}(${item.titleItem}[${item.selectedSize}, ${item.selectedColor}] Rs.${item.price}) `}</div>)}</td>
              <td>{'Rs.'+x.totalAmount}</td>
              <td>{'Rs.'+x.totalDelivery}</td>
              <td>{x.customerinfo.email}</td>
              <td>{x.customerinfo.lastName}</td>
              <td>{x.customerinfo.firstName}</td>
              <td>{x.customerinfo.country}</td>
              <td>{x.customerinfo.city}</td>
              <td>{x.customerinfo.province}</td>
              <td>{x.customerinfo.postalCode}</td>
              <td>{x.customerinfo.phoneNumber}</td>
              <td>{x.customerinfo.address1 + ' ' +x.customerinfo.address2}</td>
            </tr>
            )
          }
        </tbody>
      </Table>
  }
      </div>
    )
  }
};
