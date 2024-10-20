'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { PhoneCall, Users, Bot, BarChart, CheckCircle, ArrowRight } from 'lucide-react'

export function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center">
            <PhoneCall className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900">Call Vise</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/features" className="text-gray-500 hover:text-gray-900">Features</Link>
            <Link href="/contact" className="text-gray-500 hover:text-gray-900">Contact</Link>
            <Button size="sm" variant="default" className="bg-gray-900 hover:bg-gray-700 text-white" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
                Your Personal AI Assistant
              </h1>
              <p className="mt-3 max-w-md mx-auto text-xl sm:text-2xl md:mt-5 md:max-w-3xl">
                Boost productivity and simplify your life with AI-powered task management
              </p>
              <div className="mt-10 flex justify-center">
                <Button size="lg" asChild>
                  <Link href="/auth/login">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" className="ml-4 bg-white text-blue-600 hover:bg-blue-50" asChild>
                  <Link href="/demo">Request Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Why Choose AI Vise?
              </h2>
              <p className="mt-4 text-xl text-gray-600">
                Empower yourself with cutting-edge AI technology
              </p>
            </div>

            <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Users className="h-8 w-8 text-blue-600" />}
                title="Smart Task Management"
                description="Efficiently organize and manage your tasks with our intuitive system."
              />
              <FeatureCard
                icon={<Bot className="h-8 w-8 text-blue-600" />}
                title="AI-Powered Assistance"
                description="Leverage AI to handle routine tasks and boost your productivity."
              />
              <FeatureCard
                icon={<BarChart className="h-8 w-8 text-blue-600" />}
                title="Personal Analytics"
                description="Gain valuable insights into your productivity with comprehensive reporting tools."
              />
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Testimonials</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Loved by Users Everywhere
              </p>
            </div>
            <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                {[
                  {
                    name: "Sarah Thompson",
                    role: "Freelance Designer",
                    quote: "AI Vise has transformed my workflow. The AI assistant has significantly reduced my task management time and improved my productivity."
                  },
                  {
                    name: "Michael Chen",
                    role: "Small Business Owner",
                    quote: "The insights provided by AI Vise have given me unprecedented understanding of my work patterns. It's been a game-changer for my time management."
                  }
                ].map((testimonial) => (
                  <div key={testimonial.name} className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                        <CheckCircle className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{testimonial.name}</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                      "{testimonial.quote}"
                      <p className="mt-2 text-sm text-gray-400">{testimonial.role}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="py-20 bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Ready to transform your productivity?
              </h2>
              <p className="mt-4 text-xl text-blue-100">
                Join thousands of satisfied users who have revolutionized their daily lives with AI Vise
              </p>
              <div className="mt-8 flex justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/auth/login">Start Your Free Trial</Link>
                </Button>
                {/* <Button size="lg" variant="outline" className="ml-4 text-white border-white hover:bg-blue-700" asChild>
                  <Link href="/pricing">View Pricing <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button> */}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Product</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/features" className="text-gray-300 hover:text-white">Features</Link></li>
                {/* <li><Link href="/pricing" className="text-gray-300 hover:text-white">Pricing</Link></li> */}
                <li><Link href="/demo" className="text-gray-300 hover:text-white">Request Demo</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
                {/* <li><Link href="/careers" className="text-gray-300 hover:text-white">Careers</Link></li> */}
                <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            {/* <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/blog" className="text-gray-300 hover:text-white">Blog</Link></li>
                <li><Link href="/support" className="text-gray-300 hover:text-white">Support</Link></li>
                <li><Link href="/docs" className="text-gray-300 hover:text-white">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-300 hover:text-white">Terms of Service</Link></li>
              </ul>
            </div> */}
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 flex items-center justify-between">
            <p className="text-gray-400">&copy; 2024 Call Vise. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
