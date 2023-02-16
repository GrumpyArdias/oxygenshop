// Progress BAR
const progressbar = document.querySelector(".progress-bar");
const bodyElement = document.querySelector("html");

const animateProgressBar = () => {
  let scrollDistance = -bodyElement.getBoundingClientRect().top;
  let progressWidth =
    (scrollDistance /
      (bodyElement.getBoundingClientRect().height -
        document.documentElement.clientHeight)) *
    100;
  let progress = Math.ceil(progressWidth);

  progressbar.style.width = progress + "%";
};

window.addEventListener("scroll", animateProgressBar);

// To top button

const toTopBtn = document.querySelector(".to-top");
const toTopAnchor = document.getElementById("anchor-to-top");

toTopBtn.addEventListener("click", function () {
  setTimeout(function () {
    toTopAnchor.hrref = "#header";
  }, 200);
});
