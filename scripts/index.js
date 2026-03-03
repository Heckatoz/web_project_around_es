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

const editButton = document.querySelector(".profile__edit-button"); // Enlazar el boton para abrir la ventana para editar objetos en la pagina
const profileName = document.querySelector(".profile__title"); // Enlazar el nombre del perfil de la pagina.
const profileDescription = document.querySelector(".profile__description"); // Enlaza la descripcion de la persona del perfil de la pafina

const editPopupModal = document.querySelector("#edit-popup"); // Enlaza la ventana para edicion
const editCloseButton = editPopupModal.querySelector(".popup__close"); // Enlaza el boton para cerrar la ventana de edicion
const editName = editPopupModal.querySelector(".popup__input_type_name"); // Enlaza la caja de texto del nombre de la ventana de edicion
const editDescription = editPopupModal.querySelector(
  ".popup__input_type_description",
); // Enlaza la caja de texto de la descripcion de la ventana de edicion.
const formElement = document.querySelector(".popup__form"); // Enlaza el formulario que llevara los datos del perfil.
const cardTemplate = document.querySelector("#card__template"); // Enlaza la plantilla para cada publicacion que se hara.
const cardContainer = document.querySelector(".cards__list"); // Enlaza el espacio donde se guardan y listan las publicaciones.
const newCardButton = document.querySelector(".profile__add-button"); // Enlaza el boton para crear una nuva publicacion
const newCardModal = document.querySelector("#new-card-popup"); // Enlaza la plantilla para crear una nueva publicacion
const cardCloseButton = newCardModal.querySelector(".popup__close"); // Enlaza el boton para cerrar la ventana de edicion
const cardForm = document.querySelector("#new-card-form"); // Enlaza el formulario para crar una nueva publicacion
const cardName = document.querySelector("card__title"); // Enlaza el nombre de la nueva publicacion ya desplegada
const cardLink = document.querySelector("card__image"); // Enlaza el enlace de la publicacion ya desplegada
const editCardName = newCardModal.querySelector(".popup__input_type_card-name"); // Enlaza el espacio en el formulario del titulo o nombre
const editCardLink = newCardModal.querySelector(".popup__input_type_url"); // Enlaza el espacio en el formulario del enlace.
const imageModal = document.querySelector("#image-popup"); // Enlaza el despliegue del contenido de la publicacion al seleccionarla
const titleImageModal = imageModal.querySelector(".popup__caption"); // Enlaza el titulo de la publicacion desplegada
const linkImageModal = imageModal.querySelector(".popup__image"); // Enlaza el enlace de la imagen de la publicacion desplegada
const closeModalBtn = imageModal.querySelector(".popup__close"); // Enlaza el boton para cerrar el despliegue del contenido de la publicacion
const popupEdit = document.forms.popupEdit;
const inputsEdit = popupEdit.querySelectorAll(".popup__input");
const popupPlace = document.forms.popupPlace;
const inputsPlace = popupPlace.querySelectorAll(".popup__input");
const popupEditButton = popupEdit.querySelector(".popup__button-submit");
const popupPlaceButton = popupPlace.querySelector(".popup__button-submit");

