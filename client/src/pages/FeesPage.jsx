function FeesPage({
  members,
  setPage,
  setPaymentMember,
  setShowPaymentPopup,
  showPaymentPopup,
  paymentMember,
  paymentMethod,
  setPaymentMethod,
  receivePayment,
  toggleFeeStatus,
}) {
  return (
    <div className="container">
      <h1>💰 Fees Management</h1>

      {members.length === 0 ? (
        <p>No Members Found</p>
      ) : (
        members.map((member, index) => (
          <div key={member._id}>
            <h3>{member.name}</h3>

            <p>Amount: ₹{member.fees}</p>

            <p>Status: {member.status}</p>

            <button
              onClick={() => {
                setPaymentMember(member);
                setShowPaymentPopup(true);
              }}
            >
              💵 Receive Payment
            </button>

            <button onClick={() => toggleFeeStatus(index)}>
              Change Status
            </button>

            <hr />
          </div>
        ))
      )}

      {showPaymentPopup && paymentMember && (
        <div className="history-popup">
          <div className="history-box">
            <h2>💵 Receive Payment</h2>

            <h3>{paymentMember.name}</h3>

            <p>Amount: ₹{paymentMember.fees}</p>

            <p>Select Payment Method</p>

            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
            </select>

            <br />
            <br />

            <button onClick={receivePayment}>
              ✅ Receive Payment
            </button>

            <button
              onClick={() => setShowPaymentPopup(false)}
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      )}

      <button onClick={() => setPage("home")}>
        Back
      </button>
    </div>
  );
}

export default FeesPage;