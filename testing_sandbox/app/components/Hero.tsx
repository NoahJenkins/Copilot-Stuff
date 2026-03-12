'use client';

import { motion } from 'framer-motion';
import { SOCIAL_LINKS } from '../lib/constants';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 bg-grid-pattern">
      <div className="absolute inset-0 bg-background/80 dark:bg-background/90 -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Column: Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-left"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Where DFW&apos;s <br />
              <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-500 dark:to-emerald-400">
                Cloud Developers
              </span>{' '}
              <br />
              Connect & Grow
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl">
              Join 1+ developers building the future of cloud computing in Texas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={SOCIAL_LINKS.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-transparent border-2 border-primary text-primary rounded-md font-mono font-semibold text-lg hover:bg-primary/10 transition-transform hover:-translate-y-1 text-center"
              >
                $ join --discord
              </a>
            </div>
          </motion.div>

          {/* Right Column: Graphic */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 hidden lg:flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-square rounded-2xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col">
              <div className="h-8 bg-muted border-b border-border flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="p-6 font-mono text-sm sm:text-base text-muted-foreground flex-1 flex flex-col justify-center">
                <p><span className="text-primary">root@dfw-cloud-devs</span>:~# status</p>
                <p className="text-emerald-500">● Core Infrastructure Systems Operational</p>
                <p className="text-cyan-500 mt-2">→ Connecting to local cluster...</p>
                <p className="text-emerald-500">✓ Connected successfully</p>
                <p className="mt-4"><span className="text-primary">root@dfw-cloud-devs</span>:~# deploy network <span className="animate-pulse">_</span></p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
