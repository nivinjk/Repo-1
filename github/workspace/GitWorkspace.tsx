// // src/pages/GitWorkspacePage.tsx
// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import GitFileExplorer from "@/components/github/workspace/FileExplorer";
// import GitFileViewer from "@/components/github/workspace/EditorPanel";
// import {
//   fetchRepoTree,
//   fetchFileContent,
//   pushFilesToGitHub,
//   type TreeItem,
// } from "@/services/gitWorkspace.service";

// export default function GitWorkspacePage() {
//   const [owner, setOwner] = useState<string>("nasvin-2004");
//   const [repo, setRepo] = useState<string>("Dummy2");
//   const [branch, setBranch] = useState<string>("push/file");

//   const [treeFlat, setTreeFlat] = useState<TreeItem[]>([]);
//   const [loadingTree, setLoadingTree] = useState(false);
//   const [selectedPath, setSelectedPath] = useState<string | null>(null);
//   const [fileContent, setFileContent] = useState<string>("");
//   const [loadingFile, setLoadingFile] = useState(false);
//   const [modifiedFiles, setModifiedFiles] = useState<Record<string, string>>({});
//   const [pullError, setPullError] = useState<string | null>(null);
//   const [pushBusy, setPushBusy] = useState(false);

//   const tree = useMemo(() => buildNestedTree(treeFlat), [treeFlat]);

//   useEffect(() => {
//     pullRepoTree();
//   }, [owner, repo, branch]);

//   async function pullRepoTree() {
//     setLoadingTree(true);
//     setPullError(null);
//     try {
//       const r = await fetchRepoTree(owner, repo, branch);
//       if (!r.success) throw new Error(r.message || "Failed to fetch tree");
//       setTreeFlat(r.tree);
//     } catch (err: any) {
//       console.error(err);
//       setPullError(err.message || "Failed to fetch repo tree");
//       setTreeFlat([]);
//     } finally {
//       setLoadingTree(false);
//     }
//   }

//   async function openFile(path: string) {
//     setSelectedPath(path);
//     setLoadingFile(true);
//     try {
//       const r = await fetchFileContent(owner, repo, branch, path);
//       if (!r.success) throw new Error(r.message || "Failed to fetch file");
//       setFileContent(decodeBase64ToUtf8(r.content || ""));
//     } catch (err: any) {
//       console.error(err);
//       setFileContent("// Error loading file: " + (err.message || ""));
//     } finally {
//       setLoadingFile(false);
//     }
//   }

//   function onEditContent(path: string, newContent: string) {
//     setModifiedFiles((prev) => ({ ...prev, [path]: newContent }));
//   }

//   async function pushChanges() {
//     if (!owner || !repo || !branch) return alert("owner/repo/branch missing");
//     const toPush = Object.entries(modifiedFiles).map(([filePath, content]) => ({
//       filePath,
//       content: btoa(unescape(encodeURIComponent(content))),
//     }));
//     if (toPush.length === 0) return alert("No changes to push");

//     setPushBusy(true);
//     try {
//       const res = await pushFilesToGitHub({
//         owner,
//         repo,
//         branch,
//         files: toPush,
//         commitMsg: "Update files via Git Workspace",
//       });
//       if (!res.success) throw new Error(res.message || "Push failed");
//       alert("✅ Pushed changes");
//       setModifiedFiles({});
//       await pullRepoTree();
//     } catch (err: any) {
//       console.error(err);
//       alert("Push failed: " + (err.message || ""));
//     } finally {
//       setPushBusy(false);
//     }
//   }

