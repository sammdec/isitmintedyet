export default function toTrimmedAddress(value) {
  return (
    value.substr(0, 6) + "..." + value.substr(value.length - 4, value.length)
  )
}
