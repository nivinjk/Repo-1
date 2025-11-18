// src/components/github/workspace/RepoSelector.tsx
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { toast } from "sonner";

export interface GitHubRepo {
  owner: string;
  name: string;
  fullName: string;
}

interface RepoSelectorProps {
  repos: GitHubRepo[];
  onSelect: (repo: GitHubRepo) => void;
  onClose: () => void;
  onCreateRepo: (name: string) => Promise<void>;
}

export default function GitRepoSelector({
  repos,
  onSelect,
  onClose,
  onCreateRepo,
}: RepoSelectorProps) {
  const [showCreate, setShowCreate] = useState(false);
  const [newRepoName, setNewRepoName] = useState("");
  const [creating, setCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRepos = repos.filter((repo) =>
    repo.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = async () => {
    if (!newRepoName.trim()) return;
    setCreating(true);
    try {
      await onCreateRepo(newRepoName);
      setNewRepoName("");
      setShowCreate(false);
    } catch (error) {
      toast.error("Failed to create repository");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#161b22] rounded-lg w-full max-w-2xl border border-[#30363d] max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#30363d]">
          <h2 className="text-xl font-semibold text-[#c9d1d9]">Select Repository</h2>
          <button
            onClick={onClose}
            className="text-[#8b949e] hover:text-[#c9d1d9] text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-[#30363d]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search repositories..."
            className="w-full bg-[#0d1117] text-[#c9d1d9] px-3 py-2 rounded border border-[#30363d] focus:outline-none focus:border-[#58a6ff]"
          />
        </div>

        {/* Repository List */}
        {!showCreate ? (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              {filteredRepos.length === 0 ? (
                <div className="text-center text-[#8b949e] py-8">
                  {searchQuery ? "No repositories found" : "No repositories yet"}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredRepos.map((repo) => (
                    <button
                      key={repo.fullName}
                      onClick={() => onSelect(repo)}
                      className="w-full text-left p-4 bg-[#0d1117] rounded border border-[#30363d] hover:border-[#58a6ff] hover:bg-[#161b22] transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-[#8b949e] mt-1 flex-shrink-0"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                        >
                          <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z" />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[#58a6ff] font-semibold">{repo.owner}</span>
                            <span className="text-[#8b949e]">/</span>
                            <span className="text-[#c9d1d9] font-semibold">{repo.name}</span>
                          </div>
                          <p className="text-sm text-[#8b949e] mt-1">{repo.fullName}</p>
                        </div>
                        <svg
                          className="w-5 h-5 text-[#8b949e] mt-1"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                        >
                          <path d="M4.7 10L3.3 8.6 6.9 5 3.3 1.4 4.7 0l5 5z" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-[#30363d]">
              <button
                onClick={() => setShowCreate(true)}
                className="w-full px-4 py-2 bg-[#238636] text-white rounded hover:bg-[#2ea043] font-medium"
              >
                + Create New Repository
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex-1 p-6">
              <h3 className="text-[#c9d1d9] font-semibold mb-4">Create New Repository</h3>
              <div className="space-y-4">
                <div>
                  <Label className="block text-sm text-[#8b949e] mb-2">
                    Repository Name
                  </Label>
                  <input
                    type="text"
                    value={newRepoName}
                    onChange={(e) => setNewRepoName(e.target.value)}
                    placeholder="my-awesome-project"
                    className="w-full bg-[#0d1117] text-[#c9d1d9] px-3 py-2 rounded border border-[#30363d] focus:outline-none focus:border-[#58a6ff]"
                    onKeyPress={(e) => e.key === "Enter" && handleCreate()}
                  />
                  <p className="text-xs text-[#8b949e] mt-2">
                    Repository will be created as public with auto-initialization
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-[#30363d] flex gap-2">
              <button
                onClick={handleCreate}
                disabled={creating || !newRepoName.trim()}
                className="flex-1 px-4 py-2 bg-[#238636] text-white rounded hover:bg-[#2ea043] disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {creating ? "Creating..." : "Create Repository"}
              </button>
              <button
                onClick={() => {
                  setShowCreate(false);
                  setNewRepoName("");
                }}
                className="flex-1 px-4 py-2 bg-[#21262d] text-[#c9d1d9] rounded hover:bg-[#30363d]"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}