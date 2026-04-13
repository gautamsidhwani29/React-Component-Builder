import type { ModelResponse } from "./components/types";

const printCode = (codeObj: ModelResponse) => {
    const { imports, code } = codeObj;
    let finalImports = imports.join("\n");
    let finalCode = `${finalImports} 
\n\n
${code}
`
    return finalCode;
}

export default printCode;
