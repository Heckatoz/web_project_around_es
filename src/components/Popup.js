export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._setEventListeners();
  }
  open() {
    this._popup.classList.add("popup_is-opened"); // Agrega al elemento designado la clase que le permite desplegarse en la pagina
    document.addEventListener("keydown", this._handleEscClose);
  }
  close() {
    this._popup.classList.remove("popup_is-opened"); // Remueve del elemento designado la clase que le permite desplegarse en la pagina
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    // Revisa si se presiona una tecla al estar navegando en la pagina.
    if (evt.key === "Escape" && this._popup) {
      this.close(); // Cierra el formulario o imagen desplegada.
    }
  }

  _setEventListeners() {
    this._popup.querySelector(".popup__close").addEventListener("click", () => {
      this.close();
    });
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
  }
}
