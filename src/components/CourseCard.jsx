const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition group">
      <img 
        src={course.image || "https://via.placeholder.com/400x250"} 
        alt={course.title}
        className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
      />
      <div className="p-6">
        <h3 className="font-semibold text-xl mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
        
        <div className="flex justify-between items-center mb-5">
          <div className="text-2xl font-bold text-blue-600">
            ${course.price}
          </div>
          <div className="text-sm text-gray-500">{course.duration}</div>
        </div>

        <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-medium">
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CourseCard;