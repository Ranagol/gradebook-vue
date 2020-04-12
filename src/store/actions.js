import gradebookService from '../service/gradebookService';
export default {
  async getAllGradebooks({commit}){
    try {
      const gradebooks = await gradebookService.getAllGradebooks();
      commit('getAllGradebooks', gradebooks);
    } catch (error) {
      console.log('Error from actions/getAllGradebooks: ', error);
    }
    
  }
}
