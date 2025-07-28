import HeroSection from '@/components/HeroSection'
import MissionStatement from '@/components/MissionStatement'
import QuickStats from '@/components/QuickStats'
import ProgramHighlights from '@/components/ProgramHighlights'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <MissionStatement />
      <QuickStats />
      <ProgramHighlights />
    </div>
  )
}