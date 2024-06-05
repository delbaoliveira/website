import { notFound } from 'next/navigation'
import { allContent } from '../../../data'

export function generateStaticParams() {
  return (
    allContent.paths().map((pathname) => ({
      // Use last part of pathname as the slug. Pass `baseDirectory` as an option to `createSource` to remove the source directory from the slug.
      slug: pathname.slice(-1).at(0)
    }))
  )
}

export default async function Page({ params }: { params: { slug: string } }) {
  const contentItem = await allContent.get(`content/${params.slug}`)

  if (contentItem === undefined) {
    return notFound()
  }

  const { Content, metadata } = contentItem

  return (
    <>
      {metadata ? (
        <div>
          <h1>{metadata.title}</h1>
          <p>{metadata.description}</p>
        </div>
      ) : null}
      {Content ? <Content /> : null}
    </>
  )
}