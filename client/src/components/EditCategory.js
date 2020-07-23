import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { FiEdit2 } from 'react-icons/fi';
import axios from 'axios';
import {storage} from '../firebase/index';


class EditCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalEdit: false,      
      progress:0,
      images:'',
      catname:'',
      subcats:'', 
      hide:false,
    };
  }

  componentDidMount() {
  this.setState({images:this.props.infos.images})
  this.setState({catname:this.props.infos.catname})
  this.setState({subcats:this.props.infos.subcats})
  this.setState({hide:this.props.infos.hide})
  }

  toggle = () => this.setState({ modalEdit: !this.state.modalEdit });
  toggleHide = () =>this.setState({hide:!this.state.hide})

  onSubmit = (id, catname, subcats, images, hide) => {
    axios.post('/api/update/category', {
      id,
      catname,
      images, 
      hide,
      subcats:(subcats.slice(0)+'').split(','),   
    })
    .then(response => {
      this.setState({ modalEdit: false });
      window.location.reload(true);
      console.log(response);
    })
    .then(() => {
      window.location.reload(true);
    })
    .catch(err => {
      this.setState({ modalEdit: false });
      window.location.reload(true);
      console.log(err);
    });
  }

  onChangeTitle = (e) => this.setState({catname:[e.target.value]})
  onChangeSubcats = (e) => this.setState({subcats:[e.target.value]})

  onChangeImages = (e) =>alert(e.target.value)

  handleUpload = (e) => {
    e.preventDefault();    
      const image = e.target.files[0]
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on('state_changed', 
    (snapshot) => {
      // progrss function ....
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 10000);
      this.setState({progress});
    }, 
    (error) => {
         // error function ....
      console.log(error);
    }, 
  () => {
      // complete function ....
      storage.ref('images').child(image.name).getDownloadURL().then(images => {
          console.log(images);
          this.setState({images});
      })
  });
}
  render() {
    const { catname, apiList } = this.state
    const { _id} = this.props.infos

    return (
        
      <div>
        <Button  style={{position:'absolute', top:'10px', right: '10px'}} color="black" size='sm' onClick={this.toggle}><FiEdit2 /></Button>
        <Modal isOpen={this.state.modalEdit} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.infos.catname} <br/><small>id: {_id}</small></ModalHeader>
          <ModalBody>  
            <ListGroup>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Name</InputGroupText>
                </InputGroupAddon>
                <Input placeholder={"default: "+this.props.infos.catname} value={this.state.catname} onChange={this.onChangeTitle} />
              </InputGroup>      
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Sub categories</InputGroupText>
                </InputGroupAddon>
                <Input placeholder={"default: "+this.props.infos.subcats} value={this.state.subcats} onChange={this.onChangeSubcats} />
              </InputGroup>     
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Hidden:</InputGroupText>
                </InputGroupAddon>
               <Button onClick={()=>this.toggleHide()} className={this.state.hide?"fa fa-check": 'fa fa-close'}>{this.state.hide?"hidden": 'visible'}</Button>
              </InputGroup>         
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Images</InputGroupText>
                </InputGroupAddon>
                <img src={this.state.images} height='100' width='100'/>
                        
              </InputGroup>             
            </ListGroup>
            <progress value={this.state.progress} max="10000"/>
      <br/>
        <input type="file" onChange={this.handleUpload}/>        
        <br/>
        <input type="hidden" value = {this.state.images[0]} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" 
              onClick={()=>this.onSubmit(
                _id,      
                catname,   
                this.state.subcats,
                this.state.images,
                this.state.hide
                )}>Confirm the changes?
            </Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
};

export default EditCategory;
