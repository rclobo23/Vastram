import { 
  Badge, 
  Button, 
  ListGroupItem, 
  Collapse,
  Col,
  Row
} from 'reactstrap';
import React, { Component } from 'react';
const stylebutt={
   width:'40px',
   height: '40px',
   borderRadius: '40px',
   background:'white',
   color:'black',
   border:'solid 1px darkgray'
}

export default class QuantityPicker extends Component {

  constructor(props) {
    super(props);

    this.state = {value: this.props.min, disableDec: true, disableInc: false}
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    const plusState = this.state.value + 1;
    if (this.state.value < this.props.max){
      this.setState({value: plusState});
      this.setState({disable: false});
    }
    if (this.state.value == (this.props.max - 1)) {
      this.setState({disableInc: true});
    }
    if (this.state.value == this.props.min) {
      this.setState({disableDec: false});
    }
  }

  decrement() {
    const minusState = this.state.value - 1;
    if (this.state.value > this.props.min) {
      this.setState({value: minusState });
      if (this.state.value == this.props.min + 1) {
        this.setState({disableDec: true});
      }
    } else {
      this.setState({value: this.props.min});
    }
    if (this.state.value == this.props.max) {
      this.setState({disableInc: false});
    }
  }
 
  render() {
    const { disableDec, disableInc } = this.state;

    return (
      <span className="quantity-picker" style={{border:'solid 1px white'}}>
        <Button style = {stylebutt} className={`${disableDec ? 'mod-disable ' : ''}quantity-modifier modifier-left`} onClick={this.decrement}>&ndash;</Button>
        <input style={{width:'10%',border:'none' }} className="quantity-display text-center" type="text" value={this.state.value} readOnly />
        <Button  style = {stylebutt} className={`${disableInc ? 'mod-disable ' : ''}quantity-modifier modifier-right`} onClick={this.increment}>&#xff0b;</Button>
      </span>
    );
  }
}