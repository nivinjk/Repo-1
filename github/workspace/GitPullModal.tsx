interface GitPullModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (branch: string) => void;
}

export default function GitPullModal({ open, onClose, onConfirm }: GitPullModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="font-bold text-lg mb-3">Pull from Git</h2>
        <input
          type="text"
          placeholder="Branch (default: main)"
          className="w-full border p-2 rounded mb-4"
          id="branchInput"
        />
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-3 py-1 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={() => {
              const branchInput = (document.getElementById("branchInput") as HTMLInputElement).value || "main";
              onConfirm(branchInput);
            }}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Pull
          </button>
        </div>
      </div>
    </div>
  );
}
