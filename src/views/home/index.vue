<template>
  <main>
    <table>
      <tr v-for="(col, index) in data.grid" :key="index">
        <td
          class="box"
          :class="{ active: active === index * 9 + rowIndex }"
          v-for="(item, rowIndex) in col"
          :key="item"
          @click="active = index * 9 + rowIndex"
        >
          {{ item || '' }}
        </td>
      </tr>
    </table>

    <section class="keyboard">
      <div v-for="key in keybord" :key="key" class="box">{{ key }}</div>
    </section>
  </main>
</template>

<script lang="ts">
import { AppStore } from "../../store/modules/app";
import { drawNinePlaceGrid, digHole } from "../../utils/sudoku";
import { defineComponent, onMounted, reactive, ref } from "vue";

export default defineComponent({
  mounted() {
    console.log(AppStore.getSysNo);
  },
  setup() {
    const keybord = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const active = ref<Nullable<number>>(null);
    const data = reactive<{
      grid: number[][]
    }>({
      grid: [[]]
    });

    onMounted(() => {
      const level = prompt('请选择难度(1-9, 默认为1)：', '1');
      data.grid = digHole(drawNinePlaceGrid(), Number(level) * 15 - 8);
    })

    return {
      data,
      active,
      keybord
    };
  }
});
</script>

<style scoped>
.box {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  font-size: 16px;
  color: #000;
}

.box:hover {
  background-color: #eee;
}

.box.active {
  background-color: rgb(65, 192, 255);
  color: #fff;
}

table {
  border-collapse: collapse;
  margin: 100px auto;
  font-size: 0;
  border: 1px solid rgb(185, 182, 182);
  user-select: none;
}

tr:nth-of-type(3n) {
  border-bottom: 1px solid rgb(185, 182, 182);
}

td:nth-of-type(3n)::after {
  content: "";
  position: absolute;
  right: 0;
  top: -1px;
  width: 1px;
  height: calc(100% + 2px);
  background-color: rgb(185, 182, 182);
}

td:last-of-type::after {
  width: 0;
}

td {
  border: 1px solid #eee;
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  padding: 0 0;
}

.keyboard > .box {
  border: 1px solid rgb(29, 29, 29);
  margin: 8px;
  cursor: pointer;
  user-select: none;
}
</style>
