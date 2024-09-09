import { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';
import appwriteService from '../appwrite/confg'
import { PostCard, Container } from '../components';

function PostsByUser() {
    const [postsByUser, setPostsByUser] = useState([]);
    const {userData} = useSelector((state) => state.auth);
    console.log("This is userdata from postsby user"+userData.$id);

    useEffect(() =>{
        appwriteService.getPostsByUser(userData.$id).then((posts) => {
            if(posts){
                setPostsByUser(posts.documents)
            }
        })
    },[])
    if(postsByUser){
        return (
            <div className='w-full py-8'>
                <Container>
                <p className='text-yellow-500 font-bold text-right'>{`Total Posts: ${postsByUser.length}`}</p>
                    <div className='flex flex-wrap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
                        {postsByUser.map((post) =>(
                            <div key={post.$id} className='p-2 w-45'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
          )
    }
    else{
        <div className='text-lg'>Please Add a Post First</div>
    }
  
}

export default PostsByUser