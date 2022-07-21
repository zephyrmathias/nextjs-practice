import { NextPage } from 'next'
import useSWR, { SWRConfig } from 'swr'

import type { Beer } from '../types/types'

const api = 'https://random-data-api.com/api/beer/random_beer'
const fetcher = (url) => fetch(url).then((res) => res.json())

type Props = {
  fallback: {
    [api]: Beer
  }
}

const Beer = () => {
  const { data } = useSWR(api, fetcher, { revalidateOnFocus: false })
  return (
    <>
      <div>{data?.id}</div>
      <div>{data?.brand}</div>
      <div>{data?.name}</div>
    </>
  )
}

const ISRPage: NextPage<Props> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <div style={{ margin: '20px', border: '1px solid red' }}>
        <Beer />
      </div>
    </SWRConfig>
  )
}

export async function getStaticProps() {
  const res = await fetch(api)
  const data = await res.json()

  return {
    props: {
      // pre-fetched data for static page
      // when first render it will use this pre-fetched data
      // then SWR will call it again to fetch new data
      fallback: {
        [api]: data,
      },
    },
    revalidate: 10, // regenerate the page when a request comes (once every 10 sec)
  }
}

export default ISRPage
