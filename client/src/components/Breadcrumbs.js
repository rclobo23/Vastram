import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { isMobile } from "react-device-detect"; 
import { Link } from 'react-router-dom';
import ButtonSorter from './Button-sorter';
import ButtonFilterMobile from './Button-filter-mobile';


const propTypes = {
  gender: PropTypes.string,
  selectedCategory: PropTypes.array,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  marginTop: PropTypes.number,
  showSortBtn: PropTypes.bool,
  showFilterBtn: PropTypes.bool,
  dispatchToSortList: PropTypes.func,
  sortArgsForFilter: PropTypes.string,
  dispatchSize: PropTypes.func,
  sortSizeForFilter: PropTypes.string,
  keywordsSelectAction: PropTypes.func,
  categoriesProducts: PropTypes.object,
  keywordsForFilter: PropTypes.array,
  actionPriceRangeFilter: PropTypes.func,
  reducerPriceRangeFilter: PropTypes.number,
  listLength: PropTypes.number,
};

const Breadcrumbs = ({
  gender, 
  selectedCategory, 
  backgroundColor, 
  textColor, 
  marginTop, 
  showSortBtn,
  showFilterBtn, 
  dispatchToSortList, 
  sortArgsForFilter,
  dispatchSize,
  sortSizeForFilter,
  keywordsSelectAction,
  categoriesProducts,
  keywordsForFilter,
  actionPriceRangeFilter,
  reducerPriceRangeFilter,
  listLength,
  sortbutton
}) => {

  const styles= {
    containerPcScreen: {
      height: '60px',
      backgroundColor: backgroundColor,
      marginTop: '0px',
      color: textColor,
      display: 'flex',
      justifyContent: 'left',
      alignItems: 'center',
      fontSize : '14px',
      fontFamily: 'Montserrat'
    },
    containerMobileScreen: {
      height: '50px',
      backgroundColor: backgroundColor,
      marginTop: '0px',
      color: textColor,
      display: 'flex',
      justifyContent: 'left',
      alignItems: 'center'
    },
    sortBtnMobileScreen: {
      width:'100%',
      
    },
    linkColor: {
      color: textColor
    }
  }
 
  const sortBtn = sortbutton?
  
      <Col sm={{ size: 'auto', offset: 6 }} style={styles.sortBtnMobileScreen}>
        { 
       isMobile?
          <ButtonFilterMobile 
            buttonLabel='Filter the list'
            gender={gender}
            dispatchSize={dispatchSize}
            sortSizeForFilter={sortSizeForFilter}
            keywordsSelectAction={keywordsSelectAction}
            keywordsForFilter={keywordsForFilter}
            categoriesProducts={categoriesProducts}
            actionPriceRangeFilter={actionPriceRangeFilter}
            reducerPriceRangeFilter={reducerPriceRangeFilter}
            listLength={listLength}
          /> 
      :
    isMobile ||   <ButtonSorter 
          dispatchToSortList={dispatchToSortList} 
          sortArgsForFilter={sortArgsForFilter} 
        />  
        }
      </Col> : ''

  const genderLink = gender && <Fragment><Link style={styles.linkColor} to={`/productslist/${gender}`}>{` ${gender && gender.charAt(0).toUpperCase() + gender.substr(1)}`}</Link></Fragment>; 
  const selectedItem = selectedCategory.length === 1 ? ' '+selectedCategory : selectedCategory.length > 1 ? ' Multiple criterias' : ' '      
  return (
    <div style={isMobile ? styles.containerMobileScreen : styles.containerPcScreen}>
      <Container>
        <Row>
          <Col sm={8}>
            <div>
              <Link style={styles.linkColor} to="/"><span className="fa fa-home"/></Link> ›
              {genderLink}
              <span>{selectedItem}</span>
            </div>
          </Col>
          <Col sm={4}>
            { sortBtn }
            </Col>
        </Row>
      </Container>
    </div>
  );
}

Breadcrumbs.propTypes = propTypes;

export default Breadcrumbs;