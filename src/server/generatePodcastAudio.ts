import { concatAudioCached } from './concatAudioCached'
import { PodcastWithDescription } from './generatePodcastDescription'
import { textToSpeech } from './textToSpeech'

export const generatePodcastAudio = async ({
  podcast,
}: {
  podcast: PodcastWithDescription
}) => {
  const scriptWithAudio = await Promise.all(
    podcast.script.map(async (a, idx) => {
      const host = podcast.hosts.find((h) => h.name === a.name)
      const audio = await textToSpeech({
        text: a.message,
        voiceId:
          host?.voice === 'female'
            ? process.env.ELEVENLABS_VOICE_ID_FEMALE!
            : process.env.ELEVENLABS_VOICE_ID_MALE!,
        path: `${podcast.id}-part${idx.toString().padStart(3, '0')}`,
      })
      return { ...a, audio }
    }),
  )

  const concatResult = await concatAudioCached({
    inputFiles: scriptWithAudio.map((a) => a.audio.filePath),
    outputFile: `${podcast.id}`,
  })

  const podcastWithAudio = {
    ...podcast,
    script: scriptWithAudio,
    audio: concatResult,
  }

  return podcastWithAudio
}
export type PodcastWithAudio = Awaited<ReturnType<typeof generatePodcastAudio>>
