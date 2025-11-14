/**
 * Contact Form Component
 * For actual human interaction (scary, I know)
 */

'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to send message');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Are you connected to the internet?');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-white font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-white font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
          placeholder="your.email@example.com"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-white font-medium mb-2">
          Subject (Optional)
        </label>
        <input
          type="text"
          id="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
          placeholder="What's this about?"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-white font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
          placeholder="Tell me about your project (or how you found this portfolio)"
        />
      </div>

      {status === 'success' && (
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400">
          Message sent successfully! I&apos;ll get back to you soon.
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
          {errorMessage}
        </div>
      )}

      <Button 
        type="submit" 
        className="w-full" 
        size="lg"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
