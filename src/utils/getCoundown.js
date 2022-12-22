const getCountdown = (time) => {
    const left = {
        days: null,
        hours: null,
        minutes: null,
        seconds: null
    }
    const timestamp = new Date(time).getTime();
    const current = Date.now();
    const countdown = timestamp - current;

    const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
    const hours = Math.floor((countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countdown % (1000 * 60)) / 1000);

    left.days = days;
    left.hours = hours;
    left.minutes = minutes;
    left.seconds = seconds;

    return left;
}

export default getCountdown;