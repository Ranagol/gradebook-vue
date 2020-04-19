import { HTTP } from './baseService';

class ProfessorService {

  async getAllProfessors(searchTerm = ''){
    if (searchTerm.length > 0) {
      const response = await HTTP.get("/professors", {params: {searchTerm: searchTerm}});
      return response.data;
    } else {
      const response = await HTTP.get("/professors");
      return response.data;
    }
  }

  getProfessorById(id){
    return HTTP.get(`/professors/${id}`);
  }

  createProfessor(professor){
    return HTTP.post('/professors', professor);
  }  

  getAvaliableProfessors(){
    return HTTP.get("/available-professors");
  }
}

const professorService = new ProfessorService;
export default professorService;