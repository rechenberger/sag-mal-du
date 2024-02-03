import Transloadit from 'transloadit'

export async function concatAudio({ inputFiles }: { inputFiles: string[] }) {
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
  const assemblyCreated = await transloadit.createAssembly(options)
  const assemblyDone = await transloadit.awaitAssemblyCompletion(
    assemblyCreated.assembly_id,
    {},
  )

  const url = assemblyDone.results['concatenated-audio'][0].ssl_url as
    | string
    | undefined
  if (!url) {
    throw new Error('No url found')
  }

  return { url }
}
