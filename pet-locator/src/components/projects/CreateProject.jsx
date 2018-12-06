import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'
import ReactDOM from 'react-dom';
import {M, options} from 'materialize-css/dist/js/materialize.min.js'






class CreateProject extends Component {
  state = {
    title: '',
    content: '',
    animalType: '', 
    areaLastSeen: '',
    state:'',
    image:'', 
    progress: 100
    
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
    this.setState({
      progress: 50
    })
    console.log('Uploading File...')
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'please_upload')
    console.log(this.state.progress)
    
    const response = await fetch('https://api.cloudinary.com/v1_1/dtp2onxfq/image/upload',
        {
            method: 'POST',
            body: data
        })
        const file = await response.json()
        
        console.log(file)
        this.setState({
            image: file.secure_url,
            progress: 100
        })
        console.log(this.state.progress)
}

componentDidMount() {
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, options);
  });
}


  render() {
    
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> 
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Upload a New Post</h5>
          <div className='row'>
            <div className="input-field col s6">
              <input type="text" id='title' onChange={this.handleChange} />
            <label htmlFor="title">Post Title</label>
            </div>
            <div className="col s6">
            <label htmlFor="image">
                Image
                <input 
                type="file" 
                id="image" 
                name="file" 
                placeholder="Upload an Image" 
                onChange={this.uploadFile} 
                required/>
                {this.state.image && <img width="150px" height="130px" src={this.state.image} alt="image preview"/>}
              </label>
            </div>
          </div>
          <div className="row">
              <div className="input-field col s6">
                <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
                <label htmlFor="content">Comment</label>
              </div>
          </div>
              <div className="row">
                <div className="input-field col s6">
                <div>
                    <label htmlFor="animalType">Animal</label>
                  </div>
                  <select id="animalType"className="browser-default" onChange={this.handleChange}>
                    <option value="" disabled selected>Choose your option</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="bird">Bird</option>
                    <option value="reptile">Reptile</option>
                    <option value="horse">Horse</option>
                  </select>                  
                </div>
              </div>
              
          
         <div className="row">
              <div className="input-field col s6">
                <textarea id="areaLastSeen" className="materialize-textarea" onChange={this.handleChange}></textarea>
                <label htmlFor="areaLastSeen">Area Last Seen</label>
              </div>
              <div className="input-field col s6">
                <input type="tel" id="contactNumber"  onChange={this.handleChange}></input>
                <label htmlFor="Contact">Contact Number</label>
              </div>
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
