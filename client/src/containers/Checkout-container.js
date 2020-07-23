import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import moment from 'moment'
import { Button} from 'reactstrap'
import {Link} from 'react-router-dom'
import { selectorTotalAmountCart } from '../selectors/selector_list_statistics';
import Checkout from '../components/Checkout';
import { addUserAddress } from '../actions/UsersActions';
//import Razorpay from ''


class CheckoutContainer extends Component {
  constructor(props){
    super(props);
    this.state={
      step1: true,
      step2: false,
      step2Unlock: false,
      step3: false,
      step3Unlock: false,
      email: '',
      emailIsValid: true,
      firstName: '',
      lastName: '',
      country: 'India',
      city: '',
      province: 'Karnataka',
      postalCode:'' ,
      phoneNumber:'' ,
      address1: '',
      address2: '',
      shippingMethod: 2,
      formIsValid: false,
      totalDelivery: 0, 
      openCheckout: 0,
      amount: 0,
      payment_id: '',
      gstperc:'',
      gst:0,
      netamt:0,
      discount:0,
      offerTotal:0,
      nonOfferTotal:0,
      extraDiscount:15,
      giftCard:false,
      modaldata:'',
      isOpen:false
    }
  };

componentDidMount(){
this.setState({offerTotal:this.props.getCart.reduce((p, x)=>x.special?p+(x.price*x.quantity):p ,0)})
  this.setState({nonOfferTotal:this.props.getCart.reduce((p, x)=>x.special?p:p+(x.price*x.quantity) ,0)})
 this.setState({gstperc:this.props.selectorTotalAmountCart>1000?12:5})
 this.setState({gst:this.props.selectorTotalAmountCart>1000?0.12*this.props.selectorTotalAmountCart:0.05*this.props.selectorTotalAmountCart})
this.setState({discount:this.state.nonOfferTotal>10000?this.state.extraDiscount:10})
}

  onChangeEmail = e => this.setState({ email: e.target.value})
  onChangeFirstName = e => this.setState({ firstName: e.target.value });
  onChangeLastName = e => this.setState({ lastName: e.target.value });
  onChangeCountry = e => this.setState({ country: e.target.value });
  onChangeCity = e => this.setState({ city: e.target.value });
  onChangeProvince = e => this.setState({ province: e.target.value });
  onChangePostalCode = e => this.setState({ postalCode: Number(e.target.value) });
  onChangePhoneNumber = e => this.setState({ phoneNumber: Number(e.target.value) });
  onChangeAdress1 = e => this.setState({ address1: e.target.value });
  onChangeAdress2 = e => this.setState({ address2: e.target.value });
  onChangeShipppingMethod = shippingMethod => this.setState({ shippingMethod });
  handleEmailValidation = emailIsValid => this.setState({ emailIsValid });
  formValidator = formIsValid => this.setState({ formIsValid });

  onChangeExtraDiscount = (a)=>{this.setState({extraDiscount:a}) 
  this.setState({discount:this.state.nonOfferTotal>10000?this.state.extraDiscount:10})
  a==10?this.setState({giftCard:true}):this.setState({giftCard:false})
}

  toggle = step => {
    step === 'step1' ? this.setState({ 
      step1: true,
      step2: false,
      step3: false
    }) : 
    step === 'step2' ? this.setState({ 
      step1: false,
      step2: true,
      step3: false
    }) :
    step === 'step3' && this.setState({ 
      step1: false,
      step2: false,
      step3: true
    }) 
  };

  stepsUnlock = step => {
    step === 'step2' ? this.setState({ step2Unlock: true, step1: false, step2: true, step3: false }) :
    step === 'step3' && this.setState({ step3Unlock: true, step1: false, step2: false, step3: true })
  };

sendMail = (ref)=>{
  const { getCart, selectorTotalAmountCart } = this.props;
  const {totalDelivery, nonOfferTotal, discount} = this.state;
  axios.post('/mail/mail',{
    user:this.state.email,
    subject: "Aries Fashion - Order Recieved from "+this.state.firstName,
    html:  `<h3>Dear ${this.state.firstName}, thank you for shopping with us. </h3>
    <h4>this is a self generated e-bill. for any queries email us at amrxth@gmail.com</h4><hr>
    <Table className="offset-md-2 col-md-6 text-left bordered rounded shadow card"><tbody>
    <tr><td>Ref.No : </td><td>${ref}</td></tr>             
    <tr><td>Ordered On:</td><td>${moment.utc(Date.now()).format("MM-D-YYYY, h:mm:ss a")}</td></tr>
    <tr><td>Order:</td><td>${getCart.map(item=> <div>{`x${item.quantity} ${item.idItem}(${item.titleItem}[${item.selectedSize}, ${item.selectedColor}] Rs.${item.price}) `}</div>)}</td></tr>
    <tr><td> Amount Payable:</td><td>Rs.${selectorTotalAmountCart+totalDelivery-(nonOfferTotal*(discount/100)).toFixed(2)}</td></tr>
    <tr><td>Email: </td><td>${this.state.email}</td></tr>
    <tr><td>Name:</td><td>${this.state.firstName+" "+this.state.lastName}</td></tr>             
    <tr><td>Address:</td><td>${this.state.address1 + ' ' +this.state.address2}</td></tr>       
    <tr><td>City</td><td>${this.state.city}</td></tr>
    <tr><td>PostalCode</td><td>${this.state.postalCode}</td></tr>
    <tr><td>Contact</td><td>${this.state.phoneNumber}</td></tr>
    </tbody></Table>
    <hr>
    <a href="https://ariesfashion.herokuapp.com/order/${ref}"> Check your order status</a>`})
    .then(data=> console.log(data))
}


