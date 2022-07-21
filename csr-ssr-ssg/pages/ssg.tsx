import { GetStaticProps, NextPage } from 'next'
import type { Beer } from '../types/types'

type Props = {
  beer: Beer
}

const SSGPage: NextPage<Props> = ({ beer }: Props) => {
  return (
    <div>
      <div>{beer.id}</div>
      <div>{beer.brand}</div>
      <div>{beer.name}</div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://random-data-api.com/api/beer/random_beer')
  const data = await res.json()
  return {
    props: {
      beer: data,
    },
  }
}

export default SSGPage
