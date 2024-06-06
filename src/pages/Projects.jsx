import React from 'react'
import ProjectTable from '../features/projects/ProjectTable'
import ProjectsHeader from '../features/projects/ProjectsHeader'

function Projects() {
  return (
    <div>
      <ProjectsHeader/>
        <ProjectTable/>
    </div>
  )
}

export default Projects