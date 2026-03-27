import React from "react"
import { IconCloud as UICloud } from "./ui/icon-cloud"

import claude from "../assets/black-claude-logo_svgstack_com_36981774460041.svg"
import copilot from "../assets/black-copilot-logo_svgstack_com_37301774459964.svg"
import gemini from "../assets/black-gemini-logo_svgstack_com_37151774460017.svg"
import mistral from "../assets/black-mistral-ai-logo_svgstack_com_37341774459986.svg"
import qwen from "../assets/black-qwenlm-logo_svgstack_com_37521774459995.svg"
import chatgpt from "../assets/chatgpt-logo_svgstack_com_36931774459919.svg"
import deepseek from "../assets/deepseek-logo_svgstack_com_37061774459954.svg"
import apple from "../assets/free-apple-intelligent-logo_svgstack_com_36901774459978.svg"
import grok from "../assets/grok-ai-app-logo_svgstack_com_37211774460008.svg"

const AI_LOGOS = [
    claude,
    copilot,
    gemini,
    mistral,
    qwen,
    chatgpt,
    deepseek,
    apple,
    grok,
    claude,
    copilot,
    gemini,
    mistral,
    qwen,
    chatgpt,
    deepseek,
    apple,
    grok,
    claude,
    copilot,
    gemini,
    mistral,
    qwen,
    chatgpt,
    deepseek,
    apple,
    grok,
    claude,
    copilot,
    gemini,
    mistral,
    qwen,
    chatgpt,
    deepseek,
    apple,
    grok,
    claude,
    copilot,
    gemini,
    mistral,
    qwen,
    chatgpt,
    deepseek,
    apple,
    grok,
]

export function IconCloud() {
    return (
        <div className="relative flex h-full w-full max-w-[48rem] items-center justify-center overflow-hidden bg-transparent">
            <UICloud images={AI_LOGOS} />
        </div>
    )
}

export default IconCloud
