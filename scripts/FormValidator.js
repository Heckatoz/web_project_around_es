class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector),
    );
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector,
    );
  }

  showInputError(inputElement, errorMessage) {
    // Despliega el mensaje de error en el campo cuyos requerimientos no se cumplen.
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-input-error`,
    ); // Guarda la clase donde se desplegara el mensaje de error en una variable.
    inputElement.classList.add(this._config.inputErrorClass); // Agrega la clase que cambia el color del campo no validado.
    errorElement.textContent = errorMessage; // Guarda el mensaje por defecto generado por el error en el campo no validado.
    errorElement.classList.add(this._config.errorClass); // Agrega la clase que cambia el color y tamaño del texto de error.
  }

  hideInputError(inputElement) {
    // Oculta el mensaje de error en el campo cuyos requerimientos no se cumplen.
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-input-error`,
    ); // Guarda la clase donde se desplegara el mensaje de error en una variable.
    inputElement.classList.remove("popup__input_type_error"); // Remueve la clase que cambia el color del campo no validado.
    errorElement.textContent = ""; // Elimina el mensaje por defecto generado por el error en el campo no validado.
    errorElement.classList.remove("popup__input-error_active"); // Remueve la clase que cambia el color y tamaño del texto de error.
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      // Revisa si el campo analizado esta todo validado o no.
      this.showInputError(inputElement, inputElement.validationMessage); // Activa la funcion showInputError
    } else {
      this.hideInputError(inputElement); // Activa la funcion hideInputError
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export default FormValidator;
