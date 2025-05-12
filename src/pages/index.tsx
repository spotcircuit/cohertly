import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FaMagic, FaRocket, FaUserFriends, FaChartLine, FaArrowRight } from 'react-icons/fa';
import { useFeatureFlags } from '../utils/featureFlags';

export default function Home() {
  const router = useRouter();
  const featureFlags = useFeatureFlags();
  
  // Always redirect to v2 dashboard by default
  useEffect(() => {
    // Redirect to v2 dashboard
    router.push('/v2/dashboard');
  }, [router]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100">
      {/* Hero Section */}
      <header className="glass-nav py-6">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FaMagic className="text-blue-600 text-2xl" />
            <span className="text-2xl font-bold gradient-text">Cohert</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/v2/dashboard" className="btn-glass bg-blue-600 text-white hover:bg-blue-700">
              Get Started
            </Link>
            <Link href="/v2/dashboard" className="btn-glass">
              Sign In
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="gradient-text">AI-Powered</span> Referral Network
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Connect with the perfect partners, grow your business, and never miss an opportunity again.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/v2/dashboard" className="btn-primary flex items-center justify-center gap-2">
                  Get Started <FaArrowRight />
                </Link>
                <Link href="/v2/dashboard" className="btn-glass">
                  Dashboard
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-200 to-purple-200 rounded-2xl blur-lg opacity-50 transform rotate-3"></div>
                <div className="glass-card p-6 relative">
                  <div className="bg-white bg-opacity-80 rounded-lg p-6 shadow-sm">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <FaRocket className="text-blue-500" /> AI Match Suggestion
                    </h3>
                    <div className="flex items-center mb-4">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3">
                        JP
                      </div>
                      <div>
                        <p className="font-medium">John Peterson</p>
                        <p className="text-sm text-gray-600">Financial Advisor</p>
                      </div>
                      <div className="ml-auto">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          95% Match
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      John would be perfect for your client Sarah's retirement planning needs. His expertise in tax-efficient investing complements your estate planning services.
                    </p>
                    <button className="btn-primary w-full">Connect</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4 bg-white bg-opacity-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Why Professionals Choose Cohert</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="glass-card p-6 flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                  <FaUserFriends className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
                <p className="text-gray-600">
                  Our AI analyzes thousands of data points to find the perfect partners for your clients' needs.
                </p>
              </div>
              
              <div className="glass-card p-6 flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
                  <FaChartLine className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Growth Analytics</h3>
                <p className="text-gray-600">
                  Track your referral network's performance and identify new opportunities for expansion.
                </p>
              </div>
              
              <div className="glass-card p-6 flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
                  <FaMagic className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Effortless Referrals</h3>
                <p className="text-gray-600">
                  Send and receive referrals with a single click. No more lost opportunities or forgotten follow-ups.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12 gradient-text">What Our Users Say</h2>
            
            <div className="glass-card p-8">
              <p className="text-xl italic mb-6">
                "Cohert has transformed how I handle client referrals. I've grown my business by 32% in just six months by connecting with the right partners at the right time."
              </p>
              <div className="flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-gray-200 mr-4"></div>
                <div className="text-left">
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-sm text-gray-600">Estate Planning Attorney</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Referral Network?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of professionals who are growing their businesses with AI-powered referrals.
            </p>
            <Link href="/v2/dashboard" className="btn-glass bg-white text-blue-600 hover:bg-opacity-100 px-8 py-3 text-lg font-medium">
              Get Started Today
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-8 px-4 border-t border-gray-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <FaMagic className="text-blue-600" />
            <span className="font-bold gradient-text">Cohert</span>
          </div>
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Cohert. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
