import React, { Component } from 'react';
import {
  isMobile
} from "react-device-detect";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  Col,
  Row,
} from 'reactstrap';
import ButtonInternalLink from './Button-internal-link';
import { Link } from 'react-router-dom';
import '../style/shimmer.css';
import '../style/CarouselControl.css';

const styles = {
  sliderContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color:'#000',
background:'#0000',
width:'100%',
textDecoration:'none',
    top:'0px',
    
  },
  fixDown:{
        color:'white',
        width:'100%',
        textAlign: 'center',
        alignItems: 'center',
        top: '-125px',
        justifyContent : 'center',
        marginLeft:'10px!important',
        background: '#00000033',
        
  }
}


class CarouselHomepage extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 ,
      items: [],
    } 
   };
 
  componentDidMount() {
    fetch('/api/carouselData')
      .then(response => {        
        return response.json();
      })
      .then((data) => {        
        this.setState({
          items: data.map(item=>({
            caption: item.caption,
            src: item.src,
            mobilesrc : item.mobilesrc,
            altText: 'vastram 1',
     caption: 'vastram',
    title: item.caption,
    subtitle: 'Vastram collection',
    btn: {
      content: 'Go to the collection',
      link: '/category/men'

    }
          }))
        });
      });
  }   

  onExiting = () => {
    this.animating = true;
  }

  onExited = () => {
    this.animating = false; //change to fals
  }

  next = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.state.items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.state.items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex = (newIndex) => {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
    const {items} = this.state;
    const slides = items.map(x => {
      return (
       <CarouselItem 
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={x.src}
          link={x.title}
        > <Link to={x.title}>
          <Row  style={isMobile?{backgroundColor: '#000', height:'30vh', marginTop:'0vh'}:{backgroundColor: '#05050500', padding:'3px', height:'62vh', marginBottom:'0px'}}>
            <Col md={isMobile?"6":"12"}>
              <img src={x.src}  alt={x.altText} style={{width: '100%', height: '-webkit-fill-available', borderRadius:'10px'}}/>
            </Col>
          
          </Row>
          </Link> </CarouselItem>
      );
    });
    const shimmerstyle = {
      height:isMobile?'50vw':'45vh',
       width:isMobile?'80vw':'50vw'
    }
const Shimmer = ()=>{
  return(
        <div className="comment dark br animate w100 mx-3 my-4" style={shimmerstyle}/>
  )
}
    return (
      
      this.state.items.length>0?
      <Carousel          
      ride="carousel"
      autoPlay={true}
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
        keyboard ={true}
      >
        {slides}
         <CarouselIndicators  items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} /> 
       {/*  <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} /> */}
      </Carousel>      :<Shimmer/> 
    );
  }
}


export default CarouselHomepage;
