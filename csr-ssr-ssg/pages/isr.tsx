import { NextPage } from 'next'
import type { Beer } from '../types/types'

type Props = {
  beer: Beer
}

const ISRPage: NextPage<Props> = ({ beer }: Props) => {
  return (
    <div style={{ margin: '20px', border: '1px solid red' }}>
      <div>{beer.id}</div>
      <div>{beer.brand}</div>
      <div>{beer.name}</div>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://random-data-api.com/api/beer/random_beer')
  const data = await res.json()
  return {
    props: {
      beer: data,
    },
    revalidate: 10, // regenerate the page when a request comes (once every 10 sec)
  }
}

export default ISRPage
