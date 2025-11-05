import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin, Users, Star, ArrowRight, Compass, Heart } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import homestays from "@/data/homestays.json";
import attractions from "@/data/attractions.json";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");

  const topDestinations = attractions.slice(0, 6);
  const featuredHomestays = homestays.slice(0, 6);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl opacity-20"></div>
        </div>

        <div className="container relative z-10 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Discover Your Next{" "}
              <span className="bg-gradient-travel bg-clip-text text-transparent">
                Adventure
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore authentic local experiences, stay in unique homestays, and connect with
              real people around the world
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-border">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="relative">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Where to go?
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                    <input
                      type="text"
                      placeholder="Search destinations..."
                      value={selectedDestination}
                      onChange={(e) => setSelectedDestination(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Check in
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="relative">
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Check out
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Guests
                  </label>
                  <select className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3+ Guests</option>
                  </select>
                </div>

                <button className="md:col-span-1 bg-gradient-travel text-white rounded-lg py-2 px-6 font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 self-end">
                  <Search size={20} />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Homestays */}
      <section className="container py-16 md:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Homestays
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience authentic hospitality in hand-picked properties across India
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuredHomestays.map((homestay) => (
            <motion.div key={homestay.id} variants={itemVariants}>
              <Link
                to={`/homestays/${homestay.id}`}
                className="group block bg-white rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 h-full"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-video bg-muted">
                  <img
                    src={homestay.image}
                    alt={homestay.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                    <Heart size={20} className="text-secondary" />
                  </button>
                  <div className="absolute top-3 left-3 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {homestay.location}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2">
                    {homestay.title}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-accent fill-accent" />
                      <span className="font-semibold text-foreground">{homestay.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({homestay.reviews} reviews)
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Users size={16} />
                    <span>{homestay.guests} guests</span>
                    <span>•</span>
                    <span>{homestay.bedrooms} bedrooms</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-primary">${homestay.price}</span>
                    <span className="text-muted-foreground">/night</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/homestays"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-travel text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            View All Homestays
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </section>

      {/* Top Destinations */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Top Destinations
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore popular attractions and cultural landmarks
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {topDestinations.map((destination) => (
              <motion.div
                key={destination.id}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-xl aspect-video cursor-pointer"
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
                  <p className="text-sm text-gray-200 mb-3">{destination.location}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Compass size={16} />
                    <span>{destination.category}</span>
                  </div>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-white/95 rounded-full px-3 py-1 flex items-center gap-1">
                  <Star size={16} className="fill-accent text-accent" />
                  <span className="font-semibold text-sm">{destination.rating}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* View All Button */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Explore All Destinations
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-warm rounded-2xl p-8 md:p-16 text-center text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to list your property?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of hosts earning money by sharing their homes and experiences
            </p>
            <Link
              to="/signup"
              className="inline-block px-8 py-3 bg-white text-secondary font-bold rounded-lg hover:shadow-lg transition-all"
            >
              Become a Host
            </Link>
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How It Works
              </h2>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                number: "1",
                title: "Search",
                description: "Find your perfect homestay by destination, dates, and preferences",
              },
              {
                number: "2",
                title: "Book",
                description: "Reserve your stay with secure payment and instant confirmation",
              },
              {
                number: "3",
                title: "Connect",
                description: "Chat with your host and ask any questions before arrival",
              },
              {
                number: "4",
                title: "Enjoy",
                description: "Experience authentic local life and create unforgettable memories",
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-white rounded-xl p-6 border border-border text-center"
              >
                <div className="w-12 h-12 bg-gradient-travel text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 mx-auto">
                  {step.number}
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
