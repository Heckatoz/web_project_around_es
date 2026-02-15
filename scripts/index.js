let initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },

  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },

  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },

  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

initialCards.forEach((element) => {
  console.log(element.name);
});

const editButton = document.querySelector(".profile__edit-button");
let profileName = document.querySelector(".profile__title");
let profileDescription = document.querySelector(".profile__description");
const editCloseButton = document.querySelector(".popup__close");
const editPopupModal = document.querySelector("#edit-popup");
const editName = editPopupModal.querySelector(".popup__input_type_name");
const editDescription = editPopupModal.querySelector(
  ".popup__input_type_description",
);
let formElement = document.querySelector(".popup__form");

function openModal(Modal) {
  Modal.classList.add("popup_is-opened");
}

function closeModal(Modal) {
  Modal.classList.remove("popup_is-opened");
}

function fillProfileForm() {
  editName.value = profileName.textContent;
  editDescription.value = profileDescription.textContent;

  return (editName, editDescription);
}

function handleOpenEditModal(Modal) {
  fillProfileForm();
  openModal(Modal);
}

editButton.addEventListener("click", function () {
  handleOpenEditModal(editPopupModal);
});

editCloseButton.addEventListener("click", function () {
  closeModal(editPopupModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = editName.value;
  profileDescription.textContent = editDescription.value;

  closeModal(editPopupModal);
}

formElement.addEventListener("submit", handleProfileFormSubmit);
