// // src/components/GitPushModal.tsx
// import { useState, useEffect } from 'react';
// import {
//   initiateGitHubLogin,
//   fetchGitHubRepos,
//   fetchGitHubBranches,
//   pushFileToGitHub,
//   fileToBase64,
//   type GitHubRepo,
// } from '@/services/gitPush.service';

// interface GitPushModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   file: File | null;
// }

// type Step = 'auth' | 'select-repo' | 'select-branch' | 'commit';

// export default function GitPushModal({ isOpen, onClose, file }: GitPushModalProps) {
//   const [step, setStep] = useState<Step>('auth');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
  
//   const [repos, setRepos] = useState<GitHubRepo[]>([]);
//   const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  
//   const [branches, setBranches] = useState<string[]>([]);
//   const [selectedBranch, setSelectedBranch] = useState<string>('');
  
//   const [filePath, setFilePath] = useState<string>('');
//   const [commitMessage, setCommitMessage] = useState<string>('');

//   // Auto-login and fetch repos when modal opens
//   useEffect(() => {
//     if (isOpen && step === 'auth') {
//       handleGitHubLogin();
//     }
//   }, [isOpen]);

//   // Set default file path when file changes
//   useEffect(() => {
//     if (file) {
//       setFilePath(file.name);
//       setCommitMessage(`Add ${file.name}`);
//     }
//   }, [file]);

//   const handleGitHubLogin = async () => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       await initiateGitHubLogin();
//       const reposResult = await fetchGitHubRepos();
      
//       if (reposResult.success && reposResult.data) {
//         setRepos(reposResult.data);
//         setStep('select-repo');
//       } else {
//         setError(reposResult.message || 'Failed to fetch repositories');
//       }
//     } catch (err) {
//       setError('Authentication failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRepoSelect = async (repo: GitHubRepo) => {
//     setSelectedRepo(repo);
//     setLoading(true);
//     setError(null);
    
//     try {
//       const branchesResult = await fetchGitHubBranches(repo.owner, repo.name);
      
//       if (branchesResult.success && branchesResult.data) {
//         setBranches(branchesResult.data);
//         setSelectedBranch(branchesResult.data.includes('main') ? 'main' : branchesResult.data[0] || '');
//         setStep('select-branch');
//       } else {
//         setError(branchesResult.message || 'Failed to fetch branches');
//       }
//     } catch (err) {
//       setError('Failed to load branches');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBranchSelect = (branch: string) => {
//     setSelectedBranch(branch);
//     setStep('commit');
//   };

//   const handlePushFile = async () => {
//     if (!file || !selectedRepo || !selectedBranch || !filePath || !commitMessage) {
//       setError('Please fill in all required fields');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const base64Content = await fileToBase64(file);
//       // const utf8SafeBase64 = Buffer.from(
//       //   Buffer.from(base64Content, "base64").toString("utf8"),
//       //   "utf8"
//       // ).toString("base64");
      
//       const result = await pushFileToGitHub({
//         owner: selectedRepo.owner,
//         repo: selectedRepo.name,
//         branch: selectedBranch,
//         filePath: filePath,
//         content: base64Content,
//         commitMsg: commitMessage,
//       });

//       if (result.success) {
//         alert('File pushed successfully!');
//         handleClose();
//       } else {
//         setError(result.message || 'Failed to push file');
//       }
//     } catch (err) {
//       setError('An error occurred while pushing the file');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePushText = async () => {
//     if (!file || !selectedRepo || !selectedBranch || !filePath || !commitMessage) {
//       setError('Please fill in all required fields');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const base64Content = await fileToBase64(file);
//       // const utf8SafeBase64 = Buffer.from(
//       //   Buffer.from(base64Content, "base64").toString("utf8"),
//       //   "utf8"
//       // ).toString("base64");
      
//       const result = await pushFileToGitHub({
//         owner: selectedRepo.owner,
//         repo: selectedRepo.name,
//         branch: selectedBranch,
//         filePath: filePath,
//         content: base64Content,
//         commitMsg: commitMessage,
//       });

//       if (result.success) {
//         alert('File pushed successfully!');
//         handleClose();
//       } else {
//         setError(result.message || 'Failed to push file');
//       }
//     } catch (err) {
//       setError('An error occurred while pushing the file');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => {
//     setStep('auth');
//     setRepos([]);
//     setSelectedRepo(null);
//     setBranches([]);
//     setSelectedBranch('');
//     setFilePath('');
//     setCommitMessage('');
//     setError(null);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200">
//           <h2 className="text-2xl font-bold text-gray-800">
//             Push to GitHub
//           </h2>
//           <button
//             onClick={handleClose}
//             className="text-gray-500 hover:text-gray-700 transition-colors"
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           {/* File Info */}
//           {file && (
//             <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
//               <p className="text-sm font-medium text-blue-900">Selected File:</p>
//               <p className="text-lg font-semibold text-blue-700">{file.name}</p>
//               <p className="text-sm text-blue-600">{(file.size / 1024).toFixed(2)} KB</p>
//             </div>
//           )}

//           {/* Error Message */}
//           {error && (
//             <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
//               <p className="text-red-700 text-sm">{error}</p>
//             </div>
//           )}

