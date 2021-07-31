import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from "@apollo/client";

const REVEIWS = gql`
query GetReviews {
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
`
export default function Homepage() {

const {loading ,error ,data}=useQuery(REVEIWS);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div>
      {data.reveiws.map(review => (
        <div key={review.id} className="review-card">
          <div className="rating">{review.rating}</div>
          <h2>{review.title}</h2>

          {review.categories.map(category => (
            <small key={category.id}>{category.name}</small>
          ))}

          <p>{review.body.substring(0, 200)}...</p>
          <Link to={`/details/${review.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  )
}
 