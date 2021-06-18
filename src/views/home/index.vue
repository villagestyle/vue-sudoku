<template>
  <div>
    <h3>{{ pageName }}</h3>
    <input type="text" v-model:value="count">
  </div>
</template>

<script>
import { AppStore } from '../../store/modules/app'
import { defineComponent, onMounted, ref, watch } from 'vue';

export default defineComponent({
  mounted() {
    console.log(AppStore.getSysNo);
  },
  setup() {
    const pageName = 'Home Page';
    const count = ref(0);

    onMounted(() => {
      console.log('mounted');
    })

    watch(count, (newVal, oldVal) => {
      console.log(`the new value is: ${newVal}`);
    });
    
    return {
      pageName
    }
  }
})

</script>
