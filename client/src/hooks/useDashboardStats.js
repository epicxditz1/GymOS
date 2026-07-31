export default function useDashboardStats(members) {
  const paidMembers = members.filter(
    (member) => member.status === "Paid"
  ).length;

  const unpaidMembers = members.filter(
    (member) => member.status === "Unpaid"
  ).length;

  return {
    paidMembers,
    unpaidMembers,
    totalFees: 0,
    todaysCollection: 0,
    presentMembers: 0,
    absentMembers: 0,
    expiringSoonMembers: 0,
  };
}