function generatePascalsTriangle(rowNum, startNumber = 1) {
  const triangle = [];
  let arr = [];
  let sum;

  for (let i = 0; i < rowNum; i++) {
    arr.push(startNumber);

    for (let j = 0; j < i; j++) {
      if (i === j + 1) {
        arr.push(startNumber);
        continue;
      }
      sum = triangle[i - 1][j] + triangle[i - 1][j + 1];

      if (sum > Number.MAX_SAFE_INTEGER) {
        return triangle;
      }

      arr.push(sum);
    }

    triangle.push(arr);
    arr = [];
  }

  return triangle;
}

const containerElement = document.querySelector(".container");
const triangleWrapper = document.querySelector(".triangle-wrapper");
const btnGen = document.querySelector(".btn-gen");
const rowsInput = document.querySelector("#rows-input");
const startNumInput = document.querySelector("#start-num-input");
const rowsInputErr = document.querySelector(".rows-input-error");
const startNumInputErr = document.querySelector(".start-num-input-error");
rowsInput.value = "";
startNumInput.value = "";

function handleGenerateClick() {
  const rowsNum = parseInt(rowsInput.value);
  const startNum = parseInt(startNumInput.value);

  if (!rowsNum && !startNum) {
    rowsInputErr.style.display = "block";
    startNumInputErr.style.display = "block";
    return;
  } else if (!rowsNum) {
    rowsInputErr.style.display = "block";
    return;
  } else if (!startNum) {
    startNumInputErr.style.display = "block";
    return;
  } else {
    rowsInputErr.style.display = "none";
    startNumInputErr.style.display = "none";
  }

  triangleWrapper.innerHTML = "";

  const rowsHTML = generatePascalsTriangle(rowsNum, startNum).map(
    (row, index) =>
      `<span class="row-num">${index + 1}.</span>${row
        .map((num) => `<div class="number">${num}</div>`)
        .join("")}`
  );

  rowsHTML.forEach((rowHTML) => {
    const rowElement = document.createElement("div");
    rowElement.classList = "row";
    rowElement.innerHTML = rowHTML;
    triangleWrapper.appendChild(rowElement);
  });
}

btnGen.addEventListener("click", handleGenerateClick);
