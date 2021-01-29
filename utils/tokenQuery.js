import { request, gql } from "graphql-request"

const query = gql`
  query getMedia($contentHash: String) {
    medias(where: { contentHash: $contentHash }) {
      id
    }
  }
`

export default async function tokenQuery(contentHash) {
  const res = await request(
    "https://api.thegraph.com/subgraphs/name/ourzora/zora-v1",
    query,
    { contentHash }
  )

  if (res.error) return Promise.reject(res)
  return res
}
