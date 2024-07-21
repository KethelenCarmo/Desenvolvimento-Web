(function () {
  const FPS = 10;
  const SIZE = 40;
  let board;
  let snake;
  let food;
  let score;
  let intervalID;
  let gamePaused = false;

  function init() {
    board = new Board(SIZE);
    snake = new Snake([[4, 4], [4, 5], [4, 6]]);
    score = new Score();
    food = new Food(snake.body);
    intervalID = setInterval(run, 1000 / FPS);
  }

  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        snake.changeDirection(0);
        break;
      case "ArrowRight":
        snake.changeDirection(1);
        break;
      case "ArrowDown":
        snake.changeDirection(2);
        break;
      case "ArrowLeft":
        snake.changeDirection(3);
        break;
      case "p":
        togglePause();
        break;
      case "s":
        if (gamePaused) {
          resetGame();
        }
        break;
      default:
        break;
    }
  });

  class Board {
    constructor(size) {
      this.size = size;
      this.element = document.createElement("table");
      this.element.setAttribute("id", "board");
      document.body.appendChild(this.element);
      for (let i = 0; i < size; i++) {
        const row = document.createElement("tr");
        this.element.appendChild(row);
        for (let j = 0; j < size; j++) {
          const field = document.createElement("td");
          row.appendChild(field);
        }
      }
    }

    clearCell(x, y) {
      const cell = document.querySelector(`#board tr:nth-child(${x + 1}) td:nth-child(${y + 1})`);
      if (cell) {
        cell.className = '';
      }
    }

    setCellClass(x, y, className) {
      const cell = document.querySelector(`#board tr:nth-child(${x + 1}) td:nth-child(${y + 1})`);
      if (cell) {
        cell.className = className;
      }
    }
  }

  class Snake {
    constructor(body) {
      this.body = body;
      this.direction = 1;
      this.growFlag = false;
      this.updateSnakeBody();
    }

    walk() {
      const head = this.body[this.body.length - 1];
      let newHead;
      switch (this.direction) {
        case 0:
          newHead = [head[0] - 1, head[1]];
          break;
        case 1:
          newHead = [head[0], head[1] + 1];
          break;
        case 2:
          newHead = [head[0] + 1, head[1]];
          break;
        case 3:
          newHead = [head[0], head[1] - 1];
          break;
        default:
          break;
      }

      if (this.checkCollision(newHead)) {
        gameOver();
        return;
      }

      this.body.push(newHead);

      if (newHead[0] === food.position[0] && newHead[1] === food.position[1]) {
        score.increment(food.type);
        food.generate(this.body);
        this.growFlag = true;
      }

      if (!this.growFlag) {
        const oldTail = this.body.shift();
        board.clearCell(oldTail[0], oldTail[1]);
      } else {
        this.growFlag = false;
      }

      this.updateSnakeBody();
    }

    updateSnakeBody() {
      this.body.forEach(field => {
        board.setCellClass(field[0], field[1], 'snake-cell');
      });
    }

    changeDirection(direction) {
      if (Math.abs(this.direction - direction) !== 2) {
        this.direction = direction;
      }
    }

    checkCollision(newHead) {
      if (newHead[0] < 0 || newHead[0] >= SIZE || newHead[1] < 0 || newHead[1] >= SIZE) {
        return true;
      }

      for (let i = 0; i < this.body.length; i++) {
        if (newHead[0] === this.body[i][0] && newHead[1] === this.body[i][1]) {
          return true;
        }
      }
      return false;
    }
  }

  class Food {
    constructor(snakeBody) {
      this.generate(snakeBody);
    }

    generate(snakeBody = []) {
      let validPosition = false;
      while (!validPosition) {
        this.position = [Math.floor(Math.random() * SIZE), Math.floor(Math.random() * SIZE)];
        validPosition = !snakeBody.some(part => part[0] === this.position[0] && part[1] === this.position[1]);
      }

      if (this.previousPosition) {
        board.clearCell(this.previousPosition[0], this.previousPosition[1]);
      }

      this.type = Math.random() < 0.67 ? 1 : 2;
      board.setCellClass(this.position[0], this.position[1], 'food-cell');

      this.previousPosition = this.position;
    }
  }

  class Score {
    constructor() {
      this.value = 0;
      this.element = document.createElement("div");
      this.element.setAttribute("id", "score");
      this.element.innerHTML = "00000";
      document.body.appendChild(this.element);
    }

    increment(type) {
      this.value += type;
      this.element.innerHTML = this.value.toString().padStart(5, '0');
    }
  }

  function run() {
    if (!gamePaused) {
      snake.walk();
    }
  }

  function togglePause() {
    gamePaused = !gamePaused;
  }

  function gameOver() {
    clearInterval(intervalID);
    const gameOverMessage = document.createElement("div");
    gameOverMessage.setAttribute("id", "game-over");
    gameOverMessage.innerHTML = "Fim do jogo!";
    document.body.appendChild(gameOverMessage);
    gamePaused = true;
  }

  function resetGame() {
    clearInterval(intervalID);
    document.body.removeChild(board.element);
    document.body.removeChild(score.element);
    const gameOverMessage = document.getElementById("game-over");
    if (gameOverMessage) {
      document.body.removeChild(gameOverMessage);
    }
    init();
    gamePaused = false;
  }

  init();
})();