//           {/* Step: Authentication */}
//           {step === 'auth' && (
//             <div className="text-center py-8">
//               {loading ? (
//                 <div className="flex flex-col items-center">
//                   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
//                   <p className="text-gray-600">Authenticating with GitHub...</p>
//                 </div>
//               ) : (
//                 <div>
//                   <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
//                   </svg>
//                   <p className="text-gray-600 mb-4">Connecting to GitHub...</p>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Step: Select Repository */}
//           {step === 'select-repo' && (
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Repository</h3>
//               <div className="space-y-2 max-h-96 overflow-y-auto">
//                 {repos.map((repo) => (
//                   <button
//                     key={repo.fullName}
//                     onClick={() => handleRepoSelect(repo)}
//                     disabled={loading}
//                     className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     <p className="font-semibold text-gray-900">{repo.name}</p>
//                     <p className="text-sm text-gray-600">{repo.fullName}</p>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Step: Select Branch */}
//           {step === 'select-branch' && (
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                 Select Branch for {selectedRepo?.name}
//               </h3>
//               <div className="space-y-2 max-h-96 overflow-y-auto">
//                 {branches.map((branch) => (
//                   <button
//                     key={branch}
//                     onClick={() => handleBranchSelect(branch)}
//                     className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-all"
//                   >
//                     <div className="flex items-center">
//                       <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
//                       </svg>
//                       <p className="font-semibold text-gray-900">{branch}</p>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Step: Commit Details */}
//           {step === 'commit' && (
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Commit Details</h3>
              
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Repository
//                   </label>
//                   <input
//                     type="text"
//                     value={selectedRepo?.fullName || ''}
//                     disabled
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Branch
//                   </label>
//                   <input
//                     type="text"
//                     value={selectedBranch}
//                     disabled
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     File Path <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={filePath}
//                     onChange={(e) => setFilePath(e.target.value)}
//                     placeholder="e.g., docs/file.txt or src/components/Component.tsx"
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Commit Message <span className="text-red-500">*</span>
//                   </label>
//                   <textarea
//                     value={commitMessage}
//                     onChange={(e) => setCommitMessage(e.target.value)}
//                     placeholder="Describe your changes..."
//                     rows={3}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//                   />
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
//           <button
//             onClick={handleClose}
//             className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
//           >
//             Cancel
//           </button>

//           {step === 'commit' && (
//             <button
//               onClick={handlePushFile}
//               disabled={loading || !filePath || !commitMessage}
//               className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
//             >
//               {loading ? (
//                 <>
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                   Pushing...
//                 </>
//               ) : (
//                 <>
//                   <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//                   </svg>
//                   Push to GitHub
//                 </>
//               )}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";

// interface GitPushModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   file: File | null;
//   textContent: string;
//   isTextMode: boolean;
// }

// export default function GitPushModal({
//   isOpen,
//   onClose,
//   file,
//   textContent,
//   isTextMode,
// }: GitPushModalProps) {
//   const [repoName, setRepoName] = useState("");
//   const [branchName, setBranchName] = useState("main");
//   const [commitMessage, setCommitMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   if (!isOpen) return null;

//   const handlePush = async () => {
//     setLoading(true);
//     try {
//       let content = "";

//       if (isTextMode) {
//         content = btoa(unescape(encodeURIComponent(textContent)));
//       } else if (file) {
//         const buffer = await file.arrayBuffer();
//         content = btoa(String.fromCharCode(...new Uint8Array(buffer)));
//       }

//       // TODO: Replace with your backend API call later
//       console.log("Ready to push:", {
//         repoName,
//         branchName,
//         commitMessage,
//         contentType: isTextMode ? "text" : "file",
//         fileName: file?.name || "newfile.txt",
//         contentPreview: content.slice(0, 80) + "...",
//       });

//       alert("File ready to push! (check console for preview)");
//       onClose();
//     } catch (err) {
//       console.error(err);
//       alert("Error preparing file for push.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative">
//         <h2 className="text-2xl font-bold text-gray-900 mb-4">Push to GitHub</h2>

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Repository Name
//             </label>
//             <input
//               type="text"
//               value={repoName}
//               onChange={(e) => setRepoName(e.target.value)}
//               placeholder="e.g. my-new-repo"
//               className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Branch Name
//             </label>
//             <input
//               type="text"
//               value={branchName}
//               onChange={(e) => setBranchName(e.target.value)}
//               placeholder="e.g. main"
//               className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Commit Message
//             </label>
//             <input
//               type="text"
//               value={commitMessage}
//               onChange={(e) => setCommitMessage(e.target.value)}
//               placeholder="e.g. Add new file"
//               className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>
//         </div>

//         <div className="mt-6 flex justify-end gap-3">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handlePush}
//             disabled={loading || !repoName.trim()}
//             className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
//           >
//             {loading ? "Preparing..." : "Push"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// // src/components/GitPushModal.tsx
// import { useState, useEffect } from 'react';
// import {
//   initiateGitHubLogin,
//   fetchGitHubRepos,
//   fetchGitHubBranches,
//   createGitHubRepo,
//   createGitHubBranch,
//   pushFileToGitHub,
//   // pushTextToGitHub,
//   fileToBase64,
//   type GitHubRepo,
// } from '@/services/gitPush.service';

// interface GitPushModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   file?: File | null;
//   textContent?: string | null;
// }

// type Step = 'auth' | 'select-repo' | 'select-branch' | 'commit' | 'create-repo' | 'create-branch';

// export default function GitPushModal({ isOpen, onClose, file, textContent }: GitPushModalProps) {
//   const [step, setStep] = useState<Step>('auth');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
  
//   const [repos, setRepos] = useState<GitHubRepo[]>([]);
//   const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
//   const [branches, setBranches] = useState<string[]>([]);
//   const [selectedBranch, setSelectedBranch] = useState<string>('');
  
//   const [filePath, setFilePath] = useState<string>('');
//   const [commitMessage, setCommitMessage] = useState<string>('');

//   const [newRepoName, setNewRepoName] = useState('');
//   const [newBranchName, setNewBranchName] = useState('');

