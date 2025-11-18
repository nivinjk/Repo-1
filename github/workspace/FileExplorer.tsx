// src/components/github/workspace/FileExplorer.tsx
import React, { useState } from "react";

export type TreeNode = {
  name: string;
  path: string;
  type: "tree" | "blob";
  children?: TreeNode[];
};

interface GitFileExplorerProps {
  tree: TreeNode[];
  onOpenFile: (path: string) => void;
  selectedPath?: string | null;
  className?: string;
}

export default function GitFileExplorer({
  tree,
  onOpenFile,
  selectedPath,
  className,
}: GitFileExplorerProps) {
  return (
    <div className={`text-sm overflow-y-auto ${className}`}>
  {tree.length === 0 ? (
    <div className="text-[#8b949e] text-center mt-8">No files</div>
  ) : (
    <ul>
      {tree.map((node) => (
        <TreeNodeView
          key={node.path}
          node={node}
          onOpenFile={onOpenFile}
          selectedPath={selectedPath}
        />
      ))}
    </ul>
  )}
</div>

  );
}

interface TreeNodeViewProps {
  node: TreeNode;
  onOpenFile: (path: string) => void;
  selectedPath?: string | null;
  level?: number;
}

function TreeNodeView({
  node,
  onOpenFile,
  selectedPath,
  level = 0,
}: TreeNodeViewProps) {
  const [open, setOpen] = useState(true);
  const isSelected = selectedPath === node.path;

  const paddingLeft = 12 + level * 20;

  if (node.type === "tree") {
    return (
      <li>
        <div
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && setOpen((v) => !v)}
          className={`flex items-center gap-2 cursor-pointer px-4 py-1.5 hover:bg-[#161b22] ${
            isSelected ? "bg-[#161b22]" : ""
          }`}
          style={{ paddingLeft }}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-[#8b949e] select-none w-4 flex-shrink-0">
            {open ? (
              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 8.825L1.175 4 2.6 2.575 6 5.975 9.4 2.575 10.825 4z" />
              </svg>
            ) : (
              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor">
                <path d="M4.7 10L3.3 8.6 6.9 5 3.3 1.4 4.7 0l5 5z" />
              </svg>
            )}
          </span>
          <svg className="w-4 h-4 text-[#8b949e] flex-shrink-0" viewBox="0 0 16 16" fill="currentColor">
            <path d="M1.75 1A1.75 1.75 0 000 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0016 13.25v-8.5A1.75 1.75 0 0014.25 3H7.5a.25.25 0 01-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75z" />
          </svg>
          <span className="flex-1 truncate text-[#c9d1d9] text-[13px]" title={node.name}>
            {node.name}
          </span>
        </div>

        {open && node.children && node.children.length > 0 && (
          <ul>
            {node.children.map((child) => (
              <TreeNodeView
                key={child.path}
                node={child}
                onOpenFile={onOpenFile}
                selectedPath={selectedPath}
                level={level + 1}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }

  // blob (file)
  return (
    <li>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && onOpenFile(node.path)}
        onClick={() => onOpenFile(node.path)}
        className={`flex items-center gap-2 cursor-pointer px-4 py-1.5 hover:bg-[#161b22] ${
          isSelected ? "bg-[#1f6feb] hover:bg-[#1f6feb]" : ""
        }`}
        style={{ paddingLeft }}
      >
        <span className="w-4 flex-shrink-0"></span>
        <FileIcon filename={node.name} />
        <span className={`truncate text-[13px] ${isSelected ? "text-white font-medium" : "text-[#c9d1d9]"}`} title={node.name}>
          {node.name}
        </span>
      </div>
    </li>
  );
}

// File icon component based on extension
function FileIcon({ filename }: { filename: string }) {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  
  // Color mapping for different file types
  const getColor = () => {
    if (["ts", "tsx"].includes(ext)) return "#3178c6";
    if (["js", "jsx"].includes(ext)) return "#f7df1e";
    if (ext === "json") return "#5a5a5a";
    if (["md", "mdx"].includes(ext)) return "#519aba";
    if (ext === "css") return "#563d7c";
    if (["html", "htm"].includes(ext)) return "#e34c26";
    if (ext === "py") return "#3572A5";
    return "#8b949e";
  };

  return (
    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill={getColor()}>
      <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0113.25 16h-9.5A1.75 1.75 0 012 14.25V1.75zm1.75-.25a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 00.25-.25V6h-2.75A1.75 1.75 0 019 4.25V1.5H3.75zm6.75.062V4.25c0 .138.112.25.25.25h2.688a.252.252 0 00-.011-.013l-2.914-2.914a.272.272 0 00-.013-.011z" />
    </svg>
  );
}
