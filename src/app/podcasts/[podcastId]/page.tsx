import { LocalDate } from '@/components/demo/LocalDateTime'
import { concatAudioCached } from '@/server/concatAudioCached'
import { getPodcast, getPodcasts } from '@/server/podcasts'
import { textToSpeech } from '@/server/textToSpeech'
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

  const answersWithAudio = await Promise.all(
    answer.map(async (a, idx) => {
      const host = item.hosts.find((h) => h.name === a.name)
      const audio = await textToSpeech({
        text: a.message,
        voiceId:
          host?.voice === 'female'
            ? process.env.ELEVENLABS_VOICE_ID_FEMALE!
            : process.env.ELEVENLABS_VOICE_ID_MALE!,
        path: `${item.id}-part${idx.toString().padStart(3, '0')}`,
      })
      return { ...a, audio }
    }),
  )

  const concatResult = await concatAudioCached({
    inputFiles: answersWithAudio.map((a) => a.audio.filePath),
    outputFile: `${item.id}`,
  })

  return (
    <>
      <article className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl">{item.title}</h1>
          <div className="">
            <LocalDate datetime={item.date} />
          </div>
        </div>
        <p>
          <strong>{item.roughPlan}</strong>
        </p>
        <div>
          <audio controls src={concatResult.url} />
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
