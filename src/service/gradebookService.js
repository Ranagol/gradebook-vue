import { HTTP } from './baseService';

class GradebookService {
  async getAllGradebooks(){
    try {
      const response = await HTTP.get("/gradebooks");
      return response.data;
    } catch (error) {
      console.log('This is from console.log', error);
      console.dir(error);// with dir we will see all properties of the error object, the whole structure
      if (error.response.status == 401) {//if the status code is 401..
        console.log('Error in: gradebookService/getAllGradebooks()');//console.log can work with strings
        console.dir(error.response.data.status);//console.dir can't log string messages, it can work only with objects
        alert(error.response.data.status);
      } else {
        console.log('Some funny error happened in gradebookService/getAllGradebooks()')
      }
    }
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



  async createGradebook(gradebook){
    try {
      await HTTP.post('/gradebooks', gradebook);
    } catch (error) {
      console.log('Error with gradebook creating');
      console.dir(error);
    }
  }

  async getAvaliableGradebooks(){
    try {
      const response = await HTTP.get("/gradebooks/avaliable");
      return response.data;
    } catch (error) {
      console.dir(error);
    }
  }
}

const gradebookService = new GradebookService;
export default gradebookService;