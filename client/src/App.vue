<template>
  <div id="app">
    <h1>Heroes</h1>
    <MarvelHeroes />
  </div>
</template>

<script>
import MarvelHeroes from '@/components/MarvelHeroes.vue';

export default {
  name: 'App',
  components: {
    MarvelHeroes,
  },
};
</script>