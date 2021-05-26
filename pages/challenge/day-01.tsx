import { Layout } from "@/ui/Layout"
import { LikeButton } from "@/ui/LikeButton"

export default function Page() {
  return (
    <Layout>
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-center">
          <div className="px-16 py-6 border border-gray-100 shadow-sm rounded-xl">
            <LikeButton id="day-01" />
          </div>
        </div>
      </div>
    </Layout>
  )
}
