import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import './App.css'

const HEADER_MIN_WIDTH = 300
const HEADER_HIDE_THRESHOLD_OFFSET = 100

function App() {
  const [isLinksScrolled, setIsLinksScrolled] = useState(false)
  const [activeQuestion, setActiveQuestion] = useState(null)
  const [headerWidth, setHeaderWidth] = useState(HEADER_MIN_WIDTH)
  const [footerHeight, setFooterHeight] = useState(null)
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth)
  const [isHeaderResizing, setIsHeaderResizing] = useState(false)
  const [isFooterResizing, setIsFooterResizing] = useState(false)

  useEffect(() => {
    const headerResize = document.getElementById('header-resize')
    const footerResize = document.getElementById('footer-resize')

    if (!headerResize || !footerResize) {
      return undefined
    }

    const onHeaderMouseDown = () => {
      setIsHeaderResizing(true)

      const onMove = (event) => {
        const maxWidth = window.innerWidth * 0.2
        const hideThreshold = HEADER_MIN_WIDTH - HEADER_HIDE_THRESHOLD_OFFSET
        const minVisibleWidth = Math.min(HEADER_MIN_WIDTH, maxWidth)
        let newWidth = event.clientX

        if (newWidth > maxWidth) newWidth = maxWidth
        if (newWidth <= hideThreshold) {
          newWidth = 0
        } else if (newWidth < minVisibleWidth) {
          newWidth = minVisibleWidth
        }

        setHeaderWidth(newWidth)
      }

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMove)
        setIsHeaderResizing(false)
      }

      document.addEventListener('mousemove', onMove)
      document.addEventListener('mouseup', onMouseUp, { once: true })
    }

    const onFooterMouseDown = () => {
      setIsFooterResizing(true)

      const onMove = (event) => {
        const vh = window.innerHeight
        let newHeight = vh - event.clientY
        const maxHeight = vh * 0.3

        if (newHeight > maxHeight) newHeight = maxHeight
        if (newHeight < 6) newHeight = 6

        setFooterHeight(newHeight)
      }

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMove)
        setIsFooterResizing(false)
      }

      document.addEventListener('mousemove', onMove)
      document.addEventListener('mouseup', onMouseUp, { once: true })
    }

    const onWindowResize = () => {
      setViewportWidth(window.innerWidth)

      const maxWidth = window.innerWidth * 0.2
      setHeaderWidth((prev) => {
        if (prev === 0) {
          return 0
        }

        return Math.min(prev, maxWidth)
      })
    }

    headerResize.addEventListener('mousedown', onHeaderMouseDown)
    footerResize.addEventListener('mousedown', onFooterMouseDown)
    window.addEventListener('resize', onWindowResize)

    return () => {
      headerResize.removeEventListener('mousedown', onHeaderMouseDown)
      footerResize.removeEventListener('mousedown', onFooterMouseDown)
      window.removeEventListener('resize', onWindowResize)
    }
  }, [])

  const questions = [
    {
      question: 'Q: プログラミングやったことなくてもでも大丈夫？',
      answer: 'A: もちろん、やる気さえあれば、初心者でも大歓迎',
    },
    {
      question: 'Q: どんな技術を使うの？',
      answer: 'A: HTML,CSS,JavaScript,PHPなど',
    },
    {
      question: 'Q:Web班に向いている人は？',
      answer: 'A: 何か作るのが好きな人　パソコン触るのが好きな人',
    },
    {
      question: 'Q: 先輩方は優しい？',
      answer: 'A: たぶん、おそらく優しいと思われます',
    },
  ]

  const footerWidth = Math.max(viewportWidth - headerWidth, 0)
  const headerStyle = { width: `${headerWidth}px` }
  const mainStyle = {
    marginLeft: `${headerWidth}px`,
    paddingBottom: footerHeight ? `${footerHeight}px` : undefined,
  }
  const footerStyle = {
    left: `${headerWidth}px`,
    width: `${footerWidth}px`,
    height: footerHeight ? `${footerHeight}px` : undefined,
  }

  return (
    <>
      <header id="header" style={headerStyle}>
        <div
          id="header-resize"
          className={isHeaderResizing ? 'active' : ''}
        ></div>
        <div id="sidebtn" onClick={() => setIsLinksScrolled((prev) => !prev)}>
          <div className="key">&gt;</div> リンク表示
        </div>
        <div className="slideWrapper">
          <div className={`links ${isLinksScrolled ? 'scrolled' : ''}`}>
            <a href="#gaiyou">活動内容</a>
            <a href="#qa">Q&amp;A</a>
            <a href="#sakuhin">作品紹介</a>
          </div>
          <div className={`links ${isLinksScrolled ? 'scrolled' : ''}`}>
            <a href="https://aichi-te.aichi-c.ed.jp/" target="_blank" rel="noreferrer">
              学校ホームページ
            </a>
            <a href="https://www.aichi-te-ad.jp/" target="_blank" rel="noreferrer">
              専攻科ホームページ
            </a>
            <a href="">Stem研究部ホームページ</a>
          </div>
        </div>
      </header>

      <main id="main" style={mainStyle}>
        <div className="hero">
          <h1>Web班 紹介サイト</h1>
          <img src="/images/main.jpg" alt="Web班メイン画像" />
        </div>

        <div className="content gaiyou" id="gaiyou">
          <div className="dev left">
            <h2>活動内容</h2>
            <h3>主にやっていること</h3>
            <div>webサイト、webアプリの制作(webでできることは何をしてもOK)</div>
            <h3>面白いところ</h3>
            <div>自由度が高い！</div>
            <h3>班の目標</h3>
            <div>世界大会に出場！</div>
          </div>
          <div className="right">
            <img src="/images/cb31bb2ce4cbb8de9a160220de2e633e_t.jpeg" alt="活動写真" />
          </div>
        </div>

        <div className="content questions" id="qa">
          <h2>Q&amp;A</h2>
          <div className="qanda">
            {questions.map((item, index) => (
              <div
                key={item.question}
                className="question"
                onClick={() =>
                  setActiveQuestion((prev) => (prev === index ? null : index))
                }
              >
                {item.question}
                <div className={`answer ${activeQuestion === index ? 'active' : ''}`}>
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="content taikai">
          <h2>大会での実績</h2>
        </div>

        <div className="content sakuhin" id="sakuhin">
          <h2>作品紹介</h2>
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
      </main>

      <footer id="footer" style={footerStyle}>
        <div
          id="footer-resize"
          className={isFooterResizing ? 'active' : ''}
        ></div>
        <div className="terminal">
          <input type="text" className="command" placeholder="メッセージ" />
          <span className="prompt"></span>
        </div>
      </footer>
    </>
  )
}

export default App
