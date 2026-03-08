import {
    AnimatedSpan,
    Terminal,
    TypingAnimation,
} from "@/components/ui/terminal"

export function TerminalDemo2() {
    return (
        <Terminal className="w-500 h-full">
            <TypingAnimation>&gt; commentme --help</TypingAnimation>

            <AnimatedSpan className="text-green-500">
                commentme CLI
            </AnimatedSpan>

            <AnimatedSpan className="text-green-500">
                Commands:
            </AnimatedSpan>

            <AnimatedSpan className="text-blue-400">
                <span>commentme --login / --signup / --logout</span>
                <span className="text-gray-500 italic ml-2"># Auth</span>
            </AnimatedSpan>

            <AnimatedSpan className="text-blue-400">
                <span>commentme --get line-7-7 &lt;file&gt;</span>
                <span className="text-gray-500 italic ml-2"># Get specific</span>
            </AnimatedSpan>

            <AnimatedSpan className="text-blue-400">
                <span>commentme --get lines &lt;file&gt;</span>
                <span className="text-gray-500 italic ml-2"># Get all</span>
            </AnimatedSpan>

            <AnimatedSpan className="text-blue-400">
                <span>commentme --edit / --delete &lt;file&gt;</span>
                <span className="text-gray-500 italic ml-2"># Modify</span>
            </AnimatedSpan>

            <AnimatedSpan className="text-blue-400">
                <span>commentme --skim / --unskim &lt;file&gt;</span>
                <span className="text-gray-500 italic ml-2"># Redact/Restore</span>
            </AnimatedSpan>

            <AnimatedSpan className="text-blue-400">
                <span>commentme --generate / --explain &lt;file&gt;</span>
                <span className="text-gray-500 italic ml-2"># AI Features</span>
            </AnimatedSpan>

            <AnimatedSpan className="text-blue-400">
                <span>commentme --sanitize &lt;file&gt;</span>
                <span className="text-gray-500 italic ml-2"># Remove comments fully</span>
            </AnimatedSpan>

            <AnimatedSpan className="text-blue-400">
                <span>commentme --set-key / --clear-key</span>
                <span className="text-gray-500 italic ml-2"># BYOKey</span>
            </AnimatedSpan>

        </Terminal >
    )
}
