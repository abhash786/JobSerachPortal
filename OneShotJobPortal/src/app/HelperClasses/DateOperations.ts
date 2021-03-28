export class DateOperations {

    public static getDateWithoutTime(date: string) {
        var myDate = new Date(date);
        return new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate());
    }
}