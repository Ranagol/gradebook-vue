import { HTTP } from './baseService';

class CommentService {

  async createComment(comment, gradebookId){
    console.dir(gradebookId);
    try {
      //'/gradebooks/{gradebook}/comments/create'
      const response = await HTTP.post(`/gradebooks/${gradebookId}/comments/create`, comment);
      return response.data;
    } catch (error) {
      console.log('Error with comment creating');
      console.dir(error);
    }
  }

  






  

}

const commentService = new CommentService;
export default commentService;