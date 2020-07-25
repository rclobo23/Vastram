import PropTypes from 'prop-types';
import React from 'react'
import { Table, Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const propTypes = {
  getCart: PropTypes.array.isRequired,
  addToCart: PropTypes.func.isRequired,
  deleteFromCart: PropTypes.func.isRequired,
  deleteALlFromCart: PropTypes.func.isRequired,
};

const styles = {
  centerh1: {
    textAlign: 'center',
    padding: '30px'
  },
  images: {
    width: '30px'
  },
  checkoutBtn: {
    textAlign: 'right'
  },
  btnIncrement: {
    color: '#072a48',
    backgroundColor: 'white',
    border: 'solid',
    borderColor: '#072a48',
    width: '30px',
    cursor: 'pointer',
    borderWidth: '0.1ex'
  },
  btnDelete: {
    color: 'white',
    backgroundColor: '#072a48',
    border: 'solid',
    borderColor: '#072a48',
    width: '30px',
    cursor: 'pointer',
    borderWidth: '0.1ex'
  },
  containerPadding: {
    paddingTop: '70px',
    paddingBottom: '150px'
  }
}

const Cart = ({
  getCart, 
  addToCart, 
  deleteFromCart,
  deleteALlFromCart
}) => {


  const { centerh1, images, checkoutBtn, btnIncrement, btnDelete, containerPadding } = styles
  const reducePrice = (getCart.reduce((acc, x) => (acc + (x.quantity * x.price)), 0))
  
  return (
    
    getCart.length ==0 ?<div className="d-flex justify-content-center align-items-center flex-column" style={{minHeight:'90vh',  backgroundImage: 'linear-gradient(10deg, #000, #000c) ,url(/images/bg.jpg)',
    backgroundSize: 'contain',}}><h4 className=" text-white">No items in your cart.<br/></h4><Link to="/"><Button size="lg" className="bg-warning mt-5" style={{color:'#000'}}>Shop Now</Button></Link> </div>:
    <div style={containerPadding}>
      <Container>     
     <h1 style={centerh1}>Your Cart</h1>
        <Table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {
            getCart.sort((a, b) => a._id === b._id ? a.selectedSize === b.selectedSize ? a.selectedColor < b.selectedColor : a.selectedSize < b.selectedSize : a._id < b._id).map(x => 
              <tr>
                <td>
                  <img style={images} src={x.images[0]} alt=""/>
                  <p><b>{x.title}</b> | {x.selectedSize} | {x.selectedColor}</p>
                </td>
                <td>
            <p>{x.special?<b>Rs.{x.price}</b>:<p><b>Rs.{x.price}</b><sup><small><span className=" bg-success text-white">10% off</span></small></sup></p>}</p>
                </td>
                <td>
                  <p><button style={btnIncrement} onClick={()=>addToCart(x)}>+</button><b>{' '+x.quantity+' '}</b><button style={btnIncrement} onClick={()=>deleteFromCart(x)}>-</button></p>
                </td>
                <td>
                  <p><button style={btnDelete} onClick={()=>deleteALlFromCart(x)}>x</button></p>
                </td>
              </tr>
            )
          }
           {/*  <tr>
              <td></td><td></td>
              <td>
                <b>Subtotal</b>
              </td>
              <td>
                <b> Rs.{reducePrice}</b>
              </td>
            </tr>
            <tr>
              <td></td><td></td>
              <td>
                <b>Shipping</b>
              </td>
              <td>
                <b>Rs. 0</b>
              </td>
            </tr> */}
            <tr>
              <td></td><td></td>
              <td>
                <b>Total</b>
              </td>
              <td>
                <b>Rs.{reducePrice} </b><small>(Inclusive of GST)</small>
              </td>
            </tr>            
          </tbody>
        </Table>
        <div className="row">
<div className="col-md-8"><small>Your Discount:</small>
   <small className="text-primary wow animated zoomIn"> 10% off on select products.<br/> {reducePrice>4000 && reducePrice<5000 ?`Shop for Rs.${5000-reducePrice} more and get extra 5% discount.`:reducePrice>8000 && reducePrice<10000?`Shop for Rs.${10000-reducePrice} more and get extra 5% discount.`:reducePrice>5000 && reducePrice<10000?"Extra 5% Off.":reducePrice>10000?"Extra 5% Plus 5% off.":''}</small>
</div>
        <div className="col-md-4" style={checkoutBtn}>
          <Link to="/checkout"><Button >Check out</Button></Link>
        </div>
        </div>
    
      </Container>
    </div> 
  )

}

Cart.propTypes = propTypes;

export default Cart;
