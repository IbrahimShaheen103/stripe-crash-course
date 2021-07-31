import React from 'react'
import { useParams } from 'react-router-dom'
import { gql, useQuery } from "@apollo/client";
import ReactMarkdown from "react-markdown";
const REVIEW=gql`
  query GetReview($id:ID!){
    reveiw(id:$id){
      title,
      rating,
      body,
      id,
      categories {
        name,
        id
      }
    }
  }
` 

export default function ReviewDetails() {
  const { id } = useParams()
  const {loading,error,data}=useQuery(REVIEW,{
    variables:{id:id}
  })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div className="review-card">
      <div className="rating">{data.reveiw.rating}</div>
      <h2>{data.reveiw.title}</h2>

      {data.reveiw.categories.map(category => (
            <small key={category.id}>{category.name}</small>
          ))}

      <ReactMarkdown>{data.reveiw.body}</ReactMarkdown>
    </div>
  )
}
