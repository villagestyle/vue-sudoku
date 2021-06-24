<template>
  <main>
    <table>
      <tr v-for="(col, index) in data.grid" :key="index">
        <td
          class="box"
          :class="{
            active: active === index * 9 + rowIndex,
            disabled: item.readonly,
            filled: !item.readonly,
            error: item.error,
          }"
          v-for="(item, rowIndex) in col"
          :key="rowIndex"
          @click="active = item.readonly ? -1 : index * 9 + rowIndex"
        >
          {{ item.value || "" }}
          <span
            class="draft"
            v-for="(draft, index) in item.draft"
            :key="index"
            >{{ draft }}</span
          >
        </td>
      </tr>
    </table>

    <section class="keyboard">
      <div v-for="key in keybord" :key="key" class="box" @click="fill(key)">
        {{ key }}
      </div>
      <div
        class="box"
        :class="{ active: mode === 1 }"
        @click="mode === 1 ? (mode = 0) : (mode = 1)"
      >
        草稿
      </div>
    </section>

    <section class="check" @click="check">
      检查
    </section>
  </main>
</template>

<script lang="ts">
import { drawNinePlaceGrid, digHole, SudokuElList, checkError } from "../../utils/sudoku";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useKeydown } from "../../hooks/useKeydown";

type EditMode = 0 | 1;

export default defineComponent({
  setup() {
    const keybord = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const active = ref<Nullable<number>>(null);
    const mode = ref<EditMode>(0);
    const data = reactive<{
      grid: SudokuElList[];
    }>({
      grid: [[]]
    });

    onMounted(() => {
      const level = prompt("请选择难度(1-9, 默认为3)：", "3");
      let levelNum = Number(level) || 3;
      levelNum = levelNum > 9 ? 9 : levelNum < 1 ? 1 : levelNum;
      data.grid = digHole(drawNinePlaceGrid(), levelNum * 7);

      useKeydown([1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => String(d)), (e: KeyboardEvent) => {
        fill(Number(e.key));
        console.log('输出', e.key);
      });
    });

    const fill = (key: number) => {
      if (active.value === null || active.value === -1) {
        return;
      }

      const x = active.value % 9;
      const y = Math.floor(active.value / 9);
      data.grid[y][x].error = false;

      if (mode.value === 1) {
        fillDraft(x, y, key);
        return;
      }

      data.grid[y][x].value = key;
      data.grid[y][x].draft = [];
    };

    const fillDraft = (x: number, y: number, key: number) => {
      data.grid[y][x].value = 0;
      const set = new Set(data.grid[y][x].draft);
      if (set.has(key)) {
        set.delete(key);
      } else {
        set.add(key);
      }
      data.grid[y][x].draft = Array.from(set);
    };

    const check = () => {
      data.grid = checkError(data.grid);
    }

    return {
      data,
      active,
      keybord,
      fill,
      mode,
      check
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
  background-color: rgb(190, 223, 240);
  color: #fff;
}

.box.filled {
  color: rgb(0, 155, 233);
}

.box.error {
  background-color: rgb(245, 94, 94);
  color: #fff;
}

.box.disabled {
  color: #000;
  background-color: #fff;
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

.draft {
  display: inline-block;
  line-height: 20px;
  font-size: 11px;
  float: left;
  width: 33%;
}

.check {
  display: inline-block;
  margin: 20px auto;
  width: 80px;
  border: 1px solid rgb(185, 182, 182);
  cursor: pointer;
  padding: 15px 30px;
}
</style>
