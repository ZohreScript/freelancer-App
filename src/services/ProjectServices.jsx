import http from "./Httpservices";

export function getOwnerProjectsApi() {
    return http.get("/project/owner-projects")
        .then(({ data }) => data.data);
}
export function removeProjectApi(id){
    return http.delete(`/prject/${id}`).then(({data}))
}
export function createProjectApi(data) {
    return http.post(`/project/add`, data).then(({ data }) => data.data);
  }

  export function editProjectApi({ id, newProject }) {
    return http
      .patch(`/project/update/${id}`, newProject)
      .then(({ data }) => data.data);
  }
  export function toggleProjectStatusApi({ id, data }) {
    //{status:"OPEN"}
    return http.patch(`/project/${id}`, data).then(({ data }) => data.data);
  }
  
  export function getProjectApi(id) {
    //{status:"OPEN"}
    return http.get(`/project/${id}`).then(({ data }) => data.data);
  }
  
  export function geProjectsApi(qs) {
    return http.get(`/project/list${qs}`).then(({ data }) => data.data);
  }
  