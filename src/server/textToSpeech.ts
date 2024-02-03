import { textToSpeechElevenLabs } from '@/lib/elevenlabs'
import fs from 'fs'

export const textToSpeech = async ({
  text,
  voiceId,
  path,
}: {
  text: string
  voiceId: string
  path: string
}) => {
  const relativePath = `audio/${path}.mp3`
  const filePath = `public/${relativePath}`
  const url = `/${relativePath}`

  if (fs.existsSync(filePath)) {
    return { url, filePath }
  }

  const { blob } = await textToSpeechElevenLabs({
    text,
    voiceId,
  })

  const buffer = await blob.arrayBuffer()
  const bufferArray = new Uint8Array(buffer)
  fs.writeFileSync(filePath, bufferArray)

  return { url, filePath }
}
