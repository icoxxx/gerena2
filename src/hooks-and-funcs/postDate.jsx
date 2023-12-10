const postDate = (fetchDate)=> {
    const apiDate = fetchDate;
    const dateObj = new Date(apiDate);
    const formattedDate = dateObj.toISOString().split('T')[0];
    return formattedDate
};

export default postDate;