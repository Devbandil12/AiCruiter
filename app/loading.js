"use client"

import { motion } from "framer-motion"

function LoadingThreeDotsJumping() {
    const dotVariants = {
        jump: {
            y: -28,
            transition: {
                duration: 0.8,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
            },
        },
    }

    return (
        <motion.div
            animate="jump"
            transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
            className="aicruiter-loader"
        >
            <motion.div className="aicruiter-dot" variants={dotVariants} />
            <motion.div className="aicruiter-dot" variants={dotVariants} />
            <motion.div className="aicruiter-dot" variants={dotVariants} />
            <StyleSheet />
        </motion.div>
    )
}

function StyleSheet() {
    return (
        <style>
            {`
            .aicruiter-loader {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 10px;
            }

            .aicruiter-dot {
                width: 14px;
                height: 14px;
                border-radius: 50%;
                background-color: #9333ea;
                will-change: transform;
            }
            `}
        </style>
    )
}

export default LoadingThreeDotsJumping
