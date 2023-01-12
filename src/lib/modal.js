export default class Modal {
  constructor() {
    this.modalElement = document.querySelector(".modal");
    this.titleElement = document.querySelector(".modal__title");
    this.contentElement = document.querySelector(".modal__content");
    this.modalCloseButtonElement = document.querySelector(".modal .closeButton");

    this.listenCloseEvent();
  }

  onModal() {
    this.modalElement.classList.remove("hidden");
  }

  offModal() {
    this.modalElement.classList.add("hidden");
  }

  renderModal(title, content) {
    this.titleElement.innerHTML = title;
    this.contentElement.innerHTML = content;
  }

  listenCloseEvent() {
    this.modalCloseButtonElement.addEventListener("click", () => {
      this.offModal();
    });

    this.modalCloseButtonElement.addEventListener("mouseover", (e) => {
      e.preventDefault();
      this.modalCloseButtonElement.classList.add("animate");

      setTimeout(() => {
        this.modalCloseButtonElement.classList.remove("animate");
      }, 600); // 1s = 1000ms
    });
  }
}