//   return (
//     <div className="h-screen flex flex-col bg-[#0d1117]">
//       {/* Top Header - GitHub Style */}
//       <header className="bg-[#161b22] border-b border-[#30363d] px-4 py-3">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-2">
//               <input
//                 value={owner}
//                 onChange={(e) => setOwner(e.target.value)}
//                 placeholder="owner"
//                 className="bg-[#0d1117] text-[#c9d1d9] px-3 py-1.5 rounded-md border border-[#30363d] focus:outline-none focus:border-[#58a6ff] text-sm"
//               />
//               <span className="text-[#8b949e]">/</span>
//               <input
//                 value={repo}
//                 onChange={(e) => setRepo(e.target.value)}
//                 placeholder="repository"
//                 className="bg-[#0d1117] text-[#c9d1d9] px-3 py-1.5 rounded-md border border-[#30363d] focus:outline-none focus:border-[#58a6ff] text-sm"
//               />
//             </div>
//           </div>
          
//           <div className="flex items-center gap-2">
//             <input
//               value={branch}
//               onChange={(e) => setBranch(e.target.value)}
//               placeholder="branch"
//               className="bg-[#0d1117] text-[#c9d1d9] px-3 py-1.5 rounded-md border border-[#30363d] focus:outline-none focus:border-[#58a6ff] text-sm w-32"
//             />
//             <button
//               onClick={pullRepoTree}
//               className="px-4 py-1.5 bg-[#238636] text-white rounded-md hover:bg-[#2ea043] text-sm font-medium"
//             >
//               Pull
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content Area */}
//       <div className="flex-1 flex overflow-hidden">
//         {/* Sidebar - File Explorer */}
//         <aside className="w-80 flex flex-col bg-[#0d1117] border-r border-[#30363d]">
//           {/* Files Header */}
//           <div className="px-4 py-3 border-b border-[#30363d]">
//             <div className="flex items-center justify-between">
//               <h2 className="text-[#c9d1d9] font-semibold">Files</h2>
//               <button className="text-[#8b949e] hover:text-[#c9d1d9] text-xl">
//                 +
//               </button>
//             </div>
//           </div>

//           {/* Search Bar */}
//           <div className="px-4 py-2 border-b border-[#30363d]">
//             <input
//               type="text"
//               placeholder="Go to file"
//               className="w-full bg-[#161b22] text-[#c9d1d9] px-3 py-1.5 rounded-md border border-[#30363d] focus:outline-none focus:border-[#58a6ff] text-sm placeholder-[#8b949e]"
//             />
//           </div>

//           {/* File Explorer */}
//           <div className="flex-1 overflow-auto">
//             {loadingTree ? (
//               <div className="text-center text-[#8b949e] py-8">Loading files...</div>
//             ) : pullError ? (
//               <div className="text-center text-[#f85149] py-8 px-4">{pullError}</div>
//             ) : (
//               <GitFileExplorer
//                 tree={tree}
//                 onOpenFile={openFile}
//                 selectedPath={selectedPath}
//               />
//             )}
//           </div>

//           {/* Push Changes Button */}
//           <div className="p-4 border-t border-[#30363d]">
//             <button
//               onClick={pushChanges}
//               disabled={pushBusy || Object.keys(modifiedFiles).length === 0}
//               className="w-full py-2 rounded-md bg-[#238636] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2ea043] font-medium text-sm"
//             >
//               {pushBusy
//                 ? "Pushing..."
//                 : `Push ${Object.keys(modifiedFiles).length} change(s)`}
//             </button>
//           </div>
//         </aside>

//         {/* Main Editor Area */}
//         <main className="flex-1 flex flex-col bg-[#0d1117]">
//           <GitFileViewer
//             path={selectedPath}
//             loading={loadingFile}
//             content={fileContent}
//             onChange={(newContent) => {
//               setFileContent(newContent);
//               if (selectedPath) onEditContent(selectedPath, newContent);
//             }}
//             isModified={selectedPath ? !!modifiedFiles[selectedPath] : false}
//             onReload={() => selectedPath && openFile(selectedPath)}
//             onSave={() => {
//               if (!selectedPath) return;
//               onEditContent(selectedPath, fileContent);
//               alert("Saved to buffer — push when ready");
//             }}
//             owner={owner}
//             repo={repo}
//             branch={branch}
//           />
//         </main>
//       </div>
//     </div>
//   );
// }

