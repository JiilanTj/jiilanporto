/**
 * Footer Component
 * The bottom of the page where I pretend to have a social life
 */

import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/jiilan', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/jiilan', label: 'LinkedIn' },
    { icon: FaTwitter, href: 'https://twitter.com/jiilan', label: 'Twitter' },
    { icon: FaEnvelope, href: 'mailto:jiilan@example.com', label: 'Email' },
  ];

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-linear-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-4">
              Jiilan Nashrulloh Tanjung
            </h3>
            <p className="text-gray-400 text-sm">
              Full-Stack & Mobile Developer
              <br />
              Depressed coder forced to code since 2016.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon size={24} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>
            © {currentYear} Jiilan Nashrulloh Tanjung. All rights reserved.
            <br />
            <span className="text-gray-500">Built with Next.js, suffering, and excessive caffeine.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