//   useEffect(() => {
//     if (isOpen && step === 'auth') handleGitHubLogin();
//   }, [isOpen]);

//   useEffect(() => {
//     if (file) {
//       setFilePath(file.name);
//       setCommitMessage(`Add ${file.name}`);
//     } else if (textContent) {
//       setFilePath('new-file.txt');
//       setCommitMessage('Add text content');
//     }
//   }, [file, textContent]);

//   const handleGitHubLogin = async () => {
//     setLoading(true);
//     try {
//       await initiateGitHubLogin();
//       const reposResult = await fetchGitHubRepos();
//       if (reposResult.success && reposResult.data) {
//         setRepos(reposResult.data);
//         setStep('select-repo');
//       } else setError(reposResult.message || 'Failed to fetch repositories');
//     } catch {
//       setError('Authentication failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRepoSelect = async (repo: GitHubRepo) => {
//     setSelectedRepo(repo);
//     setLoading(true);
//     try {
//       const branchesResult = await fetchGitHubBranches(repo.owner, repo.name);
//       if (branchesResult.success && branchesResult.data) {
//         setBranches(branchesResult.data);
//         setSelectedBranch(branchesResult.data.includes('main') ? 'main' : branchesResult.data[0] || '');
//         setStep('select-branch');
//       } else setError(branchesResult.message || 'Failed to fetch branches');
//     } catch {
//       setError('Failed to load branches');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreateRepo = async () => {
//     if (!newRepoName) return setError('Repository name is required.');
//     setLoading(true);
//     try {
//       const result = await createGitHubRepo(newRepoName);
//       if (result.success) {
//         alert('Repository created successfully!');
//         setNewRepoName('');
//         const reposResult = await fetchGitHubRepos();
//         setRepos(reposResult.data || []);
//         setStep('select-repo');
//       } else setError(result.message || 'Failed to create repository.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreateBranch = async () => {
//     if (!newBranchName || !selectedRepo) return setError('Branch name is required.');
//     setLoading(true);
//     try {
//       const result = await createGitHubBranch(selectedRepo.owner, selectedRepo.name, newBranchName);
//       if (result.success) {
//         alert('Branch created successfully!');
//         setBranches([...branches, newBranchName]);
//         setSelectedBranch(newBranchName);
//         setStep('commit');
//       } else setError(result.message || 'Failed to create branch.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const handlePush = async () => {
//   //   if (!selectedRepo || !selectedBranch || !filePath || !commitMessage)
//   //     return setError('Please fill in all required fields.');

//   //   setLoading(true);
//   //   try {
//   //     let result;
//   //     if (file) {
//   //       const base64Content = await fileToBase64(file);
//   //       result = await pushFileToGitHub({
//   //         owner: selectedRepo.owner,
//   //         repo: selectedRepo.name,
//   //         branch: selectedBranch,
//   //         filePath,
//   //         content: base64Content,
//   //         commitMsg: commitMessage,
//   //       });
//   //     } else if (textContent) {
//   //       result = await pushFileToGitHub({
//   //         owner: selectedRepo.owner,
//   //         repo: selectedRepo.name,
//   //         branch: selectedBranch,
//   //         filePath,
//   //         content: Buffer.from(textContent).toString("base64"),
//   //         commitMsg: commitMessage,
//   //       });
//   //     }

//   //     if (result?.success) {
//   //       alert('Pushed successfully!');
//   //       handleClose();
//   //     } else setError(result?.message || 'Push failed.');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handlePush = async () => {
//   if (!selectedRepo || !selectedBranch || !filePath || !commitMessage)
//     return setError('Please fill in all required fields.');

//   setLoading(true);
//   setError(null);

//   try {
//     let base64Content = '';

//     if (file) {
//       // Convert uploaded file to base64
//       base64Content = await fileToBase64(file);
//     } else if (textContent) {
//       // Convert plain text content to base64
//       base64Content = btoa(unescape(encodeURIComponent(textContent)));
//     } else {
//       setError('No file or text content provided');
//       setLoading(false);
//       return;
//     }

//     const result = await pushFileToGitHub({
//       owner: selectedRepo.owner,
//       repo: selectedRepo.name,
//       branch: selectedBranch,
//       filePath,
//       content: base64Content,
//       commitMsg: commitMessage,
//     });

//     if (result.success) {
//       alert('Pushed successfully!');
//       handleClose();
//     } else {
//       setError(result.message || 'Push failed.');
//     }
//   } catch (err) {
//     console.error(err);
//     setError('An error occurred while pushing.');
//   } finally {
//     setLoading(false);
//   }
// };


//   const handleClose = () => {
//     setStep('auth');
//     setRepos([]);
//     setBranches([]);
//     setSelectedRepo(null);
//     setSelectedBranch('');
//     setFilePath('');
//     setCommitMessage('');
//     setError(null);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="flex items-center justify-between p-6 border-b">
//           <h2 className="text-2xl font-bold">Push to GitHub</h2>
//           <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">✕</button>
//         </div>

//         <div className="p-6 space-y-6">
//           {error && <div className="p-3 bg-red-50 border border-red-300 rounded text-red-700">{error}</div>}

//           {step === 'auth' && (
//             <div className="text-center py-8">
//               {loading ? <p>Authenticating...</p> : <p>Connecting to GitHub...</p>}
//             </div>
//           )}

//           {step === 'select-repo' && (
//             <div>
//               <h3 className="font-semibold mb-3">Select Repository</h3>
//               <div className="space-y-2 max-h-80 overflow-y-auto">
//                 {repos.map(repo => (
//                   <button
//                     key={repo.fullName}
//                     onClick={() => handleRepoSelect(repo)}
//                     className="block w-full text-left p-3 border rounded hover:bg-gray-50"
//                   >
//                     <p className="font-semibold">{repo.name}</p>
//                     <p className="text-sm text-gray-600">{repo.fullName}</p>
//                   </button>
//                 ))}
//               </div>

