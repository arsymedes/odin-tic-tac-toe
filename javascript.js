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
      div.addEventListener("click", player1.addMark)
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

  function addMark() {
    let mark = gameEngine.currentPlayer().markNum;
    let index = this.dataset.num;
    gameBoard.grid[index] = mark;
    console.log(gameEngine.endCondition(gameBoard.grid))
    gameBoard.displayGrid()
  }

  return {
    addMark,
    markNum,
  }
};

const Computer = (mark) => {
  let markNum = 0
  if (mark == "cross") markNum = 1;

  function addMark() {
    
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
      turn++;
      return player1;
    } else if (!(turn % 2)) {
      turn++;
      return player2;
    }
  }

  function endCondition(list) {
    for (let i = 0; i < 3; i++) {
      if (!isNaN(parseInt(list[3*i])) && list[3*i] === list[3*i+1] && list[3*i+1] === list[3*i+2]) return true;
      if (!isNaN(parseInt(list[i])) && list[i] === list[i+3] && list[i+3] === list[i+6]) return true;
    };
    if (!isNaN(parseInt(list[0])) && list[0] === list[4] && list[4] === list[8]) return true;
    if (!isNaN(parseInt(list[2])) && list[2] === list[4] && list[4] === list[6]) return true;
    return false
  }
  

  return {
    currentPlayer,
    endCondition,
  }
})();

const player1 = Player("cross")
const player2 = Player("circle")
gameBoard.displayGrid()

