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