//               <button
//                 onClick={() => setStep('create-repo')}
//                 className="mt-4 text-blue-600 text-sm underline"
//               >
//                 + Create New Repository
//               </button>
//             </div>
//           )}

//           {step === 'create-repo' && (
//             <div>
//               <h3 className="font-semibold mb-3">Create New Repository</h3>
//               <input
//                 type="text"
//                 placeholder="Repository Name"
//                 value={newRepoName}
//                 onChange={e => setNewRepoName(e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//               <button
//                 onClick={handleCreateRepo}
//                 disabled={loading}
//                 className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
//               >
//                 {loading ? 'Creating...' : 'Create Repository'}
//               </button>
//             </div>
//           )}

//           {step === 'select-branch' && (
//             <div>
//               <h3 className="font-semibold mb-3">Select Branch</h3>
//               {branches.map(branch => (
//                 <button
//                   key={branch}
//                   onClick={() => { setSelectedBranch(branch); setStep('commit'); }}
//                   className="block w-full text-left p-3 border rounded mb-2 hover:bg-gray-50"
//                 >
//                   {branch}
//                 </button>
//               ))}
//               <button
//                 onClick={() => setStep('create-branch')}
//                 className="mt-4 text-blue-600 text-sm underline"
//               >
//                 + Create New Branch
//               </button>
//             </div>
//           )}

//           {step === 'create-branch' && (
//             <div>
//               <h3 className="font-semibold mb-3">Create New Branch</h3>
//               <input
//                 type="text"
//                 placeholder="Branch Name"
//                 value={newBranchName}
//                 onChange={e => setNewBranchName(e.target.value)}
//                 className="w-full p-2 border rounded"
//               />
//               <button
//                 onClick={handleCreateBranch}
//                 disabled={loading}
//                 className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
//               >
//                 {loading ? 'Creating...' : 'Create Branch'}
//               </button>
//             </div>
//           )}

//           {step === 'commit' && (
//             <div className="space-y-3">
//               <div>
//                 <label className="block text-sm font-medium">File Path</label>
//                 <input
//                   type="text"
//                   value={filePath}
//                   onChange={e => setFilePath(e.target.value)}
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium">Commit Message</label>
//                 <textarea
//                   value={commitMessage}
//                   onChange={e => setCommitMessage(e.target.value)}
//                   rows={3}
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//             </div>
//           )}
//         </div>

//         {step === 'commit' && (
//           <div className="flex justify-end p-6 border-t bg-gray-50">
//             <button
//               onClick={handlePush}
//               disabled={loading}
//               className="px-6 py-2 bg-blue-600 text-white rounded"
//             >
//               {loading ? 'Pushing...' : 'Push to GitHub'}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import {
//   initiateGitHubLogin,
//   fetchGitHubRepos,
//   fetchGitHubBranches,
//   createGitHubRepo,
//   createGitHubBranch,
//   pushFilesToGitHub, // ⬅️ updated to support multiple files
//   filesToBase64,
//   type GitHubRepo,
// } from "@/services/gitPush.service";

// interface GitPushModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   files?: File[];
//   textContent?: string | null;
// }

// type Step = "auth" | "select-repo" | "select-branch" | "commit" | "create-repo" | "create-branch";

// export default function GitPushModal({ isOpen, onClose, files = [], textContent }: GitPushModalProps) {
//   const [step, setStep] = useState<Step>("auth");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const [repos, setRepos] = useState<GitHubRepo[]>([]);
//   const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
//   const [branches, setBranches] = useState<string[]>([]);
//   const [selectedBranch, setSelectedBranch] = useState<string>("");

//   const [commitMessage, setCommitMessage] = useState<string>("Add files");

//   useEffect(() => {
//     if (isOpen && step === "auth") handleGitHubLogin();
//   }, [isOpen]);

//   const handleGitHubLogin = async () => {
//     setLoading(true);
//     try {
//       await initiateGitHubLogin();
//       const reposResult = await fetchGitHubRepos();
//       if (reposResult.success && reposResult.data) {
//         setRepos(reposResult.data);
//         setStep("select-repo");
//       } else setError(reposResult.message || "Failed to fetch repositories");
//     } catch {
//       setError("Authentication failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRepoSelect = async (repo: GitHubRepo) => {
//     setSelectedRepo(repo);
//     setLoading(true);
//     try {
//       const branchesResult = await fetchGitHubBranches(repo.owner, repo.name);
//       if (branchesResult.success && branchesResult.data) {
//         setBranches(branchesResult.data);
//         setSelectedBranch(branchesResult.data.includes("main") ? "main" : branchesResult.data[0] || "");
//         setStep("select-branch");
//       } else setError(branchesResult.message || "Failed to fetch branches");
//     } catch {
//       setError("Failed to load branches");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePush = async () => {
//     if (!selectedRepo || !selectedBranch || !commitMessage)
//       return setError("Please fill in all required fields.");

//     setLoading(true);
//     setError(null);

//     try {
//       let fileData: { filePath: string; content: string }[] = [];

//       if (files.length > 0) {
//         // Convert all files to base64
//         fileData = await Promise.all(
//           files.map(async (file) => ({
//             filePath: file.webkitRelativePath || file.name,
//             content: await filesToBase64(file),
//           }))
//         );
//       } else if (textContent) {
//         // Handle text mode as a single "file"
//         fileData = [
//           {
//             filePath: "new-file.txt",
//             content: btoa(unescape(encodeURIComponent(textContent))),
//           },
//         ];
//       }

