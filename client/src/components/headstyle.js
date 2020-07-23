import PropTypes from 'prop-types';
import React, { Component } from 'react';
const xstyle = {margin:'20px 2px',textDecoration: 'overline',textDecorationStyle: 'double', fontSize: 'x-large', padding:'0px', textAlign:'center', color:'#000',};
const propTypes = {
    headtext: PropTypes.string.isRequired
}
class Headstyle extends Component{
    constructor(props) {
        super(props);
    }
    
    render(){
        const style = { fontFamily:'Montserrat', letterSpacing:'3px', margin:'2px 5px', fontSize: 'large', fontWeight:'bolder', padding:'5px', textAlign:'left', color:this.props.color || '#000'};
        const {headtext}= this.props;
        return(
       <div className="text-uppercase wow animated fadeIn d-flex  my-4">    
           <div className="">  <p  className="d-inline ml-2" style={style}>{headtext}</p></div><div className="col"> <hr style={{width:'80%', alignItems:'left'}}/> </div>
       </div>
        );
    }

}
Headstyle.propTypes = propTypes;
export default Headstyle;