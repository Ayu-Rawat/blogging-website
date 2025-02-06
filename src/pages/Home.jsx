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
            <div className="w-full  bg-[#000000] text-white">
            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center text-center py-16 px-6">
                <h1 className="text-4xl font-bold mb-4">
                    Welcome to <span className="text-[#58a6ff]">Blog It</span>
                </h1>
                <p className="text-lg text-gray-400 max-w-xl">
                Log in to access all the posts and content available on our platform.
                </p>
                <div className="mt-6 flex gap-4">
                    <Link 
                        to="/login"
                        className="px-6 py-3 bg-[#58a6ff] text-white rounded-lg hover:bg-[#6ea9ff] transition duration-200"
                    >
                        Log In
                    </Link>
                    <Link 
                        to="/signup"
                        className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition duration-200"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
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