// /** Helpers **/
// type NestedNode = { name: string; path: string; type: "tree" | "blob"; children?: NestedNode[] };

// function buildNestedTree(flat: TreeItem[]): NestedNode[] {
//   const map = new Map<string, NestedNode>();
//   const roots: NestedNode[] = [];

//   for (const item of flat) {
//     const parts = item.path.split("/").filter(Boolean);
//     let prefix = "";
//     for (let i = 0; i < parts.length; i++) {
//       const name = parts[i];
//       const path = prefix ? `${prefix}/${name}` : name;
//       if (!map.has(path)) {
//         const node: NestedNode = { name, path, type: i === parts.length - 1 ? item.type : "tree", children: [] };
//         map.set(path, node);
//         if (prefix) {
//           const parent = map.get(prefix)!;
//           parent.children = parent.children || [];
//           if (!parent.children.some((c) => c.path === node.path)) parent.children.push(node);
//         } else {
//           if (!roots.some((r) => r.path === node.path)) roots.push(node);
//         }
//       }
//       prefix = path;
//     }
//   }

//   const sortRec = (nodes: NestedNode[]) => {
//     nodes.sort((a, b) => (a.type !== b.type ? (a.type === "tree" ? -1 : 1) : a.name.localeCompare(b.name)));
//     nodes.forEach((n) => n.children && sortRec(n.children));
//   };
//   sortRec(roots);

//   return roots;
// }

// function decodeBase64ToUtf8(b64: string) {
//   try {
//     return decodeURIComponent(escape(atob(b64)));
//   } catch {
//     try { return atob(b64); } catch { return ""; }
//   }
// }

// ============================================
// 1. GitWorkspacePage.tsx - Main Workspace Component
// ============================================
"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import GitFileExplorer from "@/components/github/workspace/FileExplorer";
import GitFileViewer from "@/components/github/workspace/EditorPanel";
import GitRepoSelector from "@/components/github/workspace/RepoSelector";
import {
  fetchRepoTree,
  fetchFileContent,
  pushFilesToGitHub,
  fetchGitHubRepos,
  fetchGitHubBranches,
  createGitHubRepo,
  createGitHubBranch,
  initiateGitHubLogin,
  type TreeItem,
  type GitHubRepo,
} from "@/services/gitWorkspace.service";
import { ErrorHandler } from "@/lib/error-handler";
import { toast } from "sonner";

