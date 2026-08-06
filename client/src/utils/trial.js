const TRIAL_DAYS = 7;

export function startTrial() {
  if (!localStorage.getItem("trialStart")) {
    localStorage.setItem(
      "trialStart",
      new Date().toISOString()
    );
  }
}

export function getRemainingDays() {
  const trialStart =
    localStorage.getItem("trialStart");

  if (!trialStart) return TRIAL_DAYS;

  const start = new Date(trialStart);

  const now = new Date();

  const diff =
    now.getTime() - start.getTime();

  const daysPassed = Math.floor(
    diff / (1000 * 60 * 60 * 24)
  );

  return Math.max(
    0,
    TRIAL_DAYS - daysPassed
  );
}

export function trialExpired() {
  return getRemainingDays() <= 0;
}