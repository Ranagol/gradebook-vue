import { HTTP } from './baseService';

class CommentService {

  createComment(comment, gradebookId){
    return HTTP.post(`/gradebooks/${gradebookId}/comments/create`, comment);
  }

  






  

}

const commentService = new CommentService;
export default commentService;