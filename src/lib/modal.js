export default class Modal {
  #animationTime = 600;
  constructor() {
    this.modalElement = document.getElementById("modal");
    this.titleElement = document.getElementById("modal__title");
    this.contentElement = document.getElementById("modal__content");
    this.modalCloseButtonElement = document.getElementById("modal__closeButton");

    this.listenCloseEvent();
  }

  showModal() {
    this.modalElement.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  hideModal() {
    this.modalElement.classList.add("hidden");
    document.body.style.overflow = "auto";
  }

  renderModal(title, content) {
    this.titleElement.innerHTML = title;
    this.contentElement.innerHTML = content;
    this.showModal();
  }

  listenCloseEvent() {
    this.modalCloseButtonElement.addEventListener("click", () => {
      this.hideModal();
    });

    this.modalCloseButtonElement.addEventListener("mouseover", (e) => {
      e.preventDefault();
      this.modalCloseButtonElement.classList.add("animate");

      setTimeout(() => {
        this.modalCloseButtonElement.classList.remove("animate");
      }, this.#animationTime); // 1s = 1000ms
    });
  }
}
