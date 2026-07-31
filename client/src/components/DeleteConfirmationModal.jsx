function DeleteConfirmationModal({
  show,
  memberName,
  onCancel,
  onConfirm,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-slate-800 rounded-3xl p-8 w-[400px] border border-slate-700">

        <h2 className="text-2xl font-bold text-red-400 text-center">
          ⚠️ Delete Member
        </h2>

        <p className="text-center text-slate-300 mt-5">
          Are you sure you want to delete
        </p>

        <p className="text-center text-xl font-bold text-white mt-2">
          {memberName}?
        </p>

        <p className="text-center text-slate-400 mt-4">
          This action cannot be undone.
        </p>

        <div className="flex justify-between mt-8">

          <button
            onClick={onCancel}
            className="bg-slate-600 hover:bg-slate-500 px-5 py-2 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-500 px-5 py-2 rounded-xl"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}

export default DeleteConfirmationModal;