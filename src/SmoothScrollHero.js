import Lenis from "@studio-freight/lenis";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { SiSpacex } from "react-icons/si";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { useRef, useEffect } from "react";
import img1 from "../src/images/img1.jpeg"
import img2 from "../src/images/img2.png"
import img3 from "../src/images/img3.jpg"
import img4 from "../src/images/img4.png"

import img from "../src/images/img.jpg"


export const SmoothScrollHero = () => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="bg-white">
      <Hero />
      <Schedule />
    </div>
  );
};



const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <HeroText />
      <CenterImage />
      <ParallaxImages />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-white/0 to-white" />
    </div>
  );
};

const HeroText = () => {
  const { scrollY } = useScroll();
  const fadeOut = useTransform(scrollY, [0, SECTION_HEIGHT], [1, 0]);

  return (
    <motion.div
      className="fixed inset-x-0 top-1/3 text-center z-20"
      style={{ opacity: fadeOut }}
    >
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-800 mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
        Welcome to Asymmetric-learn
      </h1>
      <p className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-zinc-700 to-zinc-600 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
        Explore upcoming launches and witness history in the making.
      </p>
    </motion.div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();
  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);
  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;
  const backgroundSize = useTransform(scrollY, [0, SECTION_HEIGHT + 500], ["170%", "100%"]);
  const opacity = useTransform(scrollY, [SECTION_HEIGHT, SECTION_HEIGHT + 500], [1, 0]);

  return (
    <motion.div
      className="sticky top-0 h-screen w-full rounded-xl"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage:`url(${img})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
      src={img1}
        alt="img1"
        start={-200}
        end={200}
        className="w-1/3 rounded-3xl"
      
      />
      <ParallaxImg
      src={img4}
        alt="img4"
        start={200}
        end={-250}
        className="mx-auto w-2/3 rounded-3xl"
      />
      <ParallaxImg
        src={img3}
        alt="img3"
        start={-700}
        end={200}
        className="ml-auto w-1/3 rounded-3xl"
      />
      <ParallaxImg
        src={img2}
        alt="Orbiting satellite"
        start={-100}
        end={-500}
        className="ml-24 w-5/12"
      />
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

const Schedule = () => {
  return (
    <section
      id="launch-schedule"
      className="mx-auto max-w-5xl px-4 py-48 text-center text-indigo-700"
    >
      
      <div className="pt-20">
        <ScheduleItem title="NG-21" date="Dec 9th" location="Florida" />
        <ScheduleItem title="Starlink" date="Dec 20th" location="Texas" />
        <ScheduleItem title="Starlink" date="Jan 13th" location="Florida" />
        <ScheduleItem title="Turksat 6A" date="Feb 22nd" location="Florida" />
        <ScheduleItem title="NROL-186" date="Mar 1st" location="California" />
        <ScheduleItem title="GOES-U" date="Mar 8th" location="California" />
        <ScheduleItem title="ASTRA 1P" date="Apr 8th" location="Texas" />
      </div>
    </section>
  );
};

const ScheduleItem = ({ title, date, location }) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="mb-9 flex items-center justify-between border-b border-indigo-300 px-3 pb-9"
    >
      <div>
        <p className="text-xl font-semibold text-indigo-700">{title}</p>
        <p className="text-sm text-indigo-500">{date}</p>
      </div>
      <p className="flex items-center gap-2 text-sm text-indigo-500">
        <FiMapPin /> {location}
      </p>
    </motion.div>
  );
};
