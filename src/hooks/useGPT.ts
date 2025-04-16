import axios from "axios"

export default async function useGPT(prompt: string) {
  const res = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `\"${prompt}\"를 중심으로 관련된 개념 5개와 간단한 요약을 알려줘. 배열로.` }],
      temperature: 0.7
    },
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  )

  const text = res.data.choices[0].message.content.trim()
  const concepts = []
  const lines = text.split("\n")
  for (const line of lines) {
    if (line.startsWith("-") || line.match(/^\d+[.)]/)) {
      concepts.push(line.replace(/^[-\d.) ]+/, "").trim())
    }
  }

  return {
    concepts,
    summary: text
  }
}