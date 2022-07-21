import { NextPage } from 'next'
import { request, gql } from 'graphql-request'
import Link from 'next/link'
import Image from 'next/image'
import type { PokemonsData } from '../types/types'

type Props = {
  data: PokemonsData
}

const SSRPage: NextPage<Props> = (props: Props) => {
  const { pokemons } = props?.data
  return (
    <div>
      {pokemons?.results?.map((pokemon) => (
        <Link href={pokemon.url} key={pokemon.name}>
          <a>
            <div>{pokemon.name}</div>
            <Image
              src={pokemon.image}
              alt={pokemon.name}
              width="96"
              height="96"
            />
          </a>
        </Link>
      ))}
    </div>
  )
}

export async function getServerSideProps() {
  try {
    const variables = { limit: 10, offset: 1 }
    const query = gql`
      query Pokemon($limit: Int, $offset: Int) {
        pokemons(limit: $limit, offset: $offset) {
          results {
            url
            name
            image
          }
        }
      }
    `
    const data = await request(
      'https://graphql-pokeapi.graphcdn.app',
      query,
      variables
    )

    return {
      props: { data: data },
    }
  } catch (err) {
    return {
      props: { data: {} },
    }
  }
}

export default SSRPage
