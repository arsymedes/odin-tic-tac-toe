const gameBoard = (() => {
  const board = document.querySelector(".board");
  const grid = ["", "", "", "", "", "", "", "", ""];

  const displayGrid = () => {
    boardContent = ''
    for (let [index, sign] of grid.entries()) {
      if (sign === 1) boardContent += `<div data-num="${index}"><i class="fa-solid fa-xmark"></i></div>`;
      else if (sign === 0) boardContent += `<div data-num="${index}"><i class="fa-regular fa-circle"></i></div>`;
      else boardContent += `<div data-num="${index}" class="empty"></div>`;
    }
    board.innerHTML = boardContent;

    document.querySelectorAll(".empty").forEach((div) => {
      div.addEventListener("click", () => {
        let mark = gameEngine.currentPlayer().markNum;
        let index = div.dataset.num
        grid[index] = mark;
        gameEngine.turn++
        displayGrid()
      })
    })
  }

  return {
    grid, 
    displayGrid,
  };
})();

const Player = (mark) => {
  let markNum = 0
  if (mark == "cross") markNum = 1;

  const addMark = () => {
    
  }

  return {
    addMark,
    markNum,
  }
};

const gameEngine = (() => {
  let turn = 0;
  
  function currentPlayer() {
    if (turn % 2) {
      turn++
      return Player("cross")
    } else if (!(turn % 2)) {
      turn++
      return Player("circle")
    }
  }

  return {
    currentPlayer,
  }
})();

gameBoard.displayGrid()
