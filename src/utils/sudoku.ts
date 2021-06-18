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
  if (i === 0) {
    for (let j = 0; j < 9; j++) {
      [num, el] = randomNum(el);
      arr[j] = num;
    }
    origin[i] = arr;
  } else {
    for (let j = 0; j < 9; j++) {
      el = takeSurplusArr(origin, j, i);
      [num] = randomNum(el);
      arr[j] = num;
      origin[i] = arr;
    }
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

function takeSurplusArr(origin: number[][], x: number, y: number) {
  const SUDOKUELCopy = SUDOKUEL.slice();
  const originNum = origin[y][x];
  const nineGridElArr = getNinePlaceGrid(origin, x, y).filter(
    d => d !== originNum && d
  );
  const nineSurplusElArr = SUDOKUELCopy.filter(d => !nineGridElArr.includes(d));

  const row = origin.map(d => d[x]);
  const col = origin[y];

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
    arr.push(copy[row * 3 + Math.floor(i / 3)][col * 3 + (i % 3)]);
  }

  return arr;
}

export function digHole(arr: number[][], num: number) {
    for (let i = 0; i < num; i++) {
        const [randomX] = randomNum(SUDOKUEL);
        const [randomY] = randomNum(SUDOKUEL);

        if (arr[randomX][randomY]) {
            arr[randomX][randomY] = 0;
        } else {
            i--;
        }
    }

    return arr;
}