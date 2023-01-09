const createRoot = (container) => {
  const dispatchDidUnmountedEvent = (node) => {
    node.dispatchEvent(new Event('did-unmounted'));
    node.childNodes.forEach(dispatchDidUnmountedEvent);
  };

  const dispatchDidMountedEvent = (node) => {
    node.childNodes.forEach(dispatchDidMountedEvent);
    node.dispatchEvent(new Event('did-mounted'));
  };

  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach(({removedNodes, addedNodes}) => {
      addedNodes.forEach(dispatchDidMountedEvent);
      removedNodes.forEach(dispatchDidUnmountedEvent);
    });
  });

  mutationObserver.observe(container, {childList: true, subtree: true});

  let currentElement = null;

  const render = (element) => {
    if (currentElement) container.removeChild(currentElement);
    currentElement = element;
    container.appendChild(currentElement);
  };

  const unmount = () => {
    if (currentElement) container.removeChild(currentElement);
    mutationObserver.disconnect();
  };

  return {render, unmount};
};

export default createRoot;
