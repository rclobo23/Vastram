import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom'
import {
  isBrowser,  isMobile, BrowserView
} from "react-device-detect";
import {FaShoppingBag} from 'react-icons/fa'
import { connect } from 'react-redux'
import { oneKeywordForFilter, resetKeywords} from '../actions/DataFetchingActions';
import { selectorTotalItemsCart } from '../selectors/selector_list_statistics';
import CheckoutMiniSummaryPreview from '../components/Checkout-mini-summary-preview'; 
import Submenu from '../components/Submenu';
import {TiThMenu, TiTimes} from 'react-icons/ti'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Badge,
  Modal
} from 'reactstrap';

const styles = {
  
  itemMen: {
    color: '#b29660!important',
    fontFamily:'Montserrat',
    padding: isMobile?'0px': '0px 10px',
    listStyleType: 'none'
  },
  arrowDown: {
    display: 'block',
  },

  textNone:{
    display:'block',
    background: '#fff',
    textShadow: "0px",
    textAlign: 'center',
    margin: '1px 0px',
    width:'20vw',
    borderRadius:'15px',
    padding:'0px !important'
  },
}

const arrowStyleSubmenu = (subMenuCategorySelected, gender, arrowDown) => subMenuCategorySelected === gender && <div style={arrowDown}></div>

