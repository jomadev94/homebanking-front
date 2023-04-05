export function format(date){
    return new Date(date).toLocaleDateString();
}

export function formatMonthYear(date){
    const arrayDate=new Date(date).toLocaleDateString().split("/");
    arrayDate.shift();
    arrayDate[1]=arrayDate[1].split("").splice(2,2).join("");
    return arrayDate.join("/");
}