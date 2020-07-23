import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';

const propTypes = {
  handleSizeSelection: PropTypes.func.isRequired,
  sizesArray: PropTypes.array.isRequired,
  selectedSize: PropTypes.string.isRequired,
  validateSizeSelection: PropTypes.func.isRequired
};

class ButtonSizeSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
  };

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };
componentDidMount(){
  this.props.sizesArray.length>=1 && this.props.sizesArray[0]!=''?'': this.props.handleSizeSelection('free size') && this.props.validateSizeSelection('valid')
}
  render() {
    const { handleSizeSelection, sizesArray, sizedetailsArray ,selectedSize, validateSizeSelection} = this.props;
    const dropDownList =    sizesArray.length>=1 && sizesArray[0]!=''? sizesArray.map((x, i)=>
      <div><DropdownItem  className="mx-2" /*  style={{width:'30px', height:'30px', borderRadius:'10px',margin:'5px',padding:'6px' ,background:x === selectedSize?'grey':'white',color:'#000',  border:'solid 1px dodgerblue'}}  */
      onClick={()=>{return (handleSizeSelection(x), validateSizeSelection('valid'))}}>
        {x }{sizedetailsArray[i]}
      </DropdownItem><hr/></div>
    ) :  <span style={{width:'30px', height:'30px', borderRadius:'30px',margin:'10px',padding:'10px' , border:'solid 2px green',boxShadow:'1px 1px 2px 1px #fefefe' }} value="free size">free size</span>

    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret outline color="secondary" style={{borderRadius:'0px', border:'solid 2px #000'}} >
           Size: {selectedSize.length>0 ? selectedSize : 'Choose'}
         </DropdownToggle>
         <DropdownMenu style={{overflow:'scroll', maxHeight:'60vh'}}>
      <div>
          {dropDownList}
          </div>
        </DropdownMenu>
    </Dropdown> 
    );
  };
};

ButtonSizeSelect.propTypes = propTypes;

export default ButtonSizeSelect;