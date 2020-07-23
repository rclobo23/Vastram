import React, { Component } from 'react';
import {
  isMobile
} from "react-device-detect";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, Container , Col} from 'reactstrap';
import EditCategory from './EditCategory';
import AdminFormDeleteItem from './Admin-form-delete-item';

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
    /* .then((apiList)=>{.
    apiList.map((item, i)=>{
      fetch('/api/category/imgfromtag/'+item.subcats[0])
      .then((response)=>{
        return response.json()
      })
      .catch((err)=>console.log(err))
      .then((data)=>{       
        this.setState({categoryImages:data.images[0]})
      })
      .catch((err)=>console.log(err))
    })
    console.log(this.state.categoryImages)
  }) */

  render() {
    const stylesColor = (color) => ({
      textDecoration: 'underline',
      textDecorationColor: color
    })

    const { stylesTab2 } = this.props
    const { apiList } = this.state
    const isAdmin = this.props.admin
    return (
      <div style={{paddingTop: '10px', paddingBottom:'20px', background:'#fff'}}>
     { isAdmin &&  <h1>Update or Delete Categories</h1>}
      <Container style={{display:"flex", flexFlow:'row wrap'}}>
        {
          apiList.map((x, index)=>        
         ! isAdmin? 
         !x.hide &&        
               <Link to={`/category/${x._id}`}  className="animated fadeIn" 
          style={{backgroundImage:'url('+x.images[0]+')',
          backgroundRepeat: 'round', height:'250px',
          width:isMobile?'100%':'31%', borderRadius:'10px',
          margin:'10px', boxShadow:'-2px 2px 10px 0px lightgrey',
            padding:'30px 15px', position:'relative'}}>
            <div key={x._id}>              
               <Link to={`/category/${x._id}`} style={{color:'#000', textDecoration:'none'}}>        
               <h5 style={{background:'#fff', borderRadius:'20px',width: 'fit-content',  padding: '3px 10px'}}>{x.catname}</h5>               
           
        <div style={{ bottom: '20px', position:'absolute'}}> 
         {x.subcats.map((item, ind)=>
             <Link to={`/productslist/${item}`}> <small  style={{color:'#000', background:'#fff', borderRadius:'20px' ,  padding: '3px 10px',margin :'5px', border:'solid 0.5px lightgrey',}}> {item}</small></Link>
             )}     
             </div>          
              </Link> 
               </div></Link>
               : <div key={x._id} className="animated fadeIn" 
               style={{backgroundImage:'url('+x.images[0]+')',
               backgroundRepeat: 'round', height:'250px',
               width:isMobile?'100%':'31%', borderRadius:'10px',
               margin:'10px', boxShadow:'-2px 2px 10px 0px lightgrey',
                 padding:'30px 15px', position:'relative'}}>
                 <div >              
                   {isAdmin ?   <div> 
                     <Link to={`/category/${x._id}`} style={{color:'#000', textDecoration:'none'}}>  
                      <h5 style={{background:'#fff', borderRadius:'20px',width: 'fit-content',  padding: '3px 10px'}}>{x.catname}{x.imagedata}</h5>               </Link>
                <EditCategory infos={x} />
              <div style={{ bottom: '20px', position:'absolute'}}>    {x.subcats.map((item, ind)=>
                    <small  style={{background:'#fff', borderRadius:'20px' ,width: 'fit-content',  padding: '3px 10px',margin :'5px', border:'solid 0.5px lightgrey', position:'relative'}}> {item}</small>
                   )}     
                   </div>          
                   </div>
                    :
                    <Link to={`/category/${x._id}`} style={{color:'#000', textDecoration:'none'}}>        
                    <h5 style={{background:'#fff', borderRadius:'20px',width: 'fit-content',  padding: '3px 10px'}}>{x.catname}</h5>               
                
             <div style={{ bottom: '20px', position:'absolute'}}> 
              {x.subcats.map((item, ind)=>
                   <small  style={{background:'#fff', borderRadius:'20px' ,width: 'fit-content',  padding: '3px 10px',margin :'5px', border:'solid 0.5px lightgrey', position:'relative'}}> {item}</small>
                  )}     
                  </div>          
                   </Link> }
                    </div></div>
             )
          }
        </Container>
      </div>
    )
  }
};
