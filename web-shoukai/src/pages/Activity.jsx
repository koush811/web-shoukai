function Activity() {
  return (
    <>
      <div className="hero">
        <h1>Web班 紹介サイト</h1>
        <img src="/src/assets/main.jpg" alt="Web班メイン画像" />
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
          <img src="/src/assets/cb31bb2ce4cbb8de9a160220de2e633e_t.jpeg" alt="活動写真" />
        </div>
      </div>
    </>
  )
}

export default Activity
