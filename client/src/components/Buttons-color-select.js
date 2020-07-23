import PropTypes from 'prop-types';
import React, { Component }  from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';


const propTypes = {
  colors: PropTypes.array.isRequired,
  selectedColor: PropTypes.string.isRequired,
  handleColorSelection: PropTypes.func.isRequired,
  validateColorSelection: PropTypes.func.isRequired,
};

const styles = (x, selectedColor) => ({
  backgroundColor: x, 
  margin:'3px', 
  width: '40px', 
  height: '40px',
  borderRadius:'20px', 
  display: 'inline-block',
  position:'relative',
  cursor: 'pointer',
  border:x=='White' && 'solid 1px black',
  boxShadow: x === selectedColor ? '0px 0px 6px 1px rgba(0,0,0,1)' : '' 
});


class ButtonsColorSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
  };
  componentDidMount(){
    this.props.colors.length>0?'':this.props.handleColorSelection('not specified') && this.props.validateColorSelection('valid')
  }
  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };

  color = (x) =>{
    return x.includes("#")? x.substr(x.indexOf('#'), x.length- 1): x 
   }
  colorname = (x)=>{
   return x.includes("#")? x.substr(0, x.indexOf('#')) : x
   }
render(){ 
  const {colors, 
  handleColorSelection, 
  selectedColor, 
  validateColorSelection } = this.props 
 const dropDownList = 
    colors.length>0?
  colors.map(x =>
 <div className="d-flex justify-content-left align-items-center p-1 my-1"
   onClick={()=>{return (handleColorSelection(this.colorname(x)),
  validateColorSelection('valid'), this.toggle())}} >
    <div key={x}    
     style={styles(this.color(x), selectedColor)} />
     <p className="mt-3"> {this.colorname(x)}</p> 
     </div>
 )
     :
     <div style={styles('white', selectedColor)} />

     
return (
  <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
    <DropdownToggle caret outline color="secondary" style={{borderRadius:'0px', border:'solid 2px #000'}}>
       Color: {selectedColor.length>0 ? selectedColor : 'Choose'}
     </DropdownToggle>
     <DropdownMenu style={{overflowX:'scroll', maxHeight:'60vh'}}>
  <div className="d-flex flex-column">
      {dropDownList}
      </div>
    </DropdownMenu>
</Dropdown> 
);
     };

     };

ButtonsColorSelect.propTypes = propTypes;

export default ButtonsColorSelect;
