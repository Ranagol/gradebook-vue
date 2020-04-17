export default {
  /*
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
  */

  setLoggedIn(state){//activated from Login or Register
    state.isLoggedIn = true;
  },

  setLoggedOut(state){//activated from Logout
    state.isLoggedIn = false;
  }

}
