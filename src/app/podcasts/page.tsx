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
import Link from 'next/link'
import { Fragment } from 'react'

export default async function Page() {
  const podcasts = await getPodcasts()
  return (
    <>
      <h1>Podcasts</h1>
      <div className="grid grid-cols-1 gap-4">
        {podcasts.map((item, idx) => {
          const isBig = idx === 0
          return (
            <Fragment key={item.id}>
              <Link href={`/podcasts/${item.id}`}>
                <Card
                  className={cn(
                    'overflow-hidden',
                    'flex flex-col',
                    !isBig && 'lg:flex-row',
                  )}
                >
                  {/* <div
                    className={cn(
                      'aspect-video relative',
                      !isBig && 'lg:h-60',
                      'bg-gray-500',
                    )}
                  ></div> */}
                  <div>
                    <CardHeader>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription>
                        <LocalDate datetime={item.date} />
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        <strong>{item.roughPlan}</strong>
                      </p>
                      {/* <p className="mt-4 whitespace-pre-wrap">{item.content}</p> */}
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