//       const result = await pushFilesToGitHub({
//         owner: selectedRepo.owner,
//         repo: selectedRepo.name,
//         branch: selectedBranch,
//         files: fileData,
//         commitMsg: commitMessage,
//       });

//       if (result.success) {
//         alert("Pushed successfully!");
//         handleClose();
//       } else {
//         setError(result.message || "Push failed.");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("An error occurred while pushing.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => {
//     setStep("auth");
//     setRepos([]);
//     setBranches([]);
//     setSelectedRepo(null);
//     setSelectedBranch("");
//     setError(null);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         {/* header */}
//         <div className="flex items-center justify-between p-6 border-b">
//           <h2 className="text-2xl font-bold">Push to GitHub</h2>
//           <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
//             ✕
//           </button>
//         </div>

//         {/* body */}
//         <div className="p-6 space-y-6">
//           {error && <div className="p-3 bg-red-50 border border-red-300 rounded text-red-700">{error}</div>}

//           {step === "auth" && <p className="text-center py-8">{loading ? "Authenticating..." : "Connecting to GitHub..."}</p>}
//           {step === "select-repo" && (
//             <>
//               <h3 className="font-semibold mb-3">Select Repository</h3>
//               <div className="space-y-2 max-h-80 overflow-y-auto">
//                 {repos.map((repo) => (
//                   <button
//                     key={repo.fullName}
//                     onClick={() => handleRepoSelect(repo)}
//                     className="block w-full text-left p-3 border rounded hover:bg-gray-50"
//                   >
//                     <p className="font-semibold">{repo.name}</p>
//                     <p className="text-sm text-gray-600">{repo.fullName}</p>
//                   </button>
//                 ))}
//               </div>
//             </>
//           )}

//           {step === "select-branch" && (
//             <>
//               <h3 className="font-semibold mb-3">Select Branch</h3>
//               {branches.map((branch) => (
//                 <button
//                   key={branch}
//                   onClick={() => {
//                     setSelectedBranch(branch);
//                     setStep("commit");
//                   }}
//                   className="block w-full text-left p-3 border rounded mb-2 hover:bg-gray-50"
//                 >
//                   {branch}
//                 </button>
//               ))}
//             </>
//           )}

//           {step === "commit" && (
//             <div className="space-y-3">
//               <div>
//                 <label className="block text-sm font-medium">Commit Message</label>
//                 <textarea
//                   value={commitMessage}
//                   onChange={(e) => setCommitMessage(e.target.value)}
//                   rows={3}
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//             </div>
//           )}
//         </div>

//         {step === "commit" && (
//           <div className="flex justify-end p-6 border-t bg-gray-50">
//             <button
//               onClick={handlePush}
//               disabled={loading}
//               className="px-6 py-2 bg-blue-600 text-white rounded"
//             >
//               {loading ? "Pushing..." : "Push to GitHub"}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import {
//   initiateGitHubLogin,
//   fetchGitHubRepos,
//   fetchGitHubBranches,
//   createGitHubRepo,
//   createGitHubBranch,
//   pushFilesToGitHub,
//   type GitHubRepo,
//   filesToBase64,
//   type EncodedFile,
// } from "@/services/gitPush.service";
// // import { filesToBase64, EncodedFile } from "@/utils/fileToBase64";

// interface GitPushModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   files?: File[] | null; // supports folder or multiple file input
//   textContent?: string | null;
// }

// type Step = "auth" | "select-repo" | "select-branch" | "commit";  

// export default function GitPushModal({
//   isOpen,
//   onClose,
//   files = null,
//   textContent,
// }: GitPushModalProps) {
//   const [step, setStep] = useState<Step>("auth");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const [repos, setRepos] = useState<GitHubRepo[]>([]);
//   const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
//   const [branches, setBranches] = useState<string[]>([]);
//   const [selectedBranch, setSelectedBranch] = useState<string>("");

//   const [commitMessage, setCommitMessage] = useState<string>("Add files");

//   useEffect(() => {
//     if (isOpen && step === "auth") handleGitHubLogin();
//   }, [isOpen]);

//   const handleGitHubLogin = async () => {
//     setLoading(true);
//     try {
//       await initiateGitHubLogin();
//       const reposResult = await fetchGitHubRepos();
//       if (reposResult.success && reposResult.data) {
//         setRepos(reposResult.data);
//         setStep("select-repo");
//       } else {
//         setError(reposResult.message || "Failed to fetch repositories");
//       }
//     } catch {
//       setError("Authentication failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRepoSelect = async (repo: GitHubRepo) => {
//     setSelectedRepo(repo);
//     setLoading(true);
//     try {
//       const branchesResult = await fetchGitHubBranches(repo.owner, repo.name);
//       if (branchesResult.success && branchesResult.data) {
//         setBranches(branchesResult.data);
//         setSelectedBranch(branchesResult.data.includes("main") ? "main" : branchesResult.data[0] || "");
//         setStep("select-branch");
//       } else {
//         setError(branchesResult.message || "Failed to fetch branches");
//       }
//     } catch {
//       setError("Failed to load branches");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePush = async () => {
//     if (!selectedRepo || !selectedBranch || !commitMessage)
//       return setError("Please fill in all required fields.");

//     setLoading(true);
//     setError(null);

//     try {
//       let fileData: { filePath: string; content: string }[] = [];

