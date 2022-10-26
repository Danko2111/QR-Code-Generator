
// function that makes an API call with axios
const apiCallFunc = (link) => {
  axios
    .get(
      `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${link}`
    )
    .then((res) => {
      createImg(res.config.url);
      setViewButtonLink(res.config.url);
      setShareButtonLink(res.config.url);
    })
    .catch((err) => {
      alert(err);
    });
};

// creating a function that uses DOM manipulation to insert the results of the api call into the html

const createImg = (link) => {
  const parent = document.querySelector(".main-content__img-container");
  parent.innerText = "";

  const img = document.createElement("img");
  img.classList.add("main-content__img");
  img.setAttribute("src", link);

  parent.append(img);
};

// adding an event listner to the form button that calls the api call func
const formButton = document.querySelector(".main-content__form-button");

formButton.addEventListener("click", (e) => {
  e.preventDefault();
  let inputInfo = document.querySelector(".main-content__form-text").value;
  apiCallFunc(inputInfo);
  document.querySelector(".main-content__form-text").value = "";
});

const setViewButtonLink = (link) => {
  const viewButton = document.getElementById("view-btn");
  viewButton.setAttribute("href", link);
  viewButton.setAttribute("target", "_blank");
};

const setShareButtonLink = (link) => {
  const shareButton = document.getElementById("share-btn");
  shareButton.addEventListener("click", () => {
    const shareCard = document.querySelector(".shareCard");
    shareCard.classList.remove("shareCard--hidden");
    let bodyBlur = document.querySelectorAll(".blur");
    bodyBlur.forEach((e) => {
      e.classList.add("blur--active");
    });
  });
  const shareCardCloseButton = document.querySelector(".shareCard__close-btn");
  shareCardCloseButton.addEventListener("click", () => {
    const shareCard = document.querySelector(".shareCard");
    shareCard.classList.add("shareCard--hidden");
    let bodyBlur = document.querySelectorAll(".blur");
    bodyBlur.forEach((e) => {
      e.classList.remove("blur--active");
    });
  });
  const copyButton = document.querySelector(".shareCard__button");
  copyButton.addEventListener("click", () => {
    alert("Copied the link to clipboard");
  });
};