var loader = document.querySelector("div.loader")

window.addEventListener("load", vanish)

function vanish() {
    loader.classList.add("disappear")
}