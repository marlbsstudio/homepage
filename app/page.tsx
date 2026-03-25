"use client";

import { motion } from "framer-motion";
import { Mail, Globe, MessageCircle, ArrowRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 sm:p-24 overflow-hidden">
      {/* Background Mesh */}
      <div className="bg-mesh" />

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 w-full max-w-2xl flex flex-col items-center text-center space-y-8 gap:12 md:gap-16"
      >
        {/* Logo/Brand */}
        <motion.div variants={itemVariants} className="mb-8">
          <Image
            src="/logo.png"
            alt="Marlbs Logo"
            width={320}
            height={320}
            className="h-20 w-auto"
            quality={100}
            priority
          />
        </motion.div>

        {/* Heading */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-gradient">
            Something <span className="font-bold text-[#2805fe]">amazing</span>{" "}
            <br /> is on its way.
          </h1>
          <p className="text-zinc-500 text-lg sm:text-xl max-w-lg mx-auto">
            We&apos;re working hard to bring you the best experience possible.
            Stay tuned for the launch!
          </p>
        </motion.div>
      </motion.main>

      {/* Footer */}
      <footer className="absolute bottom-6 text-zinc-600 text-sm font-medium">
        © {new Date().getFullYear()} Marlbs. All rights reserved.
      </footer>
    </div>
  );
}
