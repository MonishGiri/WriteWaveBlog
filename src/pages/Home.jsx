import { useEffect, useState } from "react";
import appwriteService from '../appwrite/confg';
import {Container, PostCard} from '../components';

function Home() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        appwriteService.getPosts().then((posts) =>{
            if(posts){
                setPosts(posts.documents);
            }
        });
    },[])
  
    if(posts.length !== 0){
        return (
            <div className="w-full py-8 mt-4 text-center ">
                <Container>
                    <div className="flex flex-wrap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <div key={post.$id} className="p-2 w-45 ">
                                <PostCard {...post}/>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        )
    }
    else{
        return(
            <div className="w-full py-8 mb-[20%] text-center mt-0.5">
                <h1 className="text-gray-500 dark:text-white text-3xl mt-[3%]">Login to see the blogs</h1>
            </div>
        )
    }
}

export default Home