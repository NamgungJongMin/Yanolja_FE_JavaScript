import { getMember, addData, uploadImage } from '../../firebase/firebase.js';
import { loadData, editMode } from './render.js';

const urlData = location.href.split('?')[1];
const $form = document.getElementById('detail-form');
const $editButton = document.getElementById('edit-button');
const $editComplete = document.getElementById('edit-complete');
const $logout = document.getElementById('logout');

window.addEventListener('DOMContentLoaded', async e => {
  if (JSON.stringify(localStorage.getItem('isSignin')) === 'null') {
    location.replace('signin.html');
    return;
  }

  const receiveData = await getMember(urlData);

  await loadData($form, receiveData);
});

document.getElementById('user').addEventListener('click', e => {
  $logout.classList.toggle('hidden');
});

$editButton.addEventListener('click', async e => {
  e.preventDefault();

  const receiveData = await getMember(urlData);

  $editComplete.classList.remove('hidden');
  await editMode($form, receiveData);
});

$editComplete.addEventListener('click', async e => {
  e.preventDefault();

  const $profileImage = document.getElementById('profile-image');
  const receiveData = await getMember(urlData);
  const profileUrl = await uploadImage($form.email.value, $profileImage.files[0]);
  console.log($profileImage);

  await addData($form.person.value, $form.email.value, $form.contact.value, $form.division.value, profileUrl);

  location.replace(`detail.html?${$form.email.value}`);
});

document.getElementById('logout').addEventListener('click', e => {
  localStorage.removeItem('isSignin');
  location.replace('signin.html');
});
