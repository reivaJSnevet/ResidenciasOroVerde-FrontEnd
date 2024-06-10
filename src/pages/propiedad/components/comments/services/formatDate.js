const formatDate = (dateString) => {
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric" /* , hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true */,
    };
    return new Intl.DateTimeFormat("es-ES", options).format(
        new Date(dateString)
    );
};

export default formatDate;