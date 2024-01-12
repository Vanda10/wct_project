// store.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    email: '',
    role: '',
  },
  mutations: {
    setEmail(state, email) {
      state.email = email;
    },
    setRole(state, role) {
      state.role = role;
    },
  },
});
