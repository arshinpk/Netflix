import { useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import Youtube from 'react-youtube'
import './TrailerModal.css'

function TrailerModal({ videoId, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  const opts = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 1,
      fs: 1,
      modestbranding: 1,
    },
  }

  return (
    <div className="trailer-modal" onClick={onClose} role="dialog" aria-modal="true">
      <button
        type="button"
        className="trailer-modal__back"
        onClick={onClose}
        aria-label="Close trailer"
      >
        <FaArrowLeft className="trailer-modal__back-icon" aria-hidden="true" />
        <span>Back</span>
      </button>
      <div
        className="trailer-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <Youtube videoId={videoId} opts={opts} className="trailer-modal__player" />
      </div>
    </div>
  )
}

export default TrailerModal
