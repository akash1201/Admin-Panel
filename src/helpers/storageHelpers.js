const setter = (key, value) => {
  localStorage.setItem(key, value);
};
const getter = key => {
  return localStorage.getItem(key);
};
const remover = key => {
  localStorage.removeItem(key);
};
const removeAll = () => {
  localStorage.clear();
};

export { setter, getter, remover, removeAll };
