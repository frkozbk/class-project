import instance from '../instance';

const setAuthToken = token => {
  if (token) {
    // GÖNDERİCEĞİMİZ BÜTÜN  REQUEST LERİN HEADERINA TOKEN I EKLE
    instance.defaults.headers.Authorization = token;
  }
  // HEADERLARDAN TOKEN I SİL
  delete instance.defaults.headers.common.Authorization;
};
export default setAuthToken;
