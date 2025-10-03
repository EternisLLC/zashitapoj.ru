const tabsBtn = document.querySelectorAll('.iconImg')
const tabsItems = document.querySelectorAll('.iconText')

tabsBtn.forEach(function (item) {
	item.addEventListener('click', function () {
		let currentBtn = item
		let tabId = currentBtn.getAttribute('data-tab')
		let currentTab = document.querySelector(tabId)

		tabsBtn.forEach(function (item) {
			item.classList.remove('active')
			item.classList.remove('scale')
		})

		tabsItems.forEach(function (item) {
			item.classList.remove('active')
		})

		currentBtn.classList.add('active')
		currentBtn.classList.add('scale')
		currentTab.classList.add('active')
	})
})

let lastScroll = 0
const defaultOffset = 200
const nav = document.querySelector('.nav')

const scrollPosition = () =>
	window.pageYOffset || document.documentElement.scrollTop
const containHide = () => nav.classList.contains('hide')

window.addEventListener('scroll', () => {
	if (
		scrollPosition() > lastScroll &&
		!containHide() &&
		scrollPosition() > defaultOffset
	) {
		nav.classList.add('hide')
	} else if (scrollPosition() < lastScroll && containHide()) {
		nav.classList.remove('hide')
	}
	lastScroll = scrollPosition()
})

document.addEventListener('DOMContentLoaded', function () {
	const sliderLine = document.querySelector('.slider_line')
	const slideObjects = document.querySelectorAll('.slide_object')
	const prevBtn = document.querySelector('.slide_btn_prev')
	const nextBtn = document.querySelector('.slide_btn_next')

	let currentPosition = 0
	const slideWidth = 368 + 55
	const visibleSlides = 3

	function moveSlider() {
		sliderLine.style.transform = `translateX(${currentPosition}px)`
		sliderLine.style.transition = 'transform 0.3s ease'
	}

	nextBtn.addEventListener('click', function () {
		const maxPosition = -(
			(slideObjects.length - visibleSlides) *
			slideWidth
		)

		if (currentPosition > maxPosition) {
			currentPosition -= slideWidth
			moveSlider()
		}
	})

	prevBtn.addEventListener('click', function () {
		if (currentPosition < 0) {
			currentPosition += slideWidth
			moveSlider()
		}
	})

	let startX = 0
	let currentX = 0

	sliderLine.addEventListener('touchstart', function (e) {
		startX = e.touches[0].clientX
	})

	sliderLine.addEventListener('touchmove', function (e) {
		currentX = e.touches[0].clientX
	})

	sliderLine.addEventListener('touchend', function () {
		const diff = startX - currentX

		if (Math.abs(diff) > 50) {
			if (diff > 0) {
				nextBtn.click()
			} else {
				prevBtn.click()
			}
		}
	})
})

document
	.getElementById('applicationForm')
	.addEventListener('submit', async function (e) {
		e.preventDefault()

		const form = e.target
		const submitBtn = form.querySelector('button[type="submit"]')
		const originalText = submitBtn.textContent

		submitBtn.disabled = true

		try {
			const response = await fetch(form.action, {
				method: 'POST',
				body: new FormData(form),
				headers: {
					Accept: 'application/json',
				},
			})

			if (response.ok) {
				alert('Заявка успешно отправлена!')
				form.reset()
			} else {
				alert('Ошибка при отправке')
			}
		} catch (error) {
			alert('Ошибка сети')
		} finally {
			submitBtn.textContent = originalText
			submitBtn.disabled = false
		}
	})

class ModalWindow {
	constructor() {
		this.popupFade = document.getElementById('popupFade')
		this.modalWindow = document.getElementById('modalWindow')
		this.exitBtn = document.querySelector('.exit')
		this.openModalBtn = document.querySelector('.trigerModal')

		this.init()
	}

	init() {
		this.openModalBtn.addEventListener('click', () => {
			this.openModal()
		})

		this.exitBtn.addEventListener('click', () => {
			this.closeModal()
		})

		this.popupFade.addEventListener('click', (e) => {
			if (e.target === this.popupFade) {
				this.closeModal()
			}
		})

		this.modalWindow.addEventListener('click', (e) => {
			e.stopPropagation()
		})
	}

	openModal() {
		this.popupFade.style.display = 'block'
		this.modalWindow.style.display = 'block'
		document.body.style.overflow = 'hidden'
	}

	closeModal() {
		this.popupFade.style.display = 'none'
		this.modalWindow.style.display = 'none'
		document.body.style.overflow = ''
	}
}

document.addEventListener('DOMContentLoaded', () => {
	new ModalWindow()
})
