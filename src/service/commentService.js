import { HTTP } from './baseService';

class CommentService {

  async createComment(body){
    try {
      await HTTP.post('/comments', body);
    } catch (error) {
      console.log('Error with comment creating');
      console.dir(error);
    }
  }






  

}

const commentService = new CommentService;
export default commentService;