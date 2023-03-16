import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        heroes: []
    },
    mutations: {
        setHeroes(state, heroes) {
            state.heroes = heroes
        }
    },
    actions: {
        async fetchHeroes({ commit }) {
            try {
                const url = `http://gateway.marvel.com/v1/public/characters?ts=1678861913898&apikey=46f0111ea554f723e31bf89fb79ec36f&hash=76b15589be34128e4439b10b92932b48`
                const response = await axios.get(url)
                const heroes = response.data.data.results
                console.log('heros...', heroes)
                commit('setHeroes', heroes)
            } catch (error) {
                console.error(error)
            }
        }
    },
    getters: {
        allHeroes: (state) => state.heroes
    }
});
