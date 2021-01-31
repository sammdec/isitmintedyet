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

  return (
    <Box
      as="main"
      css={{
        maxWidth: 1280,
        mx: "auto",
        py: "@3",
        px: "@3",
        bp0: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)" },
      }}
    >
      <Box
        css={{
          border: "1px solid @text",
          px: "@2",
          py: "@2",
          bp0: {
            px: "@5",
            py: "@5",
          },
        }}
      >
        <Box
          as="img"
          src="/zorb.jpg"
          css={{
            maxWidth: 80,
            mb: "@5",
          }}
        />
        <Box
          css={{
            display: "flex",
            mb: "@5",
          }}
        >
          <Box
            as="h1"
            css={{
              fontSize: "@4",
              fontFamily: "@body",
              fontWeight: 600,
              m: 0,
            }}
          >
            Is it minted yet?
          </Box>
        </Box>

        <Box as="p" css={{ m: 0, mb: "@2" }}>
          This tool allows you to easily check if a piece of content has been
          minted using{" "}
          <Box
            as="a"
            href="https://zora.engineering/protocol"
            css={{ color: "currentcolor" }}
          >
            Zora's protocol
          </Box>
          .
        </Box>

        <Box as="p" css={{ m: 0 }}>
          More information about Zora and its protocol can be found by reading
          the{" "}
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

        <Box
          css={{ alignItems: "flex-end", mb: "@2", bp0: { display: "flex" } }}
        >
          <Box
            as="input"
            type="file"
            onChange={handleFile}
            css={{
              fontFamily: "@body",
              fontSize: "@1",
              py: "@1",
              width: "100%",
              mr: "@2",
            }}
          />

          <Box
            as="button"
            disabled={!fileArrayBuffer}
            css={{
              appearance: "none",
              display: "inline-flex",
              border: "none",
              backgroundColor: "@text",
              color: "@bg",
              px: "@5",
              py: "@2",
              textDecoration: "none",
              fontSize: "@1",
              cursor: "pointer",
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
      </Box>

      <Box
        css={{
          px: "@2",
          py: "@2",
          display: "flex",
          borderLeft: "1px solid @text",
          borderTop: "none",
          borderRight: "1px solid @text",
          borderBottom: "1px solid @text",
          bp0: {
            px: "@5",
            py: "@5",
            borderLeft: "none",
            borderTop: "1px solid @text",
            borderRight: "1px solid @text",
            borderBottom: "1px solid @text",
          },
        }}
      >
        {data ? (
          <Box css={{ display: "flex", mx: "auto", my: "auto" }}>
            {contentExists ? (
              <Box css={{ textAlign: "center" }}>
                <Box
                  css={{
                    fontSize: 80,
                    fontWeight: 600,
                    lineHeight: 1,
                    mb: "@1",
                  }}
                >
                  Yes
                </Box>
                <Box css={{ mb: "@3" }}>
                  This content has been minted on Zora
                </Box>
                <Box as="p" css={{ my: "@0" }}>
                  <Box as="span" css={{ fontWeight: 600 }}>
                    Created by
                  </Box>{" "}
                  <Box
                    as="a"
                    href={`https://etherscan.io/address/${data?.medias[0]?.creator?.id}`}
                    css={{ color: "currentcolor", fontFamily: "@mono" }}
                  >
                    {toTrimmedAddress(data?.medias[0]?.creator?.id)}
                  </Box>
                </Box>
                <Box as="p" css={{ my: "@0" }}>
                  <Box as="span" css={{ fontWeight: 600 }}>
                    Owned by
                  </Box>{" "}
                  <Box
                    as="a"
                    href={`https://etherscan.io/address/${data?.medias[0]?.owner?.id}`}
                    css={{ color: "currentcolor", fontFamily: "@mono" }}
                  >
                    {toTrimmedAddress(data?.medias[0]?.owner?.id)}
                  </Box>
                </Box>
                <Box
                  as="a"
                  href={`https://zora.co/${data?.medias[0]?.creator?.id}/${data?.medias[0]?.id}`}
                  css={{ color: "currentcolor" }}
                  target="_blank"
                >
                  View on Zora.co
                </Box>
              </Box>
            ) : (
              <Box css={{ textAlign: "center" }}>
                <Box css={{ fontSize: 80, fontWeight: 600, lineHeight: 1 }}>
                  No
                </Box>
                <Box>
                  This content doesn't currently exist as an NFT on Zora
                </Box>
              </Box>
            )}
          </Box>
        ) : (
          <Box css={{ display: "flex", mx: "auto", my: "auto" }}>
            Choose a file to check if its been minted
          </Box>
        )}
      </Box>
      <Footer />
    </Box>
  )
}
