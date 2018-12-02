import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'

   
class CreateProject extends Component {
  state = {
    title: '',
    animalType: '',
    content: '', 
    address: '',
    state: '',
    zipCode: '',
    image: null,
    url: '',
    progress: 0
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    this.props.createProject(this.state);
    this.props.history.push('/');
  }


  render() {


    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> 
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Post for a Lost or Found Pet</h5>
          <div className="input-field">
            <input type="text" id='title' onChange={this.handleChange} />
            <label htmlFor="title">Post Title</label>
          </div>
          <div className="input-field">
            <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
            <label htmlFor="content">Comment</label>
          </div>
          <div className="input-field">
            <textarea id="animalType" className="materialize-textarea" onChange={this.handleChange}></textarea>
            <label htmlFor="animalType">Animal Type</label>
          </div>
          <div className="input-field">
            <textarea id="address" className="materialize-textarea" onChange={this.handleChange}></textarea>
            <label htmlFor="address">Address</label>
          </div>
          
          <div className="input-field">
            <textarea id="zipCode" className="materialize-textarea" onChange={this.handleChange}></textarea>
            <label htmlFor="zipCode">Zip Code</label>
          </div> 
          <div className="input-field">
            <button className="btn pink lighten-1">Create</button>
          </div>
        </form>
         
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createProject: (project) => dispatch(createProject(project))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)
