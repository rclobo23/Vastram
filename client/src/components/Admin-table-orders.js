import React, { Component } from 'react';
import axios from 'axios';
import { Table, ModalHeader, Modal, ModalBody, Button , Badge} from 'reactstrap';
import{Link} from 'react-router-dom';
import moment from 'moment'

export default class AdminTableOrders extends Component {
  constructor(props){
    super(props);
    this.state={
      apiList: [],
      current:1,
      modal:false,
      sending:false
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

  getAPI = ()=>{
    this.setState({apiList:[]})
    axios.get('/api/orders')
    .then(data=>{

      this.setState({ apiList:data.data })
    })
  }


 approveOrder = (id)=>{
  this.setState({sending:true})
    
  axios.post('/api/approveorder/'+id, {
    status:'approved'
  })
    axios.post('/mail/mail',{
      user:this.state.apiList[this.state.current].customerinfo.email,
      subject : "Aries - Order has been Approved",
      html:"<h4 align=center>Your order ("+this.state.apiList[this.state.current].ref+") has been approved.</h4><br><p> You will get your order delivered within "+this.state.expdelivery+ "business days.</p><br><br><a href='https://ariesfashion.herokuapp.com/order/"+this.state.apiList[this.state.current].ref+"'> Check your order status</a>"
    })
    .then((data)=>{
      console.log(data)
      this.setState({sending:false})
    })
  }

  deliverOrder = (id)=>{
    this.setState({sending:true})
    axios.post('/api/approveorder/'+id, {
      status:'delivered'
    })
    this.setState({sending:false})
    axios.post('/mail/mail',{
        user:this.state.apiList[this.state.current].customerinfo.email,
        subject : "Aries Fashion - Order was delivered",
        html:"<h2 align=center>Your order ("+this.state.apiList[this.state.current].ref+") was delivered. We hope you had a great experience shopping with us. For feedback or complaints contact <a href='tel:0820- 2528724'>0820- 2528724</a>. please leave a review at our website."
      })
      .then((data)=>{
        console.log(data)
        this.setState({sending:false})
    })
  
    this.current(0)
    this.getAPI();
  }
  current = (index)=>{
    this.setState({current:index})
    this.setState({modal:!this.state.modal})
    console.log(this.state.current)
  }
  changeExpDelivery = (e)=>{this.setState({expdelivery:e.target.value})}
  render() {
    const stylesColor = (color) => ({
      textDecoration: 'underline',
      textDecorationColor: color
    })
    const { stylesTab1 } = this.props
    const { apiList } = this.state

    
    return (
     <div style={{paddingTop: '50px', paddingBottom:'50px', background: "#fff", fontSize:"12px"}}>
       <h1 className="d-inline mr-3">Customer orders</h1> <Button onClick={()=>this.getAPI()}><span className={this.state.apiList<1 ?"fa fa-refresh fa-spin":"fa fa-refresh "} /></Button>
       {apiList.length == 0?<h1> No orders yet</h1> : 
      <Table responsive striped hover size="sm">
        <thead style={stylesTab1}>
          <tr >
            <th>#</th>            
            <th>Ref</th>
            <th>Payment ID</th>
            <th>Date</th>
            <th>Order Amount</th>
            <th>First Name</th>
            <th>Status</th>
 
          </tr>
        </thead>
        <tbody>
        {
          apiList.map((x, index)=>
          
              <tr key={x._id} onClick={()=>this.current(index)}>
              <th scope="row">{index+1}</th>              
              <td>{x.ref}</td>
              <td>{x.payment_id}</td>
              <td>{moment.utc(x.createdAt).format("MM-D-YYYY, h:mm:ss a")}</td>            
              <td>{'Rs.'+(x.totalAmount/100).toFixed(2)}</td>
              <td>{x.customerinfo.firstName}</td>     
              <td>{x.approved===undefined?<Badge color="warning">Pending</Badge>:x.approved==="approved"?<Badge color="warning">Approved</Badge>:x.approved==="delivered"?<Badge color="success">Delivered</Badge>:<Badge color="danger" className="fa fa-warning">Error</Badge> }</td>       
            </tr>
            )
          }
        </tbody>
      </Table>
  }
  {this.state.apiList.length == 0?"":
  <Modal isOpen={this.state.modal} backdrop={true} toggle={()=>this.current(0)}>
    <ModalHeader>
      <small>id:{apiList[this.state.current].ref}</small><small>{apiList[this.state.current].approved===undefined?<Badge color="warning">Pending</Badge>:apiList[this.state.current].approved==="approved"?<Badge color="warning">Approved</Badge>:apiList[this.state.current].approved==="delivered"?<Badge color="success">Delivered</Badge>:<Badge color="danger" className="fa fa-warning"> Error</Badge>  }</small>
    </ModalHeader>
    <ModalBody>
      <div className="row my-1">
    {apiList[this.state.current].order.map((item)=>{
      return(
        <div className="card col-md-5 shadow-sm py-3 px-2 m-2">x{item.quantity}
        <b><p>{item.titleItem}</p></b>
       <small><p>{item.selectedSize+" | "+item.selectedColor}</p>
     </small>
        </div>
    )
    })}  
    <div className="col-md-5 py-3 px-2 m-2">
    <p><small>ordered on:</small>{moment.utc(apiList[this.state.current].createdAt).format("MM-D-YYYY, h:mm:ss a")}</p>       
    <p><small>Total Amount:</small><b>{apiList[this.state.current].totalAmount}</b></p> 
    {apiList[this.state.current].approved ===undefined ? <div><Badge color="warning" className="rounded ">Pending</Badge> <br/>
    expected delivery (in days):<input type="text" value={this.state.expdelivery} onChange={this.changeExpDelivery}/>
    <Button onClick={()=>this.approveOrder(apiList[this.state.current]._id)}><span className={this.state.sending?"fa-gear fa-spin":''}/>Approve Order</Button> </div> :

    apiList[this.state.current].approved ==="approved"? <div><Badge color="primary" className="rounded ">Approved</Badge><Button onClick={()=>this.deliverOrder(apiList[this.state.current]._id)}>
      <span className={this.state.sending?"fa-gear fa-spin":''}/>Delivery Completed</Button>    </div>:
    apiList[this.state.current].approved ==="delivered"? <Badge color="success" className="rounded ">delivered</Badge>: <small className="text-danger fa fa-warning">Error</small>
     }

    </div>
    </div><hr/>
    <div className="row my-1 px-2">
    
        <Table style={{fontFamily:'Open Sans , sans-serif', fontSize:'0.7rem'}}> <tbody>
           <tr><td>{apiList[this.state.current].customerinfo.email}</td></tr>
        <tr><td>{apiList[this.state.current].customerinfo.firstName}</td> 
              <td>{apiList[this.state.current].customerinfo.lastName}</td></tr>            
           <tr> <td>{apiList[this.state.current].customerinfo.address1 + ' ' +apiList[this.state.current].customerinfo.address2}</td> 
             <td>{apiList[this.state.current].customerinfo.city}</td>
              <td>{apiList[this.state.current].customerinfo.province}</td></tr> 
              <tr><td>{apiList[this.state.current].customerinfo.postalCode}</td>
              <td>{apiList[this.state.current].customerinfo.country}</td></tr>
             <tr> <td>{apiList[this.state.current].customerinfo.phoneNumber}</td></tr></tbody></Table>
             
    </div>
    </ModalBody>
  </Modal>
  }
      </div>
    )
  }
};
