<template>
  <div>
     <Nav />
     <router-view/>
  </div>
</template>

<script>
import Nav from "../src/components/Nav/Nav.vue";
export default {
  name: 'App',
  components: {   Nav}
};
</script>
