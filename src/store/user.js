import * as fb from 'firebase'

// объект User
class User {
  constructor(id) {
    this.id = id
  }
}

export default {
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    }
  },
  actions: {
    async registerUser({ commit }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)
      // создаем юзера

      // try {
      //   const user = await fb.auth().createUserWithEmailAndPassword(email, password)
      //   console.log('new user is:' + user.id)
      //   commit('setUser', new User(user.uid))
      //   commit('setLoading', false)
      // } catch (error) {
      //   commit('setLoading', false)
      //   commit('setError', error.message)
      //   throw error
      // }


      fb.auth().createUserWithEmailAndPassword(email, password)
        .then(function (data) {
          // console.log('new user is:' + data.user.uid)
          commit('setUser', new User(data.user.uid))
          commit('setLoading', false)
        }).catch(function (error) {
          commit('setLoading', false)
          commit('setError', error.message)
          // throw error
        })
    },
    async loginUser({ commit }, { email, password }) {
      commit('clearError')
      commit('setLoading', true)
      // try {
      //   const user = await fb.auth().signInWithEmailAndPassword(email, password)
      //   commit('setUser', new User(user.uid))
      //   commit('setLoading', false)
      // } catch (error) {
      //   commit('setLoading', false)
      //   commit('setError', error.message)
      //   throw error
      // }
      fb.auth().signInWithEmailAndPassword(email, password)
        .then(function (data) {
          // console.log('new user is:' + data.user.uid)
          commit('setUser', new User(data.user.uid))
          commit('setLoading', false)
        }).catch(function (error) {
          commit('setLoading', false)
          commit('setError', error.message)
          // throw error
        })

    },
    autoLoginUser({ commit }, payload) {
      commit('setUser', new User(payload.uid))
    },
    logoutUser({ commit }) {
      fb.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    isUserLoggedIn(state) {
      return state.user !== null
    }
  }

}