class Scoremarker {
    constructor(ctx, canvasSize, posX, posY, width, height, scoreBoard) {
        this.ctx = ctx
        this.canvasSize = canvasSize

        this.posX = posX
        this.posY = posY

        this.width = width
        this.height = height

        this.scoreBoard = scoreBoard
    }

    draw() {
        this.ctx.fillStyle = 'white'
        this.ctx.fillText(this.scoreBoard, this.posX, this.posY);
        this.ctx.font = '50px Arial';
    }

}
