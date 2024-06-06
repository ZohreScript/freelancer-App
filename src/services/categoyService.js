import http from "./Httpservices";

export function getCategoryApi() {
  return http.get("/category/list").then(({ data }) => data.data);
}
