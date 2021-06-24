const SUDOKUEL = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function drawNinePlaceGrid() {
  const arr: number[][] = new Array(9).fill(new Array(9).fill(0));
  for (let i = 0; i < arr.length; i++) {
    // 重排第i行
    const result = takeCell(arr, i);
    if (!result) i--;
  }
  return arr;
}

function takeCell(origin: number[][], i: number) {
  const arr = new Array(9).fill(0);
  let el = SUDOKUEL.slice();
  let num = 0;
  let success = false;
  for (let j = 0; j < 9; j++) {
    el = takeSurplusArr(origin, j, i);
    [num] = randomNum(el);
    arr[j] = num;
    origin[i] = arr;
  }
  success = arr.filter(d => d).length === 9;
  return success;
}

function randomNum(arr: number[] = SUDOKUEL): [number, number[]] {
  const index = Math.floor(Math.random() * arr.length);
  const num = arr[index];
  const surplusArr = arr.filter(d => d !== num);
  return [num, surplusArr];
}

function takeSurplusArr(origin: number[][], x: number, y: number, options = { excludeSelf: false }) {
  const SUDOKUELCopy = SUDOKUEL.slice();
  const originNum = origin[y][x];
  const nineGridElArr = getNinePlaceGrid(origin, x, y).filter(
    d => d !== originNum && d
  );
  const nineSurplusElArr = SUDOKUELCopy.filter(d => !nineGridElArr.includes(d));

  let row = origin.map(d => d[x]);
  let col = origin[y];

  if (options.excludeSelf) {
    row = row.filter((d, index) => index !== y);
    col = col.filter((d, index) => index !== x);
  }

  const rowSurplus = nineSurplusElArr.filter(d => !row.includes(d));
  const colSurplus = rowSurplus.filter(d => !col.includes(d));

  return colSurplus;
}

function getNinePlaceGrid(origin: number[][], x: number, y: number): number[] {
  const row = Math.floor(y / 3);
  const col = Math.floor(x / 3);

  const copy = origin.slice();
  const arr = [];
  // 获取所在九宫格
  for (let i = 0; i < 9; i++) {
    const el = copy[row * 3 + Math.floor(i / 3)][col * 3 + (i % 3)];
    arr.push(el);
  }

  return arr;
}

export function digHole(arr: number[][], num: number) {
  for (let i = 0; i < num; i++) {
    const [randomX] = randomNum(SUDOKUEL);
    const [randomY] = randomNum(SUDOKUEL);

    if (arr[randomX - 1][randomY - 1]) {
      arr[randomX - 1][randomY - 1] = 0;
    } else {
      i--;
    }
  }

  return formatValue(arr);
}

function formatValue(arr: number[][]) {
  const result: SudokuElList[] = [];
  for (let i = 0; i < arr.length; i++) {
    const list: SudokuElList = [];
    for (let j = 0; j < arr[i].length; j++) {
      const value = arr[i][j];
      const obj = {
        value,
        draft: [],
        readonly: !!value,
        error: false
      };
      list[j] = obj;
    }
    result.push(list);
  }
  return result;
}

export function checkError(data: SudokuElList[]) {
  const copy = data.slice();
  const transformArr = [];
  for (let i = 0; i < copy.length; i++) {
    const arr = copy[i].map(d => d.value);
    transformArr.push(arr);
  }

  const result: [number, number][] = [];
  for (let i = 0; i < transformArr.length; i++) {
    for (let j = 0; j < transformArr[i].length; j++) {
      const el = copy[i][j];
      if (!el.readonly) {
        const arr = takeSurplusArr(transformArr, j, i, { excludeSelf: true });
        data[i][j].error = false;
        if (!arr.includes(transformArr[i][j])) {
          result.push([i, j]);
        }
      }
    }
  }

  result.map(d => data[d[0]][d[1]].error = true);

  return data;
}

export type SudokuElList = SudokuEl[];
export interface SudokuEl {
  value: number;
  draft: number[];
  readonly: boolean;
  error: boolean;
}
