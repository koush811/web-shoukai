import HeroCanvas from '../components/HeroCanvas'

function Activity() {
  return (
    <>
      <HeroCanvas title="Web班 紹介サイト" />

      <div className="content gaiyou" id="gaiyou">
        <div className="dev left">
          <div className="markdown-content">
            <div className="markdown-line blue" data-heading="true"># 活動内容</div>
            <div className="markdown-line">- 主にやっていること</div>
            <div className="markdown-line">- webサイト、webアプリの制作(webでできることは何をしてもOK)</div>
            <div className="markdown-line"></div>
            <div className="markdown-line">- 面白いところ</div>
            <div className="markdown-line">- 自由度が高い！</div>
            <div className="markdown-line"></div>
            <div className="markdown-line">- 班の目標</div>
            <div className="markdown-line">- 世界大会に出場！</div>
          </div>
        </div>
        <div className="right">
          <img src="/src/assets/cb31bb2ce4cbb8de9a160220de2e633e_t.jpeg" alt="活動写真" />
        </div>
      </div>
    </>
  )
}

export default Activity
