let main = document.querySelector('main')
let board = document.querySelector('.board')
let menu = document.querySelector('.menu')
let range = document.querySelector('[name=range]')
let hue = document.querySelector('.hue')
let rubber = document.querySelector('.rubber')
let brush= document.querySelector('.brush')
let canvas = document.querySelector('canvas')
let context = canvas.getContext('2d')

function getRadians(degrees) {
	return (Math.PI / 180) * degrees;
}

let bool = false;
let xv = 0;
let yv = 0;
let rangeV = range.value = 20;
let rubberFlag = false;
// ======================canvas====================
range.addEventListener('change', function (e) {
	rangeV = range.value
})
canvas.addEventListener('mouseout', function (e) {
	let mouseout = new Event('mouseup')
	this.dispatchEvent(mouseout)
})

canvas.addEventListener('mousedown', function (e) {
	bool = !bool;
	xv = e.pageX - (Number.parseInt(getComputedStyle(canvas).marginLeft) + Number.parseInt(getComputedStyle(main).marginLeft));
	yv = e.pageY - (this.offsetTop + Number.parseInt(getComputedStyle(canvas).borderTop));
	if (bool) {
		if (rubberFlag) {
			console.log('!')
			context.beginPath()
			context.clearRect(xv - rangeV / 2,yv - rangeV / 2,rangeV,rangeV)
		} else {
			context.arc(xv,yv,rangeV,0,getRadians(360))
			context.beginPath()
			context.arc(xv,yv,rangeV,0,getRadians(360))
		}
	}
	context.fillStyle = 'green'
	context.fill()
})
canvas.addEventListener('mouseup', function (e) {
	bool = false;
})
canvas.addEventListener('mousemove', function (e) {
	let x = e.pageX - (Number.parseInt(getComputedStyle(canvas).marginLeft) + Number.parseInt(getComputedStyle(main).marginLeft));
	let y = e.pageY - (this.offsetTop + Number.parseInt(getComputedStyle(canvas).borderTop));

	if (bool) {
		if (rubberFlag) {
			console.log('!')
			context.beginPath()
			context.clearRect(x - 10,y - 10,rangeV,rangeV)
		} else {
			context.arc(x,y,rangeV,0,getRadians(360))
			context.beginPath()
			context.arc(x,y,rangeV,0,getRadians(360))
		}	
	}
	context.fillStyle = 'green'
	context.fill()
})
// ===============rubber===========
rubber.addEventListener('click', function (e) {
	rubberFlag = true;
	rubber.classList.add('rubber_active')
	brush.classList.remove('brush_active')
})
brush.addEventListener('click', function (e) {
	rubberFlag = false;
	rubber.classList.remove('rubber_active')
	brush.classList.add('brush_active')
})