const game = {
  title: "Super Penaly Kicks",
  author: "Alfredo & Carlos",
  upgrade: "Carlos",
  license: undefined,
  version: "1.1",
  description:
    "A 8bits style game, where players must shoot as hard as possible to score 5 goals.",
  canvasDOM: undefined,
  ctx: undefined,
  canvasSize: { width: undefined, height: undefined },
  framesCounter: 0,
  frames: 60,
  intervalId: undefined,
  background: undefined,
  ball: undefined,
  goalKeeper: undefined,
  scoreBoard: 0,
  turnCounter: 1,
  bannerGol: undefined,
  bannerLoser: undefined,
  imageWin: undefined,
  obstacles: [],
  power: undefined,
  keys: undefined,
  canShoot: false,
  haswin: false,
  haslost: false,

  init() {
    this.setContext();
    this.setDimensions();
    this.setListeners();
    this.createAll();
    this.start();
  },

  setContext() {
    this.canvasDOM = document.querySelector(".myCanvas");
    this.ctx = this.canvasDOM.getContext("2d");
  },

  setDimensions() {
    this.canvasSize.width = 800;
    this.canvasSize.height = 600;
    this.canvasDOM.setAttribute("width", this.canvasSize.width);
    this.canvasDOM.setAttribute("height", this.canvasSize.height);
  },
  start() {
    this.intervalId = setInterval(() => {
      this.framesCounter++;
      this.clearScreen();
      this.drawAll();
      this.moveAll();
    }, 1000 / 45);
  },

  createAll() {
    this.createBall();
    this.createGKeeper();
    this.createBackground();
    this.createBannerGol();
    this.createBannerLoser();
    this.createScoreMarker();
    this.createTurnMarker();
    this.createImageWin();
    this.createImageLost();
    this.createPower();
  },

  createBackground() {
    this.background = new Background(
      this.ctx,
      0,
      0,
      this.canvasSize.width,
      this.canvasSize.height,
      "bgmarc.png"
    );
  },

  createPower() {
    this.power = new Power(
      this.ctx,
      this.canvasSize,
      700,
      400,
      "powerBall.png",
      80,
      150,
      0,
      -25
    );
  },

  createBall() {
    this.ball = new Ball(this.ctx, this.canvasSize, 370, 0, "pelota1.png");
  },

  createGKeeper() {
    this.goalKeeper = new Goalkeeper(
      this.ctx,
      this.canvasSize,
      350,
      150,
      "goalkeeperstandsprite.png"
    );
  },

  createBannerGol() {
    this.bannerGol = new Bannergol(
      this.ctx,
      this.canvasSize,
      185,
      75,
      "GOL.png",
      450,
      450
    );
  },

  createBannerLoser() {
    this.bannerLoser = new Bannerloser(
      this.ctx,
      this.canvasSize,
      185,
      75,
      "LOSER.png",
      450,
      450
    );
  },

  createImageWin() {
    this.imageWin = new Imagewin(
      this.ctx,
      this.canvasSize,
      0,
      0,
      "winimg.png",
      800,
      600
    );
  },

  createImageLost() {
    this.imageLost = new Imagelost(
      this.ctx,
      this.canvasSize,
      0,
      0,
      "lostimg.png",
      800,
      600
    );
  },

  createScoreMarker() {
    this.ScorerMarker = new Scoremarker(
      this.ctx,
      this.canvasSize,
      110,
      115,
      80,
      33,
      this.scoreBoard
    );
  },

  createTurnMarker() {
    this.TurnMarker = new Turnmarker(
      this.ctx,
      this.canvasSize,
      38,
      115,
      80,
      33,
      this.turnCounter
    );
  },

  drawAll() {
    this.drawBackground();
    this.drawGKeeper();
    this.drawBall();
    this.drawScoreMarker();
    this.drawTurnMarker();
    this.drawPower();
    if (this.haslost == true) {
      this.imageLost.draw();
    }
    if (this.haswin == true) {
      this.imageWin.draw();
    }
  },

  drawPower() {
    this.power.draw();
  },

  drawBackground() {
    this.background.draw();
  },

  drawBall() {
    this.ball.draw();
  },

  drawGKeeper() {
    this.goalKeeper.draw(this.framesCounter);
  },

  drawBannerGol() {
    this.bannergol.draw();
  },

  drawBannerLoser() {
    this.bannerLoser.draw();
  },

  drawImageWin() {
    this.imageWin.draw();
  },

  drawImageLost() {
    this.imageLost.draw();
  },

  drawScoreMarker() {
    this.ScorerMarker.draw();
  },

  drawTurnMarker() {
    this.TurnMarker.draw();
  },

  moveAll() {
    this.moveBall();
    this.moveGKeeper();
    this.movePower();
  },

  movePower() {
    this.power.move();
  },

  moveGKeeper() {
    this.goalKeeper.move();
  },

  moveBall() {
    this.ball.move();
  },

  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
  },

  setListeners() {
    document.onkeydown = (e) => {
      this.power.stopPower();
      if (e.key === "ArrowRight" && this.canShoot) {
        this.canShoot = false;
        this.checkCollision(this.ball.shootRight());
      } else if (e.key === "ArrowLeft" && this.canShoot) {
        this.canShoot = false;
        this.checkCollision(this.ball.shootLeft());
      } else if (e.key === "ArrowUp" && this.canShoot) {
        this.canShoot = false;
        this.checkCollision(this.ball.shootUp());
      }
    };
  },

  checkCollision(ballDirection) {
    if (
      ballDirection ===
      this.goalKeeper.randomItem(ballDirection, this.power.posY)
    ) {
      this.showBanners("parada");
    } else {
      this.showBanners("gol");
    }
  },

  showBanners(string) {
    setTimeout(() => {
      if (string === "parada") {
        this.bannerLoser.draw();
        this.addTurn();
      } else if (string === "gol") {
        this.bannerGol.draw();
        this.addScore();
        this.addTurn();
      }
      clearInterval(this.intervalId);
    }, 500);

    setTimeout(() => {
      this.canShoot = false;
      this.init();
    }, 2000);
  },

  addScore() {
    this.scoreBoard += 1;
  },

  addTurn() {
    this.turnCounter += 1;
    this.endGame();
  },

  endGame() {
    if (this.turnCounter > 5) {
      if (this.scoreBoard >= 3) {
        this.haswin = true;
        this.gameOver();
      } else {
        this.haslost = true;
        this.gameOver();
      }
      this.scoreBoard = 0;
      this.turnCounter = 1;
    }
  },

  gameOver() {
    clearInterval(this.intervalId);
  },
};
