import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import HeroCanvas from '../components/HeroCanvas'
import 'swiper/css'
import 'swiper/css/navigation'

function Shoukai() {
  return (
    <>
      <HeroCanvas title="Web班 紹介サイト" />

      <div className="content taikai">
        <div className="markdown-content">
          <div className="markdown-line blue" data-heading="true"># 大会での実績</div>
        </div>
      </div>

      <div className="content sakuhin" id="sakuhin">
        <div className="markdown-content">
          <div className="markdown-line blue" data-heading="true"># 作品紹介</div>
          <div className="markdown-line">- スライダーで表示する作品を切り替えることができます</div>
        </div>
        <Swiper
          modules={[Navigation]}
          navigation
          loop
          className="swiper"
          slidesPerView={1}
        >
          <SwiperSlide className='work-slide'>
            <h2>1</h2>
            <iframe src="https://hirorogo.github.io/openforge-mcp/" className='preview' frameBorder="0"></iframe>
            <a href="https://hirorogo.github.io/openforge-mcp/" target="_blank" rel="noopener noreferrer">
              別タブで開く
            </a>
          </SwiperSlide>
          <SwiperSlide className='work-slide'>
            <h2>2</h2>
            <iframe src="https://koush811.github.io/web/" className='preview' frameborder="0"></iframe>
            <a href="https://koush811.github.io/web/" target="_blank" rel="noopener noreferrer">
              別タブで開く
            </a>
          </SwiperSlide>
          <SwiperSlide className='work-slide'>
            <h2>3</h2>
            <iframe src="https://koush811.github.io/game/" className='preview' frameborder="0"></iframe>
            <a href="https://koush811.github.io/game/" target="_blank" rel="noopener noreferrer">
              別タブで開く
            </a>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  )
}

export default Shoukai
