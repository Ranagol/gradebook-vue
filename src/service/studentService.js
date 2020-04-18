import { HTTP } from './baseService';

class StudentService {

  createStudent(student, gradebookId){
    return HTTP.post(`/gradebooks/${gradebookId}/students/create`, student);
  }
}

const studentService = new StudentService;
export default studentService;