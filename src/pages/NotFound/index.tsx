import React from 'react'
import { Link } from 'react-router-dom'

import { Container } from './styles'

const NotFound: React.FC = () => {
  return (
    <Container>
      <h1>Página não encontrada</h1>

      <Link to="/">Voltar para página inicial</Link>
    </Container>
  )
}

export default NotFound