//       if (files && files.length > 0) {
//         // Convert all selected files/folder to base64
//         const encodedFiles: EncodedFile[] = await filesToBase64(files);
//         console.log(encodedFiles.map(f => f.path));
//         fileData = encodedFiles.map((f) => ({
//           filePath: f.path,
//           content: f.content,
//         }));
//       } else if (textContent) {
//         // Handle editor text case
//         fileData = [
//           {
//             filePath: "new-file.txt",
//             content: btoa(unescape(encodeURIComponent(textContent))),
//           },
//         ];
//       } else {
//         return setError("No files or text content to push.");
//       }

//       const result = await pushFilesToGitHub({
//         owner: selectedRepo.owner,
//         repo: selectedRepo.name,
//         branch: selectedBranch,
//         files: fileData,
//         commitMsg: commitMessage,
//       });

//       if (result.success) {
//         alert("✅ Files pushed successfully!");
//         handleClose();
//       } else {
//         setError(result.message || "Push failed.");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("An error occurred while pushing.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => {
//     setStep("auth");
//     setRepos([]);
//     setBranches([]);
//     setSelectedRepo(null);
//     setSelectedBranch("");
//     setError(null);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b">
//           <h2 className="text-2xl font-bold">Push to GitHub</h2>
//           <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
//             ✕
//           </button>
//         </div>

//         {/* Body */}
//         <div className="p-6 space-y-6">
//           {error && <div className="p-3 bg-red-50 border border-red-300 rounded text-red-700">{error}</div>}

//           {step === "auth" && (
//             <p className="text-center py-8">{loading ? "Authenticating..." : "Connecting to GitHub..."}</p>
//           )}

//           {step === "select-repo" && (
//             <>
//               <h3 className="font-semibold mb-3">Select Repository</h3>
//               <div className="space-y-2 max-h-80 overflow-y-auto">
//                 {repos.map((repo) => (
//                   <button
//                     key={repo.fullName}
//                     onClick={() => handleRepoSelect(repo)}
//                     className="block w-full text-left p-3 border rounded hover:bg-gray-50"
//                   >
//                     <p className="font-semibold">{repo.name}</p>
//                     <p className="text-sm text-gray-600">{repo.fullName}</p>
//                   </button>
//                 ))}
//               </div>
//             </>
//           )}

//           {step === "select-branch" && (
//             <>
//               <h3 className="font-semibold mb-3">Select Branch</h3>
//               {branches.map((branch) => (
//                 <button
//                   key={branch}
//                   onClick={() => {
//                     setSelectedBranch(branch);
//                     setStep("commit");
//                   }}
//                   className="block w-full text-left p-3 border rounded mb-2 hover:bg-gray-50"
//                 >
//                   {branch}
//                 </button>
//               ))}
//             </>
//           )}

