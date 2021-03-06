class Power {
    constructor(ctx, canvasSize, posX, posY, imageName, width, height, speedX, speedY) {
        this.ctx = ctx
        this.canvasSize = canvasSize

        this.posX = posX
        this.posY = posY

        this.speedX = speedX
        this.speedY = speedY

        this.width = width
        this.height = height

        this.imageInstance = undefined
        this.imageName = imageName

        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.imageName}`
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.posX, this.posY, this.width, this.height)

    }
    move() {
        this.posY += this.speedY

        if (this.posY === 400) {
            this.speedY *= -1
        }
        else if (this.posY === 100) {
            this.speedY *= -1
        }
    }

    stopPower() {
        this.speedY = 0
    }
}
