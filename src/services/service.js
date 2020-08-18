//import http from "../http-common";
import axios from "axios";

class DiscursoService {
    getAll() {
      return axios.get("/api/discurso");
    }
  
    get(id) {
      return axios.get(`/api/discurso/${id}`);
    }
  
    create(data) {
      return axios.post("/api/discurso", data);
    }
  
    update(id, data) {
      var config = {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : JSON.stringify(data)
      };

      return axios(`/api/discurso/`,  config);
    }
  
    delete(id) {
      var config = {
        method: 'post',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : JSON.stringify({"id": id})
      };

      return axios(`/api/discurso/deletar/`,config );
    }
  
  }
  
  export default new DiscursoService();