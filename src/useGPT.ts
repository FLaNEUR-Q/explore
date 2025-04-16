import { useState } from 'react'
import axios from 'axios'

export function useGPT() {
  const [loading, setLoading] = useState(false)

  const search = async (keyword) => {
    setLoading(true)
    try {
      const res = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: `Summarize and give related terms for: ${keyword}` }]
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        }
      })
      const message = res.data.choices[0].message.content
      const [summary, keywords] = message.split('\n').map(s => s.trim())
      return { summary, keywords: keywords?.split(',') || [] }
    } catch (err) {
      console.error(err)
      return { summary: '', keywords: [] }
    } finally {
      setLoading(false)
    }
  }

  return { search, loading }
}
