const gameBoard = (() => {
  const board = document.querySelector(".board");
  let grid = ["", "", "", "", "", "", "", "", ""];

  const displayGrid = () => {
    boardContent = ''
    for (let [index, sign] of grid.entries()) {
      if (sign === 0) boardContent += `<div data-num="${index}"><i class="fa-regular fa-circle"></i></div>`;
      else if (sign === 1) boardContent += `<div data-num="${index}"><i class="fa-solid fa-xmark"></i></div>`;
      else if (sign === 2) boardContent += `<div data-num="${index}" class="shadow"><i class="fa-regular fa-circle"></i></div>`;
      else if (sign === 3) boardContent += `<div data-num="${index}" class="shadow"><i class="fa-solid fa-xmark"></i></div>`;
      else boardContent += `<div data-num="${index}" class="empty"></div>`;
    }
    board.innerHTML = boardContent;
    
    document.querySelectorAll(".empty").forEach((div) => {
      div.addEventListener("click", gameEngine.currentPlayer().addMark)
      div.addEventListener("mouseenter", gameEngine.currentPlayer().shadowMark)
    })

    document.querySelectorAll(".shadow").forEach((div) => {
      div.addEventListener("click", gameEngine.currentPlayer().addMark)
      div.addEventListener("mouseleave", gameEngine.currentPlayer().unShadowMark)
    })
  }

  function alterGrid(index, mark) {
    grid[index] = mark;
  }

  function getGrid() {
    return grid;
  }

  function resetBoard() {
    grid = ["", "", "", "", "", "", "", "", ""]
    displayGrid()
  }

  return {
    getGrid,
    alterGrid, 
    displayGrid,
    resetBoard,
  };
})();

const Player = (mark, name) => {
  let markNum = 0
  if (mark == "cross") markNum = 1;

  function addMark() {
    let mark = gameEngine.currentPlayer().markNum;
    let index = this.dataset.num;
    gameBoard.alterGrid(index, mark);

    if (gameEngine.endCondition(gameBoard.getGrid())) {
      gameEngine.gameEnd();
    }

    gameEngine.turn += 1;
    gameBoard.displayGrid();
  }

  function shadowMark() {
    let mark = gameEngine.currentPlayer().markNum + 2;
    let index = this.dataset.num;
    gameBoard.alterGrid(index, mark);
    gameBoard.displayGrid();
  }

  function unShadowMark() {
    let index = this.dataset.num;
    gameBoard.alterGrid(index, "");
    gameBoard.displayGrid();
  }

  return {
    addMark,
    shadowMark,
    unShadowMark,
    markNum,
    name,
  }
};

const Computer = (mark) => {
  let markNum = 0;
  if (mark == "cross") markNum = 1;

  function addMark() {
    
  }

  return {
    addMark,
    markNum,
    name,
  };
};

const gameEngine = (() => {
  let turn = 0;

  function initializeGame() {
    addNameForm();
    gameBoard.displayGrid();
  }
  
  function currentPlayer() {
    if (gameEngine.turn % 2 === 0) {
      return human1;
    } else if (!(gameEngine.turn % 2 === 0)) {
      return human2;
    }
  }

  function addNameForm() {
    let activePlayer = ""
    document.querySelectorAll(".player").forEach((player) => {
      player.addEventListener("click", function() {
        document.querySelector('.name-add').style.display = "grid";
        activePlayer = player;
      })
    })
    document.querySelector(".submit").addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelector('.name-add').style.display = "none";
      activePlayer.innerHTML = document.querySelector(".player-name").value;
      if (activePlayer.dataset.player === "player1") {
        human1.name = document.querySelector(".player-name").value;
      } else if (activePlayer.dataset.player === "player2") {
        human2.name = document.querySelector(".player-name").value;
      }
      document.querySelector(".player-name").value = ""
    })
    document.querySelector('.cancel').addEventListener("click", function() {
      document.querySelector('.name-add').style.display = "none";
    });
    document.querySelector(".new-game").addEventListener("click", function() {
      document.querySelector(".popup.game-end").style.display = "none";
      gameEngine.turn = 0;
      gameBoard.resetBoard()
    })
  }

  function endCondition(list) {
    for (let i = 0; i < 3; i++) {
      if (!isNaN(parseInt(list[3*i])) && list[3*i] === list[3*i+1] && list[3*i+1] === list[3*i+2]) return currentPlayer();
      if (!isNaN(parseInt(list[i])) && list[i] === list[i+3] && list[i+3] === list[i+6]) return currentPlayer();
    };
    if (!isNaN(parseInt(list[0])) && list[0] === list[4] && list[4] === list[8]) return currentPlayer();
    if (!isNaN(parseInt(list[2])) && list[2] === list[4] && list[4] === list[6]) return currentPlayer();
    if (gameBoard.getGrid().every(mark => (!isNaN(parseInt(mark))))) return "draw"
    return false;
  }

  function gameEnd() {
    let message = `${currentPlayer().name} Wins!`;
    if (endCondition(gameBoard.getGrid()) === "draw") {
      message = "It's a Draw!"
    }
    document.querySelector(".popup-bg h1").innerHTML = message;
    document.querySelector(".popup.game-end").style.display = "grid";
  }

  return {
    initializeGame,
    currentPlayer,
    endCondition,
    gameEnd,
    turn,
  }
})();


const human1 = Player("cross", "Player 1")
const human2 = Player("circle", "Player 2")
gameEngine.initializeGame()
