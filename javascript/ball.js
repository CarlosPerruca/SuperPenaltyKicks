class Ball {
    constructor(ctx, canvasSize, posX, posY, imageName, width = 50, height = 50, speedX = 0, speedY = 10) {
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

        //this.gravity = 0.4

        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = `img/${this.imageName}`
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.posX, this.posY, this.width, this.height) //hay que rellenar con las speed

    }

    move() {
        
        this.posX += this.speedX
        this.posY += this.speedY
    

        //limites pantalla
         if (this.posY + this.height == 500) {
            this.speedY = 0
         }

         if (this.posX + this.width == 650 || this.posX + this.width == 250){
             this.speedY = 0  
             this.speedX = 0
         }

        //  if (this.posY + this.height == 250) {
        //      this.speedY = 0
        //  }

        //gravedad de la pelota
        //this.speedY += this.gravity
    }
    
    
    shootRight() {


        this.speedY = -10
        this.speedX = 8
            
        

    }

    shootLeft() {
        this.speedY = -10
        this.speedX = -8


    }

    shootUp() {
        this.speedY = -10
        this.speedX = 0


    }
    

}