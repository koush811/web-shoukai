import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import './App.css'

import Activity from './pages/Activity'
import QA from './pages/QA'
import Shoukai from './pages/Shoukai'

const HEADER_MIN_WIDTH = 300
const HEADER_HIDE_THRESHOLD_OFFSET = 100
const FOOTER_POSTS_STORAGE_KEY = 'FOOTER_POSTS'

function AppLayout() {
  const [headerWidth, setHeaderWidth] = useState(HEADER_MIN_WIDTH)
  const [footerHeight, setFooterHeight] = useState(null)
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth)
  const [isHeaderResizing, setIsHeaderResizing] = useState(false)
  const [isFooterResizing, setIsFooterResizing] = useState(false)
  const [nameInput, setNameInput] = useState('')
  const [messageInput, setMessageInput] = useState('')
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const savedPosts = localStorage.getItem(FOOTER_POSTS_STORAGE_KEY)

    if (!savedPosts) {
      return
    }

    try {
      const parsedPosts = JSON.parse(savedPosts)

      if (Array.isArray(parsedPosts)) {
        setPosts(parsedPosts)
      }
    } catch {
      setPosts([])
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(FOOTER_POSTS_STORAGE_KEY, JSON.stringify(posts))
  }, [posts])

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

  const submitPost = (event) => {
    event.preventDefault()

    const trimmedName = nameInput.trim()
    const trimmedMessage = messageInput.trim()

    if (!trimmedName || !trimmedMessage) {
      return
    }

    const newPost = {
      id: Date.now(),
      name: trimmedName,
      message: trimmedMessage,
    }

    setPosts((prev) => [...prev, newPost])
    setMessageInput('')
  }

  const deletePost = (postId) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId))
  }

  return (
    <>
      <header id="header" style={headerStyle}>
        <div
          id="header-resize"
          className={isHeaderResizing ? 'active' : ''}
        ></div>
        <nav className="header-nav">
          <div className="nav-section page-links">
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              活動内容
            </NavLink>
            <NavLink to="/qa" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Q&amp;A
            </NavLink>
            <NavLink to="/shoukai" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              作品紹介
            </NavLink>
          </div>
          <div className="nav-section external-links">
            <a href="https://aichi-te.aichi-c.ed.jp/" target="_blank" rel="noreferrer" className="nav-link">
              学校ホームページ
            </a>
            <a href="https://www.aichi-te-ad.jp/" target="_blank" rel="noreferrer" className="nav-link">
              専攻科ホームページ
            </a>
            <a href="#" className="nav-link">
              Stem研究部ホームページ
            </a>
          </div>
        </nav>
      </header>

      <main id="main" style={mainStyle}>
        <Routes>
          <Route path="/" element={<Activity />} />
          <Route path="/qa" element={<QA />} />
          <Route path="/shoukai" element={<Shoukai />} />
        </Routes>
      </main>

      <footer id="footer" style={footerStyle}>
        <div
          id="footer-resize"
          className={isFooterResizing ? 'active' : ''}
        ></div>
        <div className="terminal">
          <div className="posts">
            {posts.map((post) => (
              <div className="post-row" key={post.id}>
                <span className="post-text">
                  C:\stem\web-shoukai\ {post.name}&gt; {post.message}
                </span>
                <button
                  type="button"
                  className="delete-post"
                  onClick={() => deletePost(post.id)}
                >
                  "削除"
                </button>
              </div>
            ))}
          </div>

          <form className="command-form" onSubmit={submitPost}>
            <label className="command-label" htmlFor="name-input">
              名前:
            </label>
            <input
              id="name-input"
              type="text"
              className="command name-command"
              value={nameInput}
              onChange={(event) => setNameInput(event.target.value)}
              placeholder="名前"
            />
            <span className="prompt">&gt;</span>
            <label className="command-label" htmlFor="message-input">
              メッセージ:
            </label>
            <input
              id="message-input"
              type="text"
              className="command"
              value={messageInput}
              onChange={(event) => setMessageInput(event.target.value)}
              placeholder="メッセージ"
            />
            <button type="submit" className="send-post">
              "投稿"
            </button>
          </form>
        </div>
      </footer>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App


