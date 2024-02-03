import { generatePodcastAudio } from './generatePodcastAudio'
import { generatePodcastDescription } from './generatePodcastDescription'
import { generatePodcastImage } from './generatePodcastImage'
import { generatePodcastScript } from './generatePodcastScript'
import { getPodcastInputs } from './podcastInputs'

export const generatePodcasts = async () => {
  const podcastsRaw = await getPodcastInputs()
  const podcastsWithScripts = await Promise.all(
    podcastsRaw.map((podcast) => generatePodcastScript({ podcast })),
  )
  const podcastsWithDescriptions = await Promise.all(
    podcastsWithScripts.map((podcast) =>
      generatePodcastDescription({ podcast }),
    ),
  )
  const podcastsWithAudio = await Promise.all(
    podcastsWithDescriptions.map((podcast) =>
      generatePodcastAudio({ podcast }),
    ),
  )
  const podcastsWithImage = await Promise.all(
    podcastsWithAudio.map((podcast) => generatePodcastImage({ podcast })),
  )
  return podcastsWithImage
}
