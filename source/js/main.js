;(function () {
	
'use strict';

// 1) Burger menu  		-----------------------------------------------
// 2) Anchores 			-----------------------------------------------
// 3) Animate cube  	-----------------------------------------------
// 4) Counter 			-----------------------------------------------
// 5) Animate holo		-----------------------------------------------
// 6) Slider			-----------------------------------------------
// 7) Product Buy		-----------------------------------------------
// 8) Parallax effect 	-----------------------------------------------


// 1)
// Burger menu START
let headers = document.querySelector('.top__header');
const nav = document.querySelector('.nav');

headers.addEventListener('click', function (e) {
	let target = e.target;
	while(this) {
		if(target.classList.contains('burger')) {
			nav.classList.add('nav-active');
			return;
		} else if(target.classList.contains('close')) {
			nav.classList.remove('nav-active');
			return;
		} else {
			target = target.parentNode;
		}
	}
});
// Burger menu END

// --------------------------------------------------------------

// 2)
// Anchores START
const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
	const blockID = anchor.getAttribute('href');

	anchor.addEventListener('click', function (e) {
    	e.preventDefault();
    	let target = e.target;
    

		for(let anchor of anchors) {
			if(anchor === target) {
				target.parentNode.classList.add('active');
			} else {
				anchor.parentNode.classList.remove('active');
			}
		}
	    
	    window.scrollTo({
			top: document.querySelector('' + blockID).offsetTop - 100,
			behavior: "smooth"
		});
	});
}
// Anchores END

// --------------------------------------------------------------

// 3)
// Animate cube START
/*let canvas = document.querySelector('#canvas');

console.dir(canvas);

if(canvas.style.display === 'block') {
	let ctx = canvas.getContext('2d');

	let width = canvas.width = window.innerWidth;
	let height = canvas.height = Math.max(
		document.body.scrollHeight, document.documentElement.scrollHeight,
		document.body.offsetHeight, document.documentElement.offsetHeight,
		document.body.clientHeight, document.documentElement.clientHeight
	);

	let particleCount = 100;
	let particles = [];

	function init() {
		for (let i = 0; i < particleCount; i++) {
		  createParticle();
		}
	}

	function createParticle() {
		let newParticle = new Particle();
		newParticle.initialize();
		particles.push(newParticle);
	}

	function Particle() {
		this.initialize = function() {
		  this.x = Math.random() * width;
		  this.y = Math.random() * height + height;
		  this.v = 5 + Math.random() * 5;
		  this.s = 5 + Math.random() * 5;
		}

		this.update = function () {
		  this.x += Math.sin(this.s);
		  this.s -= 0.1;
		  this.y -= this.v * 0.5;
		  if (this.isOutOfBounds()) {
		    this.initialize();
		  }
		}

		this.draw = function () {
		  ctx.fillRect(this.x, this.y, 6, 6);
		  ctx.fillStyle = "#FFF";
		  ctx.fill();
		}

		this.isOutOfBounds = function () {
		  return ((this.x < 0) || (this.x > width) || (this.y < 0) || (this.y > height));
		}
	}

	function render() {
		ctx.clearRect(0, 0, width, height);
		for (let i = 0; i < particles.length; i++) {
		  particles[i].update();
		  particles[i].draw();
		}
		requestAnimationFrame(render);
	}

	window.addEventListener('resize', resize);

	function resize() {
		width = canvas.width = window.innerWidth;
		height = canvas.height = window.innerHeight;
	}

	init();
	render();
}*/
// Animate cube END

// --------------------------------------------------------------

// 5)
// Animate holo START
const svgEl = document.querySelector('#holoone');
let myAnimation = new LazyLinePainter(svgEl, {
	"ease": "easeLinear",
	"strokeWidth": 1,
	"strokeOpacity": 1,
	"strokeColor": "#5b5aec"
});
myAnimation.paint(); 
// Animate holo END

// --------------------------------------------------------------

// 6)
// Slider START
const blockSlider = document.querySelector('.product__list');
const elemSlider = blockSlider.querySelectorAll('.product_item');

let elemWidth = elemSlider[0].offsetWidth;
let elemCount = elemSlider.length;

let scroll = 1;

blockSlider.ontouchstart = function (e) {
	let target = e.target;

	while(true) {
		if(target.tagName === 'UL') {
			let swipeStart = e.changedTouches[0].clientX;

			blockSlider.ontouchend = function(ev) {
				let swipeEnd = ev.changedTouches[0].clientX;
				if(-(elemWidth * (elemCount - 1)) < -target.style.transform.replace(/\D+/g,"")) {
					if(swipeStart > swipeEnd && swipeStart - swipeEnd > 100) {
						target.style.transform = `translateX(-${scroll += elemWidth + 20}px)`;
					}
				}
				
				if(swipeStart < swipeEnd && swipeStart - swipeEnd < -100) {
					target.style.transform = `translateX(-${scroll -= elemWidth + 20}px)`;
				}
			}
			return;
		} else {
			target = target.parentNode;
		}
	}

};
// Slider END

// --------------------------------------------------------------

// 7)
// Product Buy START
const product = document.querySelector('.product');
product.onclick = function (e) {
	let target = e.target; 

	while(target != product) {
		if(target.classList.contains('buy_close')) {
			let block = target.parentNode.parentNode.parentNode;
			product.removeChild(block);
		} else if(target.tagName === 'BUTTON' && !target.classList.contains('condit-btn')) {
			let block = target.parentNode.parentNode;
			let data = {
				src: block.querySelector('.product_img').src,
				title: block.querySelector('.product_name').innerHTML,
				price: target.innerHTML
			}

			open(data);

			return;
		} else if(target.tagName === 'BUTTON' && target.classList.contains('condit-btn')) {
			open({src: undefined, title: undefined, price: undefined}, 'condit');

			return;
		} else {
			target = target.parentNode;
		}
	}

	function open({src, title, price}, btn) {
		if(btn === 'condit') {
			const block = document.querySelector('.condit');
			block.classList.toggle('active');
		} else {
			let template = document.createElement('div');
			template.classList.add('buy');
			template.innerHTML = `
				<div class="buy__wrap">
					<div class="buy__header">
		                <span class="buy_close">
		                    <svg version="1.1" class="close" id="close" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 47.971 47.971" xml:space="preserve">
		                        <g>
		                            <path d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88
		                                c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242
		                                C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879
		                                s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"/>
		                        </g>
		                    </svg>
		                </span>
		                <h2 class="buy_title">Покупка</h2>
		            </div>
		            <div class="buy__article">
		                <img class="buy_img" src="${src}" alt="">
		                <div class="buy__desc">
		                    <div>
		                        <p><span>Товар:</span>${title}</p>
		                    </div>
		                    <div >
		                        <p><span>Цена:</span>${price}</p>
		                    </div>
		                </div>
		            </div>
		            <form class="buy__form" name="buy">
		                <div class="buy__block">
		                    <div class="buy__row">
		                        <label for="name">Имя и Фамилия<span>*</span>:</label>
		                        <input type="text" name="name" id="name">
		                    </div>
		                    <div class="buy__row">
		                        <label for="phone">Контактный номер<span>*</span>:</label>
		                        <input type="phone" name="phone" id="phone">
		                    </div>
		                    <div class="buy__row">
		                        <label for="email">Электронная почта:</label>
		                        <input type="email" name="email" id="email">
		                    </div>
		                </div>
		                <input class="buy_submit" name="sub" type="submit" value="Купить">
		            </form>
				</div>
			`;

			product.appendChild(template);

			let btn = document.forms.buy.elements.sub;

			let form = document.forms.buy;

			form.onsubmit = function (e) {
				e.preventDefault();
				let formData = new FormData(form);
				formData.append('title', title);
				formData.append('price', price);

				fetch('./php/mail.php', {
				  method: 'POST',
				  body: formData
				});
				alert('Спасибо за покупку! Мы с вами свяжемся в ближайшее время!');
			}
		}		
	}


}
// Product Buy END

// --------------------------------------------------------------

// 8)
// Parallax effect START
$('.desc').on('mousemove', function(e){
	let width = $('.desc').width();
	let height = $('.desc').height();

	let offsetX = 2 - e.pageX / width;
	let offsetY = 1.5 - e.pageY / height;

	$('.parallax').each(function(i, el){
		var offset = parseInt($(el).data('offset'));

		var position = Math.round(offsetX * offset) + 'px, ' + Math.round(offsetY * offset) + 'px';

		$(el).css({'transform': `translate(${position})`});
	});
});
// Parallax effect END

// --------------------------------------------------------------

// 9)
// btn condit START
const btnConditClose = document.querySelector('.condit_close');
const footerCondit = document.querySelector('.contacts_btn');

footerCondit.onclick = function () {
	const block = document.querySelector('.condit');
	block.classList.toggle('active');
}

btnConditClose.onclick = function () {
	const block = document.querySelector('.condit');
	block.classList.toggle('active');
}
// btn condit END

})();


// --------------------------------------------------------------

// 10)
// btn about START

const btnAboutClose = document.querySelector('.about_close');
const footerAbout = document.querySelector('.about-btn');

footerAbout.onclick = function () {
	const block = document.querySelector('.about');
	block.classList.toggle('active');
}

btnAboutClose.onclick = function () {
	const block = document.querySelector('.about');
	block.classList.toggle('active');
}

// btn about END

// --------------------------------------------------------------

// 11)
// btn ofer START

const btnOferClose = document.querySelector('.ofer_close');
const footerOfer = document.querySelector('.ofer-btn');

footerOfer.onclick = function () {
	const block = document.querySelector('.ofer');
	block.classList.toggle('active');
}

btnOferClose.onclick = function () {
	const block = document.querySelector('.ofer');
	block.classList.toggle('active');
}

// btn ofer END