import { HTTP } from './baseService';

class GradebookService {
  async getAllGradebooks(){
    const response = await HTTP.get("/gradebooks");
    return response.data;
  }

  async getGradebookById(id){
    try {
      const response = await HTTP.get(`/gradebooks/${id}`);
      return response.data;
    } catch (error) {
      console.dir(error);
    }
  }


  
  async getMyGradebook(){
    try {
      const response = await HTTP.get("/my-gradebook");
      return response.data;
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

  async deleteGradebook(id){
    try {
      await HTTP.delete(`/gradebooks/${id}`);
    } catch (error) {
      console.log('Error with gradebook deleting');
      console.dir(error);
    }
  }

}

const gradebookService = new GradebookService;
export default gradebookService;