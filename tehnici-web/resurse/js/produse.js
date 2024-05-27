window.addEventListener("load", function() {

    document.getElementById("inp-pret").onchange= function(){
        document.getElementById("infoRange").innerHTML=`(${this.value})`
    }

    
     // Obținem inputurile și selecturile de filtrare
    var inpNume = document.getElementById("inp-nume");
    var inpPret = document.getElementById("inp-pret");
    var inpCategorie = document.getElementById("inp-categorie");
    var inpEdituri = document.getElementById("edituri");
    var radioCuloare = document.getElementsByName("gr_rad");
    var chkPagini = document.getElementById("chk_discount");
    var inpDescriere = document.getElementById("inp-descriere");
    var selectData = document.getElementById("inp-data");

    // Atașăm evenimentul onchange pentru fiecare input și select
    inpNume.onchange = filtrare;
    inpPret.oninput = filtrare;
    inpCategorie.onchange = filtrare;
    inpEdituri.onchange = filtrare;
    for (let radio of radioCuloare) {
        radio.onchange = filtrare;
    }
    chkPagini.onchange = filtrare;
    inpDescriere.onchange = filtrare;
    selectData.onchange = filtrare;
    
    function filtrare() {
        var inpNume = document.getElementById("inp-nume").value.toLowerCase().trim(); /*cautare text- input de tip text*/

        var inpPret = parseInt(document.getElementById("inp-pret").value); /*filtrare dupa pret input de tip range*/

        var inpCategorie= document.getElementById("inp-categorie").value.toLowerCase().trim()/*select simplu*/

        var inpEdituri = document.getElementById("edituri").value.toLowerCase().trim(); /*datalist*/

        if (inpEdituri === "") {
            inpEdituri = "toate"; 
        }
        
        var radioCuloare = document.getElementsByName("gr_rad"); /*grup de inputuri de tip radio cu 7c */
        var inpCuloare;
        for (let rad of radioCuloare) {
            if (rad.checked) {
                inpCuloare = rad.value;
                break;
            }
        }

        var chkPagini =document.getElementById("chk_discount"); /*6e input de tip checkbox+ 7b*/
        let inpPagini;

        if (chkPagini.checked) {
            inpPagini = true;
        }
                
        var inpDescriere = document.getElementById("inp-descriere").value.toLowerCase().trim(); /*textarea*/

        var selectData = document.getElementById("inp-data"); /*select multiplu 7a*/
        var selectedMonths = Array.from(selectData.selectedOptions).map(option => parseInt(option.value));
        
        if (/\d/.test(inpNume)) {
            alert("Titlul nu poate conține cifre!");
            return; // Opriți executarea operației dacă inputul nu este valid
        }
    
        // Verificarea inputului de tip textarea
        var inpDescriere = document.getElementById("inp-descriere").value.trim();
        if (/\d/.test(inpDescriere)) {
            alert("Descrierea nu poate conține cifre!");
            return; // Opriți executarea operației dacă inputul nu este valid
        }

    
        var produse = document.getElementsByClassName("produs");

        var gasit = false;
        for (let produs of produse) {
            let valDescriere = produs.getElementsByClassName("descriere")[0].textContent.toLowerCase().trim();
            if (valDescriere.includes(inpDescriere)) {
                gasit = true;
                break;
            }
        }
        if (!gasit) {

            document.getElementById("inp-descriere").classList.add("is-invalid");
            return; // Oprește executarea funcției dacă inputul nu este valid
        } else {
            
            document.getElementById("inp-descriere").classList.remove("is-invalid");
        }
    
        var nrProduse=0;
        var nrProduseNeafisate=0;
        
        for (let produs of produse) {

            nrProduse++;

            let valNume = produs.getElementsByClassName("val-nume")[0].innerHTML.toLowerCase().trim();
            let cond1 = valNume.startsWith(inpNume);

            let valPagini = produs.getElementsByClassName("nr_pagini")[0].innerHTML.toLowerCase().trim();
            let cond2 = !inpPagini || (inpPagini && valPagini < 150);

            let valPret = parseFloat(produs.getElementsByClassName("val-pret")[0].innerHTML);
            let cond3= (valPret>inpPret)

            let valCategorie = produs.getElementsByClassName("val-tematica")[0].innerHTML.toLowerCase().trim();
            let cond4= (inpCategorie==valCategorie || inpCategorie=="toate")

            
            let valEditura = produs.getElementsByClassName("val-editura")[0].innerHTML.toLowerCase().trim();
            let cond5 = (inpEdituri == valEditura || inpEdituri == "toate")
            
            let valCuloare = produs.getElementsByClassName("culoare")[0].innerHTML.toLowerCase().trim();
            let cond6 = (inpCuloare === "toate" || valCuloare === inpCuloare);

            let valDescriere = produs.getElementsByClassName("descriere")[0].textContent.toLowerCase().trim();
            let cond7 = valDescriere.includes(inpDescriere);
           
            let valDataAdaugare = new Date(produs.getElementsByClassName("data_adaugare")[0].textContent);
            let cond8 = selectedMonths.includes(valDataAdaugare.getMonth() + 1);
            
            
            if (cond1 && cond2 && cond3 && cond4 && cond5 && cond6 && cond7 && cond8){
                produs.style.display = "inline-grid"; /*a fost inainte block */
                
            }
            else {
                produs.style.display = "none";
                nrProduseNeafisate++;
            } 
            
        }

        var totalProduse= nrProduse-nrProduseNeafisate;
        var pTotalProduse = document.getElementById("nr_produse");
        pTotalProduse.innerHTML = "Numărul de produse care respectă filtrele alese: " + totalProduse;
        if(nrProduseNeafisate === nrProduse)
            {
                alert("Nu există produse conform filtrării curente");
                return;
        }
       
    }


    document.getElementById("filtrare").onclick = function() {

        var inpNume = document.getElementById("inp-nume").value.toLowerCase().trim(); /*cautare text- input de tip text*/

        var inpPret = parseInt(document.getElementById("inp-pret").value); /*filtrare dupa pret input de tip range*/

        var inpCategorie= document.getElementById("inp-categorie").value.toLowerCase().trim()/*select simplu*/

        var inpEdituri = document.getElementById("edituri").value.toLowerCase().trim(); /*datalist*/

        if (inpEdituri === "") {
            inpEdituri = "toate"; 
        }
        
        var radioCuloare = document.getElementsByName("gr_rad"); /*grup de inputuri de tip radio cu 7c */
        var inpCuloare;
        for (let rad of radioCuloare) {
            if (rad.checked) {
                inpCuloare = rad.value;
                break;
            }
        }

        var chkPagini =document.getElementById("chk_discount"); /*6e input de tip checkbox+ 7b*/
        let inpPagini;

        if (chkPagini.checked) {
            inpPagini = true;
        }
                
        var inpDescriere = document.getElementById("inp-descriere").value.toLowerCase().trim(); /*textarea*/

        var selectData = document.getElementById("inp-data"); /*select multiplu 7a*/
        var selectedMonths = Array.from(selectData.selectedOptions).map(option => parseInt(option.value));
        
        if (/\d/.test(inpNume)) {
            alert("Titlul nu poate conține cifre!");
            return; // Opriți executarea operației dacă inputul nu este valid
        }
    
        // Verificarea inputului de tip textarea
        var inpDescriere = document.getElementById("inp-descriere").value.trim();
        if (/\d/.test(inpDescriere)) {
            alert("Descrierea nu poate conține cifre!");
            return; // Opriți executarea operației dacă inputul nu este valid
        }

    
        var produse = document.getElementsByClassName("produs");

        var gasit = false;
        for (let produs of produse) {
            let valDescriere = produs.getElementsByClassName("descriere")[0].textContent.toLowerCase().trim();
            if (valDescriere.includes(inpDescriere)) {
                gasit = true;
                break;
            }
        }
        if (!gasit) {

            document.getElementById("inp-descriere").classList.add("is-invalid");
            return; // Oprește executarea funcției dacă inputul nu este valid
        } else {
            
            document.getElementById("inp-descriere").classList.remove("is-invalid");
        }
    
        var nrProduse=0;
        var nrProduseNeafisate=0;
        
        for (let produs of produse) {

            nrProduse++;

            let valNume = produs.getElementsByClassName("val-nume")[0].innerHTML.toLowerCase().trim();
            let cond1 = valNume.startsWith(inpNume);

            let valPagini = produs.getElementsByClassName("nr_pagini")[0].innerHTML.toLowerCase().trim();
            let cond2 = !inpPagini || (inpPagini && valPagini < 150);

            let valPret = parseFloat(produs.getElementsByClassName("val-pret")[0].innerHTML);
            let cond3= (valPret>inpPret)

            let valCategorie = produs.getElementsByClassName("val-tematica")[0].innerHTML.toLowerCase().trim();
            let cond4= (inpCategorie==valCategorie || inpCategorie=="toate")

            
            let valEditura = produs.getElementsByClassName("val-editura")[0].innerHTML.toLowerCase().trim();
            let cond5 = (inpEdituri == valEditura || inpEdituri == "toate")
            
            let valCuloare = produs.getElementsByClassName("culoare")[0].innerHTML.toLowerCase().trim();
            let cond6 = (inpCuloare === "toate" || valCuloare === inpCuloare);

            let valDescriere = produs.getElementsByClassName("descriere")[0].textContent.toLowerCase().trim();
            let cond7 = valDescriere.includes(inpDescriere);
           
            let valDataAdaugare = new Date(produs.getElementsByClassName("data_adaugare")[0].textContent);
            let cond8 = selectedMonths.includes(valDataAdaugare.getMonth() + 1);
            
            
            if (cond1 && cond2 && cond3 && cond4 && cond5 && cond6 && cond7 && cond8){
                produs.style.display = "inline-grid"; /*a fost inainte block */
                
            }
            else {
                produs.style.display = "none";
                nrProduseNeafisate++;
            } 
            
        }

        if(nrProduseNeafisate === nrProduse)
            {
                alert("Nu există produse conform filtrării curente");
                return;
        }
        var totalProduse= nrProduse-nrProduseNeafisate;
        var pTotalProduse = document.getElementById("nr_produse");
        pTotalProduse.innerHTML = "Numărul de produse care respectă filtrele alese: " + totalProduse;

        
    }



    document.getElementById("resetare").onclick= function(){
        var confirmReset = window.confirm("Ești sigur că vrei să resetezi filtrele?");
        if(confirmReset){
            document.getElementById("inp-nume").value="";
            document.getElementById("inp-pret").value=document.getElementById("inp-pret").min;
            document.getElementById("inp-categorie").value="toate";
            document.getElementById("edituri").value = "toate";
            document.getElementById("i_rad_toate").checked=true;
            document.getElementById("chk_discount").checked = false;
            document.getElementById("inp-descriere").value="";
            document.getElementById("inp-descriere").classList.remove("is-invalid");
            var produse=document.getElementsByClassName("produs");
            document.getElementById("infoRange").innerHTML="(0)";
            var selectData = document.getElementById("inp-data");
            var pTotalProduse = document.getElementById("nr_produse");
            pTotalProduse.innerHTML = "Inca nu s-au aplicat filtre ";
            for (let option of selectData.options) {
            option.selected = true;
            }
            for (let prod of produse){
                prod.style.display="inline-grid"; 
            }
        }
    }

    function sorteaza(semn) {
        var produse = document.getElementsByClassName("produs");
        var v_produse = Array.from(produse);
    
        v_produse.sort(function(a, b) {
            let pret_a = parseInt(a.getElementsByClassName("val-pret")[0].innerHTML);
            let pret_b = parseInt(b.getElementsByClassName("val-pret")[0].innerHTML);
            let autori_a = a.getElementsByClassName("autori")[0].innerHTML.split(',').length;
            let autori_b = b.getElementsByClassName("autori")[0].innerHTML.split(',').length;
    
            if (pret_a === pret_b) {
                return semn * (autori_a - autori_b); // Sortează după numărul de autori pentru valorile egale ale prețului
            } else {
                return semn * (pret_a - pret_b); // Sortează după preț
            }
        });
        for(let prod of v_produse){
            prod.parentNode.appendChild(prod)
        }
    }
    
    document.getElementById("sortCrescNume").onclick = function() {
        sorteaza(1);
    };
    
    document.getElementById("sortDescrescNume").onclick = function() {
        sorteaza(-1);
    };
    

    window.onkeydown=function(e){
        if(e.key=="c" && e.altKey){
            var suma=0;
            var produse = document.getElementsByClassName("produs");
            for (let produs of produse) {
                var stil= getComputedStyle(produs)
                if(stil.display !="none"){
                    suma+=parseFloat(produs.getElementsByClassName("val-pret")[0].innerHTML)
                }     
            }
            if(!document.getElementById("par_suma")){
                let p= document.createElement("p")
                p.innerHTML=suma;
                p.id="par_suma"
                container= document.getElementById("produse")
                container.insertBefore(p, container.children[0])
                setTimeout(function(){
                    var pgf=document.getElementById("par_suma")
                    if (pgf)
                        pgf.remove()
                }, 2000)
            }
            
        }
    }
    

})


/*function loadData(data) {
    const zileSapt = ['Duminică', 'Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă'];
    const luni = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];

    var ziSapt = zileSapt[data.getDay()];
    var zi = data.getDate();
    var luna = luni[data.getMonth()];
    var an = data.getFullYear();

    return `${ziSapt}, ${zi}-${luna}-${an}`;
}

*/