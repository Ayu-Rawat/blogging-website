import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
    const [isVideo, setIsVideo] = useState(false);
    const [fileUrl, setFileUrl] = useState('');

    useEffect(() => {
        async function fetchFileData() {
            try {
                const metadata = await appwriteService.getFileMetadata(featuredImage);
                if (metadata && metadata.mimeType.startsWith('video')) {
                    setIsVideo(true);
                    setFileUrl(appwriteService.getFileView(featuredImage)); // Use getFileView for video
                } else {
                    setFileUrl(appwriteService.getFilePreview(featuredImage)); // Use getFilePreview for images
                }
            } catch (error) {
                console.error("Error fetching file data:", error);
            }
        }

        fetchFileData();
    }, [featuredImage]);

    return (
    <Link
        to={`/post/${$id}`}
        className="block w-full max-w-sm mx-auto bg-[#0a0a0a] border-[0.5px] border-[#8f8f8f]  rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
        >

            <div className="w-full bg-[#0a0a0a] p-2">
                {isVideo ? (
                    <video
                        controls
                        className="w-full h-48 object-cover"
                        src={fileUrl}
                    >
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <img
                        src={fileUrl}
                        alt={title}
                        className="w-full h-48 object-cover"
                    />
                )}
            </div>
            <div className="p-4">
                <h2 className="text-lg font-semibold text-[#ffffff]">
                    {title.length > 10 ? title.slice(0, 10) + "..." : title}
                </h2>
            </div>
        </Link>
    );
}

export default PostCard;