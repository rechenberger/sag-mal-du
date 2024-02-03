import fs from 'fs'
import { concatMp3 } from './concatMp3'

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

  const result = await concatMp3({
    inputFiles,
    outputFile,
  })

  // Download the file
  const response = await fetch(result.url)
  const buffer = await response.arrayBuffer()
  const bufferArray = new Uint8Array(buffer)
  fs.writeFileSync(filePath, bufferArray)

  return { url, filePath }
}
