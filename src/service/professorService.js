import { HTTP } from './baseService';

class ProfessorService {

  async getProfessorById(id){
    const response = await HTTP.get(`/professors/${id}`);
    return response.data;
  }


}

const professorService = new ProfessorService;
export default professorService;