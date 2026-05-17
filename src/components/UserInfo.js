export default class UserInfo {
  constructor(userSelectors) {
    // Aquí guardas los selectores que recibes
    this._nameElement = document.querySelector(userSelectors.nameSelector);
    this._jobElement = document.querySelector(userSelectors.jobSelector);
    this._avatarElement = document.querySelector(userSelectors.avatarSelector);
  }
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._jobElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  setUserInfo(userData) {
    if (userData.name) {
      this._nameElement.textContent = userData.name;
    }
    if (userData.description) {
      this._jobElement.textContent = userData.description;
    }
    if (userData.avatar) {
      this._avatarElement.src = userData.avatar;
    }
  }
}
