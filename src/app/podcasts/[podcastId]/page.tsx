import { LocalDate } from '@/components/demo/LocalDateTime'
import { cn } from '@/lib/utils'
import { getPodcast, getPodcasts } from '@/server/podcasts'
import { Metadata, ResolvingMetadata } from 'next'
import Image from 'next/image'
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
    openGraph: {
      type: 'article',
      images: podcast.imageUrl ? [{ url: podcast.imageUrl }] : [],
      title: podcast.title,
      description: podcast.description,
    },
  }
}

export default async function Page({ params }: PageProps) {
  const podcast = await getPodcast(params.podcastId)
  if (!podcast) return notFound()

  return (
    <>
      <article className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {podcast.imageUrl && (
            <div className={cn('aspect-square relative w-full md:h-64')}>
              <Image
                src={podcast.imageUrl}
                alt={podcast.title}
                fill
                // className="max-md:h-20 max-md:w-20"
              />
            </div>
          )}
          <div className="flex flex-col gap-4">
            <div>
              <div className="text-muted-foreground">
                Episode {podcast.episodeNumber}
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">
                {podcast.title}
              </h1>
              <div className="text-muted-foreground">
                <LocalDate datetime={podcast.date} />
              </div>
            </div>
            <p className="text-sm line-clamp-5">
              <>{podcast.description}</>
            </p>
            <div>
              <audio controls src={podcast.audio.url} />
            </div>
          </div>
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