class NavbarContainer extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      subMenuOpen: false,
      subMenuCategorySelected: '',
      openCartPreview: false,
      navitems : [],      
      logo:"/images/vlogo.jpg",
      navcolor:'#000'
    };
  }
  componentDidMount() {
    fetch('/api/navcategory')
      .then(response => {        
        return response.json();
      })
      .then((data) => {        
        this.setState({
          navitems: data.map(item=>({
            catname: item.catname,   
            catid :item._id,   
            image: item.images[0],
            subcats: item.subcats,
          }))
        });
      });
  }
 
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleSubMenuEnter = (x) => {
    this.setState({
      subMenuOpen: true,
      subMenuCategorySelected: x
    })
    
  }

  handleSubMenuExit = () => {
    this.setState({
      subMenuOpen: false,
      subMenuCategorySelected: ''
    })
  }

  

  render() {  
    const { sendOneKeyword, getCart, resetKeywords, totalItemsSelectorStats } = this.props
    const { isOpen, subMenuCategorySelected, subMenuOpen, openCartPreview } = this.state
    const { men, women, children, partyWear, casuals, vastram_specials, } = this.props.categoriesProducts
    const { itemMen, arrowDown, } = styles
    const {navitems} = this.state
    const itemMenu = {
      color: '#b29660!important',
      padding: isMobile?'20px 10px': '5px 10px',
      listStyleType: 'none',
      background:isMobile?this.state.navcolor:"#000",
      borderBottom:'solid 2px #c6a45b',
      margin:'0px 10px'
    }
    const navbarBackground ={
      backgroundColor: this.state.navcolor,
      boxShadow: '0px 4px 10px #0003',
      zIndex: 1, 
    }
    const textBanner ={
      textShadow: "0px",
      textAlign: 'center',
      color:'black',
      fontFamily:'Samarkan, Montserrat, Roboto',
      fontSize:'42px',
      margin: '0px',
      background: this.state.navcolor,
      width:'7vw',
      borderRadius:'15px',
      padding: '0px',
    }
    const categoriesNavItems = gender =>
    isBrowser ?            
      (<NavItem style={itemMenu} key={gender.catid} onMouseEnter={()=>this.handleSubMenuEnter(gender.catname)} >
        <NavLink to={`/category/${gender.catid}`} style={{color:'#c6a45b'}} onClick={()=>resetKeywords()}>{gender.catname}</NavLink> {arrowStyleSubmenu(subMenuCategorySelected, gender, arrowDown)}
      </NavItem>) :
      (<NavItem style={itemMenu}>
      <NavLink to={`/category/${gender.catid}`} key={gender.catid} style={{color:'#c6a45b', background:this.state.navcolor}} onClick={()=>{return (resetKeywords(), this.toggle())}}>{gender.catname}</NavLink>
    </NavItem>)
const mobilecart = <div style={{position:'relative'}}>
 <Link to="/cart" style={{textDecoration:'none', color:'#c6a45b'}}> <FaShoppingBag size={25}  />
<small style={{position:'absolute', left:'20px', bottom:'0px'}}>    <Badge color="danger" pill style = {totalItemsSelectorStats==0?{display: 'none'}:{display: 'block'}}>
      {totalItemsSelectorStats}
    </Badge></small></Link>
  </div>

    const cartNavItem = 
    isBrowser ?  
      (<Nav className="ml-auto" navbar style={{cursor: 'pointer'}}>
      <NavItem>
     
        <div style={{position:'relative'}}><FaShoppingBag size={35}  onClick={()=>this.setState(totalItemsSelectorStats==0?{ openCartPreview: openCartPreview }:{ openCartPreview:!openCartPreview })} />
      <small style={{position:'absolute', left:'20px', bottom:'0px'}}>    <Badge color="danger" pill style = {totalItemsSelectorStats==0?{display: 'none'}:{display: 'block'}}>
            {totalItemsSelectorStats}
          </Badge></small>
        </div>
      </NavItem>
      {
        openCartPreview && <div style={{position: 'fixed', width:'200px', right:'0', top: '6.3%'}} onClick={()=>this.setState({openCartPreview:!this.state.openCartPreview})} >
      <CheckoutMiniSummaryPreview empty={getCart.length === 0 && true} getCart={getCart}/>
      </div>
      }
    </Nav>) : <NavItem style={itemMenu}><NavLink to='/cart' style={{color:'#c6a45b', background:this.state.navcolor}} onClick={this.toggle}>Cart</NavLink></NavItem>

     const subMenuHoverBrowser =""
    //  subMenuOpen && isBrowser && 
      /*   <Submenu 
          style={{top:'100px'}}
          gender={subMenuCategorySelected} 
          itemsListByGender={subMenuCategorySelected === 'men' ? men : women} 
          sendOneKeyword={sendOneKeyword} 
          handleSubMenuExit={this.handleSubMenuExit}
          navitems = {navitems}
        /> */


    return (
      <div className="sticky-top">
        <Navbar expand="md" style={navbarBackground}>
          <Link to="/" style={itemMen} className="text-white"><div style={isMobile?styles.textNone:textBanner}>
      <img src= {this.state.logo} style= {{width: "100%", borderRadius:'5px'}}/>
      </div></Link> {isMobile && mobilecart}
    <NavbarToggler  onClick={this.toggle} style={{outline:'none', color:'#c6a45b'}}>{this.state.isOpen?<TiTimes/>:<TiThMenu/>}</NavbarToggler>
          <Collapse isOpen={isOpen} navbar style={{background:this.state.navcolor, color:'#000', fontWeight:'bolder', fontFamily:'Open Sans'}} >
            {navitems.map(x=>
          categoriesNavItems(x)
            )}
            
            {cartNavItem}
           {isMobile && <img src= "/images/india.jpg" style= {{textAlign:'center', width: "5vw", borderRadius:'0px', margin:'20px 0vw 5px 80vw'}}/>}
          </Collapse>
       <BrowserView> <div style={{width:'10vw',display: 'flex', justifyContent: 'space-between',alignItems: 'center'}}>
         <img src= "/images/india.jpg" style= {{width: "30%", borderRadius:'1px', marginLeft:'30px'}}/>      
      </div></BrowserView>
        </Navbar>

        {subMenuHoverBrowser}
      </div>
    );
  }
};


const mapStateToProps = state => ({
  categoriesProducts: state.categoriesProducts,
  getCart: state.cartReducer,
  totalItemsSelectorStats: selectorTotalItemsCart(state)
});

const mapDispatchToProps = dispatch => ({
  sendOneKeyword: x => dispatch(oneKeywordForFilter(x)),
  resetKeywords: () => dispatch(resetKeywords())
});


export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);
