import { LocalDate } from '@/components/demo/LocalDateTime'
import { getPodcast, getPodcasts } from '@/server/podcasts'
import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { Fragment } from 'react'

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
          <strong>{podcast.description}</strong>
        </p>
        <div>
          <audio controls src={podcast.audio.url} />
        </div>
        <hr className="my-8" />
        <h2 className="text-xl self-center">Transcript</h2>
        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-8 text-sm">
          {podcast.script.map((a, idx) => (
            <Fragment key={idx}>
              <div>
                <strong>{a.name}</strong>
                <div className="capitalize text-muted-foreground">{a.role}</div>
              </div>
              <div>
                <p className="italic">{a.message}</p>
                {/* <audio controls src={a.audio.url} /> */}
              </div>
            </Fragment>
          ))}
        </div>
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
