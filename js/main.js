// /js/main.js

(function () {
  'use strict';

  /* --------------------------------------------------------------------
     Sticky header shadow on scroll, and a compact (smaller-logo) state
     that engages scrolling down and releases scrolling up.
     -------------------------------------------------------------------- */
  var header = document.querySelector('.site-header');

  if (header) {
    var lastScrollY = window.scrollY;

    var toggleScrollState = function () {
      var currentScrollY = window.scrollY;

      header.classList.toggle('is-scrolled', currentScrollY > 4);

      if (currentScrollY <= 4) {
        header.classList.remove('is-compact');
      } else if (currentScrollY > lastScrollY) {
        header.classList.add('is-compact');
      } else if (currentScrollY < lastScrollY) {
        header.classList.remove('is-compact');
      }

      lastScrollY = currentScrollY;
    };

    toggleScrollState();
    window.addEventListener('scroll', toggleScrollState, { passive: true });
  }

  /* --------------------------------------------------------------------
     Nav dropdowns (Builds, Store, ...)
     -------------------------------------------------------------------- */
  var dropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');

  var closeDropdown = function (toggle, dropdown) {
    toggle.setAttribute('aria-expanded', 'false');
    dropdown.classList.remove('is-open');
  };

  var closeAllDropdowns = function () {
    dropdownToggles.forEach(function (toggle) {
      var dropdown = document.getElementById(toggle.getAttribute('aria-controls'));
      if (dropdown) {
        closeDropdown(toggle, dropdown);
      }
    });
  };

  dropdownToggles.forEach(function (toggle) {
    var dropdown = document.getElementById(toggle.getAttribute('aria-controls'));
    if (!dropdown) {
      return;
    }

    toggle.addEventListener('click', function (event) {
      event.stopPropagation();
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      closeAllDropdowns();
      if (!isOpen) {
        toggle.setAttribute('aria-expanded', 'true');
        dropdown.classList.add('is-open');
      }
    });
  });

  if (dropdownToggles.length) {
    document.addEventListener('click', function (event) {
      if (!event.target.closest('.has-dropdown')) {
        closeAllDropdowns();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeAllDropdowns();
      }
    });
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
      closeDropdown();
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
