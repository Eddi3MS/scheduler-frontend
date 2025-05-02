'use client'

import { containerVariants, itemVariants } from '@/lib/motion'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface MotionWrapperProps {
  children: ReactNode
}

export default function MotionCardsWrapper({ children }: MotionWrapperProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {Array.isArray(children)
        ? children.map((child, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  )
}
