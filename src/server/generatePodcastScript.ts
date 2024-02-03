import { fetchTeampilotData } from '@teampilot/sdk'
import { omit } from 'lodash-es'
import { z } from 'zod'
import { PodcastInput } from './podcastInputs'

export const generatePodcastScript = async ({
  podcast,
}: {
  podcast: PodcastInput
}) => {
  const script = await fetchTeampilotData({
    message: `Write the script for the following Podcast: \n\`\`\`json\n${JSON.stringify(
      omit(podcast, ['episodeNumber']),
      null,
      2,
    )}\n\`\`\``,
    schema: z.array(
      z.object({
        name: z.enum(['Tristan', 'Lena']),
        role: z.enum(['moderator', 'expert']),
        message: z.string(),
      }),
    ),
  })
  return {
    ...podcast,
    script,
  }
}
export type PodcastWithScript = Awaited<
  ReturnType<typeof generatePodcastScript>
>
