const Hero = () => {
  return (
    <div className="hero-bg h-screen flex items-center text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Transform Your Future with<br />Quality Education
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of students learning from industry experts
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/courses" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-lg font-medium transition">
            Browse Courses
          </a>
          <a href="/register" className="border-2 border-white hover:bg-white hover:text-black px-8 py-4 rounded-xl text-lg font-medium transition">
            Get Started
          </a>
        </div>
      </div>
    </div>
  )
}

export default Hero