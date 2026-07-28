import React, { useState, useEffect } from 'react';

const PollTimer = ({ createdAt, finishedAt }) => {
  // Helper to calculate time difference
  const calculateTimeLeft = () => {
    const end = new Date(finishedAt).getTime(); // Converts ISO string to ms
    const now = Date.now();                  // Current time in ms
    const diff = end - now;

    // Timer ended
    if (diff <= 0) {
      return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0, isEnded: true };
    }

    return {
      total: diff,
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isEnded: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    if (timeLeft.isEnded) return;

    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);

      // Stop interval once finished
      if (remaining.isEnded) {
        clearInterval(timer);
      }
    }, 1000);

    // Clean up interval on unmount
    return () => clearInterval(timer);
  }, [finishedAt]);

  if (timeLeft.isEnded) {
    return <span className="text-red-500 font-semibold text-xs">Poll Ended</span>;
  }

  // Format single numbers to 2-digits (e.g., 5 -> "05")
  const pad = (num) => String(num).padStart(2, '0');

  return (
    <>
      {timeLeft.days > 0 && <span>{timeLeft.days}d </span>}
      <span>{pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}</span>
    </>
  );
};

export default PollTimer;