import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-dark text-white mt-20">
      <div className="container py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-travel rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="font-['Poppins'] font-bold text-xl">TravelNest</span>
            </div>
            <p className="text-gray-300 text-sm">
              Discover authentic local experiences and connect with travelers around the world.
            </p>
          </div>

          {/* For Guests */}
          <div>
            <h3 className="font-bold mb-4">For Guests</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <Link to="/homestays" className="hover:text-white transition-colors">
                  Browse Homestays
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-white transition-colors">
                  Explore Destinations
                </Link>
              </li>
              <li>
                <Link to="/guides" className="hover:text-white transition-colors">
                  Local Guides
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Travel Tips
                </a>
              </li>
            </ul>
          </div>

          {/* For Hosts */}
          <div>
            <h3 className="font-bold mb-4">For Hosts</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  List Your Property
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Host Resources
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-bold mb-4">Connect With Us</h3>
            <div className="flex gap-4 mb-4">
              <a
                href="#"
                className="text-gray-300 hover:text-primary transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-primary transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-primary transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-primary transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
            <p className="text-gray-300 text-sm">
              Subscribe for travel inspiration and deals
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-300 text-sm">
          <p>&copy; {currentYear} TravelNest. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
