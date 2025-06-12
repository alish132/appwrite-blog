import React, {useState, useEffect} from 'react'
import Container from '../Container/Container'
import PostCart from '../PostCart'
import appwriteService from '../../appwrite/config'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'

function Home() {
    const [posts, setPosts] = useState([])
    const userStatus = useSelector(state => state.auth.status)
    

    useEffect(() => {
        appwriteService.getPosts()
        .then((post) => {
            if(post){
                setPosts(post.documents)
            }
        })
      }, [])



  if(userStatus){
    return(
        <div className='w-full py-8'>
            <Container >
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCart {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )

  } 
  else{
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <Link to='/login'>
                <h1 className="text-2xl font-bold hover:text-gray-500">
                  Login to read posts
                </h1>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default Home