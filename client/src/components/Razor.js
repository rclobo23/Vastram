class Razor extends React.Component {
    state = {
      amount: 0
    };
  
    constructor() {
      super()
      
      this.openCheckout = this.openCheckout.bind(this);
    }
  
    changeAmount(e) {
      this.setState({amount: e.target.value})
    }
  
    openCheckout() {
      let options = {
        "key": "YOUR_KEY_ID",
        "amount": this.state.amount, // 2000 paise = INR 20, amount in paisa
        "name": "Merchant Name",
        "description": "Purchase Description",
        "image": "/your_logo.png",
        "handler": function (response){
          alert(response.razorpay_payment_id);
        },
        "prefill": {
          "name": "Harshil Mathur",
          "email": "harshil@razorpay.com"
        },
        "notes": {
          "address": "Hello World"
        },
        "theme": {
          "color": "#F37254"
        }
      };
      
      let rzp = new Razorpay(options);
      rzp.open();
    }
    
    render () {
      return (
        <div>
          <button onClick={this.openCheckout}>Pay Rs. {this.state.amount/100}</button> 
        </div>
      )
    }
  }
  
 export default Razor
  