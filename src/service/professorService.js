import { HTTP } from './baseService';

class ProfessorService {

  async getAllProfessors(){
    try {
      const response = await HTTP.get("/professors");
      return response.data;
    } catch (error) {
      if (error.response.status == 401) {//if the status code is 401..
        console.log('Error in: gradebookService/getAllGradebooks()');//console.log can work with strings
        console.dir(error.response.data.status);//console.dir can't log string messages, it can work only with objects
        alert(error.response.data.status);
      } else {
        console.log('Some funny error happened in professorService/getAllProfessors()')
      }
    }
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