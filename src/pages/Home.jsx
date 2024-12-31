import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';
import { Link } from 'react-router-dom';
import './allPost.css'

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 h-full">
                <Container>
                    <div className="flex flex-wrap justify-center items-center">
                        <div className="p-4 w-full max-w-md bg-[#2d333b] rounded-lg shadow-lg">
                            <h1 className="text-2xl font-bold text-white mb-4">
                                Want to read posts? Please log in!
                            </h1>
                            <p className="text-sm text-gray-400 mb-4">
                                Log in to access all the posts and content available on our platform.
                            </p>
                            <Link
                                to="/login"
                                className="inline-block px-6 py-2 bg-[#58a6ff] text-white rounded-lg hover:bg-[#6ea9ff] transition-colors duration-200"
                            >
                                Log In
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap allPost">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
