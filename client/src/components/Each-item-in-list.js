import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { 
  Col,
  Card, 
  CardImg
} from 'reactstrap';
import {
  isMobile
} from "react-device-detect";
const propTypes = {
  FilteredSortedList: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  itemsMaxPage: PropTypes.number.isRequired
};

const styles = {
  flexmob : {
    width:'50%',
    padding: '10px',
  },
  spaceColumn: {
    marginLeft: '1px',
    marginRight: '1px',
    marginBottom: '20px',
    //boxShadow: 'lightgrey -1px 1px 2px 1px',
    borderRadius: '2px',
    padding: '1px',
    width : '100%',
   // height:'350px',
  },
  spaceColumnPC: {
    marginLeft: '10px',
    marginRight: '10px',
    marginBottom: '5px',
    border: 'solid 1px #fefefe',
    borderRadius: '4px',
    height:'auto',
    boxShadow: 'lightgrey -1px 0px 5px 0px',
    padding: '2px 2px 2px 2px',
  }, 
  fontSize: {
    fontSize: '15px'
  },
  marginLeftBtn: {
    marginLeft: '30px'
  },
  containerPaddingTop: {
    paddingTop: '35px'
  }
};

const EachItemInList = ({
  touchme,
  FilteredSortedList,
  currentPage,
  itemsMaxPage
}) => {  

 const color = (x) =>{
    return x.includes("#")? x.substr(x.indexOf('#'), x.length- 1): x 
   }
/*   colorname = (x)=>{
   return x.includes("#")? x.substr(0, x.indexOf('#')) : x
   } */

  return (FilteredSortedList.slice((currentPage-1)*itemsMaxPage,itemsMaxPage*currentPage).map(x => 
    <div md="6" style={isMobile?{ padding: '3px',width: '50%'}:{ padding: '10px',width:'33%',}}  key={x._id}> 
       <Link to={`/item/${x._id}/${x.title.split(' ').join('-')}`} className="text-white">
         <Card style={isMobile?styles.spaceColumn:styles.spaceColumnPC} onMouseOver={touchme}>       
          <CardImg top width="100%" src={x.images[0]} alt={x.title} />
          <div className="px-2 py-1">
          
            <p style={{fontSize: '18px', color:'black'}}>{x.title}</p>
            {/* <StarRatings
              rating={x.rating}
              starDimension="15px"
              starSpacing="1px"
              starRatedColor="#072a48"
              // changeRating={this.changeRating}  <-- uncomment to transform in input
              numberOfStars={5}
              name='rating'
              /> */}
              {x.special ?'':<span style={{overflow:'hidden', fontSize:'10px', margin:'1px', top: '-5px', position:'absolute', right:'-5px' ,textAlign: 'center', width: '30px', height:'30px'}} className=" rounded-circle bg-success">10%<br/>Off</span>}

              <div style={{margin:'1px' ,display:'flex', flexFlow:'row wrap', top: '0px', textAlign: 'center', width: '100%'}}>
                
                {x.color.map(x=><div key={x} style={{width:'20px', height:'20px', backgroundColor:color(x), marginLeft:'-7px', border:x=='White'?`solid 1px #000`:`solid 1px white`, borderRadius: '20px'}}>

                  {/*   {isColor(x)?"color":'not color'} */}
                 </div> 
                  )}
                
                </div>

            {/*   {x.color.map(item=>{ isColor(item) ? 
                  <div key={item} style={{width:'20px', height:'20px', backgroundColor:item, marginLeft:'-7px', border:`solid 1px white`, borderRadius: '20px'}}/> 
                  :
                  <div key={item} style={{width:'20px', height:'20px', backgroundColor:item.substring(item.indexOf('#'), item.indexOf('#')+6), marginLeft:'-7px', fontSize:'10px', border:`solid 1px white`, borderRadius: '20px'}}>
                    {item.substring(0, item.indexOf('#'))} </div> })} */}
              
            <p className="text-big" style={{fontSize: '16px',padding:'3px', width: 'fit-content', marginTop:'10px', background:'darkred',  color: 'white', fontWeight:"bold", textDecoration:'none'}}>&#8377; {x.price}</p>
          </div>
      </Card>
      </Link>
    </div>
  ));
};

EachItemInList.propTypes = propTypes;

export default EachItemInList;



