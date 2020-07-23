import React, { Component } from 'react';
import {
  isMobile
} from "react-device-detect";
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Container, Col } from 'reactstrap';

class AdminContainer extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      apiResponse: '',
      loading:false
    };
  }

  onChangeEmail = (e) => {
    this.setState({email: e.target.value})
  }

  onChangePassword = (e) => {
    this.setState({password: e.target.value})
  }

  onLogin = async() => {
    this.setState({loading:true})
    try {
      const req = axios.post('/api/signin', {
        email: this.state.email,
        password: this.state.password
      })
      const response = await req;
      localStorage.setItem("token", response.data.token);
      this.setState({apiResponse: 'success'})
      this.setState({loading:false})
//      console.log(response)
    } catch (error) {
      this.setState({loading:false})
      this.setState({ apiResponse: error.response.statusText})
      console.log(error.response);
    }

  }

  onSignup = () => {
    
   /*  axios.post('/api/signup', {
      email: this.state.email,
      password: this.state.password
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error.response.data.error);
    }); */
  }

  redirectLoginSuccessListener = () => {
    if (this.state.apiResponse === 'success') {
      return <Redirect to={{
        pathname: "/dashboard/2",
        state: { referrer: 'test' }
      }}
    />
    
    }
  }

  render() {
    const errors = 
      this.state.apiResponse === 'Bad Request' ?
        'Please fill the email and password fields' :
        this.state.apiResponse === 'Unauthorized' &&
        'Email or password incorrect'

    return (
      <div style={{height:'100vh'}}>
        {this.redirectLoginSuccessListener()}
        <Container className="App" style={isMobile?{paddingTop: '20px', paddingBottom: '20px', marginBottom:'30px',  background: '#fefefe', width:'90%'}:{paddingTop: '5px', paddingBottom: '5px', marginBottom:'20px', marginTop:'20px',  background: '#fefefe', width:'60%'}}>
        <h2>Admin Dashboard</h2>
        <Form className="form">
          <Col>
            <FormGroup>
              <Label>Admin</Label>
              <Input
                type="text"
                name="email"
                id="exampleEmail"
                placeholder="@username"
                value={this.state.email} onChange={this.onChangeEmail} 
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="password"
                value={this.state.password} onChange={this.onChangePassword} 
              />
            </FormGroup>
          </Col>
          <Button disabled={this.state.loading} onClick={this.onLogin}>Login</Button>{this.state.loading?<i className="fa fa-spinner fa-spin ml-3" style={{fontSize:'24px'}}></i>:''}
          {/* <Button style={{left: '100px',position: 'relative' }} onClick={this.onSignup}>Sign Up</Button> */}
          {/* <Link to="/dashboard">secret page</Link> */}
          <p>{errors}</p>
        </Form>
      </Container>
      </div>
    )

  }
}

export default AdminContainer;