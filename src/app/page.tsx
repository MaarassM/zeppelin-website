import { Footer }     from '@/components/layout/Footer'
import { Hero }       from '@/components/sections/Hero'
import { BarRelax }   from '@/components/sections/BarRelax'
import { ActionZone } from '@/components/sections/ActionZone'
import { Adventure }  from '@/components/sections/Adventure'
import { Gastro }     from '@/components/sections/Gastro'
import { Careers }    from '@/components/sections/Careers'
import { Location }   from '@/components/sections/Location'

export default function HomePage() {
  return (
    <>
      <main className="pt-16">
        <Hero />
        <BarRelax />
        <ActionZone />
        <Adventure />
        <Gastro />
        <Careers />
        <Location />
      </main>
      <Footer />
    </>
  )
}
