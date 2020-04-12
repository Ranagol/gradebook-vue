import gradebookService from '../service/gradebookService';
import professorService from '../service/professorService';

export default {
  async getAllGradebooks({commit}){
    const gradebooks = await gradebookService.getAllGradebooks();
    commit('getAllGradebooks', gradebooks);
  },

  async getGradebook({commit}, id ){
    const gradebook = await gradebookService.getGradebookById(id);
    commit('setGradebook', gradebook);
  },

  async getAllProfessors({commit}){
    const professors = await professorService.getAllProfessors();
    commit('setProfessors', professors);
  },

  async getProfessor({commit}, id){
    const professor = await professorService.getProfessorById(id);
    commit('setProfessor', professor);
  },

}
