import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-[1.02] transition duration-300 flex flex-col">
    <img
      src={blog.image}
      alt={blog.title}
      className="object-cover sm:h-56 md:h-48 lg:h-90"
    />
    <div className="p-4 flex flex-col flex-grow">
      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
        {blog.title}
      </h3>
      <p
        className="text-sm text-gray-600 mb-3 leading-snug"
        style={{
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        {blog.description}
      </p>
      <div className="flex justify-between text-gray-500 text-sm mb-4">
        <span>👍 {blog.likes?.length + blog.anonymousLikes || 0}</span>
        <span>💬 {blog.comments?.length || 0}</span>
      </div>
      <Link
        to={`/blogs/${blog._id}`}
        className="mt-auto text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
      >
        Read more →
      </Link>
    </div>
  </div>
);

export default BlogCard;
