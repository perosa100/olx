import React, { useEffect, useState } from 'react'
import useApi from '../../helpers/OlxAPI'
import { Slide } from 'react-slideshow-image'
import { PageContainer } from '../../components/MainComponents'
import { PageArea, Fake, OthersArea, BreadChumb } from './styles'
import { Link, useParams } from 'react-router-dom'
import AdItem from '../../components/AdItem'

interface RouteParams {
  id: string
}
type AdInfoProps = {
  title: string
  dateCreated: string
  description: string
  views: string
  images: string[]
  priceNegotiable: string
  price: string
  userInfo: {
    email: string
    name: string
  }
  stateName: string
  others: string[]
  category: {
    name: string
    slug: string
  }
}

const AdPage: React.FC = () => {
  const api = useApi()
  const { id } = useParams() as RouteParams

  const [loading, setLoading] = useState(true)
  const [adInfo, setAdInfo] = useState<AdInfoProps>()

  useEffect(() => {
    const getAdInfo = async (id: string) => {
      const json = await api.getAd(id, true)

      setAdInfo(json)
      setLoading(false)
    }
    getAdInfo(id)
  }, [api, id])

  console.log(adInfo)

  const formatDate = (date: string) => {
    let cDate = new Date(date)
    let months = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro'
    ]
    let cday = cDate.getDate()
    let cMonth = cDate.getMonth()
    let cYyear = cDate.getFullYear()

    return `${cday} de ${months[cMonth]} de ${cYyear}`
  }

  return (
    <PageContainer>
      <BreadChumb>
        Você está aqui
        <Link to="/"> Home </Link>/
        <Link to={`ads?state=${adInfo?.stateName}`}> {adInfo?.stateName} </Link>
        /
        <Link
          to={`ads?state=${adInfo?.stateName}&cat=${adInfo?.category.slug}`}
        >
          {adInfo?.category.name}
        </Link>
        / {adInfo?.title}
      </BreadChumb>
      <PageArea>
        <div className="leftSide">
          <div className="box">
            <div className="adImage">
              {loading && <Fake height={300} />}
              {adInfo?.images && (
                <Slide>
                  {adInfo?.images.map((img: any, k) => (
                    <div key={k} className="each-slide">
                      <img src={img} alt="" />
                    </div>
                  ))}
                </Slide>
              )}
            </div>
            <div className="adInfoo">
              <div className="adName">
                {loading && <Fake height={20} />}

                {adInfo?.title && <h1>{adInfo?.title}</h1>}
                {adInfo?.dateCreated && (
                  <small>criado em {formatDate(adInfo.dateCreated)}</small>
                )}
              </div>

              <div className="adDescription">
                {loading && <Fake height={100} />}
                {adInfo?.description}
                <hr />
                {adInfo?.views && <small> Visualiações: {adInfo?.views}</small>}
              </div>
            </div>
          </div>
        </div>

        <div className="rightSide">
          <div className="box box--padding">
            {loading && <Fake height={20} />}
            {adInfo?.priceNegotiable && 'Preço Negociável'}
            {!adInfo?.priceNegotiable && adInfo?.price && (
              <div className="price">
                Preço: <span>R$ {adInfo.price}</span>
              </div>
            )}
          </div>

          {adInfo?.userInfo && (
            <>
              <a
                href={`mailto:${adInfo.userInfo.email}`}
                target="_blank"
                rel="noreferrer"
                className="contactSellerLink"
              >
                Fale com Vendedor
              </a>
              <div className="creteadBy box box--padding">
                <strong>{adInfo.userInfo.name}</strong>
                <small>E-mail: {adInfo.userInfo.email}</small>
                <small>Estado: {adInfo.stateName}</small>
              </div>
            </>
          )}

          {loading && <Fake height={50} />}
        </div>
      </PageArea>

      <OthersArea>
        {adInfo?.others && (
          <>
            <h2>Outras ofertas do vendedor</h2>

            <div className="list">
              {adInfo.others.map((i, k) => (
                <AdItem key={k} data={i} />
              ))}
            </div>
          </>
        )}
      </OthersArea>
    </PageContainer>
  )
}

export default AdPage
