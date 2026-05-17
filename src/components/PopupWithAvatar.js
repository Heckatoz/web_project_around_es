import Popup from "./Popup.js";

export default class PopupWithAvatar extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

    this._form = this._popup.querySelector(".popup__form");
    this._submitButton = this._form.querySelector(".popup__button");
    this._originalButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputList = this._popup.querySelectorAll(".popup__input");
    const formValues = {};

    inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Guardando...";
    } else {
      this._submitButton.textContent = this._originalButtonText;
    }
  }

  setEventListeners() {
    super._setEventListeners(); // Eventos del padre (cerrar popup)

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      if (this._handleSubmitAction) {
        this._handleSubmitAction();
      }
      // Recopilar datos del formulario
      const formData = this._getInputValues();

      // Ejecutar el callback con los datos
      this._handleFormSubmit(formData);
    });
  }
  open(userData) {
    if (userData) {
      this._form.avatar.value = userData.avatar;
    }

    super.open();
  }
  close() {
    super.close();
    this._form.reset();
  }

  setSubmitAction(action) {
    this._handleSubmitAction = action;
  }
}