    openCheckout() {
      const { getCart, selectorTotalAmountCart } = this.props;
      const {totalDelivery, nonOfferTotal, discount} = this.state;
      let options = {
        "key": "rzp_live_k0xSvNC8oSJfsg",
        "amount": selectorTotalAmountCart+totalDelivery-(nonOfferTotal*(discount/100))*100, // 2000 paise = INR 20, amount in paisa
        "name": "Aries fashion",
        "description": "Purchase",
        "image": "/images/HD.jpg",
        "handler": function (response){
          alert(response.razorpay_payment_id);
        },
        "prefill": {
          "name": this.state.firstName,
          "email":this.state.email,
        },
        "notes": {
          "address": this.state.address1
        },
        "theme": {
          "color": "#F37254"
        }
      };

      let rzp = new window.Razorpay(options);
      rzp.open();
    }

  onSubmitOrder = () => {
    const {discount, nonOfferTotal,  email, firstName, lastName, country, city, province, postalCode, phoneNumber, address1, address2, totalDelivery, giftCard } = this.state;
    const { getCart, selectorTotalAmountCart } = this.props;
    
    axios.post('/api/add/orders', {
      customerinfo: {email, firstName, lastName, country, city, province, postalCode, phoneNumber, address1, address2, giftCard},
      order: getCart.map(x => ({idItem: x._id, titleItem:x.title, selectedSize:x.selectedSize, selectedColor:x.selectedColor, price:x.price, quantity:x.quantity})), 
      totalDelivery,
      totalAmount: (selectorTotalAmountCart-(nonOfferTotal*(discount/100))).toFixed(2)*100,
    }).then(data=>{
      this.sendMail();
      this.openCheckout();
    })
    .catch(error => {
      console.log(error);
    });
  };
  
  render() {
    return (
      <div>
      { this.props.selectorTotalAmountCart>0 ?
      <Checkout 
        {...this.state} 
        {...this.props} 
        onChangeExtraDiscount = {this.onChangeExtraDiscount}
        onChangeFirstName={this.onChangeFirstName}
        onChangeLastName={this.onChangeLastName}
        onChangeCountry={this.onChangeCountry}
        onChangeCity={this.onChangeCity}
        onChangeProvince={this.onChangeProvince}
        onChangePostalCode={this.onChangePostalCode}
        onChangePhoneNumber={this.onChangePhoneNumber}
        onChangeAdress1={this.onChangeAdress1}
        onChangeAdress2={this.onChangeAdress2}
        onChangeShipppingMethod={this.onChangeShipppingMethod}
        stepsUnlock={this.stepsUnlock}
        toggle={this.toggle}
        onChangeEmail={this.onChangeEmail}
        handleEmailValidation={this.handleEmailValidation}
        formValidator={this.formValidator}
        onSubmitOrder={this.onSubmitOrder}
        openCheckout = {this.openCheckout}
        amount = {this.props.selectorTotalAmountCart+this.state.totalDelivery}
      />
      :
      <div style={{height:'100vh'}} className="mx-5  my-3  text-center">
       <h3 className="my-4"> Your Cart is Empty.</h3><br/>
        <Link to="/"><Button >Shop Now</Button></Link>
      </div>
  }
      </div>

    )
  }
};


const mapStateToProps = state => ({ 
  getCart: state.cartReducer,
  getUserAddress: state.getUserAddress,
  selectorTotalAmountCart: selectorTotalAmountCart(state)
});

const mapDispatchToProps = dispatch => ({
  addUserAddress: x => dispatch(addUserAddress(x))
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);

