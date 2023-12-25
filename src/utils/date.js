

function getDayWithSuffix(day) {
    if (day >= 11 && day <= 13) {
        return day + 'th';
    }
    var lastDigit = day % 10;
    switch (lastDigit) {
        case 1:
            return day + 'st';
        case 2:
            return day + 'nd';
        case 3:
            return day + 'rd';
        default:
            return day + 'th';
    }
}

export function getCustomDate(timestamp) {
    const dateObject = new Date(timestamp);
    const formattedDate =
        getDayWithSuffix(dateObject.getDate()) +
        ' ' +
        new Intl.DateTimeFormat('en-US', { month: 'short' }).format(dateObject) +
        ' ' +
        dateObject.getFullYear();
    return formattedDate;
}

