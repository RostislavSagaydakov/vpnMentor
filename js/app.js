topMenuToggle();
langSwitcherToggle();
topSubMenuToggle();
backToTop();
sidebarNavigation();

// toggle mobile menu visibility
function topMenuToggle() {
	const menuToggle = document.querySelector('.header__nav-toggle');
	const menuHolder = document.querySelector('.header__nav')

	document.addEventListener('click', function (e) {
		if (window.matchMedia("(max-width: 1199px)").matches) {
			if (!menuToggle.contains(e.target) && !menuHolder.contains(e.target)) {
				document.body.classList.remove('menu-active');
			} else if (menuToggle.contains(e.target)) {
				document.body.classList.toggle('menu-active');
			} else {
				document.body.classList.add('menu-active');
			}
		} else {
			document.body.classList.remove('menu-active');
		}
	});
}

// toggle lang switcher visibility
function langSwitcherToggle() {
	const langToggle = document.querySelector('.header__lang-switcher__current');

	document.addEventListener('click', function (e) {
		if (!langToggle.contains(e.target)) {
			langToggle.parentNode.classList.remove('active');
		} else {
			langToggle.parentNode.classList.toggle('active');
		}
	});
}

//toggle top submenu visibility
function topSubMenuToggle() {
	const navItems = document.querySelectorAll('.nav__top-item > .nav__top-link');
	const navSubItems = document.querySelectorAll('.nav__submenu .title');
	navItems.forEach((link) => {
		link.addEventListener('click', function (e) {
			const submenu = this.nextElementSibling;
			if (submenu && submenu.classList.contains('nav__submenu')) {
				e.preventDefault();
				link.parentNode.classList.toggle('active');
			}
		});
	});

	navSubItems.forEach((link) => {
		link.addEventListener('click', function (e) {
			this.parentNode.classList.toggle('active');
		});
	});
}

// back to top btn
function backToTop() {
	let backToTopBtn = document.querySelector(".back-to-top");

	window.onscroll = () => scrollFunction();

	function scrollFunction() {
		if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 20) {
			backToTopBtn.style.display = "block";
		} else {
			backToTopBtn.style.display = "none";
		}
	}

	backToTopBtn.addEventListener('click', () => {
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	})
}

