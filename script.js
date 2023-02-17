const progressbar = document.querySelector(".progress-bar");
const bodyElement = document.querySelector("html");
const toTopBtn = document.querySelector(".to-top");
const toTopAnchor = document.getElementById("anchor-to-top");
const burguerIcon = document.getElementById("burguer-img");
const NavMenu = document.getElementById("nav-menu");
const nameInput = document.getElementById("name");
const mail = document.getElementById("email");
const form = document.getElementById("contact-form");
const checkbox = document.getElementById("terms-of-serice");
const errorDiv = document.getElementById("error-msg");
// Progress BAR

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
toTopBtn.addEventListener("click", function () {
  setTimeout(function () {
    toTopAnchor.hrref = "#header";
  }, 200);
});

// burguer menu
burguerIcon.addEventListener("click", () => {
  NavMenu.style.display === "none"
    ? (NavMenu.style.display = "flex")
    : (NavMenu.style.display = "none");
});

// Input validation and Fetch data

form.addEventListener("submit", (e) => {
  let errorMsg = [];

  let mailRex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (nameInput.value.length < 2 || nameInput.value.length >= 100) {
    errorMsg.push(
      "El nombre no puede ser menor de 2 caracteres ni mayor de 100"
    );
    nameInput.style.borderColor = "#fc0303";
  }

  if (!mail.value.match(mailRex)) {
    errorMsg.push("El mail introducido no es valido");
    mail.style.borderColor = "#fc0303";
  }

  if (errorMsg.length > 0) {
    e.preventDefault();
    errorDiv.innerHTML = errorMsg.join(", ");
    errorDiv.style.color = "#fc0303";
  } else {
    e.preventDefault();
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: "OxygenShop Contact Request",
        UserName: nameInput,
        mail: mail.value,
        userId: Date.now(),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((e) => console.log("error"));
  }
});
