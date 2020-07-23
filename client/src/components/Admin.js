import React, { Component } from 'react';
import {
  isMobile
} from "react-device-detect";
import axios from 'axios';
import AdminTablesItems from './Admin-table-items'
import AdminFormAddItem from './Admin-form-add-item'
import AdminHistoryLog from './Admin-history-log'
import AdminTableOrders from './Admin-table-orders'
import AdminPromos from './Admin-promos'
import ShowCategory from './ShowCategory'
import Review from './review'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import AdminOrderDetails from './Admin-order-details';
import AdminDashboard from './Admin-dashboard';

export default class Admin extends Component {
  constructor(props){
    super(props);
    this.state={
      apiList: [],
      activeTab: this.props.atab || 0
    }
  }

  componentDidMount = async () => {
    try {
      const response = await axios.get('/api/productsdata')
      const apiList = await response.data;
      this.setState({ apiList })
    } catch (error) {
      console.log(error);
    }
    this.setState({activeTab: this.props.atab})
  }

  toggle = tab => {this.state.activeTab !== tab && this.setState({ activeTab: tab });
window.history.pushState("Dashboard", "Aries", tab)
}

  render() {

    const styles = {
      tabx: {
        cursor: 'pointer',      
        color:'white',
        padding:'15px',
        borderBottom: 'solid 0.5px #fff5',
        borderUp:'none',
        fontSize:'12px'
      },
    }

    return (
      <div style={{display:'flex'}}>
        
        <Nav vertical style={{backgroundImage: 'linear-gradient(45deg, #444, #111)', height:'100vh', display:isMobile?"none":"block"}} className="col-md-2">
          <NavItem >
            <NavLink  style={styles.tabx} onClick={() => { this.toggle('1'); }}>
              <b>Orders</b>
            </NavLink> 
          </NavItem>
            <NavItem>
            <NavLink style={styles.tabx}  key="1" onClick={() => { this.toggle('8'); }}>
              <b>Order Details</b>
            </NavLink> 
          </NavItem>
          <NavItem>
            <NavLink style={styles.tabx} onClick={() => { this.toggle('2'); }}>
              <b>Update/delete items</b>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink style={styles.tabx} onClick={() => { this.toggle('3'); }}>
              <b>Add new item</b>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink style={styles.tabx} onClick={() => { this.toggle('4')}  }>
              <b>History log</b>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink style={styles.tabx} onClick={() => { this.toggle('5'); }}>
              <b>Promotions and trending</b>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink style={styles.tabx} onClick={() => { this.toggle('6'); }}>
              <b>Categories & sub categories</b>
            </NavLink>
            </NavItem>
          <NavItem>
            <NavLink style={styles.tabx} onClick={() => { this.toggle('7'); }}>
              <b>Reviews</b>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent className="col-md-10" style={{height:'90vh', overflow:'scroll'}} activeTab={this.state.activeTab}>
        <TabPane tabId="0">
        <AdminDashboard changeTab={()=>this.toggle('2')}  change5Tab={()=>this.toggle('5')} change6Tab={()=>this.toggle('6')} change7Tab={()=>this.toggle('7')}   changexTab={()=>this.toggle('8')} />
        </TabPane>
          <TabPane tabId="1">
            <AdminTableOrders stylesTab1={styles.tab1}/>
          </TabPane>
          <TabPane tabId="2">
            <AdminTablesItems stylesTab2={styles.tab2}/> 
          </TabPane>
          <TabPane tabId="3" style={styles.tab3}>
            <AdminFormAddItem />
          </TabPane>
          <TabPane tabId="4">
         <AdminHistoryLog stylesTab4={styles.tab4} />
          </TabPane>
          <TabPane tabId="5">
            <AdminPromos stylesTab4={styles.tab5} />
          </TabPane>
          <TabPane tabId="6">
            <ShowCategory admin={true} stylesTab4={styles.tab6} />
          </TabPane>
          <TabPane tabId="7">
            <Review stylesTab4={styles.tab7} admin="true" />
          </TabPane>
          <TabPane tabId="8">
            <AdminOrderDetails stylesTab4={styles.tab7}  />
          </TabPane>          
        </TabContent>
      </div>
    )
  }
};
