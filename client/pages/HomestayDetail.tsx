import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  Heart,
  Share2,
  MapPin,
  Users,
  Wifi,
  Coffee,
  Wind,
  MessageCircle,
  Calendar,
  ArrowLeft,
  Check,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import homestays from "@/data/homestays.json";
import attractions from "@/data/attractions.json";

export default function HomestayDetail() {
  const { id } = useParams();
  const homestay = homestays.find((h) => h.id === parseInt(id || "0"));
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!homestay) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Homestay not found</h1>
          <Link
            to="/homestays"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft size={20} />
            Back to Homestays
          </Link>
        </div>
      </Layout>
    );
  }

  const amenityIcons: { [key: string]: React.ReactNode } = {
    WiFi: <Wifi size={20} />,
    Kitchen: <Coffee size={20} />,
    AC: <Wind size={20} />,
  };

  const nearbyAttractions = attractions.slice(0, 3);

  return (
    <Layout>
      {/* Header Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="container py-4 flex items-center gap-4"
      >
        <Link
          to="/homestays"
          className="flex items-center gap-2 text-primary hover:underline font-medium"
        >
          <ArrowLeft size={20} />
          Back
        </Link>
      </motion.div>

      {/* Image Gallery */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mb-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Image */}
          <div className="lg:col-span-2">
            <div className="relative aspect-video lg:aspect-auto lg:h-96 bg-muted rounded-2xl overflow-hidden group">
              <img
                src={homestay.images[selectedImage]}
                alt={`${homestay.title} - ${selectedImage + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                <Heart
                  size={24}
                  className={isWishlisted ? "fill-secondary text-secondary" : "text-gray-400"}
                />
              </button>
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible">
            {homestay.images.map((image, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`flex-shrink-0 w-20 h-20 lg:w-full lg:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === idx ? "border-primary" : "border-transparent"
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="container grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2"
        >
          {/* Title and Basic Info */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">{homestay.title}</h1>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`${
                        i < Math.floor(homestay.rating)
                          ? "fill-accent text-accent"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-lg">{homestay.rating}</span>
                <span className="text-muted-foreground">
                  ({homestay.reviews} reviews)
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={20} />
                <span>{homestay.location}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 py-6 border-t border-b border-border">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Guests</p>
                <p className="text-xl font-bold text-foreground">{homestay.guests}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Bedrooms</p>
                <p className="text-xl font-bold text-foreground">{homestay.bedrooms}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Bathrooms</p>
                <p className="text-xl font-bold text-foreground">{homestay.bathrooms}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">About this place</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {homestay.description}
            </p>
          </div>

          {/* Amenities */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {homestay.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-primary">
                    {amenityIcons[amenity] || <Check size={20} />}
                  </div>
                  <span className="text-foreground font-medium">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Host Information */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Meet your host</h2>
            <div className="flex items-start gap-4">
              <img
                src={homestay.host.image}
                alt={homestay.host.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {homestay.host.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Host since {homestay.host.joinDate}
                </p>
                <button className="flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-medium">
                  <MessageCircle size={18} />
                  Contact Host
                </button>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Reviews</h2>
            <div className="space-y-6">
              {homestay.reviews_data.map((review, idx) => (
                <div key={idx} className="pb-6 border-b border-border last:border-b-0">
                  <div className="flex items-start gap-4 mb-3">
                    <img
                      src={`https://i.pravatar.cc/150?img=${idx}`}
                      alt={review.author}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-foreground">{review.author}</h4>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <div className="flex gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${
                              i < review.rating
                                ? "fill-accent text-accent"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground">{review.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nearby Attractions */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Nearby Attractions
            </h2>
            <div className="space-y-4">
              {nearbyAttractions.map((attraction) => (
                <div
                  key={attraction.id}
                  className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    <img
                      src={attraction.image}
                      alt={attraction.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground mb-1">
                        {attraction.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {attraction.location}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Star size={16} className="fill-accent text-accent" />
                          <span className="text-sm font-semibold">
                            {attraction.rating}
                          </span>
                        </div>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {attraction.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Booking Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div className="sticky top-24 bg-white border border-border rounded-2xl p-6 shadow-lg">
            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold text-primary">
                  ${homestay.price}
                </span>
                <span className="text-muted-foreground">/night</span>
              </div>
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-accent text-accent" />
                <span className="font-semibold">{homestay.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({homestay.reviews})
                </span>
              </div>
            </div>

            {/* Booking Form */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Check-in
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Check-out
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Guests
                </label>
                <select className="w-full px-3 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3+ Guests</option>
                </select>
              </div>
            </div>

            {/* Reserve Button */}
            <button className="w-full bg-gradient-travel text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all mb-4">
              <Calendar className="inline mr-2" size={20} />
              Reserve
            </button>

            {/* Info */}
            <div className="text-center text-sm text-muted-foreground">
              You won't be charged yet
            </div>

            {/* Share */}
            <button className="w-full flex items-center justify-center gap-2 mt-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors font-medium text-foreground">
              <Share2 size={18} />
              Share
            </button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
