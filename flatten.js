// here is the merchant overview page flattened, provide a realistic version ensuring to maintain consistency, 


const fs = require("fs");
const path = require("path");

// ============================================================
// CONFIG
// ============================================================

const PROJECT_ROOT = __dirname;

const SOURCE_DIR = path.join(
    PROJECT_ROOT,
    "app",
    "dashboard",
    "platform",
    "plans",
    "[planId]",
);

const ENTRY_FILE = path.join(
    SOURCE_DIR,
    "page.tsx"
);

const OUTPUT_DIR = path.join(
    PROJECT_ROOT,
    "app",
    "dashboard",
    "platform",
    "[planId]",
    "plan-detail-flattened",
);

const OUTPUT_FILE = path.join(
    OUTPUT_DIR,
    "page.tsx"
);

const EXTENSIONS = [
    ".tsx",
    ".ts",
    ".jsx",
    ".js"
];


// ============================================================
// STATE
// ============================================================

const visited = new Set();
const stack = new Set();

const externalImports = new Map();


// ============================================================
// RESOLVE FILE
// ============================================================

function resolveFile(basePath) {

    // Exact path
    if (
        fs.existsSync(basePath) &&
        fs.statSync(basePath).isFile()
    ) {
        return basePath;
    }

    // Extensions
    for (const ext of EXTENSIONS) {

        const candidate =
            basePath + ext;

        if (
            fs.existsSync(candidate) &&
            fs.statSync(candidate).isFile()
        ) {
            return candidate;
        }
    }

    // index files
    for (const ext of EXTENSIONS) {

        const candidate =
            path.join(
                basePath,
                "index" + ext
            );

        if (
            fs.existsSync(candidate) &&
            fs.statSync(candidate).isFile()
        ) {
            return candidate;
        }
    }

    return null;
}


// ============================================================
// RESOLVE INTERNAL IMPORT
// ============================================================

function resolveImport(
    importPath,
    importer
) {

    // --------------------------------------------------------
    // @/...
    // --------------------------------------------------------

    if (
        importPath.startsWith("@/")
    ) {

        const relative =
            importPath.substring(2);

        const candidate =
            path.join(
                PROJECT_ROOT,
                relative
            );

        return resolveFile(candidate);
    }


    // --------------------------------------------------------
    // ./...
    // ../...
    // --------------------------------------------------------

    if (
        importPath.startsWith("./") ||
        importPath.startsWith("../")
    ) {

        const candidate =
            path.resolve(
                path.dirname(importer),
                importPath
            );

        return resolveFile(candidate);
    }


    // --------------------------------------------------------
    // External package
    // --------------------------------------------------------

    return null;
}


// ============================================================
// EXTRACT IMPORTS
// ============================================================

function extractImports(content) {

    const results = [];

    /*
     * Handles multiline imports such as:
     *
     * import {
     *     Container,
     * } from "@/components/layout/Container";
     *
     * and:
     *
     * import Foo from "./Foo";
     *
     * and:
     *
     * import "some-package";
     */

    const regex =
        /import\s+(?:(?:[\s\S]*?)\s+from\s+)?["']([^"']+)["']\s*;?/g;

    let match;

    while (
        (match = regex.exec(content)) !== null
    ) {

        results.push({
            source: match[1],
            start: match.index,
            end: regex.lastIndex,
            text: match[0]
        });
    }

    return results;
}


// ============================================================
// REMOVE IMPORTS
// ============================================================

function removeImports(
    content,
    importsToRemove
) {

    let result = content;

    // Remove from bottom to top
    importsToRemove
        .sort(
            (a, b) =>
                b.start - a.start
        )
        .forEach(item => {

            result =
                result.slice(
                    0,
                    item.start
                ) +
                result.slice(
                    item.end
                );
        });

    return result;
}


// ============================================================
// CLEAN EXPORTS
// ============================================================

function cleanExports(content) {

    // export default async function Foo
    content = content.replace(
        /export\s+default\s+async\s+function\s+/g,
        "async function "
    );

    // export default function Foo
    content = content.replace(
        /export\s+default\s+function\s+/g,
        "function "
    );

    // export default class Foo
    content = content.replace(
        /export\s+default\s+class\s+/g,
        "class "
    );

    // Remove standalone export default declarations
    content = content.replace(
        /^\s*export\s+default\s+[^;\n]+;?\s*$/gm,
        ""
    );

    // export function
    content = content.replace(
        /\bexport\s+(?=(?:async\s+)?function\b)/g,
        ""
    );

    // export const / let / var / class
    content = content.replace(
        /\bexport\s+(?=(?:const|let|var|class|interface|type)\b)/g,
        ""
    );

    // export { Foo }
    content = content.replace(
        /^\s*export\s+\{[\s\S]*?\};?\s*$/gm,
        ""
    );

    // export * from
    content = content.replace(
        /^\s*export\s+\*\s+from\s+["'][^"']+["'];?\s*$/gm,
        ""
    );

    return content;
}


// ============================================================
// REMOVE USE CLIENT
// ============================================================

