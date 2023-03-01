export const getCountdown = (time = '') => {
    // Get the difference in milliseconds
    const countdown = new Date(time).getTime() - Date.now();

    // If the difference is negative or zero, return zero values
    if (countdown <= 0) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        }
    }

    // Use Math.trunc to get the integer part of a number
    const days = Math.trunc(countdown / (1000 * 60 * 60 * 24));
    const hours = Math.trunc((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.trunc((countdown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.trunc((countdown % (1000 * 60)) / 1000);

    // Return an object with days, hours, minutes, and seconds properties
    return {
        days,
        hours,
        minutes,
        seconds,
    }
}