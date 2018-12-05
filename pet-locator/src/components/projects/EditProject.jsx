import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'

class EditProject extends Component {
  state = {
    title: this.props.project.title,
    content: this.props.project.content,
    image: this.props.project.image
    
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
            <label htmlFor="content">Post Content</label>
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

const mapStateToProps = (state, ownProps) => {
    // // console.log(state);
    // const projects = state.firestore.data.projects;
    // const project = projects ? projects[id] : null
    return {
    //   project: project,
      auth: state.firebase.auth
    }
  }

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProject)
