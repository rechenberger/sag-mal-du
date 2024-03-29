import pLimit from 'p-limit'

const ELEVENLABS_MAX_CONCURRENCY = 3
const limit = pLimit(ELEVENLABS_MAX_CONCURRENCY)

export const textToSpeechElevenLabs = async ({
  text,
  voiceId,
}: {
  text: string
  voiceId: string
}) => {
  return limit(async () => {
    const tts_url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`
    const result = await fetch(tts_url, {
      method: 'POST',
      headers: {
        // accept: 'audio/mpeg',
        'xi-api-key': process.env.ELEVENLABS_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.4,
          similarity_boost: 0.75,
        },
      }),
    })

    if (result.ok === false) {
      throw new Error(await result.text())
    }

    // return await result.json()

    const blob = await result.blob()

    return {
      blob,
    }
  })
}
