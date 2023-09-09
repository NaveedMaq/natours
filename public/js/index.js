/* eslint-disable */
import { login, logout } from './login';
import { displayMap } from './mapbox';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const form = document.querySelector('.form');
const logoutBtn = document.querySelector('.nav__el--logout');

// DELEGATION

if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (form)
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login(email, password);
  });

if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}
