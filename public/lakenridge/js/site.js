(function () {
  "use strict";

  const menuButton = document.querySelector(".lr-menu-toggle");
  const nav = document.querySelector("#primary-nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  const timelineItems = document.querySelectorAll(".lr-timeline-item");
  const timelineImage = document.querySelector("#timeline-image");
  const timelineYear = document.querySelector("#timeline-year");
  const timelineHeading = document.querySelector("#timeline-heading");
  const timelineCopy = document.querySelector("#timeline-copy");
  const timelineSource = document.querySelector("#timeline-source");

  function selectTimelineItem(item) {
    timelineItems.forEach(function (button) {
      const active = button === item;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
    });

    if (!timelineImage) return;
    timelineImage.style.opacity = "0";
    window.setTimeout(function () {
      timelineImage.src = item.dataset.image;
      timelineImage.alt = item.dataset.alt;
      timelineYear.textContent = item.dataset.year;
      timelineHeading.textContent = item.dataset.title;
      timelineCopy.textContent = item.dataset.copy;
      timelineSource.textContent = item.dataset.source;
      timelineImage.style.opacity = "1";
    }, 120);
  }

  timelineItems.forEach(function (item) {
    item.addEventListener("click", function () { selectTimelineItem(item); });
  });

  const compare = document.querySelector("#map-compare");
  const scrubber = document.querySelector("#map-scrubber");
  if (compare && scrubber) {
    scrubber.addEventListener("input", function () {
      compare.style.setProperty("--compare", scrubber.value + "%");
    });
  }

  const houseTabs = document.querySelectorAll(".lr-house-tab");
  const houseCopies = document.querySelectorAll(".lr-house-copy");
  houseTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      const house = tab.dataset.house;
      houseTabs.forEach(function (button) {
        const active = button === tab;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-selected", String(active));
      });
      houseCopies.forEach(function (copy) {
        copy.classList.toggle("is-active", copy.dataset.houseCopy === house);
      });
    });
  });
})();
