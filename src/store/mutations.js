export default {
  getAllGradebooks(state, gradebooks){
    state.gradebooks = gradebooks;
  },

  setGradebook(state, gradebook){
    state.gradebook = gradebook;
  },

  setProfessors(state, professors){
    state.professors = professors;
  },

  setProfessor(state, professor){
    state.professor = professor;
  },

}
