import React from 'react';
import {Button} from 'reactstrap';
import {FiHome} from 'react-icons/fi';

const Empty = () =><div className="mt-5 mb-5 pt-5" style={{minHeight:'100vh',width:'100%',   backgroundImage: 'linear-gradient(10deg, #000, #000c) ,url(/images/bg.jpg)',
backgroundSize: 'contain',}}>
<div className="d-flex flex-column  col-md-6 mt-5 text-center justify-content-center align-content-center text-white"> <p>Sorry page not found</p>
<Button onClick={()=>window.location.href="/"} className="bg-primary  my-3"> <FiHome/>Go to Homepage </Button> 
 </div></div>;


export default Empty;
