import { api } from "../scripts/index.js";

class Card {
  constructor(data, cardSelector, handleCardClick, handleDeleteClick) {
    this._text = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;

    this._element = this._getTemplate();
    this._fillCardData();
    this.setEventListeners();
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true); // Crea una copia de la plantilla y la guarda en la variable cardElement

    return cardElement.querySelector(".card");
  }

  _fillCardData() {
    const titleElement = this._element.querySelector(".card__title"); // Enlaza la clase donde esta el titulo en la plantilla con una variable modificable
    const imageElement = this._element.querySelector(".card__image"); // Enlaza la clase donde esta la imagen en la plantilla con una variable modificable

    titleElement.textContent = this._text; // Se rellena el contenido con la informacion proporcionada.
    imageElement.alt = this._text;
    imageElement.src = this._link;

    if (this._isLiked) {
      this._element
        .querySelector(".card__like-button")
        .classList.add("card__like-button_is-active");
    }
  }

  setEventListeners() {
    const cardLikeBtn = this._element.querySelector(".card__like-button"); // Se asigna el boton de "me gusta" a la variable
    const cardDeleteBtn = this._element.querySelector(".card__delete-button"); // Enlaza el boton para eliminar una publicacion
    const imageElement = this._element.querySelector(".card__image");
    // Se asigna el boton de "me gusta" a la variable

    cardLikeBtn.addEventListener("click", (evt) => {
      // Se programa un evento click

      evt.target.classList.toggle("card__like-button_is-active"); // Al momento de hacer click en el boton "me gusta", se activa o desactiva la clase selecionada

      if (this._isLiked) {
        // Quitar me gusta con DELETE
        api
          .removeLike(this._id)
          .then(() => {
            this._isLiked = false;
          })
          .catch((err) => console.log(err));
      } else {
        // Agregar me gusta con PUT
        api
          .addLike(this._id)
          .then(() => {
            this._isLiked = true;
          })
          .catch((err) => console.log(err));
      }
    });

    cardDeleteBtn.addEventListener("click", (evt) => {
      // Elimina el elemento card
      evt.preventDefault();
      this._handleDeleteClick(this);
    });

    imageElement.addEventListener("click", () => {
      this._handleCardClick({ name: this._text, link: this._link });
    });
  }

  getElement() {
    return this._element; // Se regresa la plantilla nueva con la informacion ya asignada
  }
}

export default Card;
