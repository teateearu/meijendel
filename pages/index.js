import { useEffect, useState, useRef } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const video1 = useRef(null)
  const video2 = useRef(null)
  const video3 = useRef(null)
  const unmuteRef = useRef(null)
  const video1Element = useRef(null)
  const video2Element = useRef(null)
  const video3Element = useRef(null)

  const [activeVideo, setActiveVideo] = useState(1)
  const random = Math.floor(Math.random() * (1196 - 0 + 1)) + 0

  // check if is mobile

  useEffect(() => {
    console.log(random)
    const script = document.createElement('script')

    script.src = 'https://player.vimeo.com/api/player.js'
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  useEffect(() => {
    document.body.onkeyup = function (e) {
      if (e.key == ' ' || e.code == 'Space') {
        if (activeVideo === 1) {
          setActiveVideo(2)
          mute(video1Element.current)
          unmute(video2Element.current)
        } else if (activeVideo === 2) {
          setActiveVideo(3)
          mute(video2Element.current)
          unmute(video3Element.current)
        } else if (activeVideo === 3) {
          setActiveVideo(1)
          mute(video3Element.current)
          unmute(video1Element.current)
        }
      }
    }
  })

  function unmute(videoEl) {
    const player = new Vimeo.Player(videoEl)
    player.setMuted(false)
    unmuteRef.current.style.display = 'none'
  }

  function mute(videoEl) {
    const player = new Vimeo.Player(videoEl)
    player.setMuted(true)
  }

  return (
    <div className={styles.container}>
      <div
        ref={unmuteRef}
        onClick={() => unmute(video1Element.current)}
        className={styles.startScreen}
      >
        <h1>Meijendel to Wassenaarseslag: 00.40-1am</h1>
        <p>Press space bar / tap to change view</p>
        <p>Click anywhere to begin</p>
      </div>
      <div
        className={styles.iframeWrapper}
        ref={video1}
        style={{ opacity: activeVideo === 1 ? 1 : 0 }}
      >
        <iframe
          ref={video1Element}
          src={`https://player.vimeo.com/video/734126534?background=1&autoplay=1&loop=1&byline=0&title=0#t=${random}s`}
          allowFullScreen
          allow='autoplay'
        ></iframe>
      </div>
      <div
        className={styles.iframeWrapper}
        ref={video2}
        style={{ opacity: activeVideo === 2 ? 1 : 0 }}
      >
        <iframe
          ref={video2Element}
          src={`https://player.vimeo.com/video/778786292?background=1&autoplay=1&loop=1&byline=0&title=0#t=${random}s`}
          allowFullScreen
          allow='autoplay'
        ></iframe>
      </div>
      <div
        className={styles.iframeWrapper}
        ref={video3}
        style={{ opacity: activeVideo === 3 ? 1 : 0 }}
      >
        <iframe
          ref={video3Element}
          src={`https://player.vimeo.com/video/778788949?background=1&autoplay=1&loop=1&byline=0&title=0#t=${random}s`}
          allowFullScreen
          allow='autoplay'
        ></iframe>
      </div>
    </div>
  )
}
