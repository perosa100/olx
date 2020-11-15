import Cookies from 'js-cookie'

export const isLogged = () => {
  let token = Cookies.get('token')
  return token ? true : false
}

// salva o login se a pessoa selecionar remeber password
export const doLogin = (token: string, rememberPassword: boolean = false) => {
  if (rememberPassword) {
    Cookies.set('token', token, { expires: 999 })
  } else {
    Cookies.set('token', token)
  }
}

export const doLogout = () => {
  Cookies.remove('token')
}
