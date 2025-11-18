// // src/components/GitHubAuthCallback.tsx
// import { useEffect } from "react";

// export default function GitHubAuthCallback() {
//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const authStatus = urlParams.get("auth");
//     const errorMessage = urlParams.get("message");

//     if (window.opener) {
//       if (authStatus === "success") {
//         window.opener.postMessage(
//           { type: "github-auth-success" },
//           window.location.origin
//         );
//       } else {
//         window.opener.postMessage(
//           {
//             type: "github-auth-error",
//             message: errorMessage || "Authentication failed",
//           },
//           window.location.origin
//         );
//       }

//       setTimeout(() => {
//         window.close();
//       }, 1000);
//     } else {
//       setTimeout(() => {
//         window.location.href = "/git-workspace";
//       }, 2000);
//     }
//   }, []);

//   const urlParams = new URLSearchParams(window.location.search);
//   const authStatus = urlParams.get("auth");

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#0d1117]">
//       console.log("page rendered")
//       <div className="bg-[#161b22] rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-[#30363d]">
//         {authStatus === "success" ? (
//           <>
//             <div className="w-16 h-16 bg-[#238636] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg
//                 className="w-8 h-8 text-[#3fb950]"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-[#c9d1d9] mb-2">
//               Authentication Successful!
//             </h2>
//             <p className="text-[#8b949e] mb-4">
//               You can now access your GitHub repositories
//             </p>
//             <div className="flex items-center justify-center text-sm text-[#8b949e]">
//               <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#58a6ff] mr-2"></div>
//               Closing window...
//             </div>
//           </>
//         ) : (
//           <>
//             <div className="w-16 h-16 bg-[#da3633] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg
//                 className="w-8 h-8 text-[#f85149]"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-[#c9d1d9] mb-2">
//               Authentication Failed
//             </h2>
//             <p className="text-[#8b949e] mb-4">
//               {urlParams.get('message') || "Please try again"}
//             </p>
//             <div className="flex items-center justify-center text-sm text-[#8b949e]">
//               <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#58a6ff] mr-2"></div>
//               Closing window...
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useEffect } from "react";

// export default function GitHubAuthCallback() {
//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const authStatus = urlParams.get("auth");
//     const errorMessage = urlParams.get("message");

//     if (window.opener) {
//       // If opened as popup
//       if (authStatus === "success") {
//         window.opener.postMessage({ type: "github-auth-success" }, window.location.origin);
//       } else {
//         window.opener.postMessage({
//           type: "github-auth-error",
//           message: errorMessage || "Authentication failed",
//         }, window.location.origin);
//       }

//       setTimeout(() => window.close(), 1000);
//     } else {
//       // Opened directly in browser
//       // Only redirect on success
//       if (authStatus === "success") {
//         setTimeout(() => {
//           window.location.href = "/git-workspace";
//         }, 1000);
//       }
//       // If failed, stay on this page and show error message
//     }
//   }, []);

//   const urlParams = new URLSearchParams(window.location.search);
//   const authStatus = urlParams.get("auth");

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#0d1117]">
//       <div className="bg-[#161b22] rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-[#30363d]">
//         {authStatus === "success" ? (
//           <>
//             <div className="w-16 h-16 bg-[#238636] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-8 h-8 text-[#3fb950]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-[#c9d1d9] mb-2">Authentication Successful!</h2>
//             <p className="text-[#8b949e] mb-4">You can now access your GitHub repositories.</p>
//             <div className="flex items-center justify-center text-sm text-[#8b949e]">
//               <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#58a6ff] mr-2"></div>
//               Closing window...
//             </div>
//           </>
//         ) : (
//           <>
//             <div className="w-16 h-16 bg-[#da3633] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-8 h-8 text-[#f85149]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-[#c9d1d9] mb-2">Authentication Failed</h2>
//             <p className="text-[#8b949e] mb-4">
//               {urlParams.get('message') || "Please try again"}
//             </p>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useEffect } from "react";

// export default function GitHubAuthCallback() {
//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const authStatus = urlParams.get("auth");
//     const errorMessage = urlParams.get("message");

//     if (window.opener) {
//       // --- Popup Flow ---
//       if (authStatus === "success") {
//         window.opener.postMessage(
//           { type: "github-auth-success" },
//           window.opener.location.origin
//         );
//       } else {
//         window.opener.postMessage(
//           {
//             type: "github-auth-error",
//             message: errorMessage || "Authentication failed",
//           },
//           window.opener.location.origin
//         );
//       }

//       setTimeout(() => window.close(), 1000);
//     } else {
//       // --- Direct Browser Navigation Flow ---
//       if (authStatus === "success") {
//         // Redirect ONLY on success
//         setTimeout(() => {
//           window.location.href = "/git-workspace";
//         }, 1200);
//       }
//       // If failed, DO NOT redirect → stay on page and show UI
//     }
//   }, []);

