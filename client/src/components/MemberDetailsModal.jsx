function MemberDetailsModal({
  member,
  show,
  onClose,
  onEdit,
  onDelete,
}) {
  if (!show || !member) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-slate-800 rounded-3xl p-8 w-[420px] border border-slate-700">

        <h2 className="text-3xl font-bold text-center mb-6">
          👤 Member Details
        </h2>

        {member.photo && (
          <img
            src={member.photo}
            alt={member.name}
            className="w-28 h-28 rounded-full object-cover mx-auto border-2 border-cyan-500"
          />
        )}

        <div className="mt-6 space-y-2">

          <p><strong>Name:</strong> {member.name}</p>

          <p><strong>Phone:</strong> {member.phone}</p>

          <p><strong>Age:</strong> {member.age}</p>

          <p><strong>Membership:</strong> {member.membership}</p>

          <p><strong>Fees:</strong> ₹{member.fees}</p>

          <p><strong>Status:</strong> {member.status}</p>

          <p><strong>Join Date:</strong> {member.joinDate}</p>

          <p><strong>Expiry Date:</strong> {member.expiryDate}</p>

          <p><strong>Attendance:</strong> {member.attendance}</p>

        </div>

        <div className="flex justify-between mt-8">

          <button onClick={onEdit}>
            ✏️ Edit
          </button>

          <button onClick={onDelete}>
            🗑 Delete
          </button>

          <button onClick={onClose}>
            ❌ Close
          </button>

        </div>

      </div>
    </div>
  );
}

export default MemberDetailsModal;