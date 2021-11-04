const game = {
    title: 'ChutaApuertA',
    author: 'Alfredo & Carlos',
    license: undefined,
    version: '1.0.0',
    description: 'Juego de penaltis',
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
    direction: undefined,
    keys: undefined,
    canShoot: false,




    init() {
        this.setContext()
        this.setDimensions()
        this.setListeners()
        this.createAll()
        this.start()
        


    },

    setContext() {
        this.canvasDOM = document.querySelector("#myCanvas")
        this.ctx = this.canvasDOM.getContext("2d")
    },

    setDimensions() {
        //TAMAÑO DONDE SE EJECUTARÁ EL JUEGO EN LA VENTANA. AHORA MISMO TODA LA VENTANA
        this.canvasSize.width = 800
        this.canvasSize.height = 600

        //EL ATRIBUTO POR DEFECTO DE WIDTH Y HEIGHT
        this.canvasDOM.setAttribute('width', this.canvasSize.width)
        this.canvasDOM.setAttribute('height', this.canvasSize.height)

    },
    start() {
        this.intervalId = setInterval(() => {
            this.clearScreen()
            this.drawAll()
            this.moveAll()
        }, 1000 / 45)
    },


    createAll() {
        this.createBall()
        this.createGKeeper()
        this.createBackground()
        this.createBannerGol()
        this.createBannerLoser()
        this.createScoreMarker()
        this.createTurnMarker()
        this.createImageWin()
        this.createImageLost()
        this.createDirection()
    },

    createBackground() {
        this.background = new Background(this.ctx, 0, 0, this.canvasSize.width, this.canvasSize.height, "bgmarc.png")
    },

    createDirection() {
        this.direction = new Direction(this.ctx, this.canvasSize, 150, 500, "upArrow.png", 80, 80, 50, this.speedX, this.speedY)
    },

    createBall() {
        this.ball = new Ball(this.ctx, this.canvasSize, 370, 0, "pelota1.png")
    },

    createGKeeper() {
        this.goalKeeper = new Goalkeeper(this.ctx, this.canvasSize, 350, 150, "portero inicial.png")
    },


    createBannerGol() {
        this.bannerGol = new Bannergol(this.ctx, this.canvasSize, 225, 235, "gol1.png", 375, 300)
    },

    createBannerLoser() {
        this.bannerLoser = new Bannerloser(this.ctx, this.canvasSize, 225, 235, "loser1.png", 375, 300)
    },

    createImageWin() {
        this.imageWin = new Imagewin(this.ctx, this.canvasSize, 0, 0, "winimg.png", 800, 600)
    },

    createImageLost() {
        this.imageLost = new Imagelost(this.ctx, this.canvasSize, 0, 0, "lostimg.png", 800, 600)
    },

    createScoreMarker() {

        this.ScorerMarker = new Scoremarker(this.ctx, this.canvasSize, 110, 115, 80, 33, this.scoreBoard,)

    },
    

    createTurnMarker() {

        this.TurnMarker = new Turnmarker(this.ctx, this.canvasSize, 38, 115, 80, 33, this.turnCounter,)

    },


    drawAll() {
        this.drawBackground()
        this.drawGKeeper()
        this.drawBall()
        this.drawScoreMarker()
        this.drawTurnMarker()
        this.drawDirection()

    },

    drawDirection() {
        this.direction.draw()

    },

    drawBackground() {
        this.background.draw()
    },

    drawBall() {
        this.ball.draw()
    },

    drawGKeeper() {
        this.goalKeeper.draw(this.framesCounter)
    },

    drawBannerGol() {
        this.bannergol.draw()

    },

    drawBannerLoser() {
        this.bannerLoser.draw()
    },

    drawImageWin() {
        this.imageWin.draw()
    },

    drawImageLost() {
        this.imageLost.draw()
    },

    drawScoreMarker() {

        this.ScorerMarker.draw()

    },

    drawTurnMarker() {

        this.TurnMarker.draw()

    },

    moveAll() {
        this.moveBall()
        this.moveGKeeper()
        this.moveDirection()

    },
    moveDirection() {
        this.direction.move()
    },

    moveGKeeper() {
        this.goalKeeper.move()
    },

    moveBall() {
        this.ball.move()
    },

    clearScreen() {
        this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)
    },

    setListeners() {
        document.onkeydown = e => {
            console.log("presiono tecla", e.key)

            if (e.key === "ArrowRight" && this.canShoot) {
                this.canShoot = false
                this.checkCollision(this.ball.shootRight())
            } else if (e.key === "ArrowLeft" && this.canShoot) {
                this.canShoot = false
                this.checkCollision(this.ball.shootLeft())
            } else if (e.key === "ArrowUp" && this.canShoot) {
                this.canShoot = false
                this.checkCollision(this.ball.shootUp())
            }
        }

    },

    checkCollision(ballDirection) {
        if (ballDirection === this.goalKeeper.randomItem()) {
            this.showBanners('parada')
        } else {
            this.showBanners('gol')
        }

    },

    showBanners(string) {

        setTimeout(() => {
            if (string === 'parada') {
                this.bannerLoser.draw()
                this.addTurn()

            } else if (string === 'gol') {
                this.bannerGol.draw()
                this.addScore()
                this.addTurn()

            }
            clearInterval(this.intervalId)

        }, 500)

        setTimeout(() => {
            this.canShoot = false
            this.init()
        }, 2000)
    },

    addScore() {
        this.scoreBoard += 1

    },


    addTurn() {
        this.turnCounter += 1
        this.endGame()
    },

    endGame() {
        
        if (this.turnCounter > 5) {
            if ( this.scoreBoard >= 3){
                this.imageWin.draw()
                this.gameOver()
                
            } else {
                this.imageLost.draw()
                this.gameOver()
            }
            this.scoreBoard = 0
            this.turnCounter = 1
            } 
     },

     gameOver() {
         clearInterval(this.intervalId)
     },
 }

 

 


