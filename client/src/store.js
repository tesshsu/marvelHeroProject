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
        setHeroes(state, heroes, totalPages) {
            state.heroes = heroes
            state.totalPages = totalPages
        }
    },
    actions: {
        async fetchHeroes({ commit }, { currentPage, maxPerPage }) {
            try {
                const url = `http://localhost:3000/api/characters?currentPage=${currentPage}&maxPerPage=${maxPerPage}`
                const response = await axios.get(url)
                const heroes = response.data.results
                const totalPages = response.data.pagination.totalPages
                console.log('heros', heroes)
                commit('setHeroes', heroes, 'totalPages', totalPages)
            } catch (error) {
                console.error(error)
            }
        }
    },
    getters: {
        allHeroes: (state) => state.heroes
    }
});
