import Transloadit from 'transloadit'

export async function concatMp3({
  inputFiles,
  outputFile,
}: {
  inputFiles: string[]
  outputFile: string
}): Promise<void> {
  const transloadit = new Transloadit({
    authKey: process.env.TRANSLOADIT_AUTH_KEY!,
    authSecret: process.env.TRANSLOADIT_AUTH_SECRET!,
  })

  // Set Encoding Instructions
  const options = {
    files: Object.fromEntries(
      inputFiles.map((file, index) => [
        `file_${index.toString().padStart(3, '0')}`,
        file,
      ]),
    ),
    params: {
      template_id: process.env.TRANSLOADIT_TEMPLATE_ID_CONCAT!,
    },
  }

  // Execute
  const result = await transloadit.createAssembly(options)

  console.log(result)
}

// Example usage
