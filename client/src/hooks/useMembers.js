import { useState, useEffect } from "react";
import { getMembers } from "../services/memberService";

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

  return {
    members,
    setMembers,
  };
}