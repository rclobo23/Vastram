import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Admin from './Admin';


class Secret extends Component {
  constructor(props){
    super(props);
    this.state = {
      authorization: false,
      apiAuth: false,
      atab : this.props.match.params.id || 0,
    };
  }

  async componentDidMount() {
    try {
      const response = await axios({
        method:'get',
        url:'/api/secret',
        headers: {'Authorization': localStorage.getItem("token")}
      })
        const apiAuth = await response.data.authorization;
        this.setState({ apiAuth })
          } catch (error) {
      console.log(error);
    }
    this.props.match.params.id ?"":window.history.pushState("", "", "dashboard/0")
  }

  render() {
    const showAdminPanel = this.state.apiAuth ? <Admin  atab= {this.state.atab}/> : <p style={{textAlign:'center', margin:'40vh 10vh'}}>Authorization is required, please login here: <Link to="/admin">login</Link></p>
    return (
      <div style={{height:'100vh'}}>
        {showAdminPanel}
      </div>
    )
  }
}

export default Secret
