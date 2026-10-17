(function () {
	'use strict';

	var storageKey = 'clm-theme-mode';
	var root = document.documentElement;
	var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

	function getMode() {
		var saved = null;
		try { saved = window.localStorage.getItem(storageKey); } catch (e) { /* Storage may be disabled. */ }
		return saved === 'light' || saved === 'dark' ? saved : (media && media.matches ? 'dark' : 'light');
	}

	function paintMode(mode) {
		root.setAttribute('data-clm-theme', mode);
		root.style.colorScheme = mode;
		var button = document.getElementById('clm-theme-toggle');
		if (!button) return;
		var next = mode === 'dark' ? 'light' : 'dark';
		button.setAttribute('aria-label', 'Switch to ' + next + ' mode');
		button.setAttribute('title', 'Switch to ' + next + ' mode');
		button.setAttribute('aria-pressed', mode === 'dark' ? 'true' : 'false');
		var icon = button.querySelector('.clm-theme-toggle__icon');
		var label = button.querySelector('.clm-theme-toggle__label');
		if (icon) icon.textContent = mode === 'dark' ? '☀' : '◐';
		if (label) label.textContent = mode === 'dark' ? 'Light' : 'Dark';
	}

	function findHeaderTarget() {
		return document.querySelector('.elementor-location-header .e-con-inner') ||
			document.querySelector('[data-elementor-type="header"] .e-con-inner') ||
			document.querySelector('.clm-site-header__inner') ||
			document.querySelector('.elementor-location-header');
	}

	function mountToggle() {
		if (!document.body) return;
		var button = document.getElementById('clm-theme-toggle');
		if (!button) {
			button = document.createElement('button');
			button.type = 'button';
			button.id = 'clm-theme-toggle';
			button.className = 'clm-theme-toggle clm-theme-toggle--floating';
			button.innerHTML = '<span class="clm-theme-toggle__icon" aria-hidden="true">◐</span><span class="clm-theme-toggle__label">Dark</span>';
			button.addEventListener('click', function () {
				var next = root.getAttribute('data-clm-theme') === 'dark' ? 'light' : 'dark';
				try { window.localStorage.setItem(storageKey, next); } catch (e) { /* Session still works. */ }
				paintMode(next);
			});
			document.body.appendChild(button);
		}
		var target = findHeaderTarget();
		if (target && button.parentElement !== target) {
			button.classList.remove('clm-theme-toggle--floating');
			target.appendChild(button);
		}
		paintMode(getMode());
	}

	paintMode(getMode());
	if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountToggle, { once: true });
	else mountToggle();
	if ('MutationObserver' in window) {
		new MutationObserver(function () {
			var button = document.getElementById('clm-theme-toggle');
			if (button && button.classList.contains('clm-theme-toggle--floating') && findHeaderTarget()) mountToggle();
		}).observe(document.documentElement, { childList: true, subtree: true });
	}
	if (media && media.addEventListener) {
		media.addEventListener('change', function (event) {
			var saved = null;
			try { saved = window.localStorage.getItem(storageKey); } catch (e) { /* Ignore. */ }
			if (!saved) paintMode(event.matches ? 'dark' : 'light');
		});
	}
}());
