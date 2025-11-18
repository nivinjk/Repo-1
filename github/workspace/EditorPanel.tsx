// src/components/github/workspace/EditorPanel.tsx
import React from "react";
import Editor from "@monaco-editor/react";

interface GitFileViewerProps {
  path?: string | null;
  loading?: boolean;
  content: string;
  onChange: (newContent: string) => void;
  isModified?: boolean;
  onReload?: () => void;
  onSave?: () => void;
  owner?: string;
  repo?: string;
  branch?: string;
}

export default function GitFileViewer({
  path,
  loading,
  content,
  onChange,
  isModified,
  onReload,
  onSave,
  owner,
  repo,
}: GitFileViewerProps) {
  if (!path) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-[#8b949e] bg-[#0d1117]">
        <svg className="w-16 h-16 mb-4 opacity-50" viewBox="0 0 16 16" fill="currentColor">
          <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0113.25 16h-9.5A1.75 1.75 0 012 14.25V1.75zm1.75-.25a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 00.25-.25V6h-2.75A1.75 1.75 0 019 4.25V1.5H3.75zm6.75.062V4.25c0 .138.112.25.25.25h2.688a.252.252 0 00-.011-.013l-2.914-2.914a.272.272 0 00-.013-.011z" />
        </svg>
        <p className="text-lg font-medium mb-1">No file selected</p>
        <p className="text-sm">Select a file from the explorer to view its content</p>
      </div>
    );
  }

  const lang = getLanguageFromPath(path);
  const pathParts = path.split("/");

  // Get file stats (you can make this dynamic based on actual content)
  const lines = content.split("\n").length;
  const bytes = new Blob([content]).size;
  const sizeKB = (bytes / 1024).toFixed(1);

  return (
    <div className="h-full flex flex-col bg-[#0d1117]">
      {/* File Header with Breadcrumb */}
      <div className="border-b border-[#30363d]">
        {/* Breadcrumb Navigation */}
        <div className="px-4 py-3 flex items-center justify-between bg-[#161b22]">
          <div className="flex items-center gap-2 text-sm overflow-x-auto">
            <span className="text-[#58a6ff] hover:underline cursor-pointer">{owner}</span>
            <span className="text-[#8b949e]">/</span>
            <span className="text-[#58a6ff] hover:underline cursor-pointer font-semibold">{repo}</span>
            <span className="text-[#8b949e]">/</span>
            {pathParts.map((part, idx) => (
              <React.Fragment key={idx}>
                {idx === pathParts.length - 1 ? (
                  <span className="text-[#c9d1d9] font-semibold">{part}</span>
                ) : (
                  <>
                    <span className="text-[#58a6ff] hover:underline cursor-pointer">{part}</span>
                    <span className="text-[#8b949e]">/</span>
                  </>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Action Bar */}
        <div className="px-4 py-2 flex items-center justify-between bg-[#0d1117] border-t border-[#30363d]">
          <div className="flex items-center gap-4">
            {/* Code/Blame Tabs */}
            <div className="flex items-center gap-1">
              <button className="px-3 py-1.5 text-[#c9d1d9] text-sm font-medium border-b-2 border-[#f78166]">
                Code
              </button>
              <button className="px-3 py-1.5 text-[#8b949e] text-sm hover:text-[#c9d1d9]">
                Blame
              </button>
            </div>

            {/* File Info */}
            <div className="text-xs text-[#8b949e] flex items-center gap-2">
              <span>{lines} lines ({sizeKB} KB)</span>
              {isModified && (
                <span className="px-2 py-0.5 bg-[#9e6a03] text-[#ffc107] rounded-full">
                  Modified
                </span>
              )}
              {loading && (
                <span className="animate-pulse">Loading...</span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onReload}
              className="px-3 py-1 text-sm text-[#c9d1d9] bg-[#21262d] border border-[#30363d] rounded-md hover:bg-[#30363d] hover:border-[#8b949e] flex items-center gap-1.5"
              title="Reload file"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M8 2.5a5.487 5.487 0 00-4.131 1.869l1.204 1.204A.25.25 0 014.896 6H1.25A.25.25 0 011 5.75V2.104a.25.25 0 01.427-.177l1.38 1.38A7.001 7.001 0 0114.95 7.16a.75.75 0 11-1.49.178A5.501 5.501 0 008 2.5zM1.705 8.005a.75.75 0 01.834.656 5.501 5.501 0 009.592 2.97l-1.204-1.204a.25.25 0 01.177-.427h3.646a.25.25 0 01.25.25v3.646a.25.25 0 01-.427.177l-1.38-1.38A7.001 7.001 0 011.05 8.84a.75.75 0 01.656-.834z" />
              </svg>
              Reload
            </button>
            
            <button
              onClick={onSave}
              className="px-3 py-1 text-sm text-white bg-[#238636] rounded-md hover:bg-[#2ea043] flex items-center gap-1.5 font-medium"
              title="Save changes"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M1.75 1A1.75 1.75 0 000 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0016 13.25v-10.5A1.75 1.75 0 0014.25 1H1.75zM1.5 2.75a.25.25 0 01.25-.25h12.5a.25.25 0 01.25.25v10.5a.25.25 0 01-.25.25H1.75a.25.25 0 01-.25-.25V2.75zM4.75 4a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zM5 7.75A.75.75 0 015.75 7h4.5a.75.75 0 010 1.5h-4.5A.75.75 0 015 7.75zm0 3a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z" />
              </svg>
              Save
            </button>

            <div className="flex items-center border border-[#30363d] rounded-md overflow-hidden">
              <button className="px-2 py-1 text-sm text-[#c9d1d9] bg-[#21262d] hover:bg-[#30363d]" title="Raw">
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z" />
                </svg>
              </button>
              <button className="px-2 py-1 text-sm text-[#c9d1d9] bg-[#21262d] hover:bg-[#30363d] border-l border-[#30363d]" title="Copy">
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z" />
                  <path fillRule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z" />
                </svg>
              </button>
              <button className="px-2 py-1 text-sm text-[#c9d1d9] bg-[#21262d] hover:bg-[#30363d] border-l border-[#30363d]" title="Download">
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M7.47 10.78a.75.75 0 001.06 0l3.75-3.75a.75.75 0 00-1.06-1.06L8.75 8.44V1.75a.75.75 0 00-1.5 0v6.69L4.78 5.97a.75.75 0 00-1.06 1.06l3.75 3.75zM3.75 13a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5z" />
                </svg>
              </button>
            </div>

            <button className="px-2 py-1 text-sm text-[#c9d1d9] bg-[#21262d] border border-[#30363d] rounded-md hover:bg-[#30363d]" title="More options">
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 bg-[#0d1117]">
        <Editor
          height="100%"
          defaultLanguage={lang}
          language={lang}
          value={content}
          onChange={(val) => onChange(val ?? "")}
          options={{
            minimap: { enabled: false },
            wordWrap: "on",
            fontSize: 14,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            lineNumbers: "on",
            renderLineHighlight: "line",
            padding: { top: 16, bottom: 16 },
            fontFamily: "'Cascadia Code', 'Fira Code', 'Consolas', 'Monaco', monospace",
            lineHeight: 20,
          }}
          theme="vs-dark"
        />
      </div>
    </div>
  );
}

// Helper function to infer language from file extension
function getLanguageFromPath(path: string) {
  const ext = path.split(".").pop()?.toLowerCase() || "";
  switch (ext) {
    case "ts":
    case "tsx":
      return "typescript";
    case "js":
    case "jsx":
      return "javascript";
    case "json":
      return "json";
    case "md":
    case "mdx":
      return "markdown";
    case "css":
      return "css";
    case "html":
    case "htm":
      return "html";
    case "py":
      return "python";
    case "java":
      return "java";
    case "cpp":
    case "cc":
    case "cxx":
      return "cpp";
    case "c":
      return "c";
    case "go":
      return "go";
    case "rs":
      return "rust";
    case "php":
      return "php";
    case "rb":
      return "ruby";
    case "swift":
      return "swift";
    case "kt":
      return "kotlin";
    case "yaml":
    case "yml":
      return "yaml";
    case "xml":
      return "xml";
    case "sql":
      return "sql";
    case "sh":
    case "bash":
      return "shell";
    default:
      return "plaintext";
  }
}