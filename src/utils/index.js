const createElement = (html) => {
  const container = document.createElement('div');
  container.innerHTML = html;
  return container.children[0];
};

export {createElement};
