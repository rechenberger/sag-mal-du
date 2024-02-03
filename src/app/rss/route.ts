import { getPodcasts } from '@/server/podcasts'
import { Feed } from 'feed'
import * as mm from 'music-metadata'

const getMP3Duration = async (filePath: string) => {
  const metadata = await mm.parseFile(filePath)
  return metadata.format.duration
}

export const GET = async () => {
  const feed = new Feed({
    title: 'Sag mal du als KI',
    description: 'Ein KI-generierter Podcast powered by teampilot.ai',
    id: 'https://sag-mal-du.rechenberger.io/',
    link: 'https://sag-mal-du.rechenberger.io/',
    language: 'en', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    image: 'https://sag-mal-du.rechenberger.io/thumbnail.webp',
    favicon: 'https://sag-mal-du.rechenberger.io/favicon.ico',
    copyright: 'Tristan Rechenberger',
    // updated: new Date(2013, 6, 14), // optional, default = today
    // generator: 'awesome', // optional, default = 'Feed for Node.js'
    author: {
      name: 'Tristan Rechenberger',
      email: 'rechenberger@me.com',
      link: 'https://rechenberger.io',
    },
  })

  const podcasts = await getPodcasts()

  for (const podcast of podcasts) {
    const duration = await getMP3Duration(`public/audio/${podcast.id}.mp3`)
    feed.addItem({
      title: podcast.title,
      id: `https://sag-mal-du.rechenberger.io/podcasts/${podcast.id}`,
      link: `https://sag-mal-du.rechenberger.io/podcasts/${podcast.id}`,
      description: podcast.description,
      date: new Date(podcast.date),
      // image: podcast.imageUrl,
      // image: `https://sag-mal-du.rechenberger.io/${podcast.imageUrl}`,
      // image: {
      //   url: podcast.imageUrl!,
      //   type: 'image/webp',
      // },
      audio: {
        url: `https://sag-mal-du.rechenberger.io/audio/${podcast.id}.mp3`,
        type: 'audio/mpeg',
        length: duration ? Math.ceil(duration) : undefined,
      },
    })
  }

  return new Response(feed.rss2(), {
    headers: {
      'content-type': 'application/xml; charset=UTF-8',
    },
  })
}
