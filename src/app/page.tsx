import { HeroBento } from "@/components/hero-bento"
import { QuickLinks } from "@/components/quick-links"
import { HighlightsBento } from "@/components/highlights-bento"
import './globals.css'
export default function HomePage() {
  return (
    <>
      <HeroBento />
      <QuickLinks />
      <HighlightsBento />
    </>
  )
}
