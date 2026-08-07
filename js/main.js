// /js/main.js

(function () {
  'use strict';

  /* --------------------------------------------------------------------
     Sticky header shadow on scroll
     -------------------------------------------------------------------- */
  var header = document.querySelector('.site-header');

  if (header) {
    var toggleScrollShadow = function () {
      if (window.scrollY > 4) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };

    toggleScrollShadow();
    window.addEventListener('scroll', toggleScrollShadow, { passive: true });
  }

  /* --------------------------------------------------------------------
     Mobile nav toggle
     -------------------------------------------------------------------- */
  var navToggle = document.querySelector('.nav-toggle');
  var primaryNav = document.getElementById('primary-nav');

  if (navToggle && primaryNav) {
    var closeNav = function () {
      navToggle.setAttribute('aria-expanded', 'false');
      primaryNav.classList.remove('is-open');
      document.body.style.overflow = '';
    };

    var openNav = function () {
      navToggle.setAttribute('aria-expanded', 'true');
      primaryNav.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };

    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        closeNav();
        navToggle.focus();
      }
    });

    // Close automatically when a nav link is activated (mobile)
    primaryNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth < 900) {
          closeNav();
        }
      });
    });

    // Reset state if the viewport crosses the desktop breakpoint
    var mq = window.matchMedia('(min-width: 900px)');
    var handleBreakpointChange = function (e) {
      if (e.matches) {
        closeNav();
      }
    };
    if (mq.addEventListener) {
      mq.addEventListener('change', handleBreakpointChange);
    } else if (mq.addListener) {
      mq.addListener(handleBreakpointChange);
    }
  }

  /* --------------------------------------------------------------------
     Dismissible announcement bar — state kept in memory only for this
     page view. Never persisted to storage.
     -------------------------------------------------------------------- */
  var announcement = document.querySelector('.announcement');
  var announcementClose = document.querySelector('.announcement__close');

  if (announcement && announcementClose) {
    announcementClose.addEventListener('click', function () {
      announcement.setAttribute('hidden', '');
    });
  }
})();
