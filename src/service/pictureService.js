import { HTTP } from './baseService';

class PictureService {

  async createPicture(body){
    try {
      await HTTP.post('/pictures', body);
    } catch (error) {
      console.log('Error with picture creating');
      console.dir(error);
    }
  }
}

const pictureService = new PictureService;
export default pictureService;