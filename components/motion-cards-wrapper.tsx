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
      className="flex flex-wrap gap-4"
    >
      {Array.isArray(children)
        ? children.map((child, idx) => (
            <motion.div key={idx} variants={itemVariants} className="flex-1">
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  )
}
