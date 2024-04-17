import { SiteHeader } from "@/ui/SiteHeader"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="sticky top-6 z-30 -mx-px">
        <SiteHeader />
      </div>

      {children}
    </>
  )
}
