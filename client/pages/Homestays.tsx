import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Star, Users, MapPin, Search } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import homestays from "@/data/homestays.json";

export default function Homestays() {
  const [filteredHomestays, setFilteredHomestays] = useState(homestays);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState(100);
  const [minRating, setMinRating] = useState(0);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterHomestays(term, priceRange, minRating);
  };

  const handlePriceChange = (price: number) => {
    setPriceRange(price);
    filterHomestays(searchTerm, price, minRating);
  };

  const handleRatingChange = (rating: number) => {
    setMinRating(rating);
    filterHomestays(searchTerm, priceRange, rating);
  };

  const filterHomestays = (search: string, price: number, rating: number) => {
    const filtered = homestays.filter((h) => {
      const matchesSearch =
        h.title.toLowerCase().includes(search.toLowerCase()) ||
        h.location.toLowerCase().includes(search.toLowerCase());
      const matchesPrice = h.price <= price;
      const matchesRating = h.rating >= rating;

      return matchesSearch && matchesPrice && matchesRating;
    });

    setFilteredHomestays(filtered);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Find Your Perfect Homestay
          </h1>
          <p className="text-muted-foreground">
            Choose from {homestays.length} unique properties across India
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl border border-border p-6 mb-8 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Search by location or name
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Max Price: ${priceRange}
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={priceRange}
                onChange={(e) => handlePriceChange(parseInt(e.target.value))}
                className="w-full cursor-pointer accent-primary"
              />
            </div>

            {/* Rating */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Minimum Rating: {minRating.toFixed(1)}
              </label>
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={minRating}
                onChange={(e) => handleRatingChange(parseFloat(e.target.value))}
                className="w-full cursor-pointer accent-primary"
              />
            </div>
          </div>
        </motion.div>

        {/* Results */}
        {filteredHomestays.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredHomestays.map((homestay) => (
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
                      <span>{homestay.bedrooms} beds</span>
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
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-lg text-muted-foreground">
              No homestays found matching your criteria. Try adjusting your filters.
            </p>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
