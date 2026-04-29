import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__image");
    this._caption = this._popup.querySelector(".popup__caption");
  }
  open(imageData) {
    this._image.src = imageData.link;
    this._image.alt = imageData.name;
    this._caption.textContent = imageData.name;

    super.open();
  }
}
