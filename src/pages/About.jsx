export default function About() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="capitalize text-2xl lg:text-3xl font-semibold my-4">
          About Us
        </h1>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="max-w-3xl text-gray-300 leading-7 space-y-4">
            <p>
              Welcome to our entertainment platform where you can explore popular
              movies, TV shows, and trending content from around the world.
            </p>

            <p>
              Our goal is to provide users with an easy and modern way to discover
              new content. We bring together the most popular and top-rated shows
              in one place with a clean and responsive interface.
            </p>

            <p>
              Built using modern technologies like React.js and Tailwind CSS, this
              platform focuses on performance, design, and user experience.
            </p>
          </div>

          <div className="w-full">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
              alt="Our Team"
              className="w-full h-75 object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 mt-12">
          <div className="bg-neutral-900 p-5 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-2">🎬 Movies</h3>
            <p className="text-sm text-gray-400">
              Discover trending and top-rated movies updated regularly.
            </p>
          </div>

          <div className="bg-neutral-900 p-5 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-2">📺 TV Shows</h3>
            <p className="text-sm text-gray-400">
              Explore popular and fan-favorite TV series.
            </p>
          </div>

          <div className="bg-neutral-900 p-5 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-2">⚡ Fast & Modern</h3>
            <p className="text-sm text-gray-400">
              Built for speed with a smooth browsing experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}