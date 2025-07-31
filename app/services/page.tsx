import { Phone, Mail, MapPin, Truck, RotateCcw } from "lucide-react"

export default function CustomerServicePage(){
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold mb-6 text-primary">Customer Service</h1>

      {/* Section: Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="flex items-start gap-4">
          <Phone className="text-primary" />
          <div>
            <h4 className="font-semibold text-lg">Phone Support</h4>
            <p className="text-sm text-gray-600">Call us: +880 1234 567 890</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Mail className="text-primary" />
          <div>
            <h4 className="font-semibold text-lg">Email Us</h4>
            <p className="text-sm text-gray-600">support@azpero.com</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <MapPin className="text-primary" />
          <div>
            <h4 className="font-semibold text-lg">Visit Us</h4>
            <p className="text-sm text-gray-600">123 Azpero Street, Dhaka, Bangladesh</p>
          </div>
        </div>
      </div>

      {/* Section: FAQs */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-6 text-sm text-gray-700">
          <div>
            <h4 className="font-medium text-lg">How can I track my order?</h4>
            <p>Once your order is shipped, we’ll send you a tracking number by email.</p>
          </div>
          <div>
            <h4 className="font-medium text-lg">What’s your return policy?</h4>
            <p>You can return any item within 7 days. It must be unused and in its original packaging.</p>
          </div>
          <div>
            <h4 className="font-medium text-lg">Do you offer international shipping?</h4>
            <p>Yes, we ship to most countries. Additional shipping charges may apply.</p>
          </div>
        </div>
      </div>

      {/* Section: Returns & Shipping Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="p-6 border rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <RotateCcw className="text-primary" />
            <h3 className="text-lg font-semibold">Return Policy</h3>
          </div>
          <p className="text-sm text-gray-700">
            {`If you're not satisfied, return the item within 7 days for a full refund. Please ensure it's unused and with original tags.`}
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Truck className="text-primary" />
            <h3 className="text-lg font-semibold">Shipping Information</h3>
          </div>
          <p className="text-sm text-gray-700">
            Orders are processed within 1–2 business days. Standard delivery takes 3–5 business days. Express options available.
          </p>
        </div>
      </div>
    </div>
  )
}
