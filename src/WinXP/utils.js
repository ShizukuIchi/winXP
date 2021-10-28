import { debounce } from 'lodash';

export function setLocalStorage(name, item) {
  localStorage.setItem(name, JSON.stringify(item));
}

export function getLocalStorage(name) {
  const item = localStorage.getItem(name);
  return JSON.parse(item);
}

export const debouncedFunc = debounce(callback => {
  console.log('active');
  callback();
}, 1000);
