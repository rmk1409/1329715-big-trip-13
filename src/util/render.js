import AbstractView from "../view/abstract-view";

const RenderPosition = {
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`,
  AFTER_END: `afterend`,
};

const render = (container, newElement, place) => {
  if (container instanceof AbstractView) {
    container = container.getElement();
  }

  if (newElement instanceof AbstractView) {
    newElement = newElement.getElement();
  }


  switch (place) {
    case RenderPosition.AFTER_END:
      container.parentNode.insertBefore(newElement, container.nextSibling);
      break;
    case RenderPosition.BEFORE_END:
      container.append(newElement);
      break;
    case RenderPosition.AFTER_BEGIN:
      container.prepend(newElement);
      break;
  }
};

const createElement = (template) => {
  const div = document.createElement(`div`);
  div.innerHTML = template;

  return div.firstChild;
};

const replace = (newChild, oldChild) => {
  if (newChild instanceof AbstractView) {
    newChild = newChild.getElement();
  }
  if (oldChild instanceof AbstractView) {
    oldChild = oldChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (!(parent && oldChild && newChild)) {
    throw new Error(`There is an unexciting element`);
  }

  parent.replaceChild(newChild, oldChild);
};

const remove = (component) => {
  if (!(component instanceof AbstractView)) {
    throw new Error(`Can remove only components`);
  }
  component.getElement().remove();
  component.removeElement();
};

export {render, createElement, replace, RenderPosition, remove};
