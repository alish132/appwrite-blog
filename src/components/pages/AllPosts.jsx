import React, {useState, useEffect} from 'react'
import appwriteService from '../../appwrite/config'
import Container from '../Container/Container'
import PostCart from './../PostCart';

function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect( () => {
        appwriteService.getPosts()
        .then((post) => {
            if(post) {
                setPosts(post.documents)
            }
        })
    }, [])

  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.length > 0 ? posts.map((post) => (
                    <div key={post.$id} className='p-2 w-[200px]'>
                        <PostCart {...post}  />
                    </div>
                )) : null}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts