/* sammsimon.ca — site interactivity
 * Rebuilt 2026-06-11 (original was excluded from the repo by .gitignore `scripts/`).
 * Drives: reveal animations (GSAP/ScrollTrigger w/ IO fallback), marquees,
 * counters, tilt, parallax, share/copy actions, toast, nav toggle,
 * social flyout, scroll runner, lazy YouTube embed.
 */
(function () {
	"use strict";

	var GOFUNDME = "https://www.gofundme.com/f/2mspu-charity-run";
	var PAGE_URL = "https://sammsimon.ca/";
	var YT_ID = "zfXIEsTBelo";
	var reduceMotion = false;
	try { reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}

	function safe(fn) { try { fn(); } catch (e) { if (window.console) console.warn("[samm]", e); } }
	function $(sel, root) { return (root || document).querySelector(sel); }
	function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

	/* ---------- year ---------- */
	safe(function () {
		$$("[data-year]").forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
	});

	/* ---------- nav toggle ---------- */
	safe(function () {
		var toggle = $(".nav-toggle");
		var links = document.getElementById("navLinks");
		if (!toggle || !links) return;
		toggle.addEventListener("click", function () {
			var open = links.classList.toggle("is-open");
			toggle.setAttribute("aria-expanded", open ? "true" : "false");
		});
		links.addEventListener("click", function (e) {
			if (e.target.closest("a")) {
				links.classList.remove("is-open");
				toggle.setAttribute("aria-expanded", "false");
			}
		});
	});

	/* ---------- toast ---------- */
	var toastTimer = null;
	function toast(msg) {
		var box = $(".toast");
		if (!box) return;
		var txt = $("[data-toast]", box);
		if (txt && msg) txt.textContent = msg;
		box.hidden = false;
		clearTimeout(toastTimer);
		toastTimer = setTimeout(function () { box.hidden = true; }, 2200);
	}

	/* ---------- clipboard + share ---------- */
	function copyText(text, msg) {
		function done() { toast(msg || "Copied."); }
		if (navigator.clipboard && navigator.clipboard.writeText) {
			navigator.clipboard.writeText(text).then(done, function () { legacyCopy(text); done(); });
		} else { legacyCopy(text); done(); }
	}
	function legacyCopy(text) {
		var ta = document.createElement("textarea");
		ta.value = text;
		ta.style.position = "fixed";
		ta.style.opacity = "0";
		document.body.appendChild(ta);
		ta.select();
		try { document.execCommand("copy"); } catch (e) {}
		document.body.removeChild(ta);
	}
	safe(function () {
		document.addEventListener("click", function (e) {
			var t;
			if ((t = e.target.closest("[data-copy-page]"))) { copyText(PAGE_URL, "Page link copied."); }
			else if ((t = e.target.closest("[data-copy-link]"))) { copyText(GOFUNDME, "GoFundMe link copied."); }
			else if ((t = e.target.closest("[data-share-facebook]"))) {
				window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(PAGE_URL), "_blank", "noopener,width=640,height=480");
			} else if ((t = e.target.closest("[data-share]"))) {
				if (navigator.share) {
					navigator.share({ title: document.title, text: "Samm Simon ran 251 km for cancer care.", url: PAGE_URL }).catch(function () {});
				} else { copyText(PAGE_URL, "Link copied — paste it anywhere."); }
			}
		});
	});

	/* ---------- sponsor row links ---------- */
	safe(function () {
		$$("[data-row-link]").forEach(function (row) {
			function go() { window.open(row.getAttribute("data-row-link"), "_blank", "noopener"); }
			row.addEventListener("click", function (e) {
				if (e.target.closest("a,button")) return;
				go();
			});
			row.addEventListener("keydown", function (e) {
				if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
			});
		});
	});

	/* ---------- social flyout ---------- */
	safe(function () {
		var fly = $("[data-social-flyout]");
		if (!fly) return;
		var shown = false;
		function update() {
			var want = window.scrollY > 520;
			if (want === shown) return;
			shown = want;
			fly.classList.toggle("is-visible", want);
			fly.setAttribute("aria-hidden", want ? "false" : "true");
		}
		window.addEventListener("scroll", update, { passive: true });
		update();
	});

	/* ---------- scroll runner ---------- */
	safe(function () {
		if (reduceMotion) return;
		var runner = document.createElement("div");
		runner.className = "scroll-runner";
		runner.setAttribute("aria-hidden", "true");
		runner.innerHTML = '<div class="scroll-runner-shell"><i class="fa-solid fa-person-running scroll-runner-icon"></i></div>';
		document.body.appendChild(runner);
		var lastY = window.scrollY;
		var ticking = false;
		function paint() {
			ticking = false;
			var y = window.scrollY;
			var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
			var p = Math.min(1, Math.max(0, y / max));
			var top = 120 + p * (window.innerHeight - 120 - 140);
			runner.style.top = top + "px";
			runner.classList.toggle("is-visible", y > 160);
			if (y < lastY - 2) runner.classList.add("is-reverse");
			else if (y > lastY + 2) runner.classList.remove("is-reverse");
			lastY = y;
		}
		window.addEventListener("scroll", function () {
			if (!ticking) { ticking = true; requestAnimationFrame(paint); }
		}, { passive: true });
		paint();
	});

	/* ---------- lazy YouTube embed ---------- */
	safe(function () {
		var frame = document.getElementById("videoFrame");
		if (!frame) return;
		var loaded = false;
		function load() {
			if (loaded) return;
			loaded = true;
			var ifr = document.createElement("iframe");
			ifr.width = "560";
			ifr.height = "315";
			ifr.src = "https://www.youtube.com/embed/" + YT_ID + "?autoplay=1&rel=0";
			ifr.title = "Samm Simon - Charity Run";
			ifr.setAttribute("frameborder", "0");
			ifr.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
			ifr.referrerPolicy = "strict-origin-when-cross-origin";
			ifr.allowFullscreen = true;
			frame.innerHTML = "";
			frame.appendChild(ifr);
		}
		$$("[data-video-load]").forEach(function (btn) { btn.addEventListener("click", load); });
	});

	/* ---------- marquees ---------- */
	safe(function () {
		$$(".marquee-track").forEach(function (track) {
			var box = track.parentElement;
			if (!box || track.children.length === 0) return;
			var originals = $$(":scope > *", track);
			// Duplicate content until track comfortably overflows the container twice.
			var unitWidth = track.scrollWidth;
			if (unitWidth === 0) return;
			var copies = 0;
			while (track.scrollWidth < box.clientWidth * 2 + unitWidth && copies < 12) {
				originals.forEach(function (node) {
					var c = node.cloneNode(true);
					c.setAttribute("aria-hidden", "true");
					c.querySelectorAll && c.querySelectorAll("a").forEach(function (a) { a.tabIndex = -1; });
					track.appendChild(c);
				});
				copies++;
			}
			if (reduceMotion) return; // content duplicated for layout, but no motion
			var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "0") || 0;
			var loopWidth = unitWidth + gap;
			var x = 0;
			var speed = box.hasAttribute("data-marquee") ? 28 : 38; // px/s
			var paused = false;
			var prev = null;
			box.addEventListener("pointerenter", function () { paused = true; });
			box.addEventListener("pointerleave", function () { paused = false; });
			box.addEventListener("focusin", function () { paused = true; });
			box.addEventListener("focusout", function () { paused = false; });
			function step(ts) {
				if (prev === null) prev = ts;
				var dt = Math.min(64, ts - prev);
				prev = ts;
				if (!paused && !document.hidden) {
					x -= speed * dt / 1000;
					if (-x >= loopWidth) x += loopWidth;
					track.style.transform = "translate3d(" + x.toFixed(2) + "px,0,0)";
				}
				requestAnimationFrame(step);
			}
			requestAnimationFrame(step);
		});
	});

	/* ---------- counters ---------- */
	function animateCount(el) {
		var target = parseFloat(el.getAttribute("data-count")) || 0;
		if (reduceMotion) { el.textContent = String(target); return; }
		var start = null;
		var dur = 1400;
		function tick(ts) {
			if (start === null) start = ts;
			var p = Math.min(1, (ts - start) / dur);
			var eased = 1 - Math.pow(1 - p, 3);
			el.textContent = String(Math.round(target * eased));
			if (p < 1) requestAnimationFrame(tick);
		}
		requestAnimationFrame(tick);
	}

	/* ---------- tilt ---------- */
	safe(function () {
		if (reduceMotion || !window.matchMedia("(hover: hover)").matches) return;
		$$("[data-tilt]").forEach(function (card) {
			var raf = null;
			card.addEventListener("pointermove", function (e) {
				if (raf) return;
				raf = requestAnimationFrame(function () {
					raf = null;
					var r = card.getBoundingClientRect();
					var px = (e.clientX - r.left) / r.width - 0.5;
					var py = (e.clientY - r.top) / r.height - 0.5;
					card.style.transform = "perspective(540px) rotateY(" + (px * 7).toFixed(2) + "deg) rotateX(" + (-py * 7).toFixed(2) + "deg) translateY(-2px)";
				});
			});
			card.addEventListener("pointerleave", function () {
				card.style.transition = "transform .35s ease";
				card.style.transform = "";
				setTimeout(function () { card.style.transition = ""; }, 380);
			});
		});
	});

	/* ---------- reveal + parallax ---------- */
	safe(function () {
		var reveals = $$(".reveal");
		var counters = $$("[data-count]");
		var counted = false;
		function fireCounters() {
			if (counted) return;
			counted = true;
			counters.forEach(animateCount);
		}

		if (reduceMotion) {
			// leave everything visible; just set final counter values
			counters.forEach(function (el) { el.textContent = el.getAttribute("data-count"); });
			return;
		}

		var hasGsap = window.gsap && window.ScrollTrigger;
		if (hasGsap) {
			gsap.registerPlugin(ScrollTrigger);
			gsap.set(reveals, { autoAlpha: 0, y: 26 });
			ScrollTrigger.batch(reveals, {
				start: "top 92%",
				once: true,
				onEnter: function (batch) {
					gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.08, overwrite: true });
				}
			});
			// safety: anything still hidden after 2.5s gets revealed (e.g. zero-height edge cases)
			setTimeout(function () {
				reveals.forEach(function (el) {
					if (parseFloat(getComputedStyle(el).opacity) < 0.05) {
						gsap.to(el, { autoAlpha: 1, y: 0, duration: 0.5, overwrite: true });
					}
				});
			}, 2500);
			$$("[data-parallax]").forEach(function (el) {
				gsap.to(el, {
					yPercent: -6,
					ease: "none",
					scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 }
				});
			});
			counters.forEach(function (el) {
				ScrollTrigger.create({ trigger: el, start: "top 95%", once: true, onEnter: fireCounters });
			});
		} else if ("IntersectionObserver" in window) {
			reveals.forEach(function (el) {
				el.style.opacity = "0";
				el.style.transform = "translateY(22px)";
				el.style.transition = "opacity .7s ease, transform .7s ease";
			});
			var io = new IntersectionObserver(function (entries) {
				entries.forEach(function (en) {
					if (!en.isIntersecting) return;
					en.target.style.opacity = "1";
					en.target.style.transform = "none";
					io.unobserve(en.target);
					if (en.target.querySelector("[data-count]") || en.target.hasAttribute("data-count")) fireCounters();
				});
			}, { rootMargin: "0px 0px -8% 0px" });
			reveals.forEach(function (el) { io.observe(el); });
			counters.forEach(function (el) { io.observe(el.closest(".reveal") || el); });
		} else {
			fireCounters();
		}
	});
})();
