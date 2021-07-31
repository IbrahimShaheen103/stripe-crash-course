import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { useParams, Link } from 'react-router-dom'


const CATEGORY = gql`
query GetCategory($id:ID!) {
  category(id: $id) {
    name,
    id,
    reveiws {
      title,
      body,
      rating,
      id,
      categories {
        name,
        id
      }
    }
  }
}
`

export default function Category() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(CATEGORY, {
    variables: { id: id }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  
  return (
    <div>
      <h2>{data.category.name} Games</h2>
      {data.category.reveiws.map(reveiw => (
        <div key={reveiw.id} className="review-card">
          <div className='rating'>{reveiw.rating}</div>
          <h2>{reveiw.title}</h2>

          {reveiw.categories.map(category => (
            <small key={category.id}>{category.name}</small>
          ))}

          <p>{reveiw.body.substring(0, 200)}...</p>
          <Link to={`/details/${reveiw.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  )
}
