const openbtn = document.getElementById('open')
const side = document.querySelector('.side')
const main = document.querySelector('main')

const swiper = new Swiper(".swiper",{
    loop: true,
    
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
})

openbtn.addEventListener('click',()=>{
    side.classList.toggle('hide')
    if(openbtn.textContent == ">"){
        openbtn.textContent = "<"
    }else{
        openbtn.textContent = ">"
    }
})

const sidebtn = document.getElementById('sidebtn')
const links = document.querySelector('.links')

sidebtn.addEventListener('click',()=>{
    links.classList.toggle('hide')
})


