import { Link } from 'react-router-dom';

const DestinationCard = ({ destination }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-[1.02] transition duration-300 flex flex-col">
    <img
      src={destination.image}
      alt={destination.name}
      className="h-48 w-full object-cover sm:h-56 md:h-48 lg:h-56"
    />
    <div className="p-4 flex flex-col flex-grow">
      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
        {destination.name}
      </h3>
      <p
        className="text-sm text-gray-600 mb-3 leading-snug"
        style={{
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {destination.description}
      </p>
      <div className="flex justify-between text-gray-500 text-sm mb-4">
        <span>👍 {destination.likes?.length || 0}</span>
        <span>💬 {destination.comments?.length || 0}</span>
      </div>
      <Link
        to={`/destinations/${destination._id}`}
        className="mt-auto text-sm font-medium text-green-600 hover:text-green-800 transition-colors"
      >
        Explore more →
      </Link>
    </div>
  </div>
);

export default DestinationCard;
