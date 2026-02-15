export default function Contact() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-[#1f2933] rounded-xl p-8 grid lg:grid-cols-2 gap-10">
          
          <div>
            <h2 className="text-2xl lg:text-3xl font-semibold mb-6">
              Contact Info
            </h2>

            <div className="space-y-5 text-gray-300">
              <p className="flex items-center gap-3">
                <span className="text-red-500 text-xl">📞</span>
                +91 9717297457
              </p>

              <p className="flex items-center gap-3">
                <span className="text-red-500 text-xl">✉️</span>
                khanak.gupta@bingex.com
              </p>

              <p className="flex items-start gap-3">
                <span className="text-red-500 text-xl">📍</span>
                <span>
                  10, YMCA Park,  
                  <br />
                  Delhi NCR, India
                </span>
              </p>
            </div>
          </div>

          <div>
            <form className="space-y-4">
              
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Enter your Name"
                  className="p-3 bg-white/90 text-black rounded-md w-full outline-none"
                />
                <input
                  type="email"
                  placeholder="Enter a valid email address"
                  className="p-3 bg-white/90 text-black rounded-md w-full outline-none"
                />
              </div>

              <textarea
                rows="5"
                placeholder="Enter your message"
                className="p-3 bg-white/90 text-black rounded-md w-full outline-none"
              />

              <button className="w-full bg-red-600 hover:bg-red-700 transition-colors py-3 rounded-md font-semibold">
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}