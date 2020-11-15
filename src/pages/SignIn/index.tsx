import React, { FormEvent, useState } from 'react'
import useApi from '../../helpers/OlxAPI'
import { doLogin } from '../../helpers/authHandler'

import {
  PageContainer,
  PageTitle,
  ErrorMessage
} from '../../components/MainComponents'
import { PageArea } from './styles'

const SignIn: React.FC = () => {
  const api = useApi()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberPassword, setRememberPassword] = useState(true)
  const [disabled, setdisabled] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setdisabled(true)
    setError('')

    const json: any = await api.login(email, password)

    if (json.error) {
      setError(json.error)
    } else {
      doLogin(json.token, rememberPassword)
      window.location.href = '/'
    }
    setdisabled(false)
  }

  return (
    <PageContainer>
      <PageTitle>Login</PageTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <PageArea>
        <form onSubmit={handleSubmit}>
          <label className="area">
            <div className="area--title">E-mail</div>
            <div className="area--input">
              <input
                type="email"
                disabled={disabled}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Senha</div>
            <div className="area--input">
              <input
                type="password"
                disabled={disabled}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Lembar Senha</div>
            <input
              type="checkbox"
              disabled={disabled}
              checked={rememberPassword}
              onChange={() => setRememberPassword(!rememberPassword)}
            />
          </label>

          <label className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button disabled={disabled}>Fazer Login</button>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  )
}

export default SignIn
