import React from 'react'

const ProjectDetails = (props) => {
const id = props.match.params.id;
  return (
    <div className="container section project-details">
      <div className="card z-depth-0">
          <div className="card-content">
          <span className="card-title">Project Title - {id} </span>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium consequuntur dicta in ullam voluptas fugit ipsa sit recusandae optio quis qui, corporis velit error nostrum iure similique nam, suscipit incidunt.</p>
          </div>
      </div>
      <div className="card-action grey lighten-4 grey-text">
        <div>Posted by Net Ninja</div>
        <div>11/26/18</div>
      </div>
    </div>
  )
}

export default ProjectDetails;
