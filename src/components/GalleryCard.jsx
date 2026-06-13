const GalleryCard = ({ image, title }) => {
  return (
    <div className="relative group overflow-hidden rounded-2xl shadow-lg">
      <img 
        src={image} 
        alt={title}
        className="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-6">
        <h3 className="text-white text-xl font-medium">{title}</h3>
      </div>
    </div>
  );
};

export default GalleryCard;