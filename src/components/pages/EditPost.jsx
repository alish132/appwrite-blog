import React, {useState, useCallback, useEffect} from 'react'
import appwriteService from '../../appwrite/config'
import Container from '../Container/Container'
import PostForm from './../post-form/PostForm';
import { useNavigate, useParams } from 'react-router';

function EditPost() {
    const [post, setPost] = useState(null)
    const navigate = useNavigate()
    const {slug} = useParams()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug)
            .then((post) => {
                if(post){
                    setPost({...post, slug: slug})
                }
            })
        } else{
            navigate('/')
        }
    }, [navigate, slug])


    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost