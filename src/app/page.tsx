import { LocalDate } from '@/components/demo/LocalDateTime'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { getPodcasts } from '@/server/podcasts'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'

export default async function Page() {
  const podcasts = await getPodcasts()
  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {podcasts.map((podcast, idx) => {
          const isBig = false
          return (
            <Fragment key={podcast.id}>
              <Link href={`/podcasts/${podcast.id}`}>
                <Card
                  className={cn(
                    'overflow-hidden',
                    'flex flex-col',
                    !isBig && 'lg:flex-row',
                  )}
                >
                  {podcast.imageUrl && (
                    <div
                      className={cn(
                        'aspect-square relative',
                        !isBig && 'lg:h-60',
                        'bg-gray-500',
                      )}
                    >
                      <Image src={podcast.imageUrl} alt={podcast.title} fill />
                    </div>
                  )}
                  <div>
                    <CardHeader>
                      <CardDescription>
                        Episode {podcast.episodeNumber}
                      </CardDescription>
                      <CardTitle>{podcast.title}</CardTitle>
                      <CardDescription>
                        <LocalDate datetime={podcast.date} />
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs line-clamp-3">
                        <strong>{podcast.description}</strong>
                      </p>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            </Fragment>
          )
        })}
      </div>
    </>
  )
}
