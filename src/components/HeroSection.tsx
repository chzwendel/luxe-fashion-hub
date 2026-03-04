import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBanner from "@/assets/hero-banner.jpg";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBanner})` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-foreground/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-display text-xs tracking-[0.4em] text-primary-foreground/70 mb-4 uppercase"
        >
          New Collection 2026
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-primary-foreground tracking-tight leading-none mb-8"
        >
          DEFINE
          <br />
          YOUR STYLE
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Button variant="hero" size="lg" asChild>
            <Link to="/#products">SHOP NOW</Link>
          </Button>
        </motion.div>
      </div>

      {/* Video decorative element - small floating */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 right-8 w-48 h-28 md:w-64 md:h-36 overflow-hidden hidden md:block"
      >
        <video
          src="/videos/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </motion.div>
    </section>
  );
}
