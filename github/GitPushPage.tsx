// // src/components/GitPushPage.tsx
// import { useState, useRef } from 'react';
// import GitPushModal from './GitPushModal';

// export default function GitPushPage() {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [inputMode, setInputMode] = useState<'file' | 'text' | null>(null);
//   const [textContent, setTextContent] = useState('');
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleAddAsTextClick = () => {
//   setInputMode('text');
//   setIsModalOpen(true);
// };


//   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setSelectedFile(file);
//     }
//   };

//   const handleUploadClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handlePushClick = () => {
//     if (selectedFile) {
//       setIsModalOpen(true);
//     }
//   };

//   const handleRemoveFile = () => {
//     setSelectedFile(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br  from-blue-50 via-white to-purple-50 py-12 px-4">
//       <div className="max-w-xl mx-auto">
//         {/* Header */}
//         <div className="text-center ">
//           <div className="flex items-center justify-center mb-4">
//             <svg className="w-16 h-16 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
//             </svg>
//           </div>
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">
//             Push to GitHub
//           </h1>
//           <p className="text-lg text-gray-600">
//             Upload your files and push them directly to your GitHub repository
//           </p>
//         </div>

//         {/* Main Card */}
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           {/* File Upload Area */}
//           <div className="mb-8">
//             <input
//               ref={fileInputRef}
//               type="file"
//               onChange={handleFileSelect}
//               className="hidden"
//               id="file-upload"
//             />
            
//             {!selectedFile ? (
//               <div
//                 onClick={handleUploadClick}
//                 className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
//               >
//                 <svg
//                   className="w-16 h-16 mx-auto mb-4 text-gray-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//                   />
//                 </svg>
//                 <p className="text-xl font-semibold text-gray-700 mb-2">
//                   Click to upload a file
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   or drag and drop your file here
//                 </p>
//               </div>
//             ) : (
//               <div className="border-2 border-green-500 bg-green-50 rounded-xl p-8">
//                 <div className="flex items-start justify-between">
//                   <div className="flex items-start flex-1">
//                     <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
//                       <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                       </svg>
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-lg font-semibold text-gray-900 mb-1">
//                         {selectedFile.name}
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         Size: {(selectedFile.size / 1024).toFixed(2)} KB
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         Type: {selectedFile.type || 'Unknown'}
//                       </p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={handleRemoveFile}
//                     className="ml-4 p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
//                     title="Remove file"
//                   >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-4">
//             <button
//               onClick={handleUploadClick}
//               className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center"
//             >
//               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
//               </svg>
//               {selectedFile ? 'Change File' : 'Choose File'}
//             </button>

//             <button
//               onClick={handleUploadClick}
//               className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center"
//             >
//               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
//               </svg>
//               Add as Text
//             </button>
            
//             <button
//               onClick={handlePushClick}
//               disabled={!selectedFile}
//               className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center"
//             >
//               <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
//               </svg>
//               Push to GitHub
//             </button>
//           </div>        
//         </div>
//       </div>

//       {/* Modal */}
//       <GitPushModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         file={selectedFile}
//       />
//     </div>
//   );
// }

// import { useState, useRef } from "react";
// import GitPushModal from "./GitPushModal";

// export default function GitPushPage() {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [textMode, setTextMode] = useState(false);
//   const [textContent, setTextContent] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // File Upload
//   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) setSelectedFile(file);
//   };

//   const handleUploadClick = () => {
//     setTextMode(false);
//     fileInputRef.current?.click();
//   };

//   const handleAddTextClick = () => {
//     setTextMode(true);
//     setSelectedFile(null);
//   };

//   const handlePushClick = () => {
//     if (selectedFile || textContent.trim()) {
//       setIsModalOpen(true);
//     }
//   };

//   const handleRemoveFile = () => {
//     setSelectedFile(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
//       <div className="max-w-xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center mb-4">
//             <svg
//               className="w-16 h-16 text-blue-600"
//               fill="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
//             </svg>
//           </div>
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">
//             Push to GitHub
//           </h1>
//           <p className="text-lg text-gray-600">
//             Upload a file or write text manually and push it to your repository
//           </p>
//         </div>

//         {/* Main Card */}
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <input
//             ref={fileInputRef}
//             type="file"
//             onChange={handleFileSelect}
//             className="hidden"
//             id="file-upload"
//           />

//           {/* File Upload or Text Area */}
//           {!textMode ? (
//             !selectedFile ? (
//               <div
//                 onClick={handleUploadClick}
//                 className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
//               >
//                 <svg
//                   className="w-16 h-16 mx-auto mb-4 text-gray-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//                   />
//                 </svg>
//                 <p className="text-xl font-semibold text-gray-700 mb-2">
//                   Click to upload a file
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   or drag and drop your file here
//                 </p>
//               </div>
//             ) : (
//               <div className="border-2 border-green-500 bg-green-50 rounded-xl p-8">
//                 <div className="flex items-start justify-between">
//                   <div className="flex items-start flex-1">
//                     <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
//                       <svg
//                         className="w-6 h-6 text-green-600"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                         />
//                       </svg>
//                     </div>
//                     <div className="flex-1">
//                       <p className="text-lg font-semibold text-gray-900 mb-1">
//                         {selectedFile.name}
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         Size: {(selectedFile.size / 1024).toFixed(2)} KB
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         Type: {selectedFile.type || "Unknown"}
//                       </p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={handleRemoveFile}
//                     className="ml-4 p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
//                     title="Remove file"
//                   >
//                     <svg
//                       className="w-5 h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             )
//           ) : (
//             <textarea
//               className="w-full h-64 border border-gray-300 rounded-xl p-4 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
//               placeholder="Type or paste your text content here..."
//               value={textContent}
//               onChange={(e) => setTextContent(e.target.value)}
//             />
//           )}

//           {/* Action Buttons */}
//           <div className="flex gap-4 mt-8">
//             <button
//               onClick={handleUploadClick}
//               className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
//             >
//               Upload File
//             </button>

//             <button
//               onClick={handleAddTextClick}
//               className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
//                 textMode
//                   ? "bg-blue-600 text-white hover:bg-blue-700"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               Add as Text
//             </button>

//             <button
//               onClick={handlePushClick}
//               disabled={!selectedFile && !textContent.trim()}
//               className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
//             >
//               Push to GitHub
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       <GitPushModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         file={selectedFile}
//         textContent={textContent}
//         // isTextMode={textMode}
//       />
//     </div>
//   );
// }


// import { useState, useRef } from "react";
// import GitPushModal from "./GitPushModal";

// export default function GitPushPage() {
//   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
//   const [textMode, setTextMode] = useState(false);
//   const [textContent, setTextContent] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // File Upload (single or multiple)
//   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files ? Array.from(event.target.files) : [];
//     if (files.length > 0) setSelectedFiles(files);
//   };

//   const handleUploadClick = () => {
//     setTextMode(false);
//     fileInputRef.current?.click();
//   };

//   const handleAddTextClick = () => {
//     setTextMode(true);
//     setSelectedFiles([]);
//   };

//   const handlePushClick = () => {
//     if (selectedFiles.length > 0 || textContent.trim()) {
//       setIsModalOpen(true);
//     }
//   };

//   const handleRemoveFiles = () => {
//     setSelectedFiles([]);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
//       <div className="max-w-xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center mb-4">
//             <svg
//               className="w-16 h-16 text-blue-600"
//               fill="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387..." />
//             </svg>
//           </div>
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">
//             Push to GitHub
//           </h1>
//           <p className="text-lg text-gray-600">
//             Upload one or multiple files (or folders) or write text manually
//           </p>
//         </div>

//         {/* Main Card */}
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <input
//             ref={fileInputRef}
//             type="file"
//             onChange={handleFileSelect}
//             multiple
//             {...({ webkitdirectory: true } as any)}
//             className="hidden"
//             id="file-upload"
//           />

//           {/* File Upload or Text Area */}
//           {!textMode ? (
//             selectedFiles.length === 0 ? (
//               <div
//                 onClick={handleUploadClick}
//                 className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
//               >
//                 <svg
//                   className="w-16 h-16 mx-auto mb-4 text-gray-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6..."
//                   />
//                 </svg>
//                 <p className="text-xl font-semibold text-gray-700 mb-2">
//                   Click to upload files or a folder
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   or drag and drop them here
//                 </p>
//               </div>
//             ) : (
//               <div className="border-2 border-green-500 bg-green-50 rounded-xl p-6">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <p className="font-semibold text-gray-900 mb-1">
//                       {selectedFiles.length} file(s) selected
//                     </p>
//                     <ul className="text-sm text-gray-700 max-h-32 overflow-y-auto list-disc pl-5">
//                       {selectedFiles.slice(0, 5).map((file, i) => (
//                         <li key={i}>{file.webkitRelativePath || file.name}</li>
//                       ))}
//                       {selectedFiles.length > 5 && (
//                         <li>+ {selectedFiles.length - 5} more...</li>
//                       )}
//                     </ul>
//                   </div>
//                   <button
//                     onClick={handleRemoveFiles}
//                     className="ml-4 p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
//                     title="Remove files"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               </div>
//             )
//           ) : (
//             <textarea
//               className="w-full h-64 border border-gray-300 rounded-xl p-4 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
//               placeholder="Type or paste your text content here..."
//               value={textContent}
//               onChange={(e) => setTextContent(e.target.value)}
//             />
//           )}

//           {/* Action Buttons */}
//           <div className="flex gap-4 mt-8">
//             <button
//               onClick={handleUploadClick}
//               className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
//             >
//               Upload Files / Folder
//             </button>

//             <button
//               onClick={handleAddTextClick}
//               className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
//                 textMode
//                   ? "bg-blue-600 text-white hover:bg-blue-700"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               Add as Text
//             </button>

//             <button
//               onClick={handlePushClick}
//               disabled={selectedFiles.length === 0 && !textContent.trim()}
//               className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
//             >
//               Push to GitHub
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       <GitPushModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         files={selectedFiles}
//         textContent={textContent}
//       />
//     </div>
//   );
// }



// import { useState, useRef } from "react";
// import GitPushModal from "./GitPushModal";

// export default function GitPushPage() {
//   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
//   const [textMode, setTextMode] = useState(false);
//   const [textContent, setTextContent] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files ? Array.from(event.target.files) : [];
//     if (files.length > 0) {
//       console.log("📁 Selected:", files.map(f => f.webkitRelativePath || f.name));
//       setSelectedFiles(files);
//     }
//   };

//   const handleUploadClick = () => {
//     setTextMode(false);
//     fileInputRef.current?.click();
//   };

//   const handleAddTextClick = () => {
//     setTextMode(true);
//     setSelectedFiles([]);
//   };

//   const handlePushClick = () => {
//     if (selectedFiles.length > 0 || textContent.trim()) {
//       setIsModalOpen(true);
//     }
//   };

//   const handleRemoveFiles = () => {
//     setSelectedFiles([]);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
//       <div className="max-w-xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center mb-4">
//             <svg
//               className="w-16 h-16 text-blue-600"
//               fill="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path d="M12 0C5.373 0 0 5.373 0 12a12 12 0 0012 12 12 12 0 000-24z" />
//             </svg>
//           </div>
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">
//             Push to GitHub
//           </h1>
//           <p className="text-lg text-gray-600">
//             Upload one or multiple files (or folders) or write text manually
//           </p>
//         </div>

//         {/* Main Card */}
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <input
//             ref={fileInputRef}
//             type="file"
//             multiple
//             // ✅ Allow folder selection
//             {...({ webkitdirectory: "true" } as any)}
//             onChange={handleFileSelect}
//             className="hidden"
//             id="file-upload"
//           />

//           {/* File Upload or Text Mode */}
//           {!textMode ? (
//             selectedFiles.length === 0 ? (
//               <div
//                 onClick={handleUploadClick}
//                 className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
//               >
//                 <svg
//                   className="w-16 h-16 mx-auto mb-4 text-gray-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6"
//                   />
//                 </svg>
//                 <p className="text-xl font-semibold text-gray-700 mb-2">
//                   Click to upload files or a folder
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   or drag and drop them here
//                 </p>
//               </div>
//             ) : (
//               <div className="border-2 border-green-500 bg-green-50 rounded-xl p-6">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <p className="font-semibold text-gray-900 mb-1">
//                       {selectedFiles.length} file(s) selected
//                     </p>
//                     <ul className="text-sm text-gray-700 max-h-32 overflow-y-auto list-disc pl-5">
//                       {selectedFiles.slice(0, 5).map((file, i) => (
//                         <li key={i}>{file.webkitRelativePath || file.name}</li>
//                       ))}
//                       {selectedFiles.length > 5 && (
//                         <li>+ {selectedFiles.length - 5} more...</li>
//                       )}
//                     </ul>
//                   </div>
//                   <button
//                     onClick={handleRemoveFiles}
//                     className="ml-4 p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
//                     title="Remove files"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               </div>
//             )
//           ) : (
//             <textarea
//               className="w-full h-64 border border-gray-300 rounded-xl p-4 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
//               placeholder="Type or paste your text content here..."
//               value={textContent}
//               onChange={(e) => setTextContent(e.target.value)}
//             />
//           )}

//           {/* Buttons */}
//           <div className="flex gap-4 mt-8">
//             <button
//               onClick={handleUploadClick}
//               className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
//             >
//               Upload Files / Folder
//             </button>

//             <button
//               onClick={handleAddTextClick}
//               className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
//                 textMode
//                   ? "bg-blue-600 text-white hover:bg-blue-700"
//                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//               }`}
//             >
//               Add as Text
//             </button>

//             <button
//               onClick={handlePushClick}
//               disabled={selectedFiles.length === 0 && !textContent.trim()}
//               className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
//             >
//               Push to GitHub
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       <GitPushModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         files={selectedFiles}
//         textContent={textContent}
//       />
//     </div>
//   );
// }


import { useState, useRef } from "react";
import GitPushModal from "./GitPushModal";

export default function GitPushPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [textMode, setTextMode] = useState(false);
  const [textContent, setTextContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  // Handles both file and folder selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    if (files.length > 0) {
      setSelectedFiles(files);
    }
  };

  const handleUploadFilesClick = () => {
    setTextMode(false);
    fileInputRef.current?.click();
  };

  const handleUploadFolderClick = () => {
    setTextMode(false);
    folderInputRef.current?.click();
  };

  const handleAddTextClick = () => {
    setTextMode(true);
    setSelectedFiles([]);
  };

  const handlePushClick = () => {
    if (selectedFiles.length > 0 || textContent.trim()) {
      setIsModalOpen(true);
    }
  };

  const handleRemoveFiles = () => {
    setSelectedFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (folderInputRef.current) folderInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <svg
              className="w-16 h-16 text-blue-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12a12 12 0 0012 12 12 12 0 000-24z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Push to GitHub
          </h1>
          <p className="text-lg text-gray-600">
            Upload one or multiple files, a folder, or write text manually
          </p>
        </div>

        {/* Hidden Inputs */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload-files"
        />

        <input
          ref={folderInputRef}
          type="file"
          multiple
          // ✅ Folder selection only
          {...({ webkitdirectory: '', directory: '' })}
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload-folder"
        />

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {!textMode ? (
            selectedFiles.length === 0 ? (
              <div
                className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <p className="text-xl font-semibold text-gray-700 mb-2">
                  Upload files or folder
                </p>
                <p className="text-sm text-gray-500">Use buttons below</p>
              </div>
            ) : (
              <div className="border-2 border-green-500 bg-green-50 rounded-xl p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      {selectedFiles.length} file(s) selected
                    </p>
                    <ul className="text-sm text-gray-700 max-h-32 overflow-y-auto list-disc pl-5">
                      {selectedFiles.slice(0, 5).map((file, i) => (
                        <li key={i}>{file.webkitRelativePath || file.name}</li>
                      ))}
                      {selectedFiles.length > 5 && (
                        <li>+ {selectedFiles.length - 5} more...</li>
                      )}
                    </ul>
                  </div>
                  <button
                    onClick={handleRemoveFiles}
                    className="ml-4 p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    title="Remove files"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )
          ) : (
            <textarea
              className="w-full h-64 border border-gray-300 rounded-xl p-4 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              placeholder="Type or paste your text content here..."
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
            />
          )}

          {/* Buttons */}
          <div className="flex gap-4 mt-8 flex-wrap">
            <button
              onClick={handleUploadFilesClick}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Upload Files
            </button>

            <button
              onClick={handleUploadFolderClick}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Upload Folder
            </button>

            <button
              onClick={handleAddTextClick}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                textMode
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Add as Text
            </button>

            <button
              onClick={handlePushClick}
              disabled={selectedFiles.length === 0 && !textContent.trim()}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              Push to GitHub
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <GitPushModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        files={selectedFiles}
        textContent={textContent}
      />
    </div>
  );
}
