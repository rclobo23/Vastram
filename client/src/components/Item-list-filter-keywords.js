import PropTypes from 'prop-types';
import React, { Component } from 'react'
import '../style/checkbox.min.css'

const propTypes = {
  gender: PropTypes.string.isRequired,
  keywordsSelectAction: PropTypes.func.isRequired,
  categoriesProducts: PropTypes.object.isRequired,
  keywordsForFilter: PropTypes.array.isRequired
};

class ItemsListFilterKeywords extends Component {

  constructor(props){
    super(props);
    this.state = {
      cat: this.props.categoriesProductslength === 0
    }
  };

  componentDidMount = () => {
    const { keywordsForFilter, actionFillFilters, categoriesProducts, gender } = this.props
  //  keywordsForFilter.length === 0 ? 
  //    gender == 'men' ? (() => {actionFillFilters(categoriesProducts.men)})() : (() => {actionFillFilters(categoriesProducts.women)})():(() => {actionFillFilters(categoriesProducts.men)})()
  };

  render(){
    
    const {   
      categoriesProducts,
      keywordsSelectAction, 
      keywordsForFilter,
      gender 
    } = this.props;

    const cat = () =>  gender === 'men' ? categoriesProducts.men : categoriesProducts.women;
    
    //const stateIncludesCategory = category => keywordsForFilter.includes(category);

    return (
     
        <div>

          </div>
    );

  };
}; 

ItemsListFilterKeywords.propTypes = propTypes;

export default ItemsListFilterKeywords;

