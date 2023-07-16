const wrapper = document.querySelector(".wrapper");
const form = wrapper.querySelector("form");
const formInp = form.querySelector("input");
const copyBtn = wrapper.querySelector(".copy-btn");
const closeBtn = wrapper.querySelector(".close-btn");

function fetchRequest(formData, file) {
  fetch("http://api.qrserver.com/v1/read-qr-code/", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => {
      wrapper.classList.add("active");
      form.querySelector("img").src = URL.createObjectURL(file);
      const data = result[0].symbol[0].data;
      const details = document.querySelector(".details");
      const textArea = details.querySelector("textarea");
      textArea.innerHTML = `${data}`;
    });
}

form.addEventListener("change", (e) => {
  let file = e.target.files[0];
  const formData = new FormData();
  formData.append("file", file);
  fetchRequest(formData, file);
});

copyBtn.addEventListener("click", () => {
  let text = wrapper.querySelector("textarea").innerHTML;
  navigator.clipboard.writeText(text);
});
form.addEventListener("click", () => formInp.click());

closeBtn.addEventListener("click", () => {
  wrapper.classList.remove("active");
});
