document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach((el) => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }

  // Set the social links on the page
  const url = "https://twitter.com/intent/tweet";
  const currentURL = window.location.href;

  const mailToMessage = encodeURIComponent(
    `Feedback for ${window.location.pathname}`
  );
  const mailToURL = `mailto:hello@patricklee.nyc?subject=${mailToMessage}`;
  document.querySelector("#email-feedback").setAttribute("href", mailToURL);

  const tweetAtMessage = `${url}?text=${encodeURIComponent(
    `@patleeman ${currentURL}`
  )}`;
  document.querySelector("#tweet-at").setAttribute("href", tweetAtMessage);

  const shareWithMessage = `${url}?text=${encodeURIComponent(
    `Check out this post by @patleeman ${currentURL}`
  )}`;
  document.querySelector("#share-with").setAttribute("href", shareWithMessage);
});
