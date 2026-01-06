import { File, Folder, Tree } from "../components/ui/file-tree"

export function FileTreeDemo() {
    return (
        <div className="bg-transparent relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border">
            <Tree
                className="bg-transparent overflow-hidden rounded-md p-2"
                initialSelectedId="19"
                initialExpandedItems={[
                    "13",
                    "18",
                    "20",
                    "22",
                    "25"
                ]}
                elements={ELEMENTS}
            >
                <Folder element="auth" value="13">
                    <File value="14"><p>authGuard.js</p></File>
                    <File value="15"><p>login.js</p></File>
                    <File value="16"><p>logout.js</p></File>
                    <File value="17"><p>signup.js</p></File>
                </Folder>
                <Folder element="bin" value="18">
                    <File value="19"><p>commentme.js</p></File>
                </Folder>
                <Folder element="config" value="20">
                    <File value="21"><p>db.js</p></File>
                </Folder>
                <Folder element="models" value="22">
                    <File value="23"><p>CommentStore.js</p></File>
                    <File value="24"><p>User.js</p></File>
                </Folder>
                <Folder element="utils" value="25">
                    <File value="26"><p>commentPatterns.js</p></File>
                    <File value="27"><p>currentUser.js</p></File>
                    <File value="28"><p>passwordPrompt.js</p></File>
                    <File value="29"><p>session.js</p></File>
                </Folder>
                <File value="1"><p>deletecoms.js</p></File>
                <File value="2"><p>editcoms.js</p></File>
                <File value="3"><p>getcoms.js</p></File>
                <File value="4"><p>getspeccoms.js</p></File>
                <File value="5"><p>skimcoms.js</p></File>
                <File value="6"><p>test.js</p></File>
                <File value="7"><p>test2.py</p></File>
                <File value="8"><p>unskimcoms.js</p></File>
                <File value="9"><p>.env</p></File>
                <File value="10"><p>.gitignore</p></File>
                <File value="11"><p>package.json</p></File>
                <File value="12"><p>README.md</p></File>
            </Tree>
        </div>
    )
}

const ELEMENTS = [
    {
        id: "13",
        isSelectable: true,
        name: "auth",
        children: [
            { id: "14", isSelectable: true, name: "authGuard.js" },
            { id: "15", isSelectable: true, name: "login.js" },
            { id: "16", isSelectable: true, name: "logout.js" },
            { id: "17", isSelectable: true, name: "signup.js" }
        ]
    },
    {
        id: "18",
        isSelectable: true,
        name: "bin",
        children: [
            { id: "19", isSelectable: true, name: "commentme.js" }
        ]
    },
    {
        id: "20",
        isSelectable: true,
        name: "config",
        children: [
            { id: "21", isSelectable: true, name: "db.js" }
        ]
    },
    {
        id: "22",
        isSelectable: true,
        name: "models",
        children: [
            { id: "23", isSelectable: true, name: "CommentStore.js" },
            { id: "24", isSelectable: true, name: "User.js" }
        ]
    },
    {
        id: "25",
        isSelectable: true,
        name: "utils",
        children: [
            { id: "26", isSelectable: true, name: "commentPatterns.js" },
            { id: "27", isSelectable: true, name: "currentUser.js" },
            { id: "28", isSelectable: true, name: "passwordPrompt.js" },
            { id: "29", isSelectable: true, name: "session.js" }
        ]
    },
    { id: "1", isSelectable: true, name: "deletecoms.js" },
    { id: "2", isSelectable: true, name: "editcoms.js" },
    { id: "3", isSelectable: true, name: "getcoms.js" },
    { id: "4", isSelectable: true, name: "getspeccoms.js" },
    { id: "5", isSelectable: true, name: "skimcoms.js" },
    { id: "6", isSelectable: true, name: "test.js" },
    { id: "7", isSelectable: true, name: "test2.py" },
    { id: "8", isSelectable: true, name: "unskimcoms.js" },
    { id: "9", isSelectable: true, name: ".env" },
    { id: "10", isSelectable: true, name: ".gitignore" },
    { id: "11", isSelectable: true, name: "package.json" },
    { id: "12", isSelectable: true, name: "README.md" }
]