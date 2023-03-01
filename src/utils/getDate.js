// This function returns an object with year, month, and day properties based on a given timestamp and locales

const months = {
    "uz": ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentrabr", "Oktyabr", "Noyabr", "Dekabr"],
    "ru": ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декарь"],
}

export const getDate = (timestamp, locale = "uz") => { // Use default parameter for locale
    if (timestamp == null) return 0;

    var date = new Date(timestamp);

    // Use ternary operator to get month name based on locale
    const getMonth = () => locale === 'uz' ? months.uz[date.getMonth()] : months.ru[getMonth()];

    // Return an object with year, month and day properties
    return {
        year: date.getFullYear(),
        month: getMonth(),
        day: date.getDate(),
    };
}