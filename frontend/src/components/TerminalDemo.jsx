import {
    AnimatedSpan,
    Terminal,
    TypingAnimation,
} from "@/components/ui/terminal"

export function TerminalDemo() {
    return (
        <Terminal className="mt-26 w-full h-full max-h-[300px]">
            <TypingAnimation>&gt; npm install -g commentme</TypingAnimation>

            <AnimatedSpan className="text-green-500">
                added 22 packages, and audited 23 packages in 3s
            </AnimatedSpan>

            <AnimatedSpan className="text-green-500">
                2 packages are looking for funding
            </AnimatedSpan>


            <AnimatedSpan className="text-green-500">
                run `npm fund` for details
            </AnimatedSpan>

            <AnimatedSpan className="text-green-500">
                found 0 vulnerabilities
            </AnimatedSpan>

            <TypingAnimation>&gt; Successfully installed commentme</TypingAnimation>


        </Terminal>
    )
}
