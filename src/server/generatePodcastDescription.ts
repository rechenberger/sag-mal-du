import { fetchTeampilotText } from '@teampilot/sdk'
import { PodcastWithScript } from './generatePodcastScript'

export const generatePodcastDescription = async ({
  podcast,
}: {
  podcast: PodcastWithScript
}) => {
  const description = await fetchTeampilotText({
    message: `Write a short teaser description for the following Podcast episode in the podcasts language: \n\`\`\`json\n${JSON.stringify(
      {
        title: podcast.title,
        language: podcast.language,
        hosts: podcast.hosts,
        date: podcast.date,
        script: podcast.script,
      },
      null,
      2,
    )}\n\`\`\``,
  })

  return {
    ...podcast,
    description,
  }
}

export type PodcastWithDescription = Awaited<
  ReturnType<typeof generatePodcastDescription>
>
