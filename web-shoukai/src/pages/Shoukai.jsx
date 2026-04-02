import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

function Shoukai() {
  return (
    <>
      <div className="hero">
        <h1>Web班 紹介サイト</h1>
        <img src="/src/assets/main.jpg" alt="Web班メイン画像" />
      </div>

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
          <SwiperSlide>
            <h2>1</h2>
          </SwiperSlide>
          <SwiperSlide>
            <h2>2</h2>
          </SwiperSlide>
          <SwiperSlide>
            <h2>3</h2>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  )
}

export default Shoukai
