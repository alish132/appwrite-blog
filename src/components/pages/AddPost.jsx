import React from 'react'
import Container from './../Container/Container';
import PostForm from '../post-form/PostForm';

function AddPost() {
  return (
    <div className='py-8'>
        <Container>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost