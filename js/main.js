let main = document.querySelector('main')
let board = document.querySelector('.board')
let menu = document.querySelector('.menu')
let range = document.querySelector('[name=range]')
let hue = document.querySelector('.hue')
let img_hue = document.querySelector('.img-hue')
let rubber = document.querySelector('.rubber')
let brush= document.querySelector('.brush')
let canvas = document.querySelector('canvas')
let context = canvas.getContext('2d')
let contextRGB = hue.getContext('2d')

function getRadians(degrees) {
	return (Math.PI / 180) * degrees;
}

let bool = false;
let xv = 0;
let yv = 0;
let rangeV = range.value = 20;
let rubberFlag = false;
let color = '';
let imageData;
// ======================RGB=====================
// let img = new Image();
// img.src = '../img/circle-hue.png'
window.addEventListener('load', function (e) {
	contextRGB.drawImage(img_hue, 0,0, hue.width,hue.height)
	console.log(img_hue)
})


hue.addEventListener('mousemove', function (e) {
	xv = e.pageX - (Number.parseInt(getComputedStyle(main).marginLeft) + board.offsetWidth);
	yv = e.pageY - hue.offsetTop;
	imageData = contextRGB.getImageData(xv,yv,1,1)
})
hue.addEventListener('click', function (e) {
	color = `rgba(${imageData.data[0]}, ${imageData.data[1]}, ${imageData.data[2]}, ${imageData.data[3]})`;
})

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
			context.beginPath()
			context.clearRect(xv - rangeV / 2,yv - rangeV / 2,rangeV,rangeV)
		} else {
			context.arc(xv,yv,rangeV,0,getRadians(360))
			context.beginPath()
			context.arc(xv,yv,rangeV,0,getRadians(360))
		}
	}
	context.fillStyle = color
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
			context.beginPath()
			context.clearRect(x - rangeV / 2,y - rangeV / 2,rangeV,rangeV)
			context.fillStyle = color
			context.fill()
		} else {
			context.arc(x,y,rangeV,0,getRadians(360))
			context.beginPath()
			context.arc(x,y,rangeV,0,getRadians(360))
			context.fillStyle = color
			context.fill()
		}	
	}
	
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