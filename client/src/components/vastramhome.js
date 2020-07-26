import React, { Component } from 'react';
import {
  isMobile
} from "react-device-detect";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, Container , Col} from 'reactstrap';
import EditCategory from './EditCategory';
import AdminFormDeleteItem from './Admin-form-delete-item';
import ShopByPrice from './shop-by-price'

export default class Category extends Component {
  constructor(props){
    super(props);
    this.state={
      apiList: [],
      categoryImages:[]
    }
  }

  componentDidMount() {
    
      fetch('/api/category')
      .then((response)=>{
        return response.json()
      })
      .then((data)=>{
        this.setState({apiList:data})
      })
    }


  render() {
    const stylesColor = (color) => ({
      textDecoration: 'underline',
      textDecorationColor: color
    })

    const { stylesTab2 } = this.props
    const { apiList } = this.state
   
    return (
      <div style={{paddingTop: '0px', paddingBottom:'20px', background:'#000', minHeight:'100vh'}}>
      {/*   <div className="row"> <div style={{background:"#000"}}/>
       <div className="col-6"> <img src="https://instagram.fblr4-2.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/104433309_693082664570635_8962411324715896391_n.jpg?_nc_ht=instagram.fblr4-2.fna.fbcdn.net&_nc_cat=107&_nc_ohc=nd_Ifp4oc8UAX-Bv1WU&oh=603cc15244116ead11a0968340b49373&oe=5F2D7DBD" style={{width:'100%'}}/>          
         </div>
         <div className="col-2" style={{background:"#000"}}/>
      </div> */}
        <div style = {{ width: '100%', position:'relative', overflowX:'scroll', scrollbarWidth:'none',background:'#000', paddingTop:'20px' }}><ShopByPrice/></div>
      <div style={{display:"flex", flexFlow:'row wrap'}} className="mx-md-5">
        
          {apiList.map((x, index)=>       
        !x.hide && 
               <Link to={`/category/${x._id}`}key={x._id} className="animated wow fadeIn" 
               style={{backgroundImage:'linear-gradient(9deg, #000, #fff0, #fff0), url('+x.images[0]+') ',
               backgroundRepeat: 'round', height:isMobile?'120vw':'31vw', backgroundSize:'cover',
               width:isMobile?'100%':'32%', borderRadius:'0px',
               margin:'0px',border:isMobile?"0":'solid 10px #000',
                 padding:'0px', position:'relative'}}>
                     <Link to={`/category/${x._id}`} style={{color:'#000', textDecoration:'none'}}>  
                      <h3 style={{background:'#000',color:'#c6a45b',borderRadius:'0px', borderLeft:'solid 2px #c6a45b',width: 'fit-content', padding: '5px 10px',position:'absolute', bottom:'10vh'}}>    {x.catname}{x.imagedata}
                      </h3>
                      </Link>
                          <div style={{ bottom: '20px', position:'absolute'}}>    
                            {x.subcats.map((item, ind)=> ind<3 ?
                             <Link to={`/productslist/${item}`}><small  style={{background:'#fff', borderRadius:'20px' ,width: 'fit-content',  padding: '5px 10px',   margin :'5px', border:'solid 0.5px lightgrey',color:'#000', position:'relative'}}> {item}</small> </Link>
                             :
                             ind == x.subcats.length - 1?   <small className="mt-4" style={{background:'#fff', borderRadius:'20px' ,width: 'fit-content',  padding: '5px 10px',   marginTop :'25px',  margin :'5px', border:'solid 0.5px lightgrey',color:'#000',}}>+ {x.subcats.length - 3}</small> 
                            : ""
                            )}  
                          </div>   
                        
              </Link>
          )}
         
       {/*     {apiList.map((x, index)=>       
        !x.hide && index>=3 &&
        <Link to={`/category/${x._id}`}key={x._id} className="animated wow fadeIn" 
        style={{backgroundImage:'linear-gradient(9deg, #000, #fff0, #fff0), url('+x.images[0]+') ',
        backgroundRepeat: 'round', height:isMobile?'120vw':'31vw', backgroundSize:'cover',
        width:isMobile?'100%':'31%', borderRadius:'0px',
        margin:'0px',border:isMobile?"0":'solid 10px #000',
          padding:'0px', position:'relative'}}>
              <Link to={`/category/${x._id}`} style={{color:'#000', textDecoration:'none'}}>  
               <h3 style={{background:'#000',color:'#c6a45b',borderRadius:'0px', borderLeft:'solid 2px #c6a45b',width: 'fit-content', padding: '5px 10px',position:'absolute', bottom:'10vh'}}>    {x.catname}{x.imagedata}
               </h3>
               </Link>
                   <div style={{ bottom: '20px', position:'absolute'}}>    
                     {x.subcats.map((item, ind)=> ind<3 ?
                      <Link to={`/productslist/${item}`}><small className="mt-4" style={{background:'#fff', borderRadius:'20px' ,width: 'fit-content',  padding: '5px 10px',   marginTop :'25px',  margin :'5px', border:'solid 0.5px lightgrey',color:'#000',}}> {item}</small> </Link>
                     :
                     ind == x.subcats.length - 1?   <small className="mt-4" style={{background:'#fff', borderRadius:'20px' ,width: 'fit-content',  padding: '5px 10px',   marginTop :'25px',  margin :'5px', border:'solid 0.5px lightgrey',color:'#000',}}>+ {x.subcats.length - 3}</small> 
                    : ""
                     )}  

                   </div>   
                   {/* { index==2? <div style = {{ width: '100%', position:'absolute', overflowX:'scroll', scrollbarWidth:'none',background:'#000', paddingTop:'20px' }}><ShopByPrice/></div> :''      } */}
     
          {/* )} */} 
        </div>
      </div>
    )
  }
};