function getCardElement(name, link) {
  // Toma la plantilla para publicacions y crea una publicacion con la informacion proporcionada.
  const cardElement = cardTemplate.content.cloneNode(true); // Crea una copia de la plantilla y la guarda en la variable cardElement
  const titleElement = cardElement.querySelector(".card__title"); // Enlaza la clase donde esta el titulo en la plantilla con una variable modificable
  const imageElement = cardElement.querySelector(".card__image"); // Enlaza la clase donde esta la imagen en la plantilla con una variable modificable

  titleElement.textContent = name; // Se rellena el contenido con la informacion proporcionada.
  imageElement.alt = name;
  imageElement.src = link;
  /* Esta funcion permite poner valores por defecto en caso de no introducir informacion, pero al usar validacion, no son necesarios.
  if (name != "") {
    // Si no se proporciona nombre en la publicacion, se rellena con contenido ya definido
    titleElement.textContent = name; // Se rellena el contenido con la informacion proporcionada.
    imageElement.alt = name;
  } else {
    titleElement.textContent = "Sin titulo"; // Se rellena el contenido con la informacion designada.
  }

  if (link != "") {
    // Si no se proporciona enlace a imagen en la publicacion, se rellena con contenido ya definido
    imageElement.src = link; // Se asigna el enlace a la propiedad correspondiente
  } else {
    imageElement.src = "./images/placeholder.jpg"; //Se asigna una imagen predeterminada en caso de no seleccionar una
    imageElement.alt = "Sin imagen";
  }
    */

  const cardLikeBtn = cardElement.querySelector(".card__like-button"); // Se asigna el boton de "me gusta" a la variable

  cardLikeBtn.addEventListener("click", function (evt) {
    // Se programa un evento click
    evt.target.classList.toggle("card__like-button_is-active"); // Al momento de hacer click en el boton "me gusta", se activa o desactiva la clase selecionada
  });

  const cardDeleteBtn = cardElement.querySelector(".card__delete-button"); // Enlaza el boton para eliminar una publicacion

  cardDeleteBtn.addEventListener("click", (evt) => {
    // Elimina el elemento card
    const cardToDelete = evt.target.closest(".card"); // Busca el elemento donde estaba el boton que se clickeo (publicacion a eliminar)

    cardToDelete.remove();
  });

  const cardImage = cardElement.querySelector(".card__image"); // Enlaza la imagen contenida en la publicacion

  cardImage.addEventListener("click", () => {
    // Despliega la imagen y el titulo al hacer click
    titleImageModal.textContent = titleElement.textContent;
    linkImageModal.src = imageElement.src;

    openModal(imageModal);
  });

  closeModalBtn.addEventListener("click", () => {
    // Cierra la imagen desplegada al hacer click
    closeModal(imageModal);
  });

  return cardElement; // Se regresa la plantilla nueva con la informacion ya asignada
}

function renderCard(name, link, cardContainer) {
  // Recibe las publicaciones y las incrusta en a variable que las despliega
  const cardElement = getCardElement(name, link); // Recupera la publicacion ya creada y la asigna a una variable

  cardContainer.prepend(cardElement); // Incluye la nueva publicacion al espacio donde de almacenan para desplegarlas en la pagina.
}

function openModal(Modal) {
  Modal.classList.add("popup_is-opened"); // Agrega al elemento designado la clase que le permite desplegarse en la pagina
}

function closeModal(Modal) {
  Modal.classList.remove("popup_is-opened"); // Remueve del elemento designado la clase que le permite desplegarse en la pagina
}

function fillProfileForm() {
  // Al momento de editar, toma los valores actuales y los despliega en el formulario

  editName.value = profileName.textContent;
  editDescription.value = profileDescription.textContent;

  return (editName, editDescription);
}

function handleOpenEditModal(Modal) {
  // Despliega la ventana para edicion con los valores actuales del perfil.
  fillProfileForm();
  openModal(Modal);
}

editButton.addEventListener("click", function () {
  // accion que actua al hacer click el el boton de editar
  handleOpenEditModal(editPopupModal);
});

editCloseButton.addEventListener("click", function () {
  // accion que actua al hacer click el el boton de cerrar
  inputsEdit.forEach((input) => {
    hideInputError(popupEdit, input);
  });
  closeModal(editPopupModal);
});

function handleProfileFormSubmit(evt) {
  // actua para guardar los nuevos datos del formulario para el perfil

  evt.preventDefault(); // evita que la pagina se recargue y los datos se pierdan IMPORTANTE

  profileName.textContent = editName.value; // guarda el valor del formulario en el perfil.
  profileDescription.textContent = editDescription.value; // guarda el valor del formulario en el perfil.

  closeModal(editPopupModal); //Cierra la ventana del formulario de edicion.
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  //cardName.textContent = editCardName.value;
  //cardLink.src = editCardLink.value;

  renderCard(editCardName.value, editCardLink.value, cardContainer);

  editCardName.value = "";
  editCardLink.value = "";

  closeModal(newCardModal);
}

newCardButton.addEventListener("click", function () {
  // accion que actua al hacer click el el boton de crear una nueva publicacion
  openModal(newCardModal);
});

cardCloseButton.addEventListener("click", function () {
  // accion que actua al hacer click el el boton de cerrar el formulario de la nueva publicacion.
  editCardName.value = "";
  editCardLink.value = "";
  inputsPlace.forEach((input) => {
    hideInputError(popupPlace, input);
  });
  closeModal(newCardModal);
});

