export default function Namesake(props: {
  namesake: { str: string; tag: string }[]
}) {
  const namesake = props.namesake

  return namesake.map((o, i) => {
    const Tag = o.tag
    return <Tag key={i}>{o.str}</Tag>
  })
}
