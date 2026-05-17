import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = document.querySelector(".popup__content-confirm");
    this._id;
  }

  open(cardData) {
    if (cardData) {
      this._id = cardData._id;
    }

    super.open();
  }
  close() {
    super.close();
  }

  setSubmitAction(action) {
    this._handleSubmitAction = action;
  }

  setEventListeners() {
    super._setEventListeners(); // Eventos del padre (cerrar popup)

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (this._handleSubmitAction) {
        this._handleSubmitAction();
      }
    });
  }
}
