import { useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import './StreamModal.css'

function StreamModal({ embedUrl, onClose }) {
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

  return (
    <div
      className="stream-modal"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        className="stream-modal__back"
        onClick={onClose}
        aria-label="Close player"
      >
        <FaArrowLeft className="stream-modal__back-icon" aria-hidden="true" />
        <span>Back</span>
      </button>
      <div
        className="stream-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={embedUrl}
          title="Player"
          allowFullScreen
          referrerPolicy="origin"
          allow="autoplay; encrypted-media; picture-in-picture"
        />
      </div>
    </div>
  )
}

export default StreamModal
