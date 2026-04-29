import { cardContainer } from "../scripts/index.js";

import Card from "./Card.js";

const profileName = document.querySelector(".profile__title"); // Enlazar el nombre del perfil de la pagina.
const profileDescription = document.querySelector(".profile__description"); // Enlaza la descripcion de la persona del perfil de la pafina

export function openModal(Modal) {
  Modal.classList.add("popup_is-opened"); // Agrega al elemento designado la clase que le permite desplegarse en la pagina
}

export function closeModal(Modal) {
  Modal.classList.remove("popup_is-opened"); // Remueve del elemento designado la clase que le permite desplegarse en la pagina
}

export function fillProfileForm() {
  // Al momento de editar, toma los valores actuales y los despliega en el formulario

  editName.value = profileName.textContent;
  editDescription.value = profileDescription.textContent;

  return (editName, editDescription);
}

export function handleOpenEditModal(Modal) {
  // Despliega la ventana para edicion con los valores actuales del perfil.
  fillProfileForm();
  openModal(Modal);
}

export function handleProfileFormSubmit(evt) {
  // actua para guardar los nuevos datos del formulario para el perfil

  evt.preventDefault(); // evita que la pagina se recargue y los datos se pierdan IMPORTANTE

  profileName.textContent = editName.value; // guarda el valor del formulario en el perfil.
  profileDescription.textContent = editDescription.value; // guarda el valor del formulario en el perfil.

  closeModal(editPopupModal); //Cierra la ventana del formulario de edicion.
}

export function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const data = {
    name: editCardName.value,
    link: editCardLink.value,
  };

  const card = new Card(data, "#card__template");
  const cardElement = card.getElement();

  cardContainer.prepend(cardElement);

  editCardName.value = "";
  editCardLink.value = "";

  closeModal(newCardModal);
}

export function closePopupOnOverlay(evt) {
  // Cierra la ventana del formulario o imagen abierta al hacer click fuera de estas.
  if (evt.target === evt.currentTarget) {
    // Comprueba si la zona donde se hace click es la ventana abierta o no.
    closeAllErrorMessages();
    closeModal(evt.target); // Cierra el formulario o la imagen abierta.
  }
}
