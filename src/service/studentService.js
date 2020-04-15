import { HTTP } from './baseService';

class StudentService {

  async createStudent(student, gradebookId){
    try {
      await HTTP.post(`/gradebooks/${gradebookId}/students/create`, student);
    } catch (error) {
      console.log('Error with student creating');
      console.dir(error);
    }
  }







  

}

const studentService = new StudentService;
export default studentService;