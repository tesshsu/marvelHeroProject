import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        heroes: [],
        totalPages: 0
    },
    mutations: {
        setHeroes(state, { heroes, totalPages }) {
            state.heroes = heroes
            state.totalPages = totalPages
        }
    },
    actions: {
        async fetchHeroes({ commit }, { page, limit }) {
            try {
                const url = `${process.env.VUE_APP_SERVER_BASE_URL}?page=${page}&limit=${limit}`
                const response = await axios.get(url)
                const heroes = response.data.results
                const totalPages = response.data.pagination.totalPages
                commit('setHeroes', { heroes, totalPages })
            } catch (error) {
                console.error(error)
            }
        }
    },
    getters: {
        allHeroes: (state) => state.heroes
    }
});
