import { useState } from 'react'

function QA() {
  const [activeQuestion, setActiveQuestion] = useState(null)

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

  return (
    <>
      <div className="hero">
        <h1>Web班 紹介サイト</h1>
        <img src="/src/assets/main.jpg" alt="Web班メイン画像" />
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
    </>
  )
}

export default QA
