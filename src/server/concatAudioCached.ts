import fs from 'fs'
import { concatAudio } from './concatAudio'

export async function concatAudioCached({
  inputFiles,
  outputFile,
}: {
  inputFiles: string[]
  outputFile: string
}) {
  const relativePath = `audio/${outputFile}.mp3`
  const filePath = `public/${relativePath}`
  const url = `/${relativePath}`

  if (fs.existsSync(filePath)) {
    return { url, filePath }
  }

  const result = await concatAudio({
    inputFiles,
  })

  // Download the file
  const response = await fetch(result.url)
  const buffer = await response.arrayBuffer()
  const bufferArray = new Uint8Array(buffer)
  fs.writeFileSync(filePath, bufferArray)

  return { url, filePath }
}
