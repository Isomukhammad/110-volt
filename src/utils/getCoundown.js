export const getCountdown = (time = '') => {
    const countdown = new Date(time).getTime() - Date.now();

    if (countdown >= 0) {
        const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
        const hours = Math.floor((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((countdown % (1000 * 60)) / 1000);

        return {
            days,
            hours,
            minutes,
            seconds,
        }
    }

    return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    }

}