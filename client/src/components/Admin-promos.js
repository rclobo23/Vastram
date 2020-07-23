import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'reactstrap';
import { Button,Progress, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { FiEdit } from 'react-icons/fi';
import {storage} from '../firebase/index';

export default class AdminPromos extends Component {
  constructor(props){
    super(props);
    this.state={
      apiList: [],
      src: '',
      mobilesrc:'',
      caption:'',
      modalEdit: false,
      image:'',
      progress:0,
      upload:'upload',
      url:"",
      images:'',
      bannertext:'',
      navcolor:'#fff100',
      logoprogress:false,
      headerprogress:false,
      bgprogress:false,
      mbgprogress:false,
      logo:'https://firebasestorage.googleapis.com/v0/b/ariesfashion5.appspot.com/o/images%2Flogo?alt=media&token=02f90d70-8aaa-4624-ba8c-13319d046417',
      bg: 'https://firebasestorage.googleapis.com/v0/b/ariesfashion5.appspot.com/o/images%2Fheader?alt=media&token=cf1f832e-88d0-4d0d-9750-54ac971593ae',
      mbg:'https://firebasestorage.googleapis.com/v0/b/ariesfashion5.appspot.com/o/images%2Fmobile?alt=media&token=aa566f44-84cc-4357-8f49-fba6d064c11e' ,
      header:"https://firebasestorage.googleapis.com/v0/b/ariesfashion5.appspot.com/o/images%2Fmainheader?alt=media&token=cabfc393-7238-4065-8b59-29423076c665" 
    }
    this.handleChange = this
    .handleChange
    .bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleLogoUpload = this.handleLogoUpload.bind(this);
    this.handleBgUpload = this.handleBgUpload.bind(this);
    this.handleMbgUpload = this.handleMbgUpload.bind(this);
    this.handleHeaderUpload = this.handleHeaderUpload.bind(this);
  }
  toggle = () => this.setState({ modalEdit: !this.state.modalEdit });
  async componentDidMount() {
    try {
      const response = await axios.get('/api/carouselData')
      const apiList = await response.data;
      this.setState({ apiList })
    } catch (error) {
      console.log(error);
    }
   this.refresh();
  
  }
  refresh = ()=>{
        
      this.setState({
        logo:'https://firebasestorage.googleapis.com/v0/b/ariesfashion5.appspot.com/o/images%2Flogo?alt=media&token=02f90d70-8aaa-4624-ba8c-13319d046417',
      bg: 'https://firebasestorage.googleapis.com/v0/b/ariesfashion5.appspot.com/o/images%2Fheader?alt=media&token=cf1f832e-88d0-4d0d-9750-54ac971593ae',
      mbg:'https://firebasestorage.googleapis.com/v0/b/ariesfashion5.appspot.com/o/images%2Fmobile?alt=media&token=aa566f44-84cc-4357-8f49-fba6d064c11e' ,
      header:"https://firebasestorage.googleapis.com/v0/b/ariesfashion5.appspot.com/o/images%2Fmainheader?alt=media&token=cabfc393-7238-4065-8b59-29423076c665" 
        })

  }
  onChangeSrc = (e) => this.setState({src: e.target.value})
  onChangeMobileSrc = (e) => this.setState({mobilesrc: e.target.value})
  onChangeCaption = (e) => this.setState({caption: e.target.value})

  handleChange = e => {
    if (e.target.files[0]) {
      const image =Array.from(e.target.files);
      this.setState(() => ({image}));
      //console.log(image)
    }
  }

  handleUpload = (e) => {
    e.preventDefault();
      const {image} = this.state;
      image.map((image,i)=>{
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on('state_changed', 
      (snapshot) => {
        // progrss function ....
         const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 1000);
         this.setState({progress});
         this.setState({upload:"uploading"});
      }, 
      (error) => {
           // error function ....
        console.log(error);
      }, 
    () => {
        // complete function ....
        storage.ref('images').child(image.name).getDownloadURL().then(url => {                    
            this.setState({url});
            this.setState({images:url})
            this.setState({upload: "uploaded"})
        })
    });
  })
  }

  handleLogoUpload = (e) => {
    e.preventDefault();
    this.setState({logoprogress:true})
      const image = e.target.files[0]
      console.log(e.target.files);
      const uploadTask = storage.ref(`images/logo`).put(image);
      uploadTask.on('state_changed', 
      (snapshot) => {
        // progrss function ....
         const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 1000);
      }, 
      (error) => {
           // error function ....
        console.log(error);
      }, 
    () => {
    this.setState({logoprogress:false})
        // complete function ....
        storage.ref('images').child('logo').getDownloadURL().then(logo => {                    
            this.setState({logo});
            console.log("uploaded", logo);
            axios.post('/api/update/logo', {logo, id:"5ed9ec77213a231d845ddb63"})
            .then((data)=>this.refresh());
        })
    });
  }

  handleHeaderUpload = (e) => {
    e.preventDefault();
    this.setState({headerprogress:true})
      const image = e.target.files[0]
      console.log(e.target.files);
      const uploadTask = storage.ref(`images/mainheader`).put(image);
      uploadTask.on('state_changed', 
      (snapshot) => {
        // progrss function ....
         const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 1000);
      }, 
      (error) => {
           // error function ....
        console.log(error);
      }, 
    () => {
    this.setState({headerprogress:false})
        // complete function ....
        storage.ref('images').child("mainheader").getDownloadURL().then(header => {                    
            this.setState({header});
            console.log("uploaded", header);
            axios.post('/api/update/mainimage', {main_image:header, id:"5ed9ec77213a231d845ddb63"})
            .then(window.location.reload);
        })
    });
  }

  handleBgUpload = (e) => {
    e.preventDefault();
    this.setState({bgprogress:true})
      const image = e.target.files[0]
      console.log(e.target.files);
      const uploadTask = storage.ref(`images/header`).put(image);
      uploadTask.on('state_changed', 
      (snapshot) => {
        // progrss function ....
         const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 1000);
      }, 
      (error) => {
           // error function ....
        console.log(error);
      }, 
    () => {
    this.setState({bgprogress:false})
        // complete function .... 
        storage.ref('images').child('header').getDownloadURL().then(bg => {                    
            this.setState({bg});
            console.log("uploaded", bg);
            axios.post('/api/update/bg', {bg, id:"5ed9ec77213a231d845ddb63"})
            .then(window.location.reload);
        })
    });
  }

  handleMbgUpload = (e) => {
    e.preventDefault();
    this.setState({mbgprogress:true})
      const image = e.target.files[0]
      console.log(e.target.files);
      const uploadTask = storage.ref(`images/mobile`).put(image);
      uploadTask.on('state_changed', 
      (snapshot) => {
        // progrss function ....
         const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 1000);
      }, 
      (error) => {
           // error function ....
        console.log(error);
      }, 
    () => {
    this.setState({mbgprogress:false})
        // complete function .... 
        storage.ref('images').child('mobile').getDownloadURL().then(mbg => {                    
            this.setState({mbg});
            console.log("uploaded", mbg);
            axios.post('/api/update/mbg', {mbg, id:"5ed9ec77213a231d845ddb63"})
            .then(window.location.reload);
        })
    });
  }

  bannertextChange =(e)=> this.setState({bannertext:e.target.value})
  bannerUpdate =(bannertext) =>  {axios.post('/api/update/textbanner', {bannertext,  id:"5ed9ec77213a231d845ddb63" })
                        .then(window.location.reload);  
  }

  navcolorChange =(e)=> this.setState({navcolor:e.target.value})
  navcolorUpdate =(navcolor) =>  {axios.post('/api/update/navcolor', {navcolor,  id:"5ed9ec77213a231d845ddb63" })
                        .then(window.location.reload);  
  }
  onSubmit = (src , caption) => {
    axios.post('/api/carouselData', {
      src,      
      caption
    }).then(window.location.href="/dashboard/5")
  }

  deleteCarousel = (id)=>{
    axios.post('/api/carousel/delete',{id})
  }
  render() {
    const styles = {
        tabx: {
          cursor: 'pointer',      
          color:'white',
        },
      }
  const { apiList, url,  caption, modalEdit } = this.state
    return (
      <div style={{paddingTop: '50px', paddingBottom:'50px', background:'#fff'}}>
        <h1>Trending and Promotions</h1>
      <Table responsive striped bordered hover size="sm">
        <thead style={styles}>
          <tr>
            <th>#</th>
            <th>image</th>
            <th>URL</th>    
            <th>Delete</th>            
          </tr>
        </thead>
        <tbody>
        {
          apiList.map((x, index)=>
            <tr>
              <th scope="row">{index+1}</th>              
              <td><img src={x.src} style={{width:"100px"}}></img></td>                         
              <td>{x.caption}</td>    
              <td><Button onClick={()=>this.deleteCarousel(x._id)}><span className="fa fa-close"/>Delete</Button></td>            
            </tr>
            )
          }
        </tbody>
      </Table>
      <Button className="btn lg primary" onClick={this.toggle}>Add new item</Button>
      <hr/>
      <h3>Logo</h3>
      <small>lenght: 100px height: 600px</small> 
      <img src={this.state.logo} style={{width:'20vw'}}/>
      <Input type="file" accept="image/*" onChange={this.handleLogoUpload}/>
        {this.state.logoprogress && <span className="fa fa-refresh fa-spin"/> }
      <hr/><br/>
      <h3>Banner text</h3>
      <small className="text-grey">Explain any new offer or welcome text</small>
      <input type="text" onChange={this.bannertextChange} value={this.state.bannertext}/>
        <Button onClick={()=>this.bannerUpdate(this.state.bannertext)}>Update Text</Button>
        <hr/><br/>
      <h3>Navbar Color</h3>
      <small className="text-grey">color name or <a href="https://www.google.com/search?q=hexcode" target="_blank">(HEX CODE)</a></small>
      <input type="text" onChange={this.navcolorChange} value={this.state.navcolor}/>
        <Button onClick={()=>this.navcolorUpdate(this.state.navcolor)}>Update color</Button>
        <hr/><br/>
      <h3>Header image</h3>
      <small>lenght: 600px height: 500px</small> 
      <img src={this.state.header} style={{width:'30vw'}} />
      <Input type="file" accept="image/*" onChange={this.handleHeaderUpload}/>
        {this.state.headerprogress && <span className="fa fa-refresh fa-spin"/> }
      <hr/><br/>
      <h3>Homepage background image PC</h3>
      <small>lenght: 1280px height: 450px</small> 
      <img src={this.state.bg} style={{width:'20vw'}}/>
      <Input type="file" accept="image/*" onChange={this.handleBgUpload}/>
        {this.state.bgprogress && <span className="fa fa-refresh fa-spin"/> }
      <hr/><br/>
      <h3>Homepage background image Mobile</h3>
      <small>lenght: 720px height: 1080px</small> 
      <img src={this.state.mbg} style={{width:'20vw'}}/>
      <Input type="file" accept="image/*" onChange={this.handleMbgUpload}/>
        {this.state.mbgprogress && <span className="fa fa-refresh fa-spin"/> }
      <hr/><br/>
      <Modal isOpen={modalEdit} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>add new promo</ModalHeader>
          <ModalBody>  
            <ListGroup>
            <InputGroup>
                 Image URL: <small>(800x350px)</small>              
                <div>      
        <Input type="file" accept="image/*" onChange={this.handleChange}/>
        <Progress  animated={this.state.upload=="uploading"} color="success" value={this.state.progress} max={1000}/>
        <button onClick={this.handleUpload } disabled={this.state.upload=="upload"?false:true}>{this.state.upload}</button>
        <br/>
      <img src={this.state.url} height="60" width="80"/>
      </div>
                <Input placeholder={"URL..."} value={this.state.url}  />
              </InputGroup>       
              <InputGroup>               
                  <InputGroupText>Caption</InputGroupText>
                <Input placeholder="Page URL to link" value={caption} onChange={this.onChangeCaption} />
              </InputGroup>
            </ListGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" 
              onClick={()=>this.onSubmit(
                url,                 
                caption
                ) }>Add Item
            </Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>

    ) 
}
}
