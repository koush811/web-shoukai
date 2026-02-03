const openbtn = document.getElementById('open')
const side = document.querySelector('.side')


const swiper = new Swiper(".swiper",{
    loop: true,
    
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
})

const sidebtn = document.getElementById('sidebtn')
const links = document.querySelector('.links')

sidebtn.addEventListener('click',()=>{
    links.classList.toggle('hide')
})

document.querySelectorAll('.question').forEach(e => {
    e.addEventListener('click',()=>{
        const answer = e.querySelector('.answer')
        answer.classList.toggle('active')
    })
});

const header = document.getElementById('header')
const main = document.getElementById('main')
const footer = document.getElementById('footer')

const footerRerize = document.getElementById('footer-resize')
const headerRerize = document.getElementById('header-resize')

headerRerize.addEventListener('mousedown',()=>{
    const onMove = (e) =>{
        let wnew = e.clientX
        const wmax = window.innerWidth * 0.4

        if(wnew > wmax) wnew = wmax
        if(wnew < 300) wnew = 300

        header.style.width = `${wnew}px`
        main.style.marginLeft = `${wnew}px`
        footer.style.left = `${wnew}px`
        footer.style.width = `calc(100vw - ${wnew}px)`
    }
    document.addEventListener('mousemove', onMove)
    
    document.addEventListener('mouseup',()=>{
        document.removeEventListener('mousemove',onMove)
    },{once: true})
})

footerRerize.addEventListener('mousedown', () => {
  const onMove = (e) => {
    const vh = window.innerHeight
    let newHeight = vh - e.clientY
    const maxHeight = vh * 0.3

    if (newHeight > maxHeight) newHeight = maxHeight
    if (newHeight < 6) newHeight = 6

    footer.style.height = newHeight + 'px'
    main.style.marginBottom = newHeight + 'px'
  }

  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', onMove)
  }, { once: true })
})






