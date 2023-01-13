import Swal from "sweetalert2";

class sweetAlert {
  showTimerAlert(title, timer) {
    let timerInterval;
    Swal.fire({
      title: `${title}`,
      html: "<div>I will close in <b></b> milliseconds.</div>",
      timer: timer,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    });
  }

  showErrorAlert(title) {
    Swal.fire({
      icon: "error",
      title: `${title}`,
      text: "",
      footer: "",
    });

    return false;
  }
}

export default new sweetAlert();
