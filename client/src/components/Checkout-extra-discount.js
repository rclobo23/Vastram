
import PropTypes from 'prop-types';
import React from 'react'
import { 
  Badge, 
  Button, 
  ListGroupItem, 
  Collapse,
  Col,
  Row
} from 'reactstrap';

const propTypes = {
  
  onChangeExtraDiscount: PropTypes.func.isRequired
};

const CheckoutExtraDiscount = ({
 onChangeExtraDiscount, extraDiscount, giftCard
}) => {

//const netamt = selectorTotalAmountCart+totalDelivery-(nonOfferTotal*(discount/100))
  return (
    <div >
      <Row>
      <Col md="12" className=" my-3 mx-3 px-2 py-3">
          <h5>Congratulations! you have recieved 5% additional discount.</h5>
          <small>You can redeem this in 2 ways</small>
          <div className='d-flex justify-content-left my-4'>
              <Col md="4" className={`shadow-sm rounded borderd mx-2 px-3 py-2 ${extraDiscount==10 &&`border-primary`}`} onClick={()=>onChangeExtraDiscount(10)}>
              {extraDiscount==15 && <span className="fa fa-check text-primary"/>}  Get 5% off on your next purchase in our store 
             <br/> <small>A Discount Voucher will be sent with this order</small>

              </Col>
              <Col md="4" className={`shadow-sm bordered rounded mx-2 px-3 py-2 ${extraDiscount==15 &&" border-primary"}`} onClick={()=>onChangeExtraDiscount(15)}>
              {extraDiscount==10 && <span className="fa fa-check text-primary"/>}  Get Additional 5% off on this purchase.
              </Col>
              </div>
      </Col>
    </Row>
         </div>
  )
}

CheckoutExtraDiscount.propTypes = propTypes;

export default CheckoutExtraDiscount
