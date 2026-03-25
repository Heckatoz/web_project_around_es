import { openModal, closeModal } from "./Utils.js";

class Card {
  constructor(data, cardSelector) {
    this._text = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;

    this._element = this._getTemplate();
    this._fillCardData();
    this._setEventListeners();
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true); // Crea una copia de la plantilla y la guarda en la variable cardElement

    return cardElement;
  }

  _fillCardData() {
    const titleElement = this._element.querySelector(".card__title"); // Enlaza la clase donde esta el titulo en la plantilla con una variable modificable
    const imageElement = this._element.querySelector(".card__image"); // Enlaza la clase donde esta la imagen en la plantilla con una variable modificable

    titleElement.textContent = this._text; // Se rellena el contenido con la informacion proporcionada.
    imageElement.alt = this._text;
    imageElement.src = this._link;
  }

  _setEventListeners() {
    const cardLikeBtn = this._element.querySelector(".card__like-button"); // Se asigna el boton de "me gusta" a la variable
    const cardDeleteBtn = this._element.querySelector(".card__delete-button"); // Enlaza el boton para eliminar una publicacion
    const imageElement = this._element.querySelector(".card__image");
    // Se asigna el boton de "me gusta" a la variable
    const imageModal = document.querySelector("#image-popup"); // Enlaza el despliegue del contenido de la publicacion al seleccionarla
    const titleImageModal = imageModal.querySelector(".popup__caption"); // Enlaza el titulo de la publicacion desplegada
    const linkImageModal = imageModal.querySelector(".popup__image"); // Enlaza el enlace de la imagen de la publicacion desplegada
    const closeModalBtn = imageModal.querySelector(".popup__close"); // Enlaza el boton para cerrar el despliegue del contenido de la publicacion

    cardLikeBtn.addEventListener("click", function (evt) {
      // Se programa un evento click
      evt.target.classList.toggle("card__like-button_is-active"); // Al momento de hacer click en el boton "me gusta", se activa o desactiva la clase selecionada
    });

    cardDeleteBtn.addEventListener("click", (evt) => {
      // Elimina el elemento card
      const cardToDelete = evt.target.closest(".card"); // Busca el elemento donde estaba el boton que se clickeo (publicacion a eliminar)

      cardToDelete.remove();
    });

    imageElement.addEventListener("click", () => {
      // Despliega la imagen y el titulo al hacer click
      titleImageModal.textContent = this._text;
      linkImageModal.src = this._link;
      linkImageModal.alt = this._text;

      openModal(imageModal);
    });

    closeModalBtn.addEventListener("click", () => {
      // Cierra la imagen desplegada al hacer click
      closeModal(imageModal);
    });
  }

  getElement() {
    return this._element; // Se regresa la plantilla nueva con la informacion ya asignada
  }
}

export default Card;
