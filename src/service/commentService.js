import { HTTP } from './baseService';

class CommentService {

  createComment(comment, gradebookId){
    return HTTP.post(`/gradebooks/${gradebookId}/comments/create`, comment);
  }

  deleteComment(commentId){
    return HTTP.delete(`/comments/${commentId}`);
  }
}

const commentService = new CommentService;
export default commentService;