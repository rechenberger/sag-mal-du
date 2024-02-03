import { LocalDate } from '@/components/demo/LocalDateTime'
import { getPodcast, getPodcasts } from '@/server/podcasts'
import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

type PageProps = { params: { podcastId: string } }

export const generateMetadata = async (
  { params }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const item = await getPodcast(params.podcastId)
  if (!item) return notFound()
  return {
    title: item.title,
  }
}

export default async function Page({ params }: PageProps) {
  const item = await getPodcast(params.podcastId)
  if (!item) return notFound()
  return (
    <>
      <article className="flex flex-col">
        <h1 className="mt-8 text-3xl">{item.title}</h1>
        <div className="mb-4">
          <LocalDate datetime={item.date} />
        </div>
        <p>
          <strong>{item.roughPlan}</strong>
        </p>
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
