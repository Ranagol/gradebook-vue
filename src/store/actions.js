import gradebookService from '../service/gradebookService';
import professorService from '../service/professorService';

export default {
  async getAllGradebooks({commit}){
    const gradebooks = await gradebookService.getAllGradebooks();
    commit('getAllGradebooks', gradebooks);
  },

  async getProfessor({commit}, id){
    const professor = await professorService.getProfessorById(id);
    commit('setProfessor', professor);
  }

}
