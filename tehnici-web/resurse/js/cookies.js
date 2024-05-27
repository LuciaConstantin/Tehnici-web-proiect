//setCookie("a",10, 1000)
function setCookie(nume, val, timpExpirare){//timpExpirare in milisecunde
    d=new Date();
    d.setTime(d.getTime()+timpExpirare)
    document.cookie=`${nume}=${val}; expires=${d.toUTCString()}`;
}
function setCookieProdus(nume, val, timpExpirare) {
    let d = new Date();
    d.setTime(d.getTime() + timpExpirare);
    document.cookie = `${nume}=${val}; expires=${d.toUTCString()}; path=/`;
}


function getCookie(nume){
    vectorParametri=document.cookie.split(";") // ["a=10","b=ceva"]
    for(let param of vectorParametri){
        if (param.trim().startsWith(nume+"="))
            return param.split("=")[1]
    }
    return null;
}

function deleteCookie(nume){
    console.log(`${nume}; expires=${(new Date()).toUTCString()}`)
    document.cookie=`${nume}=0; expires=${(new Date()).toUTCString()}`;
}

function deleteAllCookies() { 
    var allCookies = document.cookie.split(';'); 
    
    for (var i = 0; i < allCookies.length; i++) 
        document.cookie = allCookies[i] + "=;expires=" 
        + new Date(0).toUTCString(); 

} 



function ultimulProdus() {
    const uProdus = getCookie("ultimul_produs_accesat");
    if (uProdus) {
        const linkProd = document.createElement("a");
        linkProd.href = `/produs/${uProdus}`;
        linkProd.textContent = "Ultimul produs accesat";
        document.getElementById("ultimul_produs").appendChild(linkProd);
    } else {
        document.getElementById("ultimul_produs").textContent = "Nu ati accesat pana acum un produs";
    }
}




function acordeonProduse() {
    document.querySelectorAll('.accordion-button').forEach(button => {
        const idProd = button.getAttribute('data-bs-target').replace('#collapse', '');
        const stareAcodeon = getCookie(`accordion_${idProd}`);

        if (stareAcodeon === 'true') {
            const produs = document.querySelector(button.getAttribute('data-bs-target'));
            const acordColap = new bootstrap.Collapse(produs, { toggle: true });
            acordColap.show();
        }

        button.addEventListener('click', function () {
            const stare_acordeon = button.classList.contains('collapsed') ? 'false' : 'true';
            setCookie(`accordion_${idProd}`, stare_acordeon, 96000); 
        });
    });
}



window.addEventListener("load", function(){
    acordeonProduse();
    if (getCookie("acceptat_banner")){
        document.getElementById("banner").style.display="none";//none
        ultimulProdus();
    }
    else{
        this.document.getElementById("banner").style.display ="block";
    }

    this.document.getElementById("ok_cookies").onclick=function(){
        setCookie("acceptat_banner",true,96000);
        document.getElementById("banner").style.display="none"
        ultimulProdus();
        
    }
    //ultimulProdus();
    //afiseazaUltimulProdusAccesat();
    
})



/*
function deleteCookie(nume) {
    document.cookie = `${nume}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}
*/

/*window.addEventListener("load", function() {
    deleteAllCookies();
});
*/









