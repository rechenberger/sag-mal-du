import { LocalDate } from '@/components/demo/LocalDateTime'
import { getPodcast, getPodcasts } from '@/server/podcasts'
import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

type PageProps = { params: { podcastId: string } }

export const generateMetadata = async (
  { params }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const podcast = await getPodcast(params.podcastId)
  if (!podcast) return notFound()
  return {
    title: podcast.title,
  }
}

export default async function Page({ params }: PageProps) {
  const podcast = await getPodcast(params.podcastId)
  if (!podcast) return notFound()

  return (
    <>
      <article className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl">{podcast.title}</h1>
          <div className="">
            <LocalDate datetime={podcast.date} />
          </div>
        </div>
        <p>
          <strong>{podcast.roughPlan}</strong>
        </p>
        <div>
          <audio controls src={podcast.audio.url} />
        </div>
        {/* {answersWithAudio.map((a, idx) => (
          <div key={idx} className="mt-4">
            <h2>{a.name}</h2>
            <h3>{a.role}</h3>
            <audio controls src={a.audio.url} />
            <p>{a.message}</p>
          </div>
        ))} */}
      </article>
    </>
  )
}

export async function generateStaticParams() {
  const podcasts = await getPodcasts()
  return podcasts.map((item) => ({
    podcastId: item.id,
  }))
}