function removeUseClient(content) {

    return content.replace(
        /^\s*["']use client["'];?\s*/gm,
        ""
    );
}


// ============================================================
// PROCESS FILE
// ============================================================

function processFile(filePath) {

    filePath =
        path.resolve(filePath);


    // --------------------------------------------------------
    // Already processed
    // --------------------------------------------------------

    if (
        visited.has(filePath)
    ) {
        return "";
    }


    // --------------------------------------------------------
    // Circular dependency
    // --------------------------------------------------------

    if (
        stack.has(filePath)
    ) {

        console.warn(
            `Circular dependency: ${filePath}`
        );

        return "";
    }


    stack.add(filePath);


    console.log(
        "RESOLVE:",
        path.relative(
            PROJECT_ROOT,
            filePath
        )
    );


    // --------------------------------------------------------
    // Read
    // --------------------------------------------------------

    let content =
        fs.readFileSync(
            filePath,
            "utf8"
        );


    // --------------------------------------------------------
    // Find imports
    // --------------------------------------------------------

    const imports =
        extractImports(content);


    const internalImports = [];

    let dependencies = "";


    // --------------------------------------------------------
    // Resolve every import
    // --------------------------------------------------------

    for (
        const importInfo of imports
    ) {

        const resolved =
            resolveImport(
                importInfo.source,
                filePath
            );


        // ----------------------------------------------------
        // INTERNAL
        // ----------------------------------------------------

        if (resolved) {

            console.log(
                "  INTERNAL:",
                importInfo.source,
                "->",
                path.relative(
                    PROJECT_ROOT,
                    resolved
                )
            );

            internalImports.push(
                importInfo
            );

            dependencies +=
                processFile(
                    resolved
                );

            continue;
        }


        // ----------------------------------------------------
        // EXTERNAL
        // ----------------------------------------------------

        if (
            !externalImports.has(
                importInfo.source
            )
        ) {

            externalImports.set(
                importInfo.source,
                importInfo.text
            );
        }

        console.log(
            "  EXTERNAL:",
            importInfo.source
        );
    }


    // --------------------------------------------------------
    // Remove ALL imports from this source file.
    //
    // External imports will be reconstructed once at the top.
    // Internal imports disappear because their source has been
    // embedded into this output.
    // --------------------------------------------------------

    content =
        removeImports(
            content,
            imports
        );


    // --------------------------------------------------------
    // Remove "use client"
    // --------------------------------------------------------

    content =
        removeUseClient(
            content
        );


    // --------------------------------------------------------
    // Remove exports
    // --------------------------------------------------------

    content =
        cleanExports(
            content
        );


    content =
        content.trim();


    stack.delete(filePath);

    visited.add(filePath);


    // --------------------------------------------------------
    // Build section
    // --------------------------------------------------------

    const relative =
        path.relative(
            PROJECT_ROOT,
            filePath
        );


    return `
/* ============================================================
   FLATTENED SOURCE: ${relative}
   ============================================================ */

${dependencies}

${content}

`;
}


// ============================================================
// MAIN
// ============================================================

function flatten() {

    console.log("");
    console.log(
        "============================================================"
    );
    console.log(
        "TRUE RECURSIVE FLATTENER"
    );
    console.log(
        "============================================================"
    );
    console.log("");

    console.log(
        "SOURCE:"
    );

    console.log(
        SOURCE_DIR
    );

    console.log("");

    console.log(
        "ENTRY:"
    );

    console.log(
        ENTRY_FILE
    );

    console.log("");

    console.log(
        "OUTPUT:"
    );

    console.log(
        OUTPUT_FILE
    );

    console.log("");


    // --------------------------------------------------------
    // Validate
    // --------------------------------------------------------

    if (
        !fs.existsSync(SOURCE_DIR)
    ) {

        throw new Error(
            `Source directory does not exist:\n${SOURCE_DIR}`
        );
    }


    if (
        !fs.existsSync(ENTRY_FILE)
    ) {

        throw new Error(
            `Entry page does not exist:\n${ENTRY_FILE}`
        );
    }


    // --------------------------------------------------------
    // Preserve use client
    // --------------------------------------------------------

    const originalPage =
        fs.readFileSync(
            ENTRY_FILE,
            "utf8"
        );

    const hasUseClient =
        /^\s*["']use client["'];?/m
            .test(
                originalPage
            );


    // --------------------------------------------------------
    // Process dependency graph
    // --------------------------------------------------------

    const body =
        processFile(
            ENTRY_FILE
        );


    // --------------------------------------------------------
    // External imports
    // --------------------------------------------------------

    const imports =
        Array.from(
            externalImports.values()
        );


    // --------------------------------------------------------
    // Construct output
    // --------------------------------------------------------

    let output = "";


    if (hasUseClient) {

        output +=
            `"use client";\n\n`;
    }


    if (imports.length > 0) {

        output +=
            imports.join("\n") +
            "\n\n";
    }


    output +=
        body.trim() +
        "\n";


    // --------------------------------------------------------
    // Create output directory
    // --------------------------------------------------------

    fs.mkdirSync(
        OUTPUT_DIR,
        {
            recursive: true
        }
    );


    // --------------------------------------------------------
    // Write ONLY output
    // --------------------------------------------------------

    fs.writeFileSync(
        OUTPUT_FILE,
        output,
        "utf8"
    );


    // --------------------------------------------------------
    // Results
    // --------------------------------------------------------

    console.log("");
    console.log(
        "============================================================"
    );
    console.log(
        "DONE"
    );
    console.log(
        "============================================================"
    );

    console.log(
        `Files flattened: ${visited.size}`
    );

    console.log(
        `External imports: ${externalImports.size}`
    );

    console.log("");

    console.log(
        "OUTPUT:"
    );

    console.log(
        OUTPUT_FILE
    );

    console.log("");

    console.log(
        "SOURCE WAS NOT MODIFIED."
    );

    console.log(
        "SOURCE WAS NOT DELETED."
    );

    console.log(
        "============================================================"
    );
}


// ============================================================
// RUN
// ============================================================

try {

    flatten();

} catch (error) {

    console.error("");
    console.error(
        "FLATTENING FAILED"
    );
    console.error("");
    console.error(
        error.message
    );

    process.exit(1);
}