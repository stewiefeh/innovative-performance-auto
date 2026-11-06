/* Innovative Performance Auto — live hours, day highlight, light motion */
(function () {
  "use strict";

  // Shop hours from the Google listing: open minutes, close minutes (America/New_York).
  var WEEK = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  var HOURS = {
    1: { open: 8 * 60 + 1, close: 18 * 60 + 1, name: "Monday" },
    2: { open: 8 * 60 + 1, close: 18 * 60 + 1, name: "Tuesday" },
    3: { open: 8 * 60 + 1, close: 18 * 60 + 1, name: "Wednesday" },
    4: { open: 8 * 60 + 1, close: 18 * 60 + 1, name: "Thursday" },
    5: { open: 8 * 60 + 1, close: 17 * 60 + 30, name: "Friday" }
  };
  var ZONE = "America/New_York";

  function nowInZone() {
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: ZONE, weekday: "short", hour: "numeric", minute: "numeric", hour12: false
    }).formatToParts(new Date());
    var get = function (t) {
      for (var i = 0; i < parts.length; i++) if (parts[i].type === t) return parts[i].value;
      return null;
    };
    return {
      day: WEEK[get("weekday")],
      minutes: (parseInt(get("hour"), 10) % 24) * 60 + parseInt(get("minute"), 10)
    };
  }

  function fmtTime(mins) {
    var h = Math.floor(mins / 60), m = mins % 60;
    var ampm = h >= 12 ? "PM" : "AM";
    var h12 = h % 12 === 0 ? 12 : h % 12;
    return h12 + ":" + (m < 10 ? "0" + m : m) + " " + ampm;
  }

  function status() {
    var t = nowInZone();
    var today = HOURS[t.day];
    if (today && t.minutes >= today.open && t.minutes < today.close) {
      return { open: true, text: "Open now · closes " + fmtTime(today.close) };
    }
    // find next opening, today evening or a later day
    for (var i = 0; i < 7; i++) {
      var d = (t.day + i) % 7;
      var h = HOURS[d];
      if (!h) continue;
      if (i === 0 && t.minutes < h.open) {
        return { open: false, text: "Closed · opens today " + fmtTime(h.open) };
      }
      if (i > 0) {
        return { open: false, text: "Closed · opens " + h.name + " " + fmtTime(h.open) };
      }
    }
    return { open: false, text: "Closed" };
  }

  function renderStatus() {
    var s = status();
    var chip = document.getElementById("openChip");
    if (chip) {
      chip.hidden = false;
      chip.textContent = s.text;
      chip.classList.toggle("is-open", s.open);
      chip.classList.toggle("is-closed", !s.open);
    }
    var bar = document.getElementById("callBarLabel");
    if (bar) bar.textContent = s.open ? "Open now" : "Closed";
  }
  renderStatus();
  setInterval(renderStatus, 60000);

  // Highlight today's row in the hours table
  var day = nowInZone().day;
  var rows = document.querySelectorAll(".hours tbody tr");
  var names = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  for (var i = 0; i < rows.length; i++) {
    if (names[day] && rows[i].textContent.toLowerCase().indexOf(names[day]) !== -1) {
      rows[i].classList.add("today");
    }
  }

  // Header rule on scroll
  var head = document.querySelector(".site-head");
  var onScroll = function () {
    head.classList.toggle("scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // One-time reveal on scroll
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var targets = document.querySelectorAll(
    ".straight-item, .straight-photo, .review, .services-list li, .services-note, .visit-info, .visit-photo"
  );
  if (reduce || !("IntersectionObserver" in window)) {
    targets.forEach ? targets.forEach(function (el) { el.classList.add("in"); }) : null;
  } else {
    targets.forEach(function (el) { el.classList.add("fade-item"); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    targets.forEach(function (el) { io.observe(el); });
  }
  // Fail-open: if anything is still hidden after 2.5s (no scroll events, embedded
  // viewers, odd rendering environments), show it rather than leave blank sections.
  setTimeout(function () {
    document.querySelectorAll('.fade-item:not(.in)').forEach(function (el) {
      el.classList.add('in');
    });
  }, 2500);
})();
