import { motion } from "framer-motion";
import { Link } from "react-router-dom";
//home page hero section
//importing motion from framer-motion 
const Hero = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between md:px-12 py-12 bg-gray-100">
      {/* Left Side Content */}
      <motion.div
        className="text-center md:text-left md:w-1/2 space-y-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold text-blue-700 leading-tight font-['Barlow_Condensed']"></h1>

        <motion.p
          className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text md:text-5xl text-transparent leading-snug justify-around"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Capture, organize, and tackle your to-dos from anywhere.
        </motion.p>

        <motion.p
          className="text-lg md:text-3xl text-gray-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Escape the clutter and chaos, unleash your productivity with Trello.
        </motion.p>

        {/* Sign-up Section */}
        <motion.div
          className="mt-4 flex flex-col sm:flex-row gap-3 items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-auto px-5 py-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
          />
          <button className="bg-blue-600 text-white px-8 py-3 font-semibold text-lg hover:bg-white hover:text-blue-600 border border-blue-600 rounded-full duration-300">
  <Link to="/signup">Sign up – it’s free!</Link>
</button>
        </motion.div>

        {/* Watch Video Section */}
        <motion.div
          className="mt-4 flex items-center justify-center md:justify-start gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <span className="text-lg md:text-xl font-semibold text-blue-500 font-sniglet">
            Watch video
          </span>
          <button className="bg-blue-500 text-white px-5 py-3 rounded-full text-lg hover:bg-blue-600 duration-300">
            ▶
          </button>
        </motion.div>
      </motion.div>

      {/* Mobile Preview Image */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <img
          src="../../public/assets/mobile-preview.jpeg"
          alt="Trello Mobile Preview"
          className="max-w-[400px] md:max-w-[600px] rounded-sm img bg-center"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
