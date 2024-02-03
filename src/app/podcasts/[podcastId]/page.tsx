import { LocalDate } from '@/components/demo/LocalDateTime'
import { getPodcast, getPodcasts } from '@/server/podcasts'
import { fetchTeampilotData } from '@teampilot/sdk'
import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { z } from 'zod'

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

  const answer = await fetchTeampilotData({
    message: `Write the script for the following Podcast: \n\`\`\`json\n${JSON.stringify(
      item,
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
        <pre className="mt-4 whitespace-pre-wrap">
          {JSON.stringify(answer, null, 2)}
        </pre>
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
