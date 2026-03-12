'use client';

import { motion } from 'framer-motion';
import { SOCIAL_LINKS } from '../lib/constants';
import { FaDiscord } from 'react-icons/fa6';

export default function Community() {
  return (
    <section id="community" className="py-24 relative overflow-hidden">
        {/* Background Decorative */}
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Join Our Community</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Connect with cloud developers in the DFW area. Get help, share knowledge, and stay updated on events.
            </p>
            
            <ul className="space-y-4 mb-8">
              {[
                'Daily discussions on cloud architecture & DevOps',
                'Job opportunities and career advice',
                'Early access to event announcements'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={SOCIAL_LINKS.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-lg font-semibold text-lg transition-transform hover:scale-105 shadow-lg"
              >
                <FaDiscord className="text-2xl" />
                Join Our Discord Server
              </a>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Free to join • Active daily discussions • All experience levels welcome
            </p>
          </motion.div>

          {/* Minimal Mockup for Visual Interest */}
          <motion.div 
            className="lg:w-1/2 w-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-card border border-border rounded-xl shadow-2xl relative overflow-hidden flex flex-col z-0">
                <div className="h-12 bg-muted border-b border-border flex items-center px-4 gap-2 shrink-0 relative z-10">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="p-6 space-y-4 relative z-0">
                     <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-border flex-shrink-0" />
                        <div className="space-y-2 w-full">
                            <div className="h-4 bg-border rounded w-1/4" />
                            <div className="h-4 bg-muted rounded w-full" />
                            <div className="h-4 bg-muted rounded w-3/4" />
                        </div>
                     </div>
                     <div className="flex gap-4 pl-12">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex-shrink-0" />
                        <div className="space-y-2 w-full">
                            <div className="h-4 bg-border rounded w-1/4" />
                            <div className="h-4 bg-muted rounded w-full" />
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-border flex-shrink-0" />
                        <div className="space-y-2 w-full">
                             <div className="h-4 bg-border rounded w-1/4" />
                             <div className="h-4 bg-muted rounded w-5/6" />
                        </div>
                     </div>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent h-24 top-auto bottom-0" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
