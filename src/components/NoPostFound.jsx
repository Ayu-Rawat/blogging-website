import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="flex items-center justify-center bg-black">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-white">No Post Found</h1>
        <p className="text-gray-400 max-w-md">
          We couldn't find the post you're looking for. It might have been removed or doesn't exist.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/add-post"
            className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
          >
            Add Blog
          </Link>
          <Link
            to="/all-post"
            className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 inline-flex items-center"
          >
            See all Post
          </Link>
        </div>
      </div>
    </div>
  )
}

