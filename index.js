const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4
}

const floorCollisions2D = []
for (let i = 0; i < floorCollisions.length; i += 36){
    floorCollisions2D.push(floorCollisions.slice(i, i + 36))
}

const platformCollisions2D = []
for (let i = 0; i < platformCollisions.length; i +=36){
    platformCollisions2D.push(platformCollisions.slice(i, i + 36))
}

const collisionBlocks = []
floorCollisions2D.forEach((row, y)=> {
    row.forEach((symbol, x) => {
        if(symbol === 202){
            console.log('draw block')
            collisionBlocks.push(
                new CollisionBlock({
                position: {
                    x: x * 16,
                    y: y * 16,
                }})
            )
        }
    })
})

const platformCollionBlocks = []
platformCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if(symbol === 202){
            console.log('platform block')
            platformCollionBlocks.push (
                new CollisionBlock({
                    position: {
                        x: x * 16,
                        y: y * 16,
                    }
                })
            )
        }
    })
})

console.log(collisionBlocks)
let gravity = 0.5

const player = new Player({
    x: 0,
    y: 0,
})
const player2 = new Player({
    x: 300,
    y: 0,
})

let y = 100
let y2 = 100

const keys = {
    d: {
        pressed: false,
    },
    a: {
        pressed: false,
    }
}

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './img/background.png',
})

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height) 
    
    c.save()
    c.scale(4, 4)
    c.translate(0, -background.image.height + scaledCanvas.height)
    background.update()
    collisionBlocks.forEach((collisionBlock => {
        collisionBlock.update()
    }))
    platformCollionBlocks.forEach((platformBlock => {
        platformBlock.update()
    }))
    c.restore()

   

    player.update()
    player2.update()

    player.velocity.x = 0
    if (keys.d.pressed) player.velocity.x = 5
    else if (keys.a.pressed) player.velocity.x = -5
}

animate()

window.addEventListener('keydown', () => {
    switch (event.key){
        case 'd', 'ArrowRight':
        keys.d.pressed = true
        break
        case 'a', 'ArrowLeft': 
        keys.a.pressed = true
        break
        case 'w', 'ArrowUp': 
        player.velocity.y = -15
        break
    }
})
window.addEventListener('keyup', () => {
    switch (event.key){
        case 'd', 'ArrowRight': 
        keys.d.pressed = false
        break
        case 'a', 'ArrowLeft': 
        keys.a.pressed = false
        break
    }
})