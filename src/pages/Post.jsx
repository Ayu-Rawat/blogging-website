import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const [isVideo, setIsVideo] = useState(false);
    const [fileUrl, setFileUrl] = useState('');
    const [userSession, setUserSession] = useState(null);

    useEffect(() => {
        async function fetchUserSession() {
            try {
                const user = await authService.getCurrentUser();
                if (user) {
                    setUserSession(user);
                } else {
                    console.error("No active session found. Redirecting to login...");
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error fetching user session:", error);
            }
        }

        fetchUserSession();
    }, [navigate]);

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const isAuthor = post && userSession ? post.userId === userSession.$id : false;

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    useEffect(() => {
        if (post && post.featuredImage) {
            async function fetchFileData() {
                try {
                    const metadata = await appwriteService.getFileMetadata(post.featuredImage);
                    if (metadata && metadata.mimeType.startsWith('video')) {
                        setIsVideo(true);
                        setFileUrl(appwriteService.getFileView(post.featuredImage)); 
                    } else {
                        setFileUrl(appwriteService.getFilePreview(post.featuredImage));
                    }
                } catch (error) {
                    console.error("Error fetching file data:", error);
                }
            }

            fetchFileData();
        }
    }, [post]);

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    {isVideo ? (
                        <video
                            controls
                            className="rounded-xl w-3/4 h-3/4 mx-auto"
                            src={fileUrl}
                        >
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <img
                            src={fileUrl}
                            className="rounded-xl w-3/4 h-3/4 mx-auto"
                        />
                    )}

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
