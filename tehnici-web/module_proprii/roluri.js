
const Drepturi=require('./drepturi.js');

/**
 * Se defineste o clasa de baza
 */
class Rol{
    /**
     * @returns {string} Tipul de rol
     */
    static get tip() {return "generic"}
    /**
     * @returns {Symbol[]} Lista de drepturi asociate rolului
     */
    static get drepturi() {return []}
    /**
     * Creează o instanță a clasei Rol
     */
    constructor (){
        this.cod=this.constructor.tip;
    }
    /**
     * Verifică dacă rolul are un anumit drept.
     * @param {Symbol} drept - Dreptul de verificat
     * @returns {boolean} True dacă rolul are dreptul, altfel false
     */
    areDreptul(drept){ //drept trebuie sa fie tot Symbol
        console.log("in metoda rol!!!!")
        return this.constructor.drepturi.includes(drept); //pentru ca e admin
    }
}

/**
 * Se defineste o clasa pentru admin
 */
class RolAdmin extends Rol{
    /**
     * @returns {string} Tipul de rol
     */
    static get tip() {return "admin"}
    /**
     * Creeaza o instanta a clasei admin
     */
    constructor (){
        super();
    }
    /**
     * Accepta toate rolurile deoarece e admin
     * @returns {boolean} true 
     */
    areDreptul(){
        return true; //pentru ca e admin
    }
}
/**
 * Clasa pentru rolul de moderator
 */
class RolModerator extends Rol{
    
    /**
     * @returns {string} Tipul de rol
     */
    static get tip() {return "moderator"}
    /**
     * @returns {Symbol[]} Lista de drepturi a rolului de noderator
     */
    static get drepturi() { return [
        Drepturi.vizualizareUtilizatori,
        Drepturi.stergereUtilizatori
    ] }
    /**
     * Creeaza o instanta a clasei moderator
     */
    constructor (){
        super()
    }
}
 
/**
 * Clasa pentru rolul de client
 */
class RolClient extends Rol{
    /**
     * @returns {string} Tipul de rol
     */
    static get tip() {return "comun"}
    /**
     * @returns {Symbol[]} Lista de drepturi a rolului de client
     */
    static get drepturi() { return [
        Drepturi.cumparareProduse
    ] }
    /**
     * Creeaza o instanta a clasei client
     */
    constructor (){
        super()
    }
}

/**
 * Clasa pentru crearea rolurilor utilizatorilor
 */
class RolFactory{
    /**
     * 
     * @param {string} tip 
     * @returns {Rol} 
     */
    static creeazaRol(tip) {
        switch(tip){
            case RolAdmin.tip : return new RolAdmin();
            case RolModerator.tip : return new RolModerator();
            case RolClient.tip : return new RolClient();
        }
    }
}


module.exports={
    RolFactory:RolFactory,
    RolAdmin:RolAdmin
}




