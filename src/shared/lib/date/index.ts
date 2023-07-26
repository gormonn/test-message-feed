export const getISOTime = (date: string) => {
    // 2021-07-26T19:41:31.787Z
    const d = new Date(date);
    return d.toTimeString().split(' ')[0];
    // return date.split('T')[1].split('.')[0].split(':').slice(0, 2).join(':');
};

export const getISODay = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString();
    // return date.split('T')[0].split('-');
};
