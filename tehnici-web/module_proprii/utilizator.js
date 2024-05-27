const AccesBD=require('./accesbd.js');
const parole=require('./parole.js');

const {RolFactory}=require('./roluri.js');
const crypto=require("crypto");
const nodemailer=require("nodemailer");

/**
 * Clasa utilizatorului
 * @class
 */
class Utilizator{
    static tipConexiune="local";
    static tabel="utilizatori"
    static parolaCriptare="tehniciweb";
    static emailServer="tehniciweb26test@gmail.com"; ///trebuie sa creez un gmail pt aplicatie
    static lungimeCod=64;
    static numeDomeniu="localhost:8080";
    #eroare;
    /**
     * @constructor
     * 
     */
    constructor({id, username, nume, prenume, email, parola, rol, culoare_chat="black", poza}={}) {
        this.id=id;

        //optional sa facem asta in constructor
        try{
            if(this.checkUsername(username))
                this.username = username;
            else throw new Error ("Username incorect");
        }
        catch(e){ this.#eroare=e.message}

        for(let prop in arguments[0]){
            this[prop]=arguments[0][prop]
        }
        if(this.rol)
            this.rol=this.rol.cod? RolFactory.creeazaRol(this.rol.cod):  RolFactory.creeazaRol(this.rol);
        console.log(this.rol);

        this.#eroare="";
    }
    /**
     * Verifica daca exista numele
     * @param {string} nume 
     * @returns {boolean}
     */
    checkName(nume){
        return nume!="" && nume.match(new RegExp("^[A-Z][a-z]+$")) ;
    }

    /**
     * Seteaza numele
     * @param {string}
     */
    set setareNume(nume){
        if (this.checkName(nume)) this.nume=nume
        else{
            throw new Error("Nume gresit")
        }
    }

    /*
    * folosit doar la inregistrare si modificare profil
    */
   /**
    * Setare username
    * @param {string}
    */
    set setareUsername(username){
        if (this.checkUsername(username)) this.username=username
        else{
            throw new Error("Username gresit")
        }
    }

    /**
     * Verifica daca exista usernameul
     * @param {string} username 
     * @returns {boolean}
     */
    checkUsername(username){
        return username!="" && username.match(new RegExp("^[A-Za-z0-9#_./]+$")) ;
    }

    /**
     * Cripteaza parola
     * @param {string} parola 
     * @returns {string}
     */
    static criptareParola(parola){
        return crypto.scryptSync(parola,Utilizator.parolaCriptare,Utilizator.lungimeCod).toString("hex");
    }

    /**
     * Salveaza utilizatorul in baza de date
     * @returns {Promise<void>}
     */
    salvareUtilizator(){
        let parolaCriptata=Utilizator.criptareParola(this.parola);
        let utiliz=this;
        let token=parole.genereazaToken(100);
        AccesBD.getInstanta(Utilizator.tipConexiune).insert({tabel:Utilizator.tabel,
            campuri:{
                username:this.username,
                nume: this.nume,
                prenume:this.prenume,
                parola:parolaCriptata,
                email:this.email,
                culoare_chat:this.culoare_chat,
                cod:token,
                poza:this.poza}
            }, function(err, rez){
            if(err)
                console.log(err);
            else
                utiliz.trimiteMail("Te-ai inregistrat cu succes","Username-ul tau este "+utiliz.username,
            `<h1>Salut!</h1><p style='color:blue'>Username-ul tau este ${utiliz.username}.</p> <p><a href='http://${Utilizator.numeDomeniu}/cod/${utiliz.username}/${token}'>Click aici pentru confirmare</a></p>`,
            )
        });
    }
//xjxwhotvuuturmqm

    /**
     * Trimite mail catre utilizator
     * @param {string} subiect 
     * @param {string} mesajText 
     * @param {string} mesajHtml 
     * @param {Array<Object>} atasamente 
     * @returns {Promise<void>}
     */
    async trimiteMail(subiect, mesajText, mesajHtml, atasamente=[]){
        var transp= nodemailer.createTransport({
            service: "gmail",
            secure: false,
            auth:{//date login 
                user:Utilizator.emailServer,
                pass:"iaobhvdkvixvwgrv"
            },
            tls:{
                rejectUnauthorized:false
            }
        });
        //genereaza html
        await transp.sendMail({
            from:Utilizator.emailServer,
            to:this.email, //TO DO
            subject:subiect,//"Te-ai inregistrat cu succes",
            text:mesajText, //"Username-ul tau este "+username
            html: mesajHtml,// `<h1>Salut!</h1><p style='color:blue'>Username-ul tau este ${username}.</p> <p><a href='http://${numeDomeniu}/cod/${username}/${token}'>Click aici pentru confirmare</a></p>`,
            attachments: atasamente
        })
        console.log("trimis mail");
    }
   
    /**
     * Obtine async un utilizator dupa username
     * @param {string} username 
     * @returns {Promise<Utilizator|null>}
     */
    static async getUtilizDupaUsernameAsync(username){
        if (!username) return null;
        try{
            let rezSelect= await AccesBD.getInstanta(Utilizator.tipConexiune).selectAsync(
                {tabel:"utilizatori",
                campuri:['*'],
                conditiiAnd:[`username='${username}'`]
            });
            if(rezSelect.rowCount!=0){
                return new Utilizator(rezSelect.rows[0])
            }
            else {
                console.log("getUtilizDupaUsernameAsync: Nu am gasit utilizatorul");
                return null;
            }
        }
        catch (e){
            console.log(e);
            return null;
        }
        
    }
    
    /**
     * Obține un utilizator după username 
     *
     * @param {string} username - Numele de utilizator al utilizatorului.
     * @param {*} obparam - Obiectul de parametri pentru procesarea utilizatorului.
     * @param {Function} proceseazaUtiliz - Funcția de procesare a utilizatorului. Această funcție trebuie să aibă semnătura (utilizator, obparam, eroare).
     * @returns {void} Această funcție nu returnează nimic direct, dar apelează funcția de procesare cu rezultatul căutării utilizatorului.
     */
    static getUtilizDupaUsername (username,obparam, proceseazaUtiliz){
        if (!username) return null;
        let eroare=null;
        AccesBD.getInstanta(Utilizator.tipConexiune).select({tabel:"utilizatori",campuri:['*'],conditiiAnd:[`username='${username}'`]}, function (err, rezSelect){
            if(err){
                console.error("Utilizator:", err);
                //throw new Error()
                eroare=-2;
            }
            else if(rezSelect.rowCount==0){
                eroare=-1;
            }
            //constructor({id, username, nume, prenume, email, rol, culoare_chat="black", poza}={})
            let u= new Utilizator(rezSelect.rows[0])
            proceseazaUtiliz(u, obparam, eroare);
        });
    }

    /**
     * Modifica datele utilizatorului
     * @param {object} utiliz 
     */
    modifica(utiliz){
        let parolaCriptata=Utilizator.criptareParola(utiliz.parola);
        AccesBD.getInstanta(Utilizator.tipConexiune).update({tabel:Utilizator.tabel,
            campuri:{
                nume: utiliz.nume,
                prenume:utiliz.prenume,
                parola:parolaCriptata,
                email:utiliz.email,
                culoare_chat:utiliz.culoare_chat,
                poza:utiliz.poza},
            conditiiAnd: [`username='${utiliz.username}`] ///sau id  conditiiAnd: [`id='${utiliz.id}`]
            }, function(err, rez){
            if(err)
                console.log(err);
        });
    }
    
    /**
     * Sterge utilizatorul
     */
    sterge(){
        AccesBD.getInstanta(Utilizator.tipConexiune).delete({tabel:Utilizator.tabel,
            conditiiAnd: [`username='${utiliz.id}`]   ///conditiiAnd: [`id='${utiliz.id}`]
            }, function(err, rez){
            if(err)
                console.log(err);
        });
    }
    
    /**
     * Caută utilizatori în baza de date în funcție de parametrii specificați și apelează o funcție de callback sau returnează rezultatul sub formă de promisiune.
     *
     * @param {Object} obParam - Obiectul de parametri de căutare.
     * @param {Function} [callback] - (Opțional) Funcția de callback pentru rezultatele căutării. Aceasta trebuie să aibă semnătura (err, rezultat).
     * @returns {Promise<Array<Object>>|void} O promisiune care se rezolvă cu un array de obiecte reprezentând utilizatorii găsiți, sau nu returnează nimic dacă este specificată o funcție de callback.
     */
    static cauta(obParam, callback) {
        let campuriCautare = Object.keys(obParam).filter(prop => obParam[prop] !== undefined); 
        let conditii = [];
        let parametriQuery = [];
    
        
        campuriCautare.forEach((camp, index) => {
            conditii.push(`${camp} = $${index + 1}`);
            parametriQuery.push(obParam[camp]);
        });
    
       
        AccesBD.getInstanta(Utilizator.tipConexiune).select({ 
            tabel: Utilizator.tabel, 
            campuri: ['*'], 
            conditiiAnd: conditii 
        }, (err, rezultat) => {
            if (err) {
                callback(err.message, []); 
            } else {
                callback(null, rezultat.rows); 
            }
        }, parametriQuery);
    }

    /**
     * Caută utilizatori în baza de date în funcție de parametrii specificați și returnează rezultatul sub formă de promisiune.
     *
     * @param {Object} obParam - Obiectul de parametri de căutare.
     * @returns {Promise<Array<Object>>} O promisiune care se rezolvă cu un array de obiecte reprezentând utilizatorii găsiți.
     */
    async cautaAsync(obParam) {
        let campuriCautare = Object.keys(obParam).filter(prop => obParam[prop] !== undefined); 
        let conditii = [];
    
        
        campuriCautare.forEach(camp => {
            conditii.push(`${camp} = $${camp}`);
        });
    
        try {
            
            let rezultat = await Utilizator.selectAsync({ 
                tabel: Utilizator.tabel, 
                campuri: ['*'], 
                conditiiAnd: conditii 
            });
    
            
            return rezultat.rows;
        } catch (e) {
            console.error(e);
            return []; 
        }
    }
    
    
    

    areDreptul(drept){
        return this.rol.areDreptul(drept);
    }
}
module.exports={Utilizator:Utilizator}







