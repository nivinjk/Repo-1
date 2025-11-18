// src/components/GitHubAuthCallback.tsx
import { useEffect } from 'react';

export default function GitHubAuthCallback() {
  useEffect(() => {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const authStatus = urlParams.get('auth');
    const errorMessage = urlParams.get('message');

    // Send message to parent window (the main app)
    if (window.opener) {
      if (authStatus === 'success') {
        window.opener.postMessage(
          { type: 'github-auth-success' },
          window.location.origin
        );
      } else {
        window.opener.postMessage(
          { 
            type: 'github-auth-error',
            message: errorMessage || 'Authentication failed'
          },
          window.location.origin
        );
      }
      
      // Close the popup after a brief delay
      setTimeout(() => {
        window.close();
      }, 1000);
    } else {
      // If not in a popup, redirect to main page
      setTimeout(() => {
        window.location.href = '/git-push';
      }, 2000);
    }
  }, []);

  const urlParams = new URLSearchParams(window.location.search);
  const authStatus = urlParams.get('auth');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {authStatus === 'success' ? (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Authentication Successful!
            </h2>
            <p className="text-gray-600 mb-4">
              You can now push files to GitHub
            </p>
            <div className="flex items-center justify-center text-sm text-gray-500">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
              Closing window...
            </div>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Authentication Failed
            </h2>
            <p className="text-gray-600 mb-4">
              {urlParams.get('message') || 'Please try again'}
            </p>
            <div className="flex items-center justify-center text-sm text-gray-500">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
              Closing window...
            </div>
          </>
        )}
      </div>
    </div>
  );
}