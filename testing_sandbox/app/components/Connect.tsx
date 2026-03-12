'use client';

import { motion } from 'framer-motion';
import { SOCIAL_LINKS } from '../lib/constants';
import { FaDiscord, FaLinkedin, FaXTwitter, FaCalendar } from 'react-icons/fa6';


const CONNECT_LINKS = [
  {
    name: 'Discord',
    icon: FaDiscord,
    href: SOCIAL_LINKS.discord,
    label: 'Join Our Server',
    color: 'bg-[#5865F2] hover:bg-[#4752C4]',
    textColor: 'text-white'
  },
  {
    name: 'Lu.ma',
    icon: FaCalendar,
    href: SOCIAL_LINKS.luma,
    label: 'RSVP to Events',
    color: 'bg-white border-2 border-[#EB4432] text-[#EB4432] hover:bg-[#EB4432] hover:text-white',
    darkColor: 'dark:bg-transparent dark:text-[#EB4432] dark:hover:bg-[#EB4432] dark:hover:text-white',
    textColor: ''
  },
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    href: SOCIAL_LINKS.linkedin,
    label: 'Follow us',
    color: 'bg-[#0077B5] hover:bg-[#005E93]',
    textColor: 'text-white'
  },
  {
    name: 'X (Twitter)',
    icon: FaXTwitter,
    href: SOCIAL_LINKS.twitter,
    label: 'Connect on X',
    color: 'bg-black hover:bg-gray-800',
    darkColor: 'dark:bg-white dark:text-black dark:hover:bg-gray-200',
    textColor: 'text-white'
  }
];

export default function Connect() {
  return (
    <section id="connect" className="py-24">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Connect With Us</h2>
          <p className="text-lg text-muted-foreground">
            Follow us on social media and join our community channels to stay in the loop.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {CONNECT_LINKS.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`
                  flex flex-col items-center justify-center p-8 rounded-xl
                  transition-all duration-300 transform hover:scale-105 shadow-md
                  ${link.name === 'Lu.ma' || link.name === 'X (Twitter)' ? '' : link.color}
                  ${link.name === 'Lu.ma' ? `${link.color} ${link.darkColor}` : ''}
                  ${link.name === 'X (Twitter)' ? `${link.color} ${link.darkColor}` : ''}
                  ${link.name !== 'Lu.ma' && link.name !== 'X (Twitter)' ? link.textColor : ''}
                `}
              >
                <Icon className="text-4xl mb-4" />
                <span className="font-bold text-lg">{link.name}</span>
                <span className="text-sm opacity-90">{link.label}</span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
