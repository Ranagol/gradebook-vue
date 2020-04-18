import { HTTP } from './baseService';

class GradebookService {
  async getAllGradebooks(searchTerm, page, take = 10){
    // /gradebooks?take=10&skip=5&name=randomSearchTerm
    const skip = (page - 1) * take;
    const response = await HTTP.get(`/gradebooks?name=${searchTerm}&skip=${skip}&take=${take}`);
    return response.data;
  }

  getGradebookById(){
    return HTTP.get(`/gradebooks/${3000}`);
    //TODO --- EZ IT PROBLEMA, DIREKT A FUNKCIOT KELL REUTURNOLNI!!!!!!!

  }

  async getMyGradebook(){
    try {
      const response = await HTTP.get("/my-gradebook");
      return response.data || {};
    } catch (error) {
      console.dir(error);
    }
  }



  createGradebook(gradebook){
    return HTTP.post('/gradebooks', gradebook);
  }

  async getAvaliableGradebooks(){
    try {
      const response = await HTTP.get("/available-gradebooks");
      return response.data;
    } catch (error) {
      console.dir(error);
    }
  }

  deleteGradebook(id){//TODO tobbi deletet atjavitani ha van + losi hibakijezest mindehil megicsnalni
    return HTTP.delete(`/gradebooks/${id}`);
  }

}

const gradebookService = new GradebookService;
export default gradebookService;