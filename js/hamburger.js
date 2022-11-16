const hamburguer = document.querySelector(" #hamburguer");
const close = document.querySelector("#close");
const menu = document.querySelector(".nav");

hamburguer.addEventListener('click', ()=>{
    menu.classList.toggle("mostrar-menu")
});

close.addEventListener('click', ()=>{
    menu.classList.toggle("mostrar-menu")
});
