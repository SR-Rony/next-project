
import { Phone, Mail, MapPin } from "lucide-react"

export default function ContactPage(){
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-primary mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600">
          Have a question, issue, or suggestion? We&apos;d love to hear from you.
        </p>
      </section>

      {/* Contact Info Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 text-sm text-gray-700">
        <div className="flex items-start gap-3">
          <Phone className="text-primary" />
          <div>
            <h4 className="font-semibold text-base">Phone</h4>
            <p>+880 1234 567 890</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Mail className="text-primary" />
          <div>
            <h4 className="font-semibold text-base">Email</h4>
            <p>support@azpero.com</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MapPin className="text-primary" />
          <div>
            <h4 className="font-semibold text-base">Office</h4>
            <p>123 Azpero St, Dhaka, Bangladesh</p>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="rounded-lg overflow-hidden shadow-md">
        <iframe
          title="Azpero Map"
          className="w-full h-[300px] md:h-[400px]"
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.8503400176225!2d90.40714387508643!3d23.75279548907008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8bf735e4e7b%3A0xbcb2f53f4296c68e!2sDhaka!5e0!3m2!1sen!2sbd!4v1718804017499"
        ></iframe>
      </section>

      {/* Footer Note */}
      <div className="text-sm text-gray-500 text-center mt-10">
        &copy; {new Date().getFullYear()} Azpero. All rights reserved.
      </div>
    </div>
  )
}
