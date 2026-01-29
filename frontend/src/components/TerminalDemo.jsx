import {
    AnimatedSpan,
    Terminal,
    TypingAnimation,
} from "@/components/ui/terminal"

export function TerminalDemo() {
    return (
        <Terminal>
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

            {/* <AnimatedSpan className="text-green-500">
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
            </AnimatedSpan> */}


        </Terminal>
    )
}
