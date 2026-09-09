import React from 'react';
import { motion } from 'framer-motion';

export default function BlurTextReveal({ text, className = "" }) {
  if (!text) return null;
  const words = text.split(" ");

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.28em]">
          {word.split("").map((char, charIdx) => (
            <motion.span
              key={charIdx}
              initial={{ opacity: 0, filter: "blur(14px)", y: 14 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                delay: (wordIdx * 4 + charIdx) * 0.025,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block transform-gpu"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}
