'use client'

import React from 'react'
import { Container } from '@/components/container'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface AlternatingFeatureProps {
    title: string
    description: string
    children?: React.ReactNode
    image?: React.ReactNode
    align?: 'left' | 'right'
    className?: string
    step?: string
}

export function AlternatingFeature({
    title,
    description,
    children,
    image,
    align = 'left',
    className,
    step,
}: AlternatingFeatureProps) {
    return (
        <div className={cn('py-24 overflow-hidden', className)}>
            <Container className="">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
                    {/* Text Content */}
                    <motion.div
                        className={cn(align === 'right' ? 'lg:order-2' : '')}
                        initial={{ opacity: 0, x: align === 'right' ? 40 : -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {step && (
                            <motion.div
                                className="mb-4 w-fit bg-gradient-to-r from-[#9333ea] to-[#db2777] bg-clip-text text-5xl font-semibold tracking-tight text-transparent sm:text-6xl"
                                initial={{ opacity: 0, y: 8 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                {step}
                            </motion.div>
                        )}
                        <motion.h2
                            className="text-3xl font-medium tracking-tighter text-gray-950 sm:text-4xl lg:text-5xl mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {title}
                        </motion.h2>
                        <motion.p
                            className="text-lg text-gray-600 mb-8 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {description}
                        </motion.p>
                        {children && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {children}
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        className={cn('mt-12 lg:mt-0', align === 'right' ? 'lg:order-1' : '')}
                        initial={{ opacity: 0, x: align === 'right' ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="group relative transition-transform duration-500 hover:scale-[1.02]">
                            {image}
                        </div>
                    </motion.div>
                </div>
            </Container>
        </div>
    )
}
