const checkbox = document.querySelector("input[type='checkbox']");
const body = document.querySelector(".main-body");
const text_color = document.querySelector(".navbar-heading");
const button_text = document.querySelector(".btn-type");
const logo = document.querySelector(".fa-sun");
const logo_list = document.querySelector(".btn-logo");
const social_media_icons = document.querySelector(".social-media");

checkbox.addEventListener("click", () => {
    body.classList.toggle("bg-dark");
    text_color.classList.toggle("text-color-dark");
    button_text.classList.toggle("btn-type-dark");
    logo_list.classList.toggle("btn-type-dark");
    logo.classList.toggle("text-color-dark");
    social_media_icons.classList.toggle("text-color-dark");

    if (checkbox.checked) {
        logo.classList.remove("fa-sun");
        logo.classList.add("fa-moon");
        button_text.textContent = "Dark Mode";
    } else {
        logo.classList.remove("fa-moon");
        logo.classList.add("fa-sun");
        button_text.textContent = "Light Mode";
    }
});