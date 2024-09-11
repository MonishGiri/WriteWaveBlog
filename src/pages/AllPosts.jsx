import { useState, useEffect } from 'react';
import { PostCard, Container } from '../components';
import appwriteService from '../appwrite/confg'
function AllPosts() {
    const [posts, setPosts] = useState([]);
    useEffect(() =>{
        appwriteService.getPosts().then((posts) => {
            if(posts){
                setPosts(posts.documents)
                console.log(posts.documents)
            }
        })
    },[])
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-col grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 '>
                {posts.map((post) =>(
                    <div key={post.$id} className='p-2 w-45 justify-center'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts