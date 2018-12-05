import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'

class CreateProject extends Component {
  state = {
    title: '',
    content: '',
    image:'https://boygeniusreport.files.wordpress.com/2016/11/puppy-dog.jpg?quality=98&strip=all&w=782'
    
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
    data.append('upload_preset', 'sick_fits')
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
          <label htmlFor="image">
                    Image
          <input type="file" id="image" name="file" placeholder="Upload an Image" 
          onChange={this.uploadFile} required />
            {this.state.image && <img src={this.state.image} alt="image preview"/>}
          </label>
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