export default function GitWorkspacePage() {
  // Auth & Repo State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true); 
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [branches, setBranches] = useState<string[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string>("main");

  // Add these state variables
    const [showNewBranchModal, setShowNewBranchModal] = useState(false);
    const [newBranchName, setNewBranchName] = useState("");
    const [branchError, setBranchError] = useState<string | null>(null);
    const [branchLoading, setBranchLoading] = useState(false);


  // File Tree State
  const [treeFlat, setTreeFlat] = useState<TreeItem[]>([]);
  const [loadingTree, setLoadingTree] = useState(false);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [loadingFile, setLoadingFile] = useState(false);
  const [modifiedFiles, setModifiedFiles] = useState<Record<string, string>>({});
  const [newFiles, setNewFiles] = useState<Record<string, string>>({});
  const [pullError, setPullError] = useState<string | null>(null);
  const [pushBusy, setPushBusy] = useState(false);

  // UI State
  const [showRepoModal, setShowRepoModal] = useState(false);
  const [showNewFileModal, setShowNewFileModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newFileName, setNewFileName] = useState("");

  const tree = useMemo(() => buildNestedTree(treeFlat), [treeFlat]);

  // Check authentication on mount
  // useEffect(() => {
    
  // }, []);

  // useEffect(() => {
  //   const mountLogin = async () => {
  //     await checkAuth();
  //     if (!isAuthenticated) {
  //       // user not logged in → redirect to login page
  //       // window.location.href = "/github-auth-required";

  //       await handleGitHubLogin();
  //     }
      
  //   }
  //   mountLogin();
  // }, [isAuthenticated]);

  useEffect(() => {
    const mountLogin = async () => {
      // 1. Start by checking if auth is present (token in db/session)
      const authenticated = await checkAuth(); 

      // 2. If not authenticated, open the popup
      if (!authenticated) {
        await handleGitHubLogin();
      }

      // 3. Mark authentication process complete
      setIsAuthenticating(false); 
    }
    mountLogin();
  }, []); // Only run once on mount


  const pullRepoTree = useCallback(async () => {
    if (!selectedRepo) return;
    setLoadingTree(true);
    setPullError(null);
    try {
      const r = await fetchRepoTree(selectedRepo.owner, selectedRepo.name, selectedBranch);
      if (!r.success) throw new Error("Failed to fetch tree");
      setTreeFlat(r.tree);
    } catch (err) {
      ErrorHandler.logError(err);
      setPullError("Failed to fetch repo tree");
      setTreeFlat([]);
    } finally {
      setLoadingTree(false);
    }
  }, [selectedBranch, selectedRepo]);

  // Load tree when repo/branch changes
  useEffect(() => {
    if (selectedRepo && selectedBranch) {
      pullRepoTree();
    }
  }, [selectedRepo, selectedBranch, pullRepoTree]);

  // async function checkAuth() {
  //   try {
  //     const result = await fetchGitHubRepos();
  //     if (result.success && result.data) {
  //       setIsAuthenticated(true);
  //       setRepos(result.data);
  //     } else {
  //       setIsAuthenticated(false);
  //     }
  //   } catch {
  //     setIsAuthenticated(false);
  //   }
  // }

  async function checkAuth(): Promise<boolean> { // <--- Added return type
    setIsAuthenticating(true); // <--- Set loading before check
    try {
      const result = await fetchGitHubRepos();
      if (result.success && result.data) {
        setIsAuthenticated(true);
        setRepos(result.data);
        return true; // <--- Return true on success
      } else {
        setIsAuthenticated(false);
        return false; // <--- Return false on failure
      }
    } catch {
      setIsAuthenticated(false);
      return false; // <--- Return false on error
    } finally {
      // Keep isAuthenticating as true until login/fail is resolved in mountLogin
    }
  }

  // async function handleGitHubLogin() {
  //   try {
  //     await initiateGitHubLogin();
  //     await checkAuth();
  //   } catch (error) {
  //     ErrorHandler.logError(error, "Login failed");
  //     toast.error("GitHub authentication failed. Please try again.");
  //   }
  // }

  async function handleGitHubLogin() {
    try {
      // This will open the popup and wait for it to close
      await initiateGitHubLogin(); 
      // After popup closes, re-check auth status
      await checkAuth(); 
    } catch (error) {
      ErrorHandler.logError(error, "Login failed");
      toast.error("GitHub authentication failed. Please try again.");
      setIsAuthenticated(false);
    }
  }

  async function handleRepoSelect(repo: GitHubRepo) {
    setSelectedRepo(repo);
    setLoadingTree(true);
    try {
      const result = await fetchGitHubBranches(repo.owner, repo.name);
      if (result.success && result.data) {
        setBranches(result.data);
        setSelectedBranch(result.data.includes("main") ? "main" : result.data[0] || "");
      }
    } catch {
      setBranches([]);
    } finally {
      setLoadingTree(false);
    }
    setShowRepoModal(false);
  }

  async function openFile(path: string) {
    if (!selectedRepo) return;
    setSelectedPath(path);
    setLoadingFile(true);
    try {
      const r = await fetchFileContent(selectedRepo.owner, selectedRepo.name, selectedBranch, path);
      if (!r.success) throw new Error(r.message || "Failed to fetch file");
      setFileContent(decodeBase64ToUtf8(r.content || ""));
    } catch (err) {
      ErrorHandler.logError(err);
      setFileContent("Error loading file");
    } finally {
      setLoadingFile(false);
    }
  }

  const handleCreateBranch = async () => {
  if (!newBranchName.trim() || !selectedRepo) {
    setBranchError("Branch name is required.");
    return;
  }
  setBranchError(null);
  setBranchLoading(true);
  try {
    const result = await createGitHubBranch(
      selectedRepo.owner,
      selectedRepo.name,
      newBranchName.trim()
    );
    if (result.success) {
      toast.success("✅ Branch created successfully!");
      setBranches([...branches, newBranchName.trim()]);
      setSelectedBranch(newBranchName.trim());
      setShowNewBranchModal(false);
      setNewBranchName("");
    } else {
      setBranchError(result.message || "Failed to create branch.");
    }
  } catch (err) {
    setBranchError("Failed to create branch.");
  } finally {
    setBranchLoading(false);
  }
};


  function onEditContent(path: string, newContent: string) {
    setModifiedFiles((prev) => ({ ...prev, [path]: newContent }));
  }

  async function handleCreateNewFile() {
    if (!newFileName.trim()) {
      toast.error("Please enter a file name");
      return;
    }
    const path = newFileName.trim();
    setNewFiles((prev) => ({ ...prev, [path]: "" }));
    setSelectedPath(path);
    setFileContent("");
    setNewFileName("");
    setShowNewFileModal(false);
  }

  async function handleUploadFiles(files: File[]) {
    const encodedFiles = await filesToBase64(files);
    for (const file of encodedFiles) {
      setNewFiles((prev) => ({ ...prev, [file.path]: file.content }));
    }
    setShowUploadModal(false);
    toast.success(`${encodedFiles.length} file(s) added to workspace`);
  }

  async function pushChanges() {
    if (!selectedRepo || !selectedBranch) {
      toast.error("Please select a repository and branch");
      return;
    }

    const allChanges: { filePath: string; content: string }[] = [];

    // Add modified files
    Object.entries(modifiedFiles).forEach(([path, content]) => {
      allChanges.push({
        filePath: path,
        content: btoa(unescape(encodeURIComponent(content))),
      });
    });

    // Add new files
    Object.entries(newFiles).forEach(([path, content]) => {
      allChanges.push({
        filePath: path,
        content: content || btoa(""), // If already base64, use it; otherwise encode
      });
    });

    if (allChanges.length === 0) {
      toast.info("No changes to push");
      return;
    }

    setPushBusy(true);
    try {
      const res = await pushFilesToGitHub({
        owner: selectedRepo.owner,
        repo: selectedRepo.name,
        branch: selectedBranch,
        files: allChanges,
        commitMsg: `Update ${allChanges.length} file(s) via Git Workspace`,
      });
      if (!res.success) throw new Error(res.message || "Push failed");
      toast.success("✅ Changes pushed successfully!");
      setModifiedFiles({});
      setNewFiles({});
      await pullRepoTree();
    } catch (err) {
      ErrorHandler.logError(err);
      toast.error("Push failed");
    } finally {
      setPushBusy(false);
    }
  }

  const totalChanges = Object.keys(modifiedFiles).length + Object.keys(newFiles).length;

  if (isAuthenticating) { // <--- Handle the new loading state
    return (
      <div className="h-screen flex items-center justify-center bg-[#0d1117]">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#c9d1d9] mb-4">Git Workspace</h1>
          <div className="flex items-center justify-center text-xl text-[#8b949e]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--brandColor)] mr-3"></div>
              <p>Authenticating with GitHub...</p>
            </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0d1117]">
        <div className="text-center">
          <svg className="w-24 h-24 mx-auto mb-6 text-[#58a6ff]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <h1 className="text-3xl font-bold text-[#c9d1d9] mb-4">Git Workspace</h1>
          <p className="text-[#8b949e] mb-8">Connect your GitHub account to get started</p>
          <button
            onClick={handleGitHubLogin}
            className="px-6 py-3 bg-[#238636] text-white rounded-md hover:bg-[#2ea043] font-medium"
          >
            Connect GitHub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#0d1117]">
      {/* Top Header */}
      <header className="bg-[#161b22] border-b border-[#30363d] px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowRepoModal(true)}
              className="flex items-center gap-2 bg-[#21262d] text-[#c9d1d9] px-4 py-2 rounded-md border border-[#30363d] hover:bg-[#30363d]"
            >
              {selectedRepo ? (
                <>
                  <span className="font-semibold">{selectedRepo.owner}</span>
                  <span className="text-[#8b949e]">/</span>
                  <span className="font-semibold">{selectedRepo.name}</span>
                </>
              ) : (
                <span>Select Repository</span>
              )}
            </button>
            
            {/* {selectedRepo && (
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="bg-[#0d1117] text-[#c9d1d9] px-3 py-2 rounded-md border border-[#30363d] focus:outline-none focus:border-[#58a6ff]"
              >
                {branches.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
              
            )} */}

            {selectedRepo && (
  <div className="flex items-center gap-2">
    <select
      value={selectedBranch}
      onChange={(e) => setSelectedBranch(e.target.value)}
      className="bg-[#0d1117] text-[#c9d1d9] px-3 py-2 rounded-md border border-[#30363d] focus:outline-none focus:border-[#58a6ff]"
    >
      {branches.map((branch) => (
        <option key={branch} value={branch}>
          {branch}
        </option>
      ))}
    </select>

    <button
      onClick={() => setShowNewBranchModal(true)}
      className="px-3 py-2 bg-[#238636] text-white rounded-md hover:bg-[#2ea043] text-sm"
    >
      + New Branch
    </button>
  </div>
)}

          </div>

          <button
            onClick={pullRepoTree}
            disabled={!selectedRepo}
            className="px-4 py-2 bg-[#238636] text-white rounded-md hover:bg-[#2ea043] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Refresh
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-80 flex flex-col bg-[#0d1117] border-r border-[#30363d]">
          <div className="px-4 py-3 border-b border-[#30363d]">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-[#c9d1d9] font-semibold">Files</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowNewFileModal(true)}
                  className="text-[#8b949e] hover:text-[#c9d1d9] text-xl"
                  title="New File"
                >
                  +
                </button>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="text-[#8b949e] hover:text-[#c9d1d9]"
                  title="Upload Files"
                >
                  ↑
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            {loadingTree ? (
              <div className="text-center text-[#8b949e] py-8">Loading files...</div>
            ) : pullError ? (
              <div className="text-center text-[#f85149] py-8 px-4">{pullError}</div>
            ) : !selectedRepo ? (
              <div className="text-center text-[#8b949e] py-8 px-4">
                Select a repository to view files
              </div>
            ) : (
              <>
                <GitFileExplorer
                  className={
                    Object.keys(newFiles).length > 0 ?
                      "h-[70%]" : 'h-full'
                  }
                  tree={tree}
                  onOpenFile={openFile}
                  selectedPath={selectedPath}
                />
                {/* Show new files */}
                {Object.keys(newFiles).length > 0 && (
                  <div className="px-4 py-2 max-h-fit overflow-y-auto border-t border-[#30363d]">
                    <p className="text-[#8b949e] text-xs mb-2">New Files:</p>
                    {Object.keys(newFiles).map((path) => (
                      <div
                        role="button"
                        tabIndex={0}
                        onKeyDown={e => e.key === 'Enter' && setSelectedPath(path) && setFileContent(newFiles[path] ? atob(newFiles[path]) : "")}
                        key={path}
                        onClick={() => {
                          setSelectedPath(path);
                          setFileContent(newFiles[path] ? atob(newFiles[path]) : "");
                        }}
                        className={`text-[#c9d1d9] text-sm py-1 px-2 cursor-pointer rounded hover:bg-[#161b22] ${
                          selectedPath === path ? "bg-[#1f6feb]" : ""
                        }`}
                      >
                        📄 {path}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="p-4 border-t border-[#30363d]">
            <button
              onClick={pushChanges}
              disabled={pushBusy || totalChanges === 0}
              className="w-full py-2 rounded-md bg-[#238636] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2ea043] font-medium"
            >
              {pushBusy ? "Pushing..." : `Push ${totalChanges} change(s)`}
            </button>
          </div>
        </aside>

        {/* Editor */}
        <main className="flex-1 flex flex-col bg-[#0d1117]">
          <GitFileViewer
            path={selectedPath}
            loading={loadingFile}
            content={fileContent}
            onChange={(newContent) => {
              setFileContent(newContent);
              if (selectedPath) onEditContent(selectedPath, newContent);
            }}
            isModified={selectedPath ? !!(modifiedFiles[selectedPath] || newFiles[selectedPath]) : false}
            onReload={() => selectedPath && openFile(selectedPath)}
            onSave={() => {
              if (!selectedPath) return;
              onEditContent(selectedPath, fileContent);
              toast.info("Saved to buffer — push when ready");
            }}
            owner={selectedRepo?.owner}
            repo={selectedRepo?.name}
            branch={selectedBranch}
          />
        </main>
      </div>

      {/* Repository Selector Modal */}
      {showRepoModal && (
        <GitRepoSelector
          repos={repos}
          onSelect={handleRepoSelect}
          onClose={() => setShowRepoModal(false)}
          onCreateRepo={async (name) => {
            await createGitHubRepo(name);
            const result = await fetchGitHubRepos();
            if (result.data) setRepos(result.data);
          }}
        />
      )}

      {/* New File Modal */}
      {showNewFileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#161b22] rounded-lg p-6 w-96 border border-[#30363d]">
            <h3 className="text-[#c9d1d9] font-semibold mb-4">Create New File</h3>
            <input
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              placeholder="filename.ext"
              className="w-full bg-[#0d1117] text-[#c9d1d9] px-3 py-2 rounded border border-[#30363d] focus:outline-none focus:border-[#58a6ff]"
              onKeyPress={(e) => e.key === "Enter" && handleCreateNewFile()}
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleCreateNewFile}
                className="flex-1 px-4 py-2 bg-[#238636] text-white rounded hover:bg-[#2ea043]"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setShowNewFileModal(false);
                  setNewFileName("");
                }}
                className="flex-1 px-4 py-2 bg-[#21262d] text-[#c9d1d9] rounded hover:bg-[#30363d]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Files Modal */}
      {showUploadModal && (
        <UploadFilesModal
          onUpload={handleUploadFiles}
          onClose={() => setShowUploadModal(false)}
        />
      )}
      {showNewBranchModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-[#161b22] rounded-lg p-6 w-96 border border-[#30363d]">
      <h3 className="text-[#c9d1d9] font-semibold mb-4">Create New Branch</h3>
      <input
        type="text"
        placeholder="Branch Name"
        value={newBranchName}
        onChange={(e) => setNewBranchName(e.target.value)}
        className="w-full p-2 bg-[#0d1117] text-[#c9d1d9] border border-[#30363d] rounded focus:outline-none focus:border-[#58a6ff]"
      />
      {branchError && <p className="text-[#f85149] text-sm mt-1">{branchError}</p>}
      <div className="flex gap-2 mt-4">
        <button
          onClick={handleCreateBranch}
          disabled={branchLoading}
          className="flex-1 px-4 py-2 bg-[#238636] text-white rounded hover:bg-[#2ea043]"
        >
          {branchLoading ? "Creating..." : "Create Branch"}
        </button>
        <button
          onClick={() => {
            setShowNewBranchModal(false);
            setNewBranchName("");
            setBranchError(null);
          }}
          className="flex-1 px-4 py-2 bg-[#21262d] text-[#c9d1d9] rounded hover:bg-[#30363d]"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

// Helper Components
function UploadFilesModal({ onUpload, onClose }: { onUpload: (files: File[]) => void; onClose: () => void }) {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const folderInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#161b22] rounded-lg p-6 w-96 border border-[#30363d]">
        <h3 className="text-[#c9d1d9] font-semibold mb-4">Upload Files</h3>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={(e) => e.target.files && setFiles(Array.from(e.target.files))}
          className="hidden"
        />
        <input
          ref={folderInputRef}
          type="file"
          multiple
          {...({ webkitdirectory: "", directory: "" })}
          onChange={(e) => e.target.files && setFiles(Array.from(e.target.files))}
          className="hidden"
        />

        <div className="space-y-2 mb-4">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full px-4 py-2 bg-[#21262d] text-[#c9d1d9] rounded hover:bg-[#30363d] border border-[#30363d]"
          >
            Select Files
          </button>
          <button
            onClick={() => folderInputRef.current?.click()}
            className="w-full px-4 py-2 bg-[#21262d] text-[#c9d1d9] rounded hover:bg-[#30363d] border border-[#30363d]"
          >
            Select Folder
          </button>
        </div>

        {files.length > 0 && (
          <div className="mb-4 p-3 bg-[#0d1117] rounded border border-[#30363d] max-h-40 overflow-y-auto">
            <p className="text-[#8b949e] text-sm mb-2">{files.length} file(s) selected</p>
            {files.slice(0, 5).map((file, i) => (
              <p key={i} className="text-[#c9d1d9] text-xs truncate">
                {file.webkitRelativePath || file.name}
              </p>
            ))}
            {files.length > 5 && <p className="text-[#8b949e] text-xs">+ {files.length - 5} more</p>}
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => {
              onUpload(files);
              setFiles([]);
            }}
            disabled={files.length === 0}
            className="flex-1 px-4 py-2 bg-[#238636] text-white rounded hover:bg-[#2ea043] disabled:opacity-50"
          >
            Upload
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-[#21262d] text-[#c9d1d9] rounded hover:bg-[#30363d]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper Functions
type NestedNode = { name: string; path: string; type: "tree" | "blob"; children?: NestedNode[] };

function buildNestedTree(flat: TreeItem[]): NestedNode[] {
  const map = new Map<string, NestedNode>();
  const roots: NestedNode[] = [];

  for (const item of flat) {
    const parts = item.path.split("/").filter(Boolean);
    let prefix = "";
    for (let i = 0; i < parts.length; i++) {
      const name = parts[i];
      const path = prefix ? `${prefix}/${name}` : name;
      if (!map.has(path)) {
        const node: NestedNode = {
          name,
          path,
          type: i === parts.length - 1 ? item.type : "tree",
          children: [],
        };
        map.set(path, node);
        if (prefix) {
          const parent = map.get(prefix) as NestedNode;
          parent.children = parent.children || [];
          if (!parent.children.some((c) => c.path === node.path)) parent.children.push(node);
        } else {
          if (!roots.some((r) => r.path === node.path)) roots.push(node);
        }
      }
      prefix = path;
    }
  }

  const sortRec = (nodes: NestedNode[]) => {
    nodes.sort((a, b) =>
      a.type !== b.type ? (a.type === "tree" ? -1 : 1) : a.name.localeCompare(b.name)
    );
    nodes.forEach((n) => n.children && sortRec(n.children));
  };
  sortRec(roots);

  return roots;
}

function decodeBase64ToUtf8(b64: string) {
  try {
    return decodeURIComponent(escape(atob(b64)));
  } catch {
    try {
      return atob(b64);
    } catch {
      return "";
    }
  }
}

async function filesToBase64(files: File[]): Promise<{ path: string; content: string }[]> {
  const result = [];
  for (const file of files) {
    if (file.size === 0 && !file.type && !file.name.includes(".")) continue;
    try {
      const content = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result.split(",")[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      result.push({
        path: file.webkitRelativePath || file.name,
        content,
      });
    } catch (err) {
      ErrorHandler.logError(err, `Failed to encode ${file.name}`);
    }
  }
  return result;
}






