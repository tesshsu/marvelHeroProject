<template>
  <div class="marvel-heroes">
    <div class="container">
      <h1 class="text-center my-5">Marvel Heroes</h1>

      <!-- Search form -->
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Search hero" v-model="searchTerm" @input="fetchHeroes()">
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
         <paginate
           :page-count="pageCount"
           :click-handler="changePage"
           :current-page.sync="currentPage"
           :hide-prev-next="isMobile"
           :prev-text="'Prev'"
           :next-text="'Next'"
           :container-class="'pagination justify-content-center mt-5'"
           :page-class="'page-item'"
           :link-class="'page-link'"
           :prev-class="'page-item'"
           :next-class="'page-item'"
           :prev-link-class="'page-link'"
           :next-link-class="'page-link'"
           :active-class="'active'"
           :disabled-class="'disabled'"
         >
           <li class="page-item" slot="prev">
             <button class="page-link">
               <span>&laquo;</span>
               <span class="sr-only">Prev</span>
             </button>
           </li>
           <li class="page-item" slot="next">
             <button class="page-link">
               <span>&raquo;</span>
               <span class="sr-only">Next</span>
             </button>
           </li>
         </paginate>
    </div>
  </div>
</template>

<script>
import paginate from 'vuejs-paginate'
import { mapActions } from 'vuex'

export default {
  name: 'MarvelHeroes',
  components: {
    paginate
  },
  data() {
    return {
      searchTerm: '',
      currentPage: 1,
      limit: 5
    }
  },
  computed: {
    heroes() {
        return this.$store.state.heroes
      },
    pageCount() {
      return Math.ceil(this.filteredHeroes.length / this.limit)
    },
    heroCount() {
        return this.filteredHeroes.length
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
    this.fetchHeroes()
  },
  methods: {
    ...mapActions(['fetchHeroes']),
     async fetchHeroes() {
        await this.$store.dispatch('fetchHeroes', {
          currentPage: this.currentPage,
          limit: this.limit
        })
      },
    changePage(page) {
      this.currentPage = page
    },
    created() {
        this.fetchHeroes()
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
