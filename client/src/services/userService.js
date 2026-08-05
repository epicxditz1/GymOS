import api from "./api";

// =======================
// Owner Profile
// =======================

export async function getOwnerProfile() {
  const response = await api.get("/users/me");
  return response.data;
}

export async function updateOwnerProfile(formData) {
  const response = await api.put(
    "/users/me",
    formData
  );

  return response.data;
}

// =======================
// Verify OTP
// =======================

export async function verifyOTP(email, otp) {
  const response = await api.post(
    "/users/verify-otp",
    {
      email,
      otp,
    }
  );

  return response.data;
}

// =======================
// Resend OTP
// =======================

export async function resendOTP(email) {
  const response = await api.post(
    "/users/resend-otp",
    {
      email,
    }
  );

  return response.data;
}