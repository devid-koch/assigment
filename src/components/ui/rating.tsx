
const RatingStars = ({ rating }: any) => {
  // Generate filled stars based on rating
  const filledStars = Array.from({ length: Math.floor(rating) }, (_, index) => (
    <svg key={ index } className="w-5 h-5 fill-current text-gray-700" viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
    </svg>
  ));

  // Generate empty stars for remaining rating
  const emptyStars = Array.from({ length: 5 - Math.floor(rating) }, (_, index) => (
    <svg key={ index } className="w-5 h-5 fill-current text-gray-500" viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
    </svg>
  ));

  return (
    <div className="flex item-center mt-2">
      { filledStars }
      { emptyStars }
    </div>
  );
};

export default RatingStars;
