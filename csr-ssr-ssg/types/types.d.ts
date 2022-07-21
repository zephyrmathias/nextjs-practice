export interface User {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export interface Pokemon {
  name: string
  image: string
  url: string
}

export interface PokemonsData {
  pokemons: {
    results: Pokemon[]
  }
}

export interface Beer {
  id: number
  uid: string
  brand: string
  name: string
  style: string
  hop: string
  yeast: string
  malts: string
  ibu: string
  alcohol: string
  blg: string
}
