import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight } from "lucide-react";

interface PlaceholderProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export function Placeholder({ title, description, icon }: PlaceholderProps) {
  return (
    <Layout>
      <div className="container py-24 text-center">
        <div className="max-w-2xl mx-auto">
          {icon && (
            <div className="text-6xl mb-6 flex justify-center opacity-20">
              {icon}
            </div>
          )}
          <h1 className="text-4xl font-bold text-foreground mb-4">{title}</h1>
          <p className="text-lg text-muted-foreground mb-8">{description}</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-travel text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Back to Home
            <ArrowRight size={20} />
          </Link>
          <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              💡 This page is a placeholder. Continue building the app by providing more details
              about what features you'd like to see here!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
