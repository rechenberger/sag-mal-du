import { generatePodcastAudio } from './generatePodcastAudio'
import { generatePodcastScript } from './generatePodcastScript'
import { getPodcastInputs } from './podcastInputs'

export const generatePodcasts = async () => {
  const podcastsRaw = await getPodcastInputs()
  const podcastsWithScripts = await Promise.all(
    podcastsRaw.map((podcast) => generatePodcastScript({ podcast })),
  )
  const podcastsWithAudio = await Promise.all(
    podcastsWithScripts.map((podcast) => generatePodcastAudio({ podcast })),
  )
  return podcastsWithAudio
}
