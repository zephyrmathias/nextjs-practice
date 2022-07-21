import { NextPage } from 'next'

const ISRPage: NextPage = () => {
  return <div>123</div>
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
