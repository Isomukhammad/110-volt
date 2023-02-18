const months = {
    "uz": ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentrabr", "Oktyabr", "Noyabr", "Dekabr"],
    "ru": ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декарь"],
}

export const getDate = (timestamp, locale) => {
    if (timestamp == null) return 0;

    var date = new Date(timestamp);

    const getMonth = () => {
        if (locale === 'uz') return months.uz[date.getMonth()];
        return months.ru[date.getMonth()];
    }

    return {
        year: date.getFullYear(),
        month: getMonth(),
        day: date.getDate(),
    };
}