
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
  toggle: PropTypes.func.isRequired,
  step3: PropTypes.bool.isRequired,  
  step3Unlock: PropTypes.bool.isRequired, 
  getUserAddress: PropTypes.object.isRequired, 
  onSubmitOrder: PropTypes.func.isRequired
};

const CheckoutStepThree = ({
  styles,
  step3,
  step3Unlock,
  toggle,
  getUserAddress,
  onSubmitOrder,
  selectorTotalAmountCart,
  totalDelivery,
  openCheckout,
  amount,
  gst,
  discount,
  offerTotal,
  nonOfferTotal
}) => {

  const { 
  address1,
  address2,
  city,
  country,
  firstName,
  lastName,
  phoneNumber,
  postalCode,
  province
} = getUserAddress
const netamt = selectorTotalAmountCart+totalDelivery-(nonOfferTotal*(discount/100))
  return (
    <div style={styles.collapsePannel}>
      <ListGroupItem disabled={!step3} >
          <h4 style={styles.collapasePannelTitle} onClick={()=>step3Unlock && toggle('step3')} >
            <Badge color="secondary" pill size='sm'>3</Badge>  Confirm Details
          </h4>
        <Collapse isOpen={step3}>  {/*step3 */}
        <Row>
          <Col md="6">
            <h4>Delivery address:</h4>
            <table className="p-3">
            <tr><td>First Name: </td><td> <b>{firstName}</b></td></tr>
            <tr><td>Last Name:  </td><td><b>{lastName}</b></td></tr>
            <tr><td>Tel:  </td><td><b>{phoneNumber}</b></td></tr>
            <tr><td>Country: </td><td> <b>{country}</b></td></tr>
            <tr><td>City: </td><td> <b>{city}</b></td></tr>
            <tr><td>State/Province: </td><td> <b>{province}</b></td></tr>
            <tr><td>Postal Code:  </td><td><b>{postalCode}</b></td></tr>
            <tr><td>Address:  </td><td><b>{address1 + ' ' + address2}</b></td></tr>
            </table>
          </Col>
          <Col md="6">
         
          <div>
          <Button  className="bg-success" onClick={()=> {/* openCheckout();  */onSubmitOrder()} }>Place order</Button> 
        </div>
          </Col>
        </Row>
        </Collapse>
      </ListGroupItem>
    </div>
  )
}

CheckoutStepThree.propTypes = propTypes;

export default CheckoutStepThree
