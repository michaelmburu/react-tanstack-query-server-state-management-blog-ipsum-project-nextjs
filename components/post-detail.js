import React from 'react'
import { useQuery, useMutation } from 'react-query'
const fetchComments = async (postId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  )
  return response.json()
}

const deletePost = async (postId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: 'DELETE' }
  )
  return response.json()
}

const updatePost = async (postId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: 'PATCH', data: { title: 'REACT QUERY FOREVER!!!!' } }
  )

  return response.json()
}
const PostDetail = ({ post }) => {
  const { data, isLoading, isError, error } = useQuery(
    ['comments', post.id],
    () => fetchComments(post.id)
  )

  const deleteMutation = useMutation((postId) => deletePost(postId))
  const updateMutation = useMutation((postId) => updatePost(postId))

  if (isLoading) {
    return (
      <>
        <h3>Is Loading...</h3>
      </>
    )
  }
  if (isError) {
    return (
      <>
        <h3>Something happened</h3>
        <p>{error}</p>
      </>
    )
  }
  return (
    <>
      <h3 style={{ color: 'blue' }}></h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      {deleteMutation.isError && (
        <p style={{ color: 'red' }}>Error deleting the post.</p>
      )}
      {deleteMutation.isLoading && (
        <p style={{ color: 'purple' }}>Deleting the post.</p>
      )}
      {deleteMutation.isSuccess && (
        <p style={{ color: 'green' }}>Post has not been deleted.</p>
      )}
      <button onClick={updateMutation.mutate(post.id)}>Update Title</button>
      {updateMutation.isError && (
        <p style={{ color: 'red' }}>Error in updating..</p>
      )}
      {updateMutation.isLoading && (
        <p style={{ color: 'purple' }}>Updating the post</p>
      )}
      {updateMutation.isSuccess && (
        <p style={{ color: 'green' }}>Post has not been updated</p>
      )}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}
          {comment.body}
        </li>
      ))}
    </>
  )
}

export default PostDetail
