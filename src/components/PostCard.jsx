import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`} className="block w-full max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
            <div className="w-full bg-gray-100">
                <img 
                    src={appwriteService.getFilePreview(featuredImage)} 
                    alt={title} 
                    className="w-full h-48 object-cover"
                />
            </div>
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            </div>
        </Link>
    );
}

export default PostCard;