const openbtn = document.getElementById('open')
const side = document.querySelector('.side')
const main = document.querySelector('main')
const sidebtn = document.getElementById('sidebtn')
const linkIdx = document.querySelector('.linkIdx')

const swiper = new Swiper(".swiper", {
    loop: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
})

openbtn.addEventListener('click', () => {
    side.classList.toggle('hide')
    if (openbtn.textContent == ">") {
        openbtn.textContent = "<"
    } else {
        openbtn.textContent = ">"
    }
})


sidebtn.addEventListener('click', () => {
    linkIdx.classList.toggle('hide')
})

document.querySelectorAll('.question').forEach(e => {
    e.addEventListener('click', () => {
        const answer = e.querySelector('.answer')
        answer.classList.toggle('active')
    })
});