formElement.addEventListener("submit", handleProfileFormSubmit); // accion que actua cuando se envia el formulario
cardForm.addEventListener("submit", handleCardFormSubmit); // accion que actua cuando se envia el formulario

initialCards.forEach((element) => {
  // Al iniciar la pagina, carga cada elemento detectado en el array "initialCards" con el formato ya especificado.
  renderCard(element.name, element.link, cardContainer);
});

function closeAllErrorMessages() {
  // Oculta todos los mensajes de error de los formularios.
  inputsEdit.forEach((input) => {
    // Revisa los campos del formulatio Edit Profile uno por uno.
    hideInputError(popupEdit, input); // Oculta los mensajes de error de este formulario.
    input.value = ""; // Borra el texto introducido por el usuario.
  });
  inputsPlace.forEach((input) => {
    // Revisa los campos del formulatio Create New Place uno por uno.
    hideInputError(popupPlace, input); // Oculta los mensajes de error de este formulario.
    input.value = ""; // Borra el texto introducido por el usuario.
  });
}

function showInputError(formElement, element, errorMessage) {
  // Despliega el mensaje de error en el campo cuyos requerimientos no se cumplen.
  const errorElement = formElement.querySelector(`.${element.id}-input-error`); // Guarda la clase donde se desplegara el mensaje de error en una variable.
  element.classList.add("popup__input_type_error"); // Agrega la clase que cambia el color del campo no validado.
  errorElement.textContent = errorMessage; // Guarda el mensaje por defecto generado por el error en el campo no validado.
  errorElement.classList.add("popup__input-error_active"); // Agrega la clase que cambia el color y tamaño del texto de error.
}

function hideInputError(formElement, element) {
  // Oculta el mensaje de error en el campo cuyos requerimientos no se cumplen.
  const errorElement = formElement.querySelector(`.${element.id}-input-error`); // Guarda la clase donde se desplegara el mensaje de error en una variable.
  element.classList.remove("popup__input_type_error"); // Remueve la clase que cambia el color del campo no validado.
  errorElement.textContent = ""; // Elimina el mensaje por defecto generado por el error en el campo no validado.
  errorElement.classList.remove("popup__input-error_active"); // Remueve la clase que cambia el color y tamaño del texto de error.
}

function toggleButtonState(inputs, popupButton) {
  // Habilita o deshabilita el boton para enviar, guardar o crear un perfil o una publicacion.
  const allValid = Array.from(inputs).every((input) => input.validity.valid); // Comprueba si todos los campos del formulario son validos.
  popupButton.disabled = !allValid; // Si todos los campos son validos, el atributo "disabled" se desactiva, sino se activa.
}

inputsEdit.forEach((input) => {
  // Accede a cada campo del formulario de editar perfil.
  input.addEventListener("input", () => {
    //Agrega el evento input, que reacciona al cambio de valores a tiempo real.
    if (!input.validity.valid) {
      // Revisa si el campo analizado esta todo validado o no.
      showInputError(popupEdit, input, input.validationMessage); // Activa la funcion showInputError
    } else {
      hideInputError(popupEdit, input); // Activa la funcion hideInputError
    }

    toggleButtonState(inputsEdit, popupEditButton); // Activa la funcion que habilita o deshabilita el boton.
  });
});

inputsPlace.forEach((input) => {
  // Accede a cada campo del formulario de crear publicacion.
  input.addEventListener("input", () => {
    //Agrega el evento input, que reacciona al cambio de valores a tiempo real.
    if (!input.validity.valid) {
      // Revisa si el campo analizado esta todo validado o no.
      showInputError(popupPlace, input, input.validationMessage); // Activa la funcion showInputError
    } else {
      hideInputError(popupPlace, input); // Activa la funcion hideInputError
    }

    toggleButtonState(inputsPlace, popupPlaceButton); // Activa la funcion que habilita o deshabilita el boton.
  });
});

function closePopupOnOverlay(evt) {
  // Cierra la ventana del formulario o imagen abierta al hacer click fuera de estas.
  if (evt.target === evt.currentTarget) {
    // Comprueba si la zona donde se hace click es la ventana abierta o no.
    closeAllErrorMessages();
    closeModal(evt.target); // Cierra el formulario o la imagen abierta.
  }
}

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
