const localStorage = window.localStorage;

const defaultSettings = {
  nodeAddr: 'http://localhost:8545',
  account: '',
};

const storage = {
  saveSettings(settings) {
    localStorage.settings = JSON.stringify(settings);
  },

  get settings() {
    try {
      return JSON.parse(localStorage.settings);
    } catch (e) {
      this.resetSettings();
      return defaultSettings;
    }
  },

  resetSettings() {
    this.saveSettings(defaultSettings);
  }

};

export default storage;
