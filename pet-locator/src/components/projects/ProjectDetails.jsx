
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { firestoreConnect} from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment';
import { removeProject } from '../../store/actions/projectActions';
import EditProject from './EditProject'
import { Link } from 'react-router-dom'




const ProjectDetails = (props) => {
  const { project, auth } = props;
  const id = props.match.params.id
  console.log(id, "<----- this id from project details")
  if (!auth.uid) return <Redirect to='/signin' /> 
  if (project) {
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{project.title}</span>
            <p><span></span>{project.content}</p>
            <p>{project.animalType}</p>
            <p>{project.state}</p>

          </div>
          <div className="card-action grey lighten-4 grey-text">
          {project.image && <img src={project.image} alt="image preview"/>}

            <div>Posted by {project.authorFirstName} {project.authorLastName}</div>
            <div>{moment(project.createdAt.toDate()).calendar()}</div>
        </div>
        <button onClick={props.removeProject.bind(null, id)}>Delete</button>
        <button> 
          {/* <Link to={'/project/edit' + project.id}> Edit
                     <EditProject project={project} key={project.id}/>
                   </Link> */}
        </button>
        
        </div>
      </div>
    )
  } else {
    return (
      <div className="container center">
        <p>Loading post...</p>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log(state);
  const id = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[id] : null
  return {
    project: project,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    removeProject: (project) => dispatch(removeProject(project, ownProps.history)),
  }
}


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{
    collection: 'projects'
  }])
)(ProjectDetails)
