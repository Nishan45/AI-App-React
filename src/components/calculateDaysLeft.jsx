export const calculateDaysLeft = (endDateString) => {
  const today = new Date();
  const endDate = new Date(endDateString);
  
  // Clear time signatures for an accurate date match
  today.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);
  
  const differenceInTime = endDate.getTime() - today.getTime();
  
  // Calculate raw days (can be negative if overdue)
  return Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
};
