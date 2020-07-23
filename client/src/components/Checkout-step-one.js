import PropTypes from 'prop-types';
import React from 'react'
import { 
  Row, 
  Col, 
  Input, 
  Badge, 
  Button, 
  ListGroupItem, 
  Collapse, 
  Label, 
  CustomInput, 
  FormFeedback
} from 'reactstrap';
import { Link } from 'react-router-dom';

const propTypes = {
  email: PropTypes.string.isRequired, 
  step1: PropTypes.bool.isRequired, 
  toggle: PropTypes.func.isRequired,
  stepsUnlock: PropTypes.func.isRequired,
  onChangeEmail: PropTypes.func.isRequired,
  emailIsValid: PropTypes.bool.isRequired,
  handleEmailValidation: PropTypes.func.isRequired,
  emailIsValid: PropTypes.bool.isRequired,
};

const CheckoutStepOne = ({
  styles, 
  email,
  step1,
  toggle,
  stepsUnlock,
  emailIsValid,
  handleEmailValidation,
  onChangeEmail
}) => {
  const emailValidation = (/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(String(email).toLowerCase())
  return (
    <ListGroupItem disabled={!step1} style={styles.collapsePannel}>
      <h4 style={styles.collapasePannelTitle} onClick={()=>toggle('step1')} >
        <Badge color="secondary" pill size='sm'>1</Badge>  Customer Email
      </h4>
      <Collapse isOpen={step1}>
      <p>Enter your email. Your order details will be sent to this email.</p>
      <Label for="exampleEmail">Email</Label>
      <Row>
        <Col md="6">
          <Input 
            invalid={!emailIsValid}  
            type="email" 
            name="email" 
            id="exampleEmail" 
            placeholder="example@gmail.com" 
            value={email} 
            onChange={onChangeEmail}
          />
          <FormFeedback>
            Email is not valid
          </FormFeedback>
        </Col>
        <Col md="6">
          <Button className="my-3 my-md-0" disabled={false} onClick={()=>{
            if (emailValidation) { 
              stepsUnlock('step2');
              handleEmailValidation(true) 
            } else {
              handleEmailValidation(false)
            }
            }}>Continue</Button>
        </Col>
        <Col xs="12">
        <div style={{margin: '20px'}}>
          <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Suscribe to get notified about offers" />
        </div>
        </Col>
      </Row>
      </Collapse>
    </ListGroupItem>
  )
}

CheckoutStepOne.propTypes = propTypes;

export default CheckoutStepOne
