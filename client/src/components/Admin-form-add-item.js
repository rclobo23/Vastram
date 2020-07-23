import React, { Component ,  useState }  from 'react';
import ReactDOM from 'react-dom';
import { Button, Input, Form, FormGroup, Label, Container, UncontrolledButtonDropdown , Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Progress } from 'reactstrap';
import axios from 'axios';
import {storage} from '../firebase/index';
// import {storage} from '@firebase/storage'


class AdminFormAddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalEdit: false,
      title: '',
      color: '',
      size: '',
      qty : '',
      tags: '',
      images: '',
      description: '',
      price: 0,
      success: false,
      sizes: ["M", "s"],
      taginput: true,
      catoptions:[], 
      image: null,
      url: [],
      progress: 0,
      upload:"upload",
      noofimgs:["1"],
      loading:false,
      sizechart:"", 
      sizedetails:[], 
      special:false, 
      brands :""
      
    };
    this.handleChange = this
      .handleChange
      .bind(this);
      this.handleUpload = this.handleUpload.bind(this);
  }

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
          const x = this.state.url
          x[i] = url
          
            this.setState({url:x});
            this.setState({images:x})
            this.setState({upload: "uploaded"})
        })
    });
  })
  }
  //===================img uploader functions^^

componentDidMount(){
  fetch('/api/shopbyprice') 
  .then(response => {        
     return response.json();
   })
   .then((data) => {        
     this.setState({
       catoptions: data.map(x=>({
         valuex: x._id
       }))
     })
    })
.catch((err)=>console.log(err))   
}

  toggle = () => {
    this.setState({
      modalEdit: !this.state.modalEdit
    });
  }

  onSubmit = (title, price, color, size,  tags, images, description, sizechart, sizedetails, special, brands ) => {
    this.setState({loading:true})
    axios.post('/api/add/item', {
      title,
      price,
      brands,
      special,
      sizechart,
      color: (color.slice(0)+'').replace(/\s/g,'').split(','),
      size: (size.slice(0)+'').replace(/\s/g,'').split(','),      
      tags: (tags.slice(0)+'').split(','),
      images: (images.slice(0)+'').replace(/\s/g,'').split(','),
      description: description === undefined?'No description':description, 
      sizedetails: (sizedetails.slice(0)+'').replace(/\s/g,'').split(','), 
      
    })
    .then(() => {
      this.setState({loading:false})
      window.location.reload(true)
    })
    .catch(function (error) {
      window.location.reload(true)
    });
  }

  onChangeTitle = (e) => this.setState({title: e.target.value})
  onChangePrice = (e) => this.setState({price: e.target.value})
  onChangeColor = (e) => this.setState({color: [e.target.value]})
  onChangesize = (e) => this.setState({size: e.target.value})
  onChangeqty = (e) => this.setState({qty: e.target.value})
  onChangeTags = (e) => this.setState({tags: [e.target.value]})
  onChangeImages = (e) => this.setState({images: [e.target.value]})
  onChangeDescription = (e) => this.setState({ description: e.target.value })
  enableTagsInput =(e) => {this.setState({taginput: false})  }
  onChangeBrands = (e) => this.setState({brands: e.target.value})
  onChangeSpecial = () => this.setState({special: !this.state.special})
  onChangeSizechart = (e) => this.setState({sizechart: e.target.value})
  onChangeSizeDetails = (e) => this.setState({sizedetails: [e.target.value]})

  sizechartUpload = (e) => {
    e.preventDefault();
      const image = e.target.files[0]
      console.log(e.target.files);
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
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
        // complete function ....
        storage.ref('images').child(image.name).getDownloadURL().then(url => {                    
            this.setState({sizechart:url});
            console.log("uploaded", url);            
        })
    });
  }


  render() {
    const {catoptions} = this.state
    const quantity =()=> {
     // this.state.sizes.map( x =>{   
        <FormGroup>
          <Label for="exampleEmail">ji</Label>
          <Input placeholder='example: XS: 10, L:3, XL:20' value="0" onChange={this.onChangeqty} />
        </FormGroup>      
   // })
    }
    const CategoryData = ()=>{
         return (
           <div>
          {catoptions.map(x=>
           <DropdownItem onClick={this.onChangeTags} value= {x.valuex} >{x.valuex}</DropdownItem>      
          )
        }
          </div>
        )
      }
    const { title, price, color, size, qty, tags, images, description, sizechart, sizedetails, special, brands  } = this.state
    const style = {
      height: '100px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    };
    return (
      <Container style={{paddingTop: '50px', paddingBottom:'50px',background:"white", color:"black",fontFamily:"Roboto"}}>
      <h1>Add new item</h1>
      <Form >
        <FormGroup>
          <Label for="exampleEmail">Item's name</Label>
          <Input placeholder='example: cool polo' value={this.state.title} onChange={this.onChangeTitle} />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Price</Label>
          <Input placeholder='example: 43' value={this.state.price} onChange={this.onChangePrice} />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Brand</Label>
          <Input placeholder='example: Jockey' value={this.state.brands} onChange={this.onChangeBrands} />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Special / offer category (no discount category)</Label>
          <Button  onClick={this.onChangeSpecial}><span className={this.state.special?"fa fa-check":"fa fa-close"} /></Button>
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">color available</Label>
          <Input placeholder='example: color1, color2, color3' value={this.state.color} onChange={this.onChangeColor} />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">size available</Label>
          <Input placeholder='example: XS, L, XL' value={this.state.size} onChange={this.onChangesize} />
        </FormGroup>     
        <FormGroup>
          <Label for="exampleEmail">sizes details</Label>
          <Input placeholder='example: 72, 76, 80' value={this.state.sizedetails} onChange={this.onChangeSizeDetails} />
        </FormGroup>     
            <FormGroup>
          <Label for="exampleEmail">Quantity</Label>
          <Input type = "number" placeholder='number of this item in stock'  onChange={this.onChangeqty} />
          </FormGroup> 
      <FormGroup>
        <Label for="exampleEmail">Category  :</Label>
     <div className="Container" style={{display:"flex"}}>  <div className="col-md-2"> <UncontrolledButtonDropdown direction="down" onChange={this.onChangeTags}>
      <DropdownToggle  onChange={this.onChangeTags}>
        Choose
      </DropdownToggle>
      <DropdownMenu style={{overflowY:'scroll'}}>
        <DropdownItem header>select from list</DropdownItem>
  <CategoryData/>
        <DropdownItem divider />
        <DropdownItem style= {{background:'dodgerblue', border:'Solid 10px white', color: 'white'}}onClick = {this.enableTagsInput}>new Category</DropdownItem>
      </DropdownMenu>
    </UncontrolledButtonDropdown></div>
  <div className="col-md-10">  <Input disabled={this.state.taginput} autoFocus={!this.state.taginput} autoFocus ref={(input) => { this.nameInput = input; }} placeholder='or type your own...' value={this.state.tags} onChange={this.onChangeTags} />
  </div></div>
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Images</Label>
 <div style={style}>      
        <input type="file" multiple accept="image/*" onChange={this.handleChange}/>
        <Progress  animated={this.state.upload=="uploading"} color="success" value={this.state.progress} max={1000}/>
        <button onClick={this.handleUpload } disabled={this.state.upload==="upload"?false:true}>{this.state.upload}</button>
        <br/>
        {this.state.url.map((src, i)=>
      <img src={src} key={i} alt={"image "+i} height="60" width="80"/>
   )} 
      </div>
      <Input type="text"  placeholder='' value={this.state.url.map((item)=>" "+item)}  />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Description</Label>
          <Input type="textarea" value={this.state.description} onChange={this.onChangeDescription} />
        </FormGroup>

        <FormGroup>
        <Label for="examplePassword">Size chart image</Label>
        <img src={this.state.sizechart} style={{width:'10vw'}}/>
      <Input type="file"  accept="image/*" onChange={this.sizechartUpload}/>
      
      <hr/><br/>
        </FormGroup>

      </Form>
      <Button onClick={()=>this.onSubmit(
        title, 
        price, 
        color, 
        size, 
        tags,
        images,
        description, sizechart, sizedetails, special, brands 
        )}>Submit<span className="fa fa-spinner " style={{display:this.state.loading?'block':'none'}}/></Button>
      </Container>
    );
  }
}


export default AdminFormAddItem;