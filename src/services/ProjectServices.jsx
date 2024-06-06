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