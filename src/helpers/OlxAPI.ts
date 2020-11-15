import Cookie from 'js-cookie'
import qs from 'qs'

//const BASEAPI = 'http://localhost:5000'
const BASEAPI = 'http://alunos.b7web.com.br:501'
const apiFetchPost = async (endpoint: string, body: any) => {
  //o token fica salvo direto no cookie
  if (!body.token) {
    let token = Cookie.get('token')
    if (token) {
      body.token = token
    }
  }

  const res = await fetch(BASEAPI + endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  const json = await res.json()

  if (json.notallowed) {
    window.location.href = '/signin'
    return
  }

  return json
}

const apiFetchGet = async (endpoint: string, body: any = []) => {
  //o token fica salvo direto no cookie
  if (!body.token) {
    let token = Cookie.get('token')
    if (token) {
      body.token = token
    }
  }

  const res = await fetch(`${BASEAPI + endpoint}?${qs.stringify(body)}`)

  const json = await res.json()

  if (json.notallowed) {
    window.location.href = '/signin'
    return
  }

  return json
}

const OLxApi = {
  login: async (email: string, password: string) => {
    const json = await apiFetchPost('/user/signin', { email, password })
    return json
  },

  register: async (
    name: string,
    email: string,
    password: string,
    stateLoc: string
  ) => {
    const json = await apiFetchPost('/user/signup', {
      name,
      email,
      password,
      state: stateLoc
    })
    return json
  },

  getStates: async () => {
    const json = await apiFetchGet('/states')
    return json.states
  },

  getCategories: async () => {
    const json = await apiFetchGet('/category')
    return json
  },

  getAds: async (options: any) => {
    const json = await apiFetchGet('/ad/list', options)
    return json.ads
  },
  getAd: async (id: string, other = false) => {
    const json = await apiFetchGet('/ad/item', { id, other })
    return json
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => OLxApi
