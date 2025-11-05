import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight, Compass, CheckCircle } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { Layout } from "@/components/layout/Layout";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"tourist" | "host" | "guide">("tourist");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState("");
  const { signup } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (!agreedToTerms) {
      setError("You must agree to the terms and conditions");
      return;
    }

    signup(name, email, password, role);
    navigate("/");
  };

  const roleOptions = [
    {
      value: "tourist",
      label: "I'm a Traveler",
      description: "Book unique stays and experiences",
      icon: "✈️",
    },
    {
      value: "host",
      label: "I'm a Host",
      description: "List your property and earn money",
      icon: "🏠",
    },
    {
      value: "guide",
      label: "I'm a Guide",
      description: "Share local experiences and tips",
      icon: "🗺️",
    },
  ];

  return (
    <Layout>
      <div className="min-h-[calc(100vh-120px)] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-border p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mx-auto mb-4">
                <Compass size={32} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Join TravelNest
              </h1>
              <p className="text-muted-foreground">
                Create your account in seconds
              </p>
            </div>

            {/* Role Selection */}
            <div className="mb-6">
              <label className="text-sm font-medium text-foreground block mb-3">
                What brings you here?
              </label>
              <div className="space-y-2">
                {roleOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      role === option.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={option.value}
                      checked={role === option.value}
                      onChange={(e) =>
                        setRole(e.target.value as typeof role)
                      }
                      className="w-4 h-4"
                    />
                    <span className="ml-2 mr-2 text-lg">{option.icon}</span>
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        {option.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Name */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              {/* Terms & Conditions */}
              <label className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5"
                />
                <p className="text-sm text-muted-foreground">
                  I agree to the{" "}
                  <a href="#" className="text-primary font-medium hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary font-medium hover:underline">
                    Privacy Policy
                  </a>
                </p>
              </label>

              {/* Sign Up Button */}
              <button
                type="submit"
                className="w-full bg-gradient-warm text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Create Account
                <ArrowRight size={20} />
              </button>
            </form>

            {/* Sign In Link */}
            <p className="text-center text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-bold hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 space-y-2 text-sm"
          >
            <div className="flex gap-2 text-green-600">
              <CheckCircle size={18} className="flex-shrink-0 mt-0.5" />
              <span>Secure and encrypted accounts</span>
            </div>
            <div className="flex gap-2 text-green-600">
              <CheckCircle size={18} className="flex-shrink-0 mt-0.5" />
              <span>24/7 customer support</span>
            </div>
            <div className="flex gap-2 text-green-600">
              <CheckCircle size={18} className="flex-shrink-0 mt-0.5" />
              <span>Verified reviews and ratings</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
}
