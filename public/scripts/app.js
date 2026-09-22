/* sammsimon.ca: navigation, independent click-to-play videos, sharing and gentle reveals. */
(function () {
    "use strict";
    var GOFUNDME = "https://www.gofundme.com/f/2mspu-charity-run";
    var canonical = document.querySelector('link[rel="canonical"]');
    var PAGE_URL = canonical ? canonical.href : "https://sammsimon.ca/";
    var SHARE_TEXT = document.body.getAttribute("data-share-text") || "Follow Samm Simon’s charity projects.";
    var motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    function $(selector) { return document.querySelector(selector); }
    function $$(selector) { return Array.prototype.slice.call(document.querySelectorAll(selector)); }

    $$("[data-year]").forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
    $$("[data-count]").forEach(function (el) { el.textContent = el.getAttribute("data-count"); });

    var toggle = $(".nav-toggle");
    var links = $("#navLinks");
    if (toggle && links) {
        function closeMenu(returnFocus) {
            links.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-label", "Open navigation");
            if (returnFocus) toggle.focus();
        }
        toggle.addEventListener("click", function () {
            var open = links.classList.toggle("is-open");
            toggle.setAttribute("aria-expanded", String(open));
            toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
        });
        links.addEventListener("click", function (event) {
            if (event.target.closest("a")) closeMenu(false);
        });
        document.addEventListener("click", function (event) {
            if (!links.contains(event.target) && !toggle.contains(event.target)) closeMenu(false);
        });
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && links.classList.contains("is-open")) closeMenu(true);
        });
        window.matchMedia("(min-width: 980px)").addEventListener("change", function () { closeMenu(false); });
    }

    var toastTimer;
    function toast(message) {
        var box = $(".toast");
        if (!box) return;
        box.querySelector("[data-toast]").textContent = message;
        box.hidden = false;
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () { box.hidden = true; }, 3000);
    }
    function legacyCopy(text) {
        var active = document.activeElement;
        var field = document.createElement("textarea");
        field.value = text;
        field.style.cssText = "position:fixed;opacity:0;left:0;top:0";
        document.body.appendChild(field);
        field.select();
        var copied = false;
        try { copied = document.execCommand("copy"); } catch (error) { /* Report failure below. */ }
        field.remove();
        if (active) active.focus({ preventScroll: true });
        return copied;
    }
    function copyText(text, message) {
        function fallback() {
            toast(legacyCopy(text) ? message : "Couldn’t copy the link. You can copy it from your address bar.");
        }
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function () { toast(message); }, fallback);
        } else fallback();
    }
    document.addEventListener("click", function (event) {
        var target = event.target.closest("[data-copy-page],[data-copy-link],[data-share-facebook],[data-share]");
        if (!target) return;
        var url = target.getAttribute("data-share-url") || PAGE_URL;
        var text = target.getAttribute("data-share-text") || SHARE_TEXT;
        if (target.hasAttribute("data-copy-page")) copyText(PAGE_URL, "Page link copied.");
        else if (target.hasAttribute("data-copy-link")) copyText(GOFUNDME, "GoFundMe link copied.");
        else if (target.hasAttribute("data-share-facebook")) {
            window.open("https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url), "_blank", "noopener,width=640,height=480");
        } else if (navigator.share) {
            navigator.share({ title: target.hasAttribute("data-share-url") ? "Samm × Shirtlab" : document.title, text: text, url: url }).catch(function (error) {
                if (error.name !== "AbortError") copyText(url, "Link copied — paste it anywhere.");
            });
        } else copyText(url, "Link copied — paste it anywhere.");
    });

    $$("[data-row-link]").forEach(function (row) {
        function openRow() { window.open(row.getAttribute("data-row-link"), "_blank", "noopener"); }
        row.addEventListener("click", function (event) {
            if (!event.target.closest("a,button")) openRow();
        });
        row.addEventListener("keydown", function (event) {
            if (event.target === row && (event.key === "Enter" || event.key === " ")) {
                event.preventDefault();
                openRow();
            }
        });
    });

    // Each video owns its frame; playing the new short cannot replace the run video.
    $$("[data-video-load]").forEach(function (button) {
        button.addEventListener("click", function () {
            var frame = document.getElementById(button.getAttribute("data-video-load") || "videoFrame");
            if (!frame) return;
            var existing = frame.querySelector("iframe");
            if (existing) { existing.focus(); return; }
            var id = frame.getAttribute("data-youtube") || "zfXIEsTBelo";
            if (!/^[a-zA-Z0-9_-]{11}$/.test(id)) return;
            var player = document.createElement("iframe");
            player.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0&playsinline=1";
            player.title = frame.getAttribute("data-video-title") || "Samm Simon’s charity run";
            player.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
            player.referrerPolicy = "strict-origin-when-cross-origin";
            player.allowFullscreen = true;
            frame.replaceChildren(player);
            player.focus();
        });
    });

    // News players stay dormant until requested; the publisher links remain usable without JavaScript.
    $$("[data-embed-load]").forEach(function (button) {
        button.addEventListener("click", function () {
            var frame = button.closest("[data-embed-src]");
            if (!frame) return;
            var url = frame.getAttribute("data-embed-src") || "";
            if (!/^https:\/\/(www\.youtube-nocookie\.com\/embed\/|embed\.jasperplayer\.com\?)/.test(url)) return;
            var player = document.createElement("iframe");
            player.src = url;
            player.title = frame.getAttribute("data-embed-title") || "News coverage of Samm Simon";
            player.allow = "autoplay; clipboard-write; encrypted-media; picture-in-picture";
            player.referrerPolicy = "strict-origin-when-cross-origin";
            player.allowFullscreen = true;
            frame.replaceChildren(player);
            player.focus();
        });
    });

    // Keep the third-party fundraiser widget off the page until a visitor requests it.
    var fundraiserButton = $("[data-load-gofundme]");
    if (fundraiserButton) {
        fundraiserButton.addEventListener("click", function () {
            if (fundraiserButton.disabled) return;
            fundraiserButton.disabled = true;
            fundraiserButton.textContent = "Loading fundraiser details…";
            var embed = $(".gfm-embed[data-url]");
            if (!embed) return;
            var url = embed.getAttribute("data-url") || "";
            if (!/^https:\/\/www\.gofundme\.com\/f\/2mspu-charity-run\/widget\/large\?/.test(url)) return;
            var frame = document.createElement("iframe");
            frame.src = url;
            frame.title = "Samm Simon GoFundMe fundraiser details";
            frame.width = "520";
            frame.height = "500";
            frame.loading = "lazy";
            frame.referrerPolicy = "strict-origin-when-cross-origin";
            embed.appendChild(frame);
            fundraiserButton.textContent = "Fundraiser details loaded";
        });
    }

    var flyout = $("[data-social-flyout]");
    if (flyout) {
        function updateFlyout() {
            var visible = window.scrollY > 520;
            flyout.classList.toggle("is-visible", visible);
            flyout.setAttribute("aria-hidden", String(!visible));
            flyout.inert = !visible;
        }
        window.addEventListener("scroll", updateFlyout, { passive: true });
        updateFlyout();
    }

    // Content remains visible without JavaScript, on fast scrolls, or with reduced motion.
    if ("IntersectionObserver" in window && !motion.matches) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-revealed");
                observer.unobserve(entry.target);
            });
        }, { rootMargin: "0px 0px 40px 0px", threshold: 0 });
        $$(".reveal").forEach(function (el) {
            if (el.getBoundingClientRect().top > window.innerHeight) observer.observe(el);
        });
    }
})();
