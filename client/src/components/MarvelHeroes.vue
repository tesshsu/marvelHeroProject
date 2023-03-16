<template>
  <div class="marvel-heroes">
    <div class="container">
      <h1 class="text-center my-5">Marvel Heroes</h1>

      <!-- Search form -->
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Search hero" v-model="searchTerm" @input="getHeroes">
      </div>

      <!-- Hero list -->
      <div class="row">
        <div class="col-12 col-md-6 col-lg-4 mb-4" v-for="hero in heroes" :key="hero.id">
          <div class="card">
            <img :src="hero.thumbnail.path + '/standard_fantastic.' + hero.thumbnail.extension" class="card-img-top" :alt="hero.name">
            <div class="card-body">
              <h5 class="card-title">{{ hero.name }}</h5>
              <router-link :to="{ name: 'HeroDetails', params: { heroId: hero.id } }" class="btn btn-primary">View details</router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <paginate :page-count="pageCount" :click-handler="changePage" :hide-prev-next="isMobile" :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'"></paginate>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import paginate from 'vuejs-paginate'

export default {
  name: 'MarvelHeroes',
  components: {
    paginate
  },
  data() {
    return {
      heroes: [],
      searchTerm: '',
      currentPage: 1,
      limit: 5
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.filteredHeroes.length / this.limit)
    },
    isMobile() {
      return window.innerWidth < 768
    },
    filteredHeroes() {
      if (!this.searchTerm) {
        return this.heroes
      }
      return this.heroes.filter(hero => hero.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
    }
  },
  mounted() {
    this.getHeroes()
  },
  methods: {
    async getHeroes() {
      try {
        const url = `http://gateway.marvel.com/v1/public/characters?ts=1678861913898&apikey=46f0111ea554f723e31bf89fb79ec36f&hash=76b15589be34128e4439b10b92932b48`
        const response = await axios.get(url)
        this.heroes = response.data.data.results
      } catch (error) {
        console.error(error)
      }
    },
    changePage(page) {
      this.currentPage = page
    }
  },
  watch: {
    currentPage() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>

<style scoped>
/* Mobile responsiveness */
@media only screen and (max-width: 767px) {
  .marvel-heroes .row {
    justify-content: center;
  }
}

/* Pagination */
.pagination {
  display: flex;
  justify-content:
}
