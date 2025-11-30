"use client"
import React, { useState, useEffect } from 'react';
import { BookOpen, Zap, Brain, Code, TrendingUp, Check, Menu, X, Download, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function MaphyLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Advanced Mathematics",
      description: "Solve complex equations, calculus, linear algebra, and more with step-by-step explanations"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Interactive Graphing",
      description: "Visualize functions, plot data, and create stunning mathematical visualizations"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Physics Simulations",
      description: "Understand mechanics, thermodynamics, electromagnetism with interactive models"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Computer Science",
      description: "Algorithm analysis, data structures, complexity theory, and programming assistance"
    }
  ];

  const benefits = [
    "24/7 AI-powered assistance",
    "Step-by-step problem solving",
    "Interactive visualizations",
    "Research paper analysis",
    "Code debugging & optimization",
    "Conceptual explanations"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-bold text-slate-900">Maphy</span>
            </div>

            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-slate-700 hover:text-purple-600 transition">Features</a>
              <a href="#about" className="text-slate-700 hover:text-purple-600 transition">About</a>
              <a href="#pricing" className="text-slate-700 hover:text-purple-600 transition">Pricing</a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <a
                href="https://github.com/Rohit-Solanki-6105/maphy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-700 hover:text-slate-900 transition"
              >
                <Github className="w-6 h-6" />
              </a>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition transform hover:scale-105 flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>

            <button
              className="md:hidden text-slate-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-slate-200">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-slate-700 hover:text-purple-600">Features</a>
              <a href="#about" className="block text-slate-700 hover:text-purple-600">About</a>
              <a href="#pricing" className="block text-slate-700 hover:text-purple-600">Pricing</a>
              <a
                href="https://github.com/Rohit-Solanki-6105/maphy"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-slate-700 hover:text-purple-600"
              >
                GitHub
              </a>
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full flex items-center justify-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-block animate-bounce mb-4">
              <Brain className="w-20 h-20 text-purple-600 mx-auto" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 animate-fade-in">
              Meet <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">Maphy</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-700 mb-4 max-w-3xl mx-auto">
              Your AI-powered assistant for Mathematics, Graphing, Physics, and Computer Science research & solutions
            </p>
            <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full mb-8 border border-green-300">
              <span className="font-semibold">🎉 Open Source & Free Forever</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition transform hover:scale-105 flex items-center justify-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Download Now</span>
              </button>
              <button className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-600 hover:text-white transition flex items-center justify-center space-x-2">
                <Github className="w-5 h-5" />
                <span>View on GitHub</span>
              </button>
            </div>
          </div>

          {/* Floating Elements Animation */}
          <div className="relative mt-16 h-64">
            <div className="absolute top-0 left-1/4 animate-float">
              <div className="bg-purple-200 backdrop-blur-lg rounded-lg p-4 shadow-lg border border-purple-300">
                <code className="text-purple-700">∫ f(x)dx</code>
              </div>
            </div>
            <div className="absolute top-12 right-1/4 animate-float-delay-1">
              <div className="bg-pink-200 backdrop-blur-lg rounded-lg p-4 shadow-lg border border-pink-300">
                <code className="text-pink-700">E = mc²</code>
              </div>
            </div>
            <div className="absolute bottom-0 left-1/3 animate-float-delay-2">
              <div className="bg-blue-200 backdrop-blur-lg rounded-lg p-4 shadow-lg border border-blue-300">
                <code className="text-blue-700">O(log n)</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-slate-600">Everything you need for academic excellence</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 hover:shadow-xl transition transform hover:scale-105 border border-slate-200"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-purple-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Why Choose Maphy?
              </h2>
              <p className="text-xl text-slate-600 mb-8">
                Maphy combines cutting-edge AI with deep subject expertise to help you tackle the most challenging problems in STEM fields.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 backdrop-blur-lg rounded-3xl p-8 border border-purple-200 shadow-xl">
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-md">
                    <p className="text-purple-600 font-mono text-sm mb-2">Query:</p>
                    <p className="text-slate-900">Solve: x² + 5x + 6 = 0</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-md">
                    <p className="text-pink-600 font-mono text-sm mb-2">Solution:</p>
                    <p className="text-slate-900">x = -2 or x = -3</p>
                    <p className="text-slate-600 text-sm mt-2">Step-by-step explanation provided ✓</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-300 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-pink-300 rounded-full blur-3xl opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Join thousands of students and researchers using Maphy. It's open source and completely free!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition transform hover:scale-105 flex items-center justify-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Download Free</span>
            </button>
            <button className="border-2 border-slate-900 text-slate-900 px-12 py-4 rounded-full text-lg font-semibold hover:bg-slate-900 hover:text-white transition flex items-center justify-center space-x-2">
              <Github className="w-5 h-5" />
              <span>Star on GitHub</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900/50 backdrop-blur-lg py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="w-6 h-6 text-purple-400" />
                <span className="text-xl font-bold text-white">Maphy</span>
              </div>
              <p className="text-white mb-4">Open source AI-powered STEM assistance</p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/Rohit-Solanki-6105/maphy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white transition"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://twitter.com/maphy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white transition"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/company/maphy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white transition"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:hello@maphy.dev"
                  className="text-white hover:text-white transition"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-white">
                <li><a href="#" className="hover:text-purple-400 transition">Features</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">Documentation</a></li>
                <li><a href="https://github.com/Rohit-Solanki-6105/maphy" className="hover:text-purple-400 transition">GitHub</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">Download</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-white">
                {/* <li><a href="#" className="hover:text-purple-400 transition">Discord</a></li> */}
                <li><a href="#" className="hover:text-purple-400 transition">Contributors</a></li>
                {/* <li><a href="#" className="hover:text-purple-400 transition">Forum</a></li> */}
              </ul>
            </div>
            {/* <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-white">
                <li><a href="#" className="hover:text-purple-400 transition">Tutorial</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">Blog</a></li>
                <li><a href="#" className="hover:text-purple-400 transition">License (MIT)</a></li>
              </ul>
            </div> */}
          </div>
          <div className="border-t border-slate-700 mt-12 pt-8 text-center text-white">
            <p>&copy; 2024 Maphy. Open Source under MIT License.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delay-1 {
          animation: float 3s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-float-delay-2 {
          animation: float 3s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-in;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}