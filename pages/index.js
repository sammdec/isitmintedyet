import { useState } from "react"
import { useMutation } from "react-query"
import Box from "@components/Box"
import Footer from "@components/Footer"

import contentQuery from "@utils/contentQuery"
import useSha256Hash from "@utils/useSha256Hash"
import toTrimmedAddress from "@utils/toTrimmedAddress"

export default function Home() {
  const [fileArrayBuffer, setFileArrayBuffer] = useState(null)

  const derivedContentHash = useSha256Hash(fileArrayBuffer)

  const { mutate, data, isSuccess, reset } = useMutation(
    ["contentHash", derivedContentHash],
    () => contentQuery(derivedContentHash)
  )

  const contentExists = data && data?.medias?.length > 0

  const handleFile = async (e) => {
    reset()
    setFileArrayBuffer(null)
    const file = e.target.files[0]
    if (!file) return
    const arrayBuffer = await file.arrayBuffer()
    setFileArrayBuffer(arrayBuffer)
  }

  console.log(data)

  return (
    <Box as="main" css={{ maxWidth: 740, mx: "auto", py: "@3", px: "@2" }}>
      <Box
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: "@1",
        }}
      >
        <Box
          as="img"
          src="/zorb.jpg"
          css={{
            maxWidth: 50,
            top: 8,
            left: 8,
            mr: "@1",
            bp0: { position: "absolute", maxWidth: 80 },
          }}
        />
        <Box
          as="h1"
          css={{
            fontSize: "@4",
            fontFamily: "@body",
            fontWeight: 700,
            textAlign: "center",
            m: 0,
          }}
        >
          Is it minted yet?
        </Box>
      </Box>
      <Box as="p" css={{ fontWeight: 700, fontSize: "@2", mb: "@1" }}>
        What is this?
      </Box>
      <Box as="p" css={{ m: 0 }}>
        This tool allows you to easily check if a piece of content has been
        minted using Zora's protocol. More information about Zora and its
        protocol can be found by reading the{" "}
        <Box
          as="a"
          href="https://zora.engineering/whitepaper"
          target="_blank"
          css={{ color: "currentcolor" }}
        >
          Whitepaper
        </Box>
      </Box>

      <Box css={{ borderBottom: "1px solid @textLight", my: "@3" }} />

      <Box css={{ alignItems: "flex-end", mb: "@4", bp0: { display: "flex" } }}>
        <Box
          css={{
            display: "flex",
            flexDirection: "column",
            mb: "@1",
            bp0: { mb: 0, mr: "@1" },
          }}
        >
          <Box as="label" css={{ fontWeight: 700, mb: "@0" }}>
            Pick a file
          </Box>
          <Box
            as="input"
            type="file"
            onChange={handleFile}
            css={{
              fontFamily: "@mono",
              fontSize: "@1",
              px: "@1",
              py: "@0",
              border: "1px solid @text",
              borderRadius: 5,
            }}
          />
        </Box>
        <Box
          as="button"
          disabled={!fileArrayBuffer}
          css={{
            appearance: "none",
            display: "inline-flex",
            border: "none",
            borderRadius: 5,
            backgroundColor: "@text",
            color: "@bg",
            px: "@3",
            py: "@1",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "@1",
            cursor: "pointer",
            bp1: { ml: "@2" },
            transition: "opacity 0.2s ease-in-out",
            "&:hover": {
              opacity: 0.8,
            },
            "&:disabled": {
              opacity: 0.6,
              cursor: "not-allowed",
            },
          }}
          onClick={() => mutate()}
        >
          Check
        </Box>
      </Box>
      {data && (
        <Box css={{ mb: "@3" }}>
          {contentExists ? (
            <Box css={{ textAlign: "center" }}>
              <Box css={{ fontSize: 80, fontWeight: 700, lineHeight: 1 }}>
                Yes
              </Box>
              <Box>This content has been minted already on Zora</Box>
              <Box as="p" css={{ my: "@0" }}>
                <Box as="span" css={{ fontWeight: 700 }}>
                  Created by:
                </Box>{" "}
                <Box
                  as="a"
                  href={`https://etherscan.io/address/${data?.medias[0]?.creator?.id}`}
                  css={{ color: "currentcolor" }}
                >
                  {data?.medias[0]?.creator?.id}
                </Box>
              </Box>
              <Box as="p" css={{ my: "@0" }}>
                <Box as="span" css={{ fontWeight: 700 }}>
                  Owned by:
                </Box>{" "}
                <Box
                  as="a"
                  href={`https://etherscan.io/address/${data?.medias[0]?.owner?.id}`}
                  css={{ color: "currentcolor" }}
                >
                  {data?.medias[0]?.owner?.id}
                </Box>
              </Box>
            </Box>
          ) : (
            <Box css={{ textAlign: "center" }}>
              <Box css={{ fontSize: 80, fontWeight: 700, lineHeight: 1 }}>
                No
              </Box>
              <Box>This content doesn't currently exist as an NFT on Zora</Box>
            </Box>
          )}
        </Box>
      )}

      <Footer />
    </Box>
  )
}
