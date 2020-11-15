import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'

import Routes from './routes'
import Header from './components/Header'
import { Template } from './components/MainComponents'
import Footer from './components/Footer'
import GlobalStyle from './styles/global'

function App() {
  return (
    <Router>
      <Template>
        <Header />
        <Routes />
        <Footer />
      </Template>
      <GlobalStyle />
    </Router>
  )
}

const mapStateToProps = (state: any) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch: string) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
