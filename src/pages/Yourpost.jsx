import React, { useState, useEffect } from 'react';
import { Container, PostCard,NotFound } from '../components';
import appwriteService from "../appwrite/config";
import authService from '../appwrite/auth';
import { useNavigate } from 'react-router-dom';
import './allPost.css';

function YourPosts() {
    const [posts, setPosts] = useState([]);
    const [userSession, setUserSession] = useState(null);
    const navigate = useNavigate();

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
        if (userSession) {
            async function fetchPosts() {
                try {
                    const posts = await appwriteService.getYourPosts(userSession.$id);
                    if (posts) {
                        setPosts(posts.documents);
                    }
                } catch (error) {
                    console.error("Error fetching posts:", error);
                }
            }

            fetchPosts();
        }
    }, [userSession]);

    return (
        <div className='w-full py-8'>
            <Container>
                {posts.length > 0 ? (
                    <div className='flex flex-wrap'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <NotFound />
                )}
            </Container>
        </div>
    );
}

export default YourPosts;