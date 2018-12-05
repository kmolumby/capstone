import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'

class CreateProject extends Component {
  state = {
    title: '',
    content: '',
    animalType: '', 
    areaLastSeen: '',
    image:''
    
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

  uploadFile = async e => {
    console.log('Uploading File...')
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'please_upload')
    const response = await fetch('https://api.cloudinary.com/v1_1/dtp2onxfq/image/upload',
        {
            method: 'POST',
            body: data
        })
        const file = await response.json()
        console.log(file)
        this.setState({
            image: file.secure_url,
        })
}


  render() {
    
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> 
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Upload a New Post</h5>
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
            <textarea id="areaLastSeen" className="materialize-textarea" onChange={this.handleChange}></textarea>
            <label htmlFor="areaLastSeen">Area Last Seen</label>
          </div>
          <div className="input-field">
            <textarea id="contactNumber" className="materialize-textarea" onChange={this.handleChange}></textarea>
            <label htmlFor="Contact">Contact Number</label>
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1">Create</button>
          </div>
          <label htmlFor="image">
                Image
                <input 
                type="file" 
                id="image" 
                name="file" 
                placeholder="Upload an Image" 
                onChange={this.uploadFile} 
                required />
                {this.state.image && <img src={this.state.image} alt="image preview"/>}
              </label>
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
