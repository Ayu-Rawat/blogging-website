import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center py-4 justify-center bg-[#000000] text-white text-center">
            <h1 className="text-5xl font-bold mb-4">404</h1>
            <p className="text-lg text-gray-400 mb-6">Oops! The page you’re looking for doesn’t exist.</p>
            <Link 
                to="/" 
                className="px-6 py-3 bg-[#58a6ff] text-white rounded-lg hover:bg-[#6ea9ff] transition duration-200"
            >
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;
