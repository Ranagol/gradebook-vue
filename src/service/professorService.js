import { HTTP } from './baseService';

class ProfessorService {

  async getAllProfessors(){
    const response = await HTTP.get("/professors");
    return response.data;
  }


  async getProfessorById(id){
    try {
      const response = await HTTP.get(`/professors/${id}`);
      return response.data;
    } catch (error) {
      console.dir(error);
    }
  }

  createProfessor(professor){
    return HTTP.post('/professors', professor);
  }  

  async getAvaliableProfessors(){
    try {
      const response = await HTTP.get("/available-professors");
      return response.data;
    } catch (error) {
      console.dir(error);
    }
  }







  

}

const professorService = new ProfessorService;
export default professorService;