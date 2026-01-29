import {
    AnimatedSpan,
    Terminal,
    TypingAnimation,
} from "@/components/ui/terminal"

export function TerminalDemo2() {
    return (
        <Terminal className="w-500 h-600">
            <TypingAnimation>&gt; commentme --help</TypingAnimation>

            <AnimatedSpan className="text-green-500">
                commentme CLI
            </AnimatedSpan>

            <AnimatedSpan className="text-green-500">
                Commands:
            </AnimatedSpan>

            <AnimatedSpan className="text-green-500">
                #Get a specific comment by line range
            </AnimatedSpan>

            <AnimatedSpan className="text-green-500">
                commentme --get line-7-7 "file-name"
            </AnimatedSpan>

            <AnimatedSpan className="text-green-500">
                #Get all comments
            </AnimatedSpan>

            <AnimatedSpan className="text-green-500">
                commentme --get lines "file-name"
            </AnimatedSpan>

            <AnimatedSpan className="text-green-500">
                #Edit an existing comment
            </AnimatedSpan>

            <AnimatedSpan className="text-green-500">
                commentme --edit line-7-7 "file-name"
            </AnimatedSpan>

            <AnimatedSpan className="text-green-500">
                #Delete a comment
            </AnimatedSpan>

            <AnimatedSpan className="text-green-500">
                commentme --delete line-7-7 "file-name"
            </AnimatedSpan>

            <AnimatedSpan className="text-green-500">
                #Redact comments from a file and store them
            </AnimatedSpan>

            <AnimatedSpan className="text-green-500">
                commentme --skim "file-name"
            </AnimatedSpan>

            <AnimatedSpan className="text-green-500">
                #Restore comments to a file
            </AnimatedSpan>

            <AnimatedSpan className="text-green-500">
                commentme --unskim "file-name"
            </AnimatedSpan>

            <AnimatedSpan className="text-green-500">
                #Log out from your session
            </AnimatedSpan>

            <AnimatedSpan className="text-green-500">
                commentme --logout
            </AnimatedSpan>

            <AnimatedSpan className="text-green-500">
                #Show this help message
            </AnimatedSpan>

            <AnimatedSpan className="text-green-500">
                commentme --help
            </AnimatedSpan>


        </Terminal >
    )
}
