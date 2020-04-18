import { HTTP } from './baseService';

class GradebookService {
  async getAllGradebooks(searchTerm, page, take = 10){
    // /gradebooks?take=10&skip=5&name=randomSearchTerm
    const skip = (page - 1) * take;
    const response = await HTTP.get(`/gradebooks?name=${searchTerm}&skip=${skip}&take=${take}`);
    return response.data;
  }

  getGradebookById(id){
    return HTTP.get(`/gradebooks/${id}`);
  }

  getMyGradebook(){
    return HTTP.get("/my-gradebook");
  }

  createGradebook(gradebook){
    return HTTP.post('/gradebooks', gradebook);
  }

  getAvaliableGradebooks(){
    return HTTP.get("/available-gradebooks");
  }

  deleteGradebook(id){
    return HTTP.delete(`/gradebooks/${id}`);
  }

}

const gradebookService = new GradebookService;
export default gradebookService;