// sidebar navigation
function sidebarNavigation() {
	// toggle side navigation visibility
	function slideToggle(element, duration = 300) {
		if (!element) return;

		if (window.getComputedStyle(element).display === "none") {
			return slideDown(element, duration);
		} else {
			return slideUp(element, duration);
		}
	}

	function slideUp(element, duration = 300) {
		element.style.height = element.offsetHeight + "px";
		element.offsetHeight; // Принудительное вычисление стиля перед анимацией
		element.style.transitionProperty = "height, margin, padding";
		element.style.transitionDuration = duration + "ms";
		element.style.overflow = "hidden";
		element.style.height = 0;
		element.style.paddingTop = 0;
		element.style.paddingBottom = 0;
		element.style.marginTop = 0;
		element.style.marginBottom = 0;

		setTimeout(() => {
			element.style.display = "none";
			element.style.removeProperty("height");
			element.style.removeProperty("padding-top");
			element.style.removeProperty("padding-bottom");
			element.style.removeProperty("margin-top");
			element.style.removeProperty("margin-bottom");
			element.style.removeProperty("overflow");
			element.style.removeProperty("transition-duration");
			element.style.removeProperty("transition-property");
		}, duration);
	}

	function slideDown(element, duration = 300) {
		element.style.removeProperty("display");
		let display = window.getComputedStyle(element).display;
		if (display === "none") display = "block";
		element.style.display = display;

		let height = element.offsetHeight;
		element.style.overflow = "hidden";
		element.style.height = 0;
		element.style.paddingTop = 0;
		element.style.paddingBottom = 0;
		element.style.marginTop = 0;
		element.style.marginBottom = 0;
		element.offsetHeight;
		element.style.transitionProperty = "height, margin, padding";
		element.style.transitionDuration = duration + "ms";
		element.style.height = height + "px";
		element.style.removeProperty("padding-top");
		element.style.removeProperty("padding-bottom");
		element.style.removeProperty("margin-top");
		element.style.removeProperty("margin-bottom");

		setTimeout(() => {
			element.style.removeProperty("height");
			element.style.removeProperty("overflow");
			element.style.removeProperty("transition-duration");
			element.style.removeProperty("transition-property");
		}, duration);
	}

	function toggleClass(element, className) {
		if (!element) return;
		element.classList.toggle(className);
	}

	const button = document.querySelector(".side-nav__title");
	const paragraph = document.querySelector(".side-nav__list");

	if (button && paragraph) {
		button.addEventListener("click", function () {
			slideToggle(paragraph);
			toggleClass(button, "active");
		});
	}

	// get nav items from current titles
	const itemData = document.querySelectorAll('.product-list__title');
	const itemListData = document.querySelector('.side-nav__list');
	const itemParents = document.querySelectorAll('.product-list__item');

	itemData.forEach((item) => {
		const dataName = item.innerHTML.replace(/\s/g, "");
		const li = document.createElement('li');
		item.setAttribute('id', dataName);
		li.setAttribute('data-target', dataName);
		li.textContent = item.innerHTML;
		itemListData.appendChild(li);
	});

	// create active state for side navigation
	const navItems = document.querySelectorAll('.side-nav__list li');
	navItems.forEach((item) => {
		item.addEventListener('click', () => {
			document.getElementById(item.dataset.target).scrollIntoView({
				behavior: 'smooth'
			});
		});
	});

	const updateActiveNav = (visibleId) => {
		navItems.forEach(item => item.classList.remove('active'));
		if (visibleId) {
			const navItem = document.querySelector(`.side-nav__list li[data-target="${visibleId}"]`);
			if (navItem) {
				navItem.classList.add('active');
				// console.log(`Active set to: ${visibleId}`);
			}
		} else {
			// console.log('No active item set');
		}
	};

	const observerOptions = {
		root: null,
		rootMargin: '0px',
		threshold: [0, 0.1, 0.5, 1]
	};

	const observer = new IntersectionObserver((entries) => {
		let mostVisibleId = null;
		let maxRatio = 0;

		entries.forEach(entry => {
			const targetTitle = entry.target.querySelector('.product-list__title');
			if (targetTitle) {
				const targetId = targetTitle.id;
				const ratio = entry.intersectionRatio;

				// console.log(`Observer - ID: ${targetId}, Intersecting: ${entry.isIntersecting}, Ratio: ${ratio}`);

				if (entry.isIntersecting && ratio > maxRatio) {
					mostVisibleId = targetId;
					maxRatio = ratio;
				}
			}
		});

		if (mostVisibleId) {
			updateActiveNav(mostVisibleId);
		} else {
			updateActiveNav(null);
			// console.log('Observer: No visible items');
		}
	}, observerOptions);

	itemParents.forEach(parent => {
		observer.observe(parent);
		// console.log(`Observing: ${parent.querySelector('.product-list__title')?.id}`);
	});

	const checkVisibilityManually = () => {
		let mostVisibleId = null;
		let maxVisibleHeight = 0;

		itemParents.forEach(parent => {
			const rect = parent.getBoundingClientRect();
			const targetTitle = parent.querySelector('.product-list__title');
			if (targetTitle) {
				const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
				// console.log(`Manual - ID: ${targetTitle.id}, Top: ${rect.top}, Bottom: ${rect.bottom}, VisibleHeight: ${visibleHeight}`);

				if (visibleHeight > maxVisibleHeight && visibleHeight > 0) {
					mostVisibleId = targetTitle.id;
					maxVisibleHeight = visibleHeight;
				}
			}
		});

		if (mostVisibleId) {
			updateActiveNav(mostVisibleId);
		} else {
			updateActiveNav(null);
			// console.log('Manual: No visible items');
		}
	};

	window.addEventListener('scroll', checkVisibilityManually);
	window.addEventListener('load', checkVisibilityManually);
}