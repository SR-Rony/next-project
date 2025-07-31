
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import aboutImg from "@/public/about/about.png"
import Image from "next/image"

export default function About() {
  return (
    <div className="min-h-screen bg-white text-gray-700">
      {/* Hero */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <Badge className="mb-4">About Us</Badge>
          <h1 className="text-4xl font-bold mb-4 text-primary">Welcome to Azpero</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
           {` Your one-stop destination for premium products and unbeatable deals. We're passionate about delivering quality and trust.`}
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-gray-600 mb-4">
              Azpero started with a simple mission — make shopping better, smarter, and more affordable for everyone.
              We’re not just another online store. We are a brand that cares deeply about customer satisfaction, innovation, and community impact.
            </p>
            <p className="text-gray-600">
              From humble beginnings to a growing customer base across the globe, our story continues with your support.
            </p>
          </div>
          <div>
            <Image
              src={aboutImg}
              alt="about-image"
              width={600}
              height={400}
              className="rounded-lg shadow"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">Why Choose Azpero?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
              <h4 className="text-xl font-semibold mb-2">Quality Products</h4>
              <p className="text-gray-600">We handpick the best items to ensure quality and satisfaction every time you shop.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
              <h4 className="text-xl font-semibold mb-2">Fast & Free Shipping</h4>
              <p className="text-gray-600">Enjoy lightning-fast deliveries with free shipping on most products.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
              <h4 className="text-xl font-semibold mb-2">24/7 Support</h4>
              <p className="text-gray-600">We’re here for you anytime. Just reach out and we’ll be happy to help.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16 bg-primary text-white">
        <h2 className="text-3xl font-bold mb-4">Be Part of the Azpero Family</h2>
        <p className="mb-6 text-lg">Join our newsletter to get exclusive deals and early access to products.</p>
        <Button variant="secondary">Subscribe Now</Button>
      </section>
    </div>
  )
}
