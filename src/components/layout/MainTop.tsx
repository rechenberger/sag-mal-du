import { DarkModeToggle } from '@/components/layout/DarkModeToggle'
import { Button } from '@/components/ui/button'
import { Rss } from 'lucide-react'
import Link from 'next/link'

export const MainTop = () => {
  return (
    <>
      <div className="container lg:max-w-[1024px] xl:max-w-[1024px] 2xl:max-w-[1024px] flex flex-row items-center justify-between gap-6 py-6">
        <Link href="/" className="flex flex-row items-center gap-3">
          <div className="text-xl">
            <strong>
              Sag mal du <span className="text-primary">als KI</span>
            </strong>
          </div>
        </Link>
        {/* <div className="hidden flex-1 xl:flex">
          <MainTopNav />
        </div> */}
        <div className="flex flex-row">
          <Link href="/rss" title="RSS-Feed">
            <Button variant={'ghost'} size="icon">
              <Rss />
            </Button>
          </Link>
          {/* <Link
            href="https://github.com/SODEFA-GmbH-Co-KG/teampilot-starter"
            target="_blank"
          >
            <Button variant={'ghost'} size="icon">
              <Github />
            </Button>
          </Link> */}
          <DarkModeToggle />
        </div>
      </div>
      {/* <div className="container lg:max-w-[1024px] xl:max-w-[1024px] 2xl:max-w-[1024px] flex pb-6 xl:hidden">
        <MainTopNav />
      </div> */}
    </>
  )
}
