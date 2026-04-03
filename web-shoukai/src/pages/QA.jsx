import { useState } from 'react'
import HeroCanvas from '../components/HeroCanvas'

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
      question: 'Q: Web班に向いている人は？',
      answer: 'A: 何か作るのが好きな人 パソコン触るのが好きな人',
    },
    {
      question: 'Q: 先輩方は優しい？',
      answer: 'A: たぶん、おそらく優しいと思われます',
    },
  ]

  return (
    <>
      <HeroCanvas title="Web班 紹介サイト" />

      <div className="content questions" id="qa">
        <div className="markdown-content">
          <div className="markdown-line blue" data-heading="true"># Q&A</div>
          {questions.map((item, index) => (
            <div key={item.question}>
              <button
                type="button"
                className="markdown-line qa-question-line"
                onClick={() => setActiveQuestion((prev) => (prev === index ? null : index))}
              >
                - {item.question}
              </button>
              {activeQuestion === index && (
                <div className="markdown-line qa-answer-line">- {item.answer}</div>
              )}
              <div className="markdown-line"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default QA
