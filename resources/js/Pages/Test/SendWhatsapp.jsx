import { useState } from 'react'
import axios from 'axios'

export default function SendWhatsapp() {
  const [to, setTo] = useState('')
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)

  const send = async (url) => {
    setLoading(true)
    setResponse(null)

    try {
      const res = await axios.post(url, { to, message })
      setResponse(res.data.message)
    } catch (error) {
      setResponse(error.response?.data?.error || 'Erreur lors de l’envoi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Envoyer un message</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3">
          <label>Numéro (ex: +22995029745)</label>
          <input
            type="text"
            className="form-control"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="+229XXXXXXXXX"
            required
          />
        </div>
        <div className="mb-3">
          <label>Message</label>
          <textarea
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Entrez le message"
            required
          ></textarea>
        </div>

        <div className="d-flex gap-3">
          <button
            className="btn btn-success"
            type="button"
            onClick={() => send('/test/send-whatsapp')}
            disabled={loading}
          >
            {loading ? 'Envoi WhatsApp...' : 'Envoyer WhatsApp'}
          </button>

          <button
            className="btn btn-primary"
            type="button"
            onClick={() => send('/test/send-sms')}
            disabled={loading}
          >
            {loading ? 'Envoi SMS...' : 'Envoyer SMS'}
          </button>
        </div>
      </form>

      {response && <div className="alert alert-info mt-4">{response}</div>}
    </div>
  )
}
