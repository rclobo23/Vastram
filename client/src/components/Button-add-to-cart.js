import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import {useHistory} from 'react-router-dom'
import { BrowserView, MobileView} from "react-device-detect";
import {MdAddBox} from "react-icons/md"
import {TiFlash} from "react-icons/ti"

import { 
  Button
} from 'reactstrap';

const propTypes = {
  addToCart: PropTypes.func.isRequired,
  sizeBtn: PropTypes.string.isRequired,
  infoItem: PropTypes.object.isRequired,
  selectedSize: PropTypes.string.isRequired,
  selectedColor: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  validateSizeSelection: PropTypes.func.isRequired,
  validateColorSelection: PropTypes.func.isRequired,
  colorSelectionMissingRemark: PropTypes.string.isRequired,
  sizeSelectionMissingRemark: PropTypes.string.isRequired
};

const ButtonAddToCart = ({
  addToCart,
  sizeBtn,
  infoItem,
  selectedSize,
  selectedColor,
  toggleModal,
  validateSizeSelection,
  validateColorSelection,
  colorSelectionMissingRemark,
  sizeSelectionMissingRemark,
  price,
  quickBuy, 
}) => {
  
 function HButton(){
    const history = useHistory();
    function handle(){history.push("/checkout")}
  return (
    <Button color={colorBtn} className="mx-1" size={sizeBtn} onClick={()=>{ return(
      selectedSize.length < 1 && validateSizeSelection('Please select a size'),

      selectedColor.length < 1 && validateColorSelection('Please select a color'),

      selectedSize.length > 0 && selectedColor.length > 0  && addToCart({...infoItem, selectedSize, selectedColor}),
      
      quickBuy?selectedSize.length > 0 && selectedColor.length > 0  && handle():

      selectedSize.length > 0 && selectedColor.length > 0  && toggleModal()

    ) }}>{quickBuy?<TiFlash/>:<MdAddBox />}{quickBuy?"Quick Buy":" Add to Cart"}</Button>
  )
  }
  const colorBtn = quickBuy?"warning":'success'
 
  return (
<Fragment>
<HButton/>
</Fragment>

)}

ButtonAddToCart.propTypes = propTypes;

export default ButtonAddToCart;