//           {step === "commit" && (
//             <div className="space-y-3">
//               <div>
//                 <label className="block text-sm font-medium">Commit Message</label>
//                 <textarea
//                   value={commitMessage}
//                   onChange={(e) => setCommitMessage(e.target.value)}
//                   rows={3}
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         {step === "commit" && (
//           <div className="flex justify-end p-6 border-t bg-gray-50">
//             <button
//               onClick={handlePush}
//               disabled={loading}
//               className="px-6 py-2 bg-blue-600 text-white rounded"
//             >
//               {loading ? "Pushing..." : "Push to GitHub"}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import {
//   initiateGitHubLogin,
//   fetchGitHubRepos,
//   fetchGitHubBranches,
//   pushFilesToGitHub,
//   type GitHubRepo,
//   filesToBase64,
//   type EncodedFile,
// } from "@/services/gitPush.service";

// interface GitPushModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   files?: File[] | null;
//   textContent?: string | null;
// }

// type Step = "auth" | "select-repo" | "select-branch" | "commit";

// export default function GitPushModal({
//   isOpen,
//   onClose,
//   files = null,
//   textContent,
// }: GitPushModalProps) {
//   const [step, setStep] = useState<Step>("auth");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const [repos, setRepos] = useState<GitHubRepo[]>([]);
//   const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
//   const [branches, setBranches] = useState<string[]>([]);
//   const [selectedBranch, setSelectedBranch] = useState<string>("");

//   const [commitMessage, setCommitMessage] = useState<string>("Add files");

//   useEffect(() => {
//     if (isOpen && step === "auth") handleGitHubLogin();
//   }, [isOpen]);

//   const handleGitHubLogin = async () => {
//     setLoading(true);
//     try {
//       await initiateGitHubLogin();
//       const reposResult = await fetchGitHubRepos();
//       if (reposResult.success && reposResult.data) {
//         setRepos(reposResult.data);
//         setStep("select-repo");
//       } else setError(reposResult.message || "Failed to fetch repositories");
//     } catch {
//       setError("Authentication failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRepoSelect = async (repo: GitHubRepo) => {
//     setSelectedRepo(repo);
//     setLoading(true);
//     try {
//       const branchesResult = await fetchGitHubBranches(repo.owner, repo.name);
//       if (branchesResult.success && branchesResult.data) {
//         setBranches(branchesResult.data);
//         setSelectedBranch(branchesResult.data.includes("main") ? "main" : branchesResult.data[0] || "");
//         setStep("select-branch");
//       } else setError(branchesResult.message || "Failed to fetch branches");
//     } catch {
//       setError("Failed to load branches");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePush = async () => {
//     if (!selectedRepo || !selectedBranch || !commitMessage)
//       return setError("Please fill in all required fields.");

//     setLoading(true);
//     setError(null);

//     try {
//       let fileData: { filePath: string; content: string }[] = [];

//       if (files && files.length > 0) {
//         const encodedFiles: EncodedFile[] = await filesToBase64(files);
//         console.log("📦 Files to push:", encodedFiles.map(f => f.path));

//         if (encodedFiles.length === 0) {
//           setError("No readable files found in the selected folder.");
//           setLoading(false);
//           return;
//         }

//         fileData = encodedFiles.map(f => ({
//           filePath: f.path,
//           content: f.content,
//         }));
//       } else if (textContent) {
//         fileData = [
//           {
//             filePath: "new-file.txt",
//             content: btoa(unescape(encodeURIComponent(textContent))),
//           },
//         ];
//       }

//       const result = await pushFilesToGitHub({
//         owner: selectedRepo.owner,
//         repo: selectedRepo.name,
//         branch: selectedBranch,
//         files: fileData,
//         commitMsg: commitMessage,
//       });

//       if (result.success) {
//         alert("✅ Files pushed successfully!");
//         handleClose();
//       } else {
//         setError(result.message || "Push failed.");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("An error occurred while pushing.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => {
//     setStep("auth");
//     setRepos([]);
//     setBranches([]);
//     setSelectedRepo(null);
//     setSelectedBranch("");
//     setError(null);
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="flex items-center justify-between p-6 border-b">
//           <h2 className="text-2xl font-bold">Push to GitHub</h2>
//           <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">✕</button>
//         </div>

//         <div className="p-6 space-y-6">
//           {error && <div className="p-3 bg-red-50 border border-red-300 rounded text-red-700">{error}</div>}

//           {step === "auth" && <p className="text-center py-8">{loading ? "Authenticating..." : "Connecting to GitHub..."}</p>}

//           {step === "select-repo" && (
//             <>
//               <h3 className="font-semibold mb-3">Select Repository</h3>
//               <div className="space-y-2 max-h-80 overflow-y-auto">
//                 {repos.map(repo => (
//                   <button
//                     key={repo.fullName}
//                     onClick={() => handleRepoSelect(repo)}
//                     className="block w-full text-left p-3 border rounded hover:bg-gray-50"
//                   >
//                     <p className="font-semibold">{repo.name}</p>
//                     <p className="text-sm text-gray-600">{repo.fullName}</p>
//                   </button>
//                 ))}
//               </div>
//             </>
//           )}

//           {step === "select-branch" && (
//             <>
//               <h3 className="font-semibold mb-3">Select Branch</h3>
//               {branches.map(branch => (
//                 <button
//                   key={branch}
//                   onClick={() => {
//                     setSelectedBranch(branch);
//                     setStep("commit");
//                   }}
//                   className="block w-full text-left p-3 border rounded mb-2 hover:bg-gray-50"
//                 >
//                   {branch}
//                 </button>
//               ))}
//             </>
//           )}

//           {step === "commit" && (
//             <div className="space-y-3">
//               <label className="block text-sm font-medium">Commit Message</label>
//               <textarea
//                 value={commitMessage}
//                 onChange={(e) => setCommitMessage(e.target.value)}
//                 rows={3}
//                 className="w-full p-2 border rounded"
//               />
//             </div>
//           )}
//         </div>

//         {step === "commit" && (
//           <div className="flex justify-end p-6 border-t bg-gray-50">
//             <button
//               onClick={handlePush}
//               disabled={loading}
//               className="px-6 py-2 bg-blue-600 text-white rounded"
//             >
//               {loading ? "Pushing..." : "Push to GitHub"}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import {
  initiateGitHubLogin,
  fetchGitHubRepos,
  fetchGitHubBranches,
  createGitHubRepo,
  createGitHubBranch,
  pushFilesToGitHub,
  filesToBase64,
  type GitHubRepo,
  type EncodedFile,
} from "@/services/gitPush.service";
import { ErrorHandler } from "@/lib/error-handler";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface GitPushModalProps {
  isOpen: boolean;
  onClose: () => void;
  files?: File[] | null;
  textContent?: string | null;
}

type Step =
  | "auth"
  | "select-repo"
  | "select-branch"
  | "commit"
  | "create-repo"
  | "create-branch";

export default function GitPushModal({
  isOpen,
  onClose,
  files = null,
  textContent,
}: GitPushModalProps) {
  const [step, setStep] = useState<Step>("auth");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [branches, setBranches] = useState<string[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [fileName, setFileName] = useState<string>("newfile.txt");

  const [commitMessage, setCommitMessage] = useState<string>("Add files");
  const [newRepoName, setNewRepoName] = useState("");
  const [newBranchName, setNewBranchName] = useState("");

  useEffect(() => {
    if (isOpen && step === "auth") handleGitHubLogin();
  }, [isOpen, step]);

  useEffect(() => {
    if (files && files.length === 1) {
      setFileName(files[0].name);
    }
  }, [files]);


  const handleGitHubLogin = async () => {
    setLoading(true);
    try {
      await initiateGitHubLogin();
      const reposResult = await fetchGitHubRepos();
      if (reposResult.success && reposResult.data) {
        setRepos(reposResult.data);
        setStep("select-repo");
      } else setError(reposResult.message || "Failed to fetch repositories");
    } catch {
      setError("Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRepoSelect = async (repo: GitHubRepo) => {
    setSelectedRepo(repo);
    setLoading(true);
    try {
      const branchesResult = await fetchGitHubBranches(repo.owner, repo.name);
      if (branchesResult.success && branchesResult.data) {
        setBranches(branchesResult.data);
        setSelectedBranch(
          branchesResult.data.includes("main")
            ? "main"
            : branchesResult.data[0] || ""
        );
        setStep("select-branch");
      } else setError(branchesResult.message || "Failed to fetch branches");
    } catch {
      setError("Failed to load branches");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRepo = async () => {
    if (!newRepoName) return setError("Repository name is required.");
    setLoading(true);
    try {
      const result = await createGitHubRepo(newRepoName);
      if (result.success) {
        toast.success("✅ Repository created successfully!");
        setNewRepoName("");
        const reposResult = await fetchGitHubRepos();
        setRepos(reposResult.data || []);
        setStep("select-repo");
      } else setError("Failed to create repository.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBranch = async () => {
    if (!newBranchName || !selectedRepo)
      return setError("Branch name is required.");
    setLoading(true);
    try {
      const result = await createGitHubBranch(
        selectedRepo.owner,
        selectedRepo.name,
        newBranchName
      );
      if (result.success) {
        toast.success("✅ Branch created successfully!");
        setBranches([...branches, newBranchName]);
        setSelectedBranch(newBranchName);
        setStep("commit");
      } else setError("Failed to create branch.");
    } finally {
      setLoading(false);
    }
  };

  const handlePush = async () => {
    if (!selectedRepo || !selectedBranch || !commitMessage)
      return setError("Please fill in all required fields.");

    setLoading(true);
    setError(null);

    try {
      let fileData: { filePath: string; content: string }[] = [];

      if (files && files.length > 0) {
        const encodedFiles: EncodedFile[] = await filesToBase64(files);

        if (encodedFiles.length === 0) {
          setError("No readable files found in the selected folder.");
          setLoading(false);
          return;
        }

        if (encodedFiles.length === 1 && !textContent) {
          const singleFile = encodedFiles[0];
          const newPath = fileName.trim();

          // Ensure the user didn’t accidentally leave it blank
          if (!newPath) {
            setError("Please enter a valid file name.");
            setLoading(false);
            return;
          }

          fileData = [{
            filePath: newPath, // ✅ Use the new file name (no folders)
            content: singleFile.content,
          }];
        } else {
          fileData = encodedFiles.map((f) => ({
            filePath: f.path, // keep original structure for folders
            content: f.content,
          }));
        }

      } else if (textContent) {
        fileData = [
          {
            filePath: fileName,
            content: btoa(unescape(encodeURIComponent(textContent))),
          },
        ];
      }

      const result = await pushFilesToGitHub({
        owner: selectedRepo.owner,
        repo: selectedRepo.name,
        branch: selectedBranch,
        files: fileData,
        commitMsg: commitMessage,
      });

      if (result.success) {
        toast.success("✅ Files pushed successfully!");
        handleClose();
      } else {
        setError(result.message || "Push failed.");
      }
    } catch (err) {
      ErrorHandler.logError(err);
      setError("An error occurred while pushing.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep("auth");
    setRepos([]);
    setBranches([]);
    setSelectedRepo(null);
    setSelectedBranch("");
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Push to GitHub</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {error && (
            <div className="p-3 bg-red-50 border border-red-300 rounded text-red-700">
              {error}
            </div>
          )}

          {step === "auth" && (
            <p className="text-center py-8">
              {loading ? "Authenticating..." : "Connecting to GitHub..."}
            </p>
          )}

          {/* Select Repo */}
          {step === "select-repo" && (
            <>
              <h3 className="font-semibold mb-3">Select Repository</h3>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {repos.map((repo) => (
                  <button
                    key={repo.fullName}
                    onClick={() => handleRepoSelect(repo)}
                    className="block w-full text-left p-3 border rounded hover:bg-gray-50"
                  >
                    <p className="font-semibold">{repo.name}</p>
                    <p className="text-sm text-gray-600">{repo.fullName}</p>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep("create-repo")}
                className="mt-4 text-blue-600 text-sm underline"
              >
                + Create New Repository
              </button>
            </>
          )}

          {/* Create Repo */}
          {step === "create-repo" && (
            <div>
              <h3 className="font-semibold mb-3">Create New Repository</h3>
              <input
                type="text"
                placeholder="Repository Name"
                value={newRepoName}
                onChange={(e) => setNewRepoName(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <button
                onClick={handleCreateRepo}
                disabled={loading}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
              >
                {loading ? "Creating..." : "Create Repository"}
              </button>
            </div>
          )}

          {/* Select Branch */}
          {step === "select-branch" && (
            <>
              <h3 className="font-semibold mb-3">Select Branch</h3>
              {branches.map((branch) => (
                <button
                  key={branch}
                  onClick={() => {
                    setSelectedBranch(branch);
                    setStep("commit");
                  }}
                  className="block w-full text-left p-3 border rounded mb-2 hover:bg-gray-50"
                >
                  {branch}
                </button>
              ))}
              <button
                onClick={() => setStep("create-branch")}
                className="mt-4 text-blue-600 text-sm underline"
              >
                + Create New Branch
              </button>
            </>
          )}

          {/* Create Branch */}
          {step === "create-branch" && (
            <div>
              <h3 className="font-semibold mb-3">Create New Branch</h3>
              <input
                type="text"
                placeholder="Branch Name"
                value={newBranchName}
                onChange={(e) => setNewBranchName(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <button
                onClick={handleCreateBranch}
                disabled={loading}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
              >
                {loading ? "Creating..." : "Create Branch"}
              </button>
            </div>
          )}

          {/* Commit Step */}
          {step === "commit" && (
            <div className="space-y-3">
              {(textContent || (files && files.length === 1)) && (
                <div className="space-y-3">
                  <Label className="block text-sm font-medium">File Name</Label>
                  <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Enter file name (e.g., index.js)"
                  />
                </div>
              )}
              <Label className="block text-sm font-medium">Commit Message</Label>
              <textarea
                value={commitMessage}
                onChange={(e) => setCommitMessage(e.target.value)}
                rows={3}
                className="w-full p-2 border rounded"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        {step === "commit" && (
          <div className="flex justify-end p-6 border-t bg-gray-50">
            <button
              onClick={handlePush}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded"
            >
              {loading ? "Pushing..." : "Push to GitHub"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
