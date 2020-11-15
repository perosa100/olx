import React, { useEffect, useState } from 'react'
import { PageArea, SearchArea } from './styles'
import useApi from '../../helpers/OlxAPI'
import { PageContainer } from '../../components/MainComponents'
import { Link } from 'react-router-dom'
import AdItem, { adListProps } from '../../components/AdItem'

interface StateListProps {
  name: string
}

interface CategoriesProps {
  name: string
  img: string
  slug: string
}

const Home: React.FC = () => {
  const api = useApi()
  const [stateList, setStateList] = useState<StateListProps[]>([])
  const [categories, setCategories] = useState<CategoriesProps[]>([])
  const [adList, setAdList] = useState<adListProps[]>([])

  useEffect(() => {
    const getStates = async () => {
      const slist = await api.getStates()
      setStateList(slist)
    }
    getStates()
  }, [api])

  useEffect(() => {
    const getCategories = async () => {
      const cats = await api.getCategories()
      setCategories(cats)
    }
    getCategories()
  }, [api])

  useEffect(() => {
    const getRecentAds = async () => {
      const json = await api.getAds({
        sort: 'desc',
        limit: 8
      })
      setAdList(json)
    }
    getRecentAds()
  }, [api])

  return (
    <>
      <SearchArea>
        <PageContainer>
          <div className="searchBox">
            <form method="GET" action="/ads">
              <input type="text" name="q" placeholder="O que você procura" />
              <select name="state">
                {stateList.map((i, k) => (
                  <option key={k}>{i.name}</option>
                ))}
              </select>
              <button>Pesquisar</button>
            </form>
            {categories.map((i, k) => (
              <Link key={k} to={`/ads?cat=${i.slug}`} className="categoryItem">
                <img src={i.img} alt="" />
                <span>{i.name}</span>
              </Link>
            ))}
          </div>
        </PageContainer>
      </SearchArea>

      <PageContainer>
        <PageArea>
          <h2>Anúncios Recentes</h2>
          <div className="list">
            {adList.map((i, k) => (
              <AdItem key={k} data={i} />
            ))}
          </div>
          <Link to="/ads" className="seeAllLink">
            Ver Todos
          </Link>
          <hr />
          ... Contrary to popular belief, Lorem Ipsum is not simply random text.
          It has roots in a piece of classical Latin literature from 45 BC,
          making it over 2000 years old. Richard McClintock, a Latin professor
          at Hampden-Sydney College in Virginia, looked up one of the more
          obscure Latin words, consectetur, from a Lorem Ipsum passage, and
          going through the cites of the word in classical literature,
          discovered the undoubtable source. Lorem Ipsum comes from sections
          1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
          of Good and Evil) by Cicero, written in 45 BC. This book is a treatise
          on the theory of ethics, very popular during the Renaissance. The
          first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from
          a line in section 1.10.32.
        </PageArea>
      </PageContainer>
    </>
  )
}

export default Home
