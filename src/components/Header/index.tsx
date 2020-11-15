import { Link } from 'react-router-dom'
import React from 'react'
import { HeaderArea } from './styles'

import { isLogged, doLogout } from '../../helpers/authHandler'

const Header: React.FC = () => {
  let logged = isLogged()

  const handleLogout = () => {
    doLogout()
    window.location.href = '/'
  }
  return (
    <HeaderArea>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <span className="logo-1">G</span>
            <span className="logo-2">E</span>
            <span className="logo-3">C</span>
            <span className="logo-3">C</span>
          </Link>
        </div>
        <nav>
          <ul>
            {logged && (
              <>
                <li>
                  <Link to="/my-account">Minha Conta</Link>
                </li>

                <li>
                  <button onClick={handleLogout}>Sair</button>
                </li>

                <li>
                  <Link to="/post-an-ad" className="button">
                    Poste Algo logado
                  </Link>
                </li>
              </>
            )}

            {!logged && (
              <>
                <li>
                  <Link to="/signin">Login</Link>
                </li>

                <li>
                  <Link to="/signup">Cadastrar</Link>
                </li>

                <li>
                  <Link to="/signin" className="button">
                    Poste Algo deslogado
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </HeaderArea>
  )
}

export default Header
