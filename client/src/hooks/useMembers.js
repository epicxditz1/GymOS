import { useState, useEffect } from "react";
import {
  getMembers,
  addMember,
  updateMember,
  markAttendanceById,
} from "../services/memberService";

export default function useMembers() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    async function loadMembers() {
      try {
        const data = await getMembers();

        if (Array.isArray(data)) {
          setMembers(data);
        } else {
          setMembers([]);
        }
      } catch (err) {
        console.error(err);
      }
    }

    loadMembers();
  }, []);
async function saveMember(formData) {
  try {
    const data = await addMember(formData);

    setMembers((prevMembers) => [
      ...prevMembers,
      data.member,
    ]);

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
async function editMember(id, formData) {
  try {
    const data = await updateMember(id, formData);

    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member._id === data.member._id ? data.member : member
      )
    );

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
  async function markAttendance(id, attendance) {
  try {
    const member = members.find((m) => m._id === id);

    if (!member) return;

    const updatedMember = {
      ...member,
      attendance,
    };

    const data = await markAttendanceById(
      id,
      updatedMember
    );

    setMembers((prevMembers) =>
      prevMembers.map((m) =>
        m._id === data.member._id
          ? data.member
          : m
      )
    );

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

  return {
    members,
    setMembers,
    saveMember,
    editMember,
    markAttendance,
  };
}