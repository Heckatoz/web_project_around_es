export default class UserInfo {
  constructor(userSelectors) {
    // Aquí guardas los selectores que recibes
    this._nameElement = document.querySelector(userSelectors.nameSelector);
    this._jobElement = document.querySelector(userSelectors.jobSelector);
  }
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._jobElement.textContent,
    };
  }

  setUserInfo(userData) {
    this._nameElement.textContent = userData.name;
    this._jobElement.textContent = userData.description;
  }
}
