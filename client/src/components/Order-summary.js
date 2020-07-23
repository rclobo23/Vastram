import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { isBrowser, isMobile } from "react-device-detect";
import LoadingGif from './Loading-gif'
import { compose } from 'redux';


class orderSummary extends Component{
    constructor(props){
        super(props);
        this.state = {
         todayOrders: 0,
         monthOrders: 0,
         OrdersPending: 0
        
        };
      };
      componentDidMount() {
        fetch('/api/orders')
          .then(response => {        
            return response.json();
          })
          .then((data) => {        
            this.setState({
              categories: data.map(item=>({
                todayOrders: data.todayOrders   ,
                monthOrders: data.monthOrders     
              }))
            });
          });
        }

render() {
    const {categories} = this.state;
    const cards = ()=>{
    return(
    <div style = {{width: '200px',
    border: '0px',
    background: '#fefefe',
    margin: '20px',
    height: '350px',
    display: 'flex',
    borderRadius:'5px',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    margin: '10px 20px',
    alignItems: 'center',}}><h1>{"todays orders"}{x.todayOrders}</h1></div>
    )
    }
    return(
      <div style = {{display:'flex', flexFlow:'row nowrap', width:'100%', background:'#000', }}>{cards}</div>
    )
  }
}