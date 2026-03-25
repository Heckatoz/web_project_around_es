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

import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  openModal,
  closeModal,
  handleOpenEditModal,
  handleProfileFormSubmit,
  handleCardFormSubmit,
  closePopupOnOverlay,
} from "./Utils.js";

const editButton = document.querySelector(".profile__edit-button"); // Enlazar el boton para abrir la ventana para editar objetos en la pagina

export const editPopupModal = document.querySelector("#edit-popup"); // Enlaza la ventana para edicion
const editCloseButton = editPopupModal.querySelector(".popup__close"); // Enlaza el boton para cerrar la ventana de edicion
export const editName = editPopupModal.querySelector(".popup__input_type_name"); // Enlaza la caja de texto del nombre de la ventana de edicion
export const editDescription = editPopupModal.querySelector(
  ".popup__input_type_description",
); // Enlaza la caja de texto de la descripcion de la ventana de edicion.

const formElement = document.querySelector(".popup__form"); // Enlaza el formulario que llevara los datos del perfil.

export const cardContainer = document.querySelector(".cards__list"); // Enlaza el espacio donde se guardan y listan las publicaciones.
const newCardButton = document.querySelector(".profile__add-button"); // Enlaza el boton para crear una nuva publicacion
export const newCardModal = document.querySelector("#new-card-popup"); // Enlaza la plantilla para crear una nueva publicacion
const cardCloseButton = newCardModal.querySelector(".popup__close"); // Enlaza el boton para cerrar la ventana de edicion
const cardForm = document.querySelector("#new-card-form"); // Enlaza el formulario para crar una nueva publicacion

export const editCardName = newCardModal.querySelector(
  ".popup__input_type_card-name",
); // Enlaza el espacio en el formulario del titulo o nombre
export const editCardLink = newCardModal.querySelector(
  ".popup__input_type_url",
); // Enlaza el espacio en el formulario del enlace.

const popupEdit = document.forms.popupEdit;
const inputsEdit = popupEdit.querySelectorAll(".popup__input");
const popupPlace = document.forms.popupPlace;
const inputsPlace = popupPlace.querySelectorAll(".popup__input");

editButton.addEventListener("click", function () {
  // accion que actua al hacer click el el boton de editar
  handleOpenEditModal(editPopupModal);
});

editCloseButton.addEventListener("click", function () {
  // accion que actua al hacer click el el boton de cerrar
  inputsEdit.forEach((input) => {
    profileFormValidator.hideInputError(input);
  });
  closeModal(editPopupModal);
});

newCardButton.addEventListener("click", function () {
  // accion que actua al hacer click el el boton de crear una nueva publicacion
  openModal(newCardModal);
});

cardCloseButton.addEventListener("click", function () {
  // accion que actua al hacer click el el boton de cerrar el formulario de la nueva publicacion.
  editCardName.value = "";
  editCardLink.value = "";
  inputsPlace.forEach((input) => {
    cardFormValidator.hideInputError(input);
  });
  closeModal(newCardModal);
});

formElement.addEventListener("submit", handleProfileFormSubmit); // accion que actua cuando se envia el formulario
cardForm.addEventListener("submit", handleCardFormSubmit); // accion que actua cuando se envia el formulario

inputsEdit.forEach((input) => {
  // Accede a cada campo del formulario de editar perfil.
  input.addEventListener("input", () => {
    //Agrega el evento input, que reacciona al cambio de valores a tiempo real.
    if (!input.validity.valid) {
      // Revisa si el campo analizado esta todo validado o no.
      profileFormValidator.showInputError(input, input.validationMessage); // Activa la funcion showInputError
    } else {
      profileFormValidator.hideInputError(input); // Activa la funcion hideInputError
    }

    profileFormValidator.toggleButtonState(); // Activa la funcion que habilita o deshabilita el boton.
  });
});

export function closeAllErrorMessages() {
  // Oculta todos los mensajes de error de los formularios.
  inputsEdit.forEach((input) => {
    // Revisa los campos del formulatio Edit Profile uno por uno.
    profileFormValidator.hideInputError(input); // Oculta los mensajes de error de este formulario.
    input.value = ""; // Borra el texto introducido por el usuario.
  });
  inputsPlace.forEach((input) => {
    // Revisa los campos del formulatio Create New Place uno por uno.
    cardFormValidator.hideInputError(input); // Oculta los mensajes de error de este formulario.
    input.value = ""; // Borra el texto introducido por el usuario.
  });
}

inputsPlace.forEach((input) => {
  // Accede a cada campo del formulario de crear publicacion.
  input.addEventListener("input", () => {
    //Agrega el evento input, que reacciona al cambio de valores a tiempo real.

    profileFormValidator.toggleButtonState(); // Activa la funcion que habilita o deshabilita el boton.
  });
});

const popups = document.querySelectorAll(".popup"); // Permite acceder a los elementos "popup" es decir, formularios e imagenes que se despliegan encima de la pagina.

popups.forEach((popup) => {
  // Accede a cada formulario y elemento que se despliegue sobrepuesto en la pagina.
  popup.addEventListener("click", closePopupOnOverlay); // Si hay un evento click, revisa si fue o no encima del elemento y actua en consecuencia.
  document.addEventListener("keydown", (evt) => {
    // Revisa si se presiona una tecla al estar navegando en la pagina.
    if (evt.key === "Escape" && popup) {
      // Si se presiona la tecla "Escape" y hay un formulario o imagen desplegada, se activa.
      closeAllErrorMessages();

      closeModal(popup); // Cierra el formulario o imagen desplegada.
    }
  });
});

const config = {
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

initialCards.forEach((element) => {
  // Al iniciar la pagina, carga cada elemento detectado en el array "initialCards" con el formato ya especificado.
  const card = new Card(element, "#card__template");
  const cardElement = card.getElement();
  //renderCard(element.name, element.link, cardContainer);
  cardContainer.prepend(cardElement);
});
