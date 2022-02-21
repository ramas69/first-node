export class Student {
    id;
    name;
    firstName;
    birthDate;
    /**
     * @param {string} name 
     * @param {string} firstName 
     * @param {Date} birthDate 
     * @param {number} id 
     */
    constructor(name,firstName,birthDate,id=null) {
        this.id=id;
        this.name=name;
        this.firstName=firstName;
        this.birthDate=birthDate;
    }
}