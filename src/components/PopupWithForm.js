import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._formData = this._popup.querySelector(".popup__input");
  }

  _getInputValues() {
    const inputList = this._popup.querySelectorAll(".popup__input");
    const formValues = {};

    inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  setEventListeners() {
    super._setEventListeners(); // Eventos del padre (cerrar popup)

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      // Recopilar datos del formulario
      const formData = this._getInputValues();

      // Ejecutar el callback con los datos
      this._handleFormSubmit(formData);
    });
  }

  open(userData) {
    if (userData) {
      this._form.name.value = userData.name;
      this._form.description.value = userData.description;
    }

    super.open();
  }
  close() {
    super.close();
    this._form.reset();
  }
}
