import { fetchTeampilot } from '@teampilot/sdk'
import { PodcastWithAudio } from './generatePodcastAudio'

export const generatePodcastImage = async ({
  podcast,
}: {
  podcast: PodcastWithAudio
}) => {
  const result = await fetchTeampilot({
    message: `Generate an image for the podcast episode "${podcast.title}". It's an AI-Generated podcast so it would be funny if our female Robot Podcast Host is in the foreground of the image doing something fitting to the project. Also give her an engaging facial expression like in a click-bait Youtube thumbnail. Be sure to not include Text in the image! Also make it have a square aspect ratio. \n\nThe description for the podcast is:\n${podcast.description}`,
    launchpadSlugId: process.env.TEAMPILOT_IMAGE_LAUNCHPAD_SLUG_ID,
  })

  const imageUrl = result.mediaAttachments?.find((m) => m.type === 'IMAGE')?.url

  return {
    ...podcast,
    imageUrl,
  }
}

export type PodcastWithImage = Awaited<ReturnType<typeof generatePodcastImage>>