//   const urlParams = new URLSearchParams(window.location.search);
//   const authStatus = urlParams.get("auth");

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#0d1117]">
//       <div className="bg-[#161b22] rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-[#30363d]">
//         {authStatus === "success" ? (
//           <>
//             <div className="w-16 h-16 bg-[#238636] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-8 h-8 text-[#3fb950]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-[#c9d1d9] mb-2">Authentication Successful!</h2>
//             <p className="text-[#8b949e] mb-4">You can now access your GitHub repositories.</p>
//             <div className="flex items-center justify-center text-sm text-[#8b949e]">
//               <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#58a6ff] mr-2"></div>
//               Redirecting...
//             </div>
//           </>
//         ) : (
//           <>
//             <div className="w-16 h-16 bg-[#da3633] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-8 h-8 text-[#f85149]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-[#c9d1d9] mb-2">Authentication Failed</h2>
//             <p className="text-[#8b949e] mb-4">
//               {urlParams.get("message") || "Please try again"}
//             </p>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


// // src/components/GitHubAuthCallback.tsx
// import { useEffect } from 'react';

// export default function GitHubAuthCallback() {
//   useEffect(() => {
//     // Get URL parameters
//     const urlParams = new URLSearchParams(window.location.search);
//     const authStatus = urlParams.get('auth');
//     const errorMessage = urlParams.get('message');

//     // Send message to parent window (the main app)
//     if (window.opener) {
//       if (authStatus === 'success') {
//         window.opener.postMessage(
//           { type: 'github-auth-success' },
//           window.location.origin
//         );
//       } else {
//         window.opener.postMessage(
//           { 
//             type: 'github-auth-error',
//             message: errorMessage || 'Authentication failed'
//           },
//           window.location.origin
//         );
//       }
      
//       // Close the popup after a brief delay
//       setTimeout(() => {
//         window.close();
//       }, 1000);
//     } else {
//       // If not in a popup, redirect to main page
//       setTimeout(() => {
//         window.location.href = '/git-workspace';
//       }, 2000);
//     }
//   }, []);

//   const urlParams = new URLSearchParams(window.location.search);
//   const authStatus = urlParams.get('auth');

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
//       <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
//         {authStatus === 'success' ? (
//           <>
//             <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">
//               Authentication Successful!
//             </h2>
//             <p className="text-gray-600 mb-4">
//               You can now push files to GitHub
//             </p>
//             <div className="flex items-center justify-center text-sm text-gray-500">
//               <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
//               Closing window...
//             </div>
//           </>
//         ) : (
//           <>
//             <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">
//               Authentication Failed
//             </h2>
//             <p className="text-gray-600 mb-4">
//               {urlParams.get('message') || 'Please try again'}
//             </p>
//             <div className="flex items-center justify-center text-sm text-gray-500">
//               <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
//               Closing window...
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect } from "react";

export default function GitHubAuthCallback() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authStatus = urlParams.get("auth");
    const errorMessage = urlParams.get("message");
    const parentOrigin = window.location.origin; // correct origin

    const isPopup = !!window.opener;

    if (isPopup) {
      // --- POPUP MODE (normal login flow) ---
      if (authStatus === "success") {
        window.opener.postMessage(
          { type: "github-auth-success" },
          parentOrigin
        );
      } else {
        window.opener.postMessage(
          {
            type: "github-auth-error",
            message: errorMessage || "Authentication failed",
          },
          parentOrigin
        );
      }

      setTimeout(() => window.close(), 700);
      return;
    }

    // --- DIRECT BROWSER ACCESS (fallback mode) ---
    if (authStatus === "success") {
      // allow short UX pause before redirect
      setTimeout(() => {
        window.location.href = "/git-workspace";
      }, 1000);
    }

    // if failed, stay on the page and show error UI
  }, []);

  const urlParams = new URLSearchParams(window.location.search);
  const authStatus = urlParams.get("auth");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1117]">
      <div className="bg-[#161b22] rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-[#30363d]">
        {authStatus === "success" ? (
          <>
            <div className="w-16 h-16 bg-[#238636] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#3fb950]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#c9d1d9] mb-2">Authentication Successful!</h2>
            <p className="text-[#8b949e] mb-4">Redirecting to workspace...</p>
            <div className="flex items-center justify-center text-sm text-[#8b949e]">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#58a6ff] mr-2"></div>
              Please wait...
            </div>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-[#da3633] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#f85149]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#c9d1d9] mb-2">Authentication Failed</h2>
            <p className="text-[#8b949e] mb-4">
              {urlParams.get("message") || "Please try again"}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
