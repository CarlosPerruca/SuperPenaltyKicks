class Goalkeeper {
    constructor(ctx, canvasSize, posX, posY, imageName, width = 100, height = 200, speedX = 0, speedY = 0) {
        this.ctx = ctx
        this.canvasSize = canvasSize

        this.posX = posX
        this.posY = posY

        this.speedX = 0
        this.speedY = 0

        this.width = width
        this.height = height

        this.frames = 2
        this.framesIndex = 0

        this.imageInstance = undefined
        this.imageName = imageName


        this.throwArray = [
            this.throwRight,
            this.throwLeft,
            this.throwUp
        ]

        this.init()
    }

    randomItem(ballDirection, power) {
        const currentThrowArr = [...this.throwArray]
        if (power < 125) {//ALLWAYS GOL
            if (ballDirection === "right") currentThrowArr.splice(0, 1)
            if (ballDirection === "left") currentThrowArr.splice(1, 1)
            if (ballDirection === "up") currentThrowArr.splice(2, 1)
            console.log('power es', power)
            console.log("mete gol")
        } else if (125 <= power && power <= 250) {//RANDOM DOORKEEPER
            if (ballDirection === "right") currentThrowArr
            if (ballDirection === "left") currentThrowArr
            if (ballDirection === "up") currentThrowArr
            console.log('power es', power)
            console.log("no pasa nada");
        } else if (power > 250) {//ALLWAYS LOOSE
            if (ballDirection === "right") currentThrowArr.splice(1, 2)
            if (ballDirection === "left") {
                currentThrowArr.splice(0, 1)
                currentThrowArr.splice(1, 1)
            }
            if (ballDirection === "up") currentThrowArr.splice(0, 2)
            console.log('power es', power)
            console.log("se la para")
        }

        return currentThrowArr[Math.floor(Math.random() * currentThrowArr.length)]();
    }

    throwRight = () => {
        this.speedX = 8
        return 'right'
    }

    throwLeft = () => {
        this.speedX = -8
        return 'left'
    }

    throwUp = () => {
        this.speedY = -1.25
        return 'up'
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.imageName}`
    }

    draw(framesCounter) {
        this.ctx.drawImage(
            this.imageInstance,
            this.framesIndex * this.imageInstance.width / this.frames,
            0,
            this.imageInstance.width / this.frames,
            this.imageInstance.height,
            this.posX,
            this.posY,
            this.width,
            this.height)


        if (framesCounter % 15 === 0) {
            this.animate()
        }
    }

    animate() {
        if (this.framesIndex === 1) {
            this.framesIndex = 0
            return
        }
        this.framesIndex++
    }

    move() {
        this.posX += this.speedX
        this.posY += this.speedY

        if (this.posX + this.width == 650 || this.posX + this.width == 250) {
            this.speedY = 0
            this.speedX = 0
        }
    }
}