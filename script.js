const progressbar = document.querySelector(".progress-bar");
const bodyElement = document.querySelector("html");
const toTopBtn = document.querySelector(".to-top");
const toTopAnchor = document.getElementById("anchor-to-top");
const burguerIcon = document.getElementById("burguer-img");
const NavMenu = document.getElementById("nav-menu");
const formContact = document.getElementById("contact-form");
const errorDiv = document.getElementById("error-msg");
const nchlBtn = document.getElementById("nwsl-btn");
const closeBtn = document.getElementById("close-Btn");
const selectedCurrency = document.getElementById("currency");

const formData = {
  userName: document.getElementById("name"),
  userMail: document.getElementById("email"),
  //checkbox: document.getElementById("terms-of-serice"),
  nchMail: document.getElementById("subscribe"),
};

function progressCalculations() {
  let scrollDistance = -bodyElement.getBoundingClientRect().top;
  let progressWidth =
    (scrollDistance /
      (bodyElement.getBoundingClientRect().height -
        document.documentElement.clientHeight)) *
    100;
  return Math.ceil(progressWidth);
}

function dataValidations(event) {
  let errorMsg = [];

  let mailRex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  console.log(formData);
  if (formData.userName.length < 2 || formData.userName.length >= 100) {
    errorMsg.push(
      "El nombre no puede ser menor de 2 caracteres ni mayor de 100"
    );
    formData.userName.style.borderColor = "#fc0303";
  }

  if (!formData.userMail.value.match(mailRex)) {
    errorMsg.push("El mail introducido no es valido");
    formData.userMail.style.borderColor = "#fc0303";
  }

  if (
    !formData.nchMail.value.match(mailRex || formData.nchMail.value !== null)
  ) {
    formData.nchMail.style.borderColor = "#fc0303";
  }

  if (errorMsg.length > 0) {
    event.preventDefault();
    errorDiv.innerHTML = errorMsg.join(", ");
    errorDiv.style.color = "#fc0303";
    return false;
  } else {
    return true;
  }
}

function fetchHandel(name, mail, nlMail) {
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: "OxygenShop Contact Request",
      UserName: name,
      mail: mail,
      nchMail: nlMail,
      userid: Date.now(),
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((e) => console.error(e));
}

async function currencyFetchHandle() {
  try {
    const response = await fetch(
      "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json"
    );
    const currencies = await response.json();
    return currencies;
  } catch (e) {
    console.log(e);
  }
}

function closeModal() {
  document.querySelector(".modal").style.display = "none";
  document.body.style.backgroundColor = "white";
}
// Progress BAR
const animateProgressBar = (porcentage) => {
  progressbar.style.width = porcentage + "%";
};

window.addEventListener("scroll", () => {
  const progress = progressCalculations();
  animateProgressBar(progress);
});

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

// MODAL

let modalHasPop = false;

window.onload = function () {
  console.log(`el estado del token es ${modalHasPop}`);
  if (!modalHasPop) {
    setTimeout(() => {
      document.getElementById("modal").style.display = "flex";
      document.body.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      modalHasPop = true;
      console.log(
        `el estado del token despues de las funciones es ${modalHasPop}`
      );
    }, 5000);

    window.onscroll = () => {
      if (
        !modalHasPop &&
        window.pageYOffset > document.documentElement.scrollHeight * 0.25
      ) {
        document.getElementById("modal").style.display = "flex";
        document.body.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        modalHasPop = true;
        console.log(
          `el estado del token despues de las funciones es ${modalHasPop}`
        );
      }
    };
  }
};

// event listener

formContact.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log(dataValidations());

  if (dataValidations()) {
    e.preventDefault();
    fetchHandel(formData.userName.value, formData.userMail.value, null);
  }
});

document.addEventListener(
  "click",
  function (event) {
    if (event.target.matches(".close-Btn") || !event.target.closest(".modal")) {
      closeModal();
    }
  },
  false
);
document.addEventListener("keydown", (e) => {
  e.key === "Escape" ? closeModal() : null;
});

closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("modal").style.display = "none";
  document.body.style.backgroundColor = "white";
});

// Currency exange

selectedCurrency.addEventListener("change", async (e) => {
  const selectedOption = e.target.value;
  exchangeCalculations(selectedOption);
  console.log(data);
});

async function exchangeCalculations(currency) {
  try {
    const data = await currencyFetchHandle();
    const basic = document.getElementById("h2-basic");
    const profesional = document.getElementById("h2-profesional");
    const premium = document.getElementById("h2-premium");
    const profesionalPrice = 25;
    const premiumPrice = 60;
    const eurConvertValue = data.eur.usd;
    const gbpConvertValue = data.eur.gbp;

    if (currency === "dollar") {
      basic.innerHTML = "$0";
      profesional.innerHTML = "$25";
      premium.innerHTML = "$60";
    }

    if (currency === "euro") {
      basic.innerHTML = "€0";

      const profesionalEuro = Math.round(profesionalPrice / eurConvertValue);
      profesional.innerHTML = `€${profesionalEuro}`;

      const premiumEuro = Math.round(premiumPrice / eurConvertValue);
      premium.innerHTML = `€${premiumEuro}`;
    }

    if (currency === "gbp") {
      basic.innerHTML = "£0";

      const profesionalGbp = Math.round(profesionalPrice / gbpConvertValue);
      profesional.innerHTML = `£${profesionalGbp}`;

      const premiumGbp = Math.round(premiumPrice / gbpConvertValue);
      premium.innerHTML = `£${premiumGbp}`;
    }
  } catch (error) {
    console.error(error);
  }
}
