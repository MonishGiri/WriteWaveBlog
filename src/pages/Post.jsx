import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/confg";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [user, setUser] = useState({});
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((fetchedPost) => {
                if (fetchedPost) {
                    setPost(fetchedPost);
                    // Fetch the user once the post is available
                    appwriteService.getUserById(fetchedPost.userId).then((fetchedUser) => {
                        setUser(fetchedUser);
                    });
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button className="mr-3 bg-green-500" bgColor="green">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="red" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold dark:text-white">{post.title}</h1>
                </div>
                <div className="browser-css dark:text-white text-black">
                    {parse(post.content)}
                </div>
                <span className=" text-purple-500 font-bold">-By {user ? user.name : 'Anonymous User'}</span><br />
                {/* <span className=" text-purple-500">{user ? user.email : 'Anonymous User'}</span> */}
            </Container>
        </div>
    ) : null;
}
