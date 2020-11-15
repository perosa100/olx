import React, { FormEvent, useEffect, useState } from 'react'
import useApi from '../../helpers/OlxAPI'

import {
  PageContainer,
  PageTitle,
  ErrorMessage
} from '../../components/MainComponents'
import { PageArea } from './styles'
import { doLogin } from '../../helpers/authHandler'

interface stateListProps {
  _id: string
  name: string
}

const Signup: React.FC = () => {
  const api = useApi()

  const [name, setName] = useState('')
  const [stateLoc, setStateLoc] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [stateList, setStateList] = useState<stateListProps[]>([])

  const [disabled, setdisabled] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const getState = async () => {
      const slits = await api.getStates()
      setStateList(slits)
    }
    getState()
  }, [api])

  console.log('stateList', stateList)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setdisabled(true)
    setError('')

    if (password !== confirmPassword) {
      setError('Senhas não batem')
      setdisabled(false)
      return
    }

    const json = await api.register(name, email, password, stateLoc)

    if (json.error) {
      setError(json.error)
    } else {
      doLogin(json.token)
      window.location.href = '/'
    }

    setdisabled(false)
  }

  return (
    <PageContainer>
      <PageTitle>Cadastrar</PageTitle>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <PageArea>
        <form onSubmit={handleSubmit}>
          <label className="area">
            <div className="area--title">Nome Completo</div>
            <div className="area--input">
              <input
                type="text"
                disabled={disabled}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title">Estado</div>
            <div className="area--input">
              <select
                value={stateLoc}
                onChange={(e) => setStateLoc(e.target.value)}
                required
              >
                {stateList?.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </label>

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
            <div className="area--title">Confirmar Senha</div>
            <div className="area--input">
              <input
                type="password"
                disabled={disabled}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </label>

          <label className="area">
            <div className="area--title"></div>
            <div className="area--input">
              <button disabled={disabled}>Fazer Cadastro</button>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>
  )
}

export default Signup
