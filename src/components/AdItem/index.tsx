import React from 'react'

import { Item } from './styles'
import { Link } from 'react-router-dom'

export interface adListProps {
  data: any
}

const AdItem = ({ data }: adListProps) => {
  let price = ''

  if (data.price.priceNegotiable) {
    price = 'Preço Negociavel'
  } else {
    price = `R$ ${data.price}`
  }
  return (
    <Item className="aditem">
      <Link to={`/ad/${data.id}`}>
        <div className="itemImage">
          <img src={data.image} alt="" />
        </div>

        <div className="itemName">{data.title}</div>
        <div className="itemPrice">{price}</div>
      </Link>
    </Item>
  )
}

export default AdItem
