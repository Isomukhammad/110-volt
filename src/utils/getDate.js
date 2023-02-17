const months = {
    "uz": ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentrabr", "Oktyabr", "Noyabr", "Dekabr"],
    "ru": ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декарь"],
}

export const getDate = (timestamp, locale) => {
    var d = new Date(timestamp);

    const year = d.getFullYear();
    const getMonth = () => {
        if (locale === 'uz') {
            return months.uz[d.getMonth()]
        } else {
            return months.ru[d.getMonth()]
        }
    }
    const month = getMonth();
    const day = d.getDate();
    const date = {
        year: year,
        month: month,
        day: day,

    };

    return date;
}