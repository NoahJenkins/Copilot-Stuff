'use client';

import { motion } from 'framer-motion';
import { STATS } from '../lib/constants';
import { FaUserGroup, FaCalendarCheck, FaLayerGroup } from 'react-icons/fa6';

const icons = [FaUserGroup, FaCalendarCheck, FaLayerGroup];

export default function About() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Who We Are</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            DFW Cloud Devs is a group for developers and cloud engineers of all backgrounds and skill levels in DFW Texas. Our mission is to bring the community together and learn best practices and technologies so we can all build awesome software solutions and deploy them to the Cloud.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {STATS.map((stat, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card text-card-foreground p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow text-center relative group overflow-hidden"
              >
                 <div className="absolute top-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 text-primary rounded-full mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Icon className="text-3xl" />
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
