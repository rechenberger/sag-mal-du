import { generatePodcasts } from './generatePodcasts'

export const getPodcasts = async () => {
  return generatePodcasts()
}

export const getPodcast = async (id: string) => {
  const podcasts = await getPodcasts()
  return podcasts.find((p) => p.id === id)
}
