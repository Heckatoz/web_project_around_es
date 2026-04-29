const initialCards = [
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
]; // Da una lista inicial de cartas para la pagina.(Nombre y enlace)

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";

const editButton = document.querySelector(".profile__edit-button"); // Enlazar el boton para abrir la ventana para editar objetos en la pagina

const formElement = document.querySelector(".popup__form"); // Enlaza el formulario que llevara los datos del perfil.

export const cardContainer = document.querySelector(".cards__list"); // Enlaza el espacio donde se guardan y listan las publicaciones.
const newCardButton = document.querySelector(".profile__add-button"); // Enlaza el boton para crear una nuva publicacion
const cardForm = document.querySelector("#new-card-form"); // Enlaza el formulario para crar una nueva publicacion

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const editProfilePopup = new PopupWithForm("#edit-popup", (formData) => {
  userInfo.setUserInfo(formData);
  editProfilePopup.close();
});

const addCardPopup = new PopupWithForm("#new-card-popup", (formData) => {
  const card = new Card(formData, "#card__template", handleCardClick);
  const cardElement = card.getElement();
  cardContainer.prepend(cardElement);
  addCardPopup.close();
});

const imagePopup = new PopupWithImage("#image-popup");

function handleCardClick(ImageData) {
  imagePopup.open(ImageData);
}

editButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  editProfilePopup.open(userData);
});

newCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

const config = {
  //Se crea un array con parametros que repreentan las diferentes clases que se van a usar para identificar a que seccion del template te refieres al trabajar.
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// Para el formulario de perfil
const profileFormValidator = new FormValidator(config, formElement);
profileFormValidator.enableValidation();

// Para el formulario de agregar tarjeta
const cardFormValidator = new FormValidator(config, cardForm);
cardFormValidator.enableValidation();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, "#card__template", handleCardClick);
      return card.getElement();
    },
  },
  ".cards__list",
);

cardSection.renderItems();

editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup._setEventListeners();
