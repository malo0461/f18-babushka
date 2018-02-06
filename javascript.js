let menu;

async function loadJson() {
    let liste = await fetch("menu.json");
    menu = await liste.json();
    console.log(menu);

    // find og filtrer retter efter kategori og gem dem i et nyt array

    let forretter = menu.filter(ret => ret.kategori == "forretter");
    let hovedretter = menu.filter(ret => ret.kategori == "hovedretter");
    let desserter = menu.filter(ret => ret.kategori == "desserter");
    let drikkevarer = menu.filter(ret => ret.kategori == "drikkevarer");

    document.querySelector("#filter-alle").addEventListener("click", () => {
        visMenu(menu, "Menu")

    });

    document.querySelector("#filter-forretter").addEventListener("click", () => {
        visMenu(forretter, "Forretter")

    });

    document.querySelector("#filter-hovedretter").addEventListener("click", () => {
        visMenu(hovedretter, "Hovedretter")

    });

    document.querySelector("#filter-desserter").addEventListener("click", () => {
        visMenu(desserter, "Desserter")
    });

    document.querySelector("#filter-drikkevarer").addEventListener("click", () => {
        visMenu(drikkevarer, "Drikkevarer");
    });

    visMenu(menu, "Menu");
}


function visMenu(menu, overskrift) {
    //viser overskrift der hører til filteret
    document.querySelector("[data-overskrift]").textContent = overskrift;

    let menuTemplate = document.querySelector("[data-template]");
    let templateModtager = document.querySelector("[data-modtager]");
    //Ryder modtagerskabelonen
    templateModtager.innerHTML = "";

    menu.forEach(hverRet => {

        let klon = menuTemplate.cloneNode(true).content;
        klon.querySelector("[data-navn]").textContent = hverRet.navn;
        klon.querySelector("[data-billede]").src = 'imgs/small/' + hverRet.billede + '-sm.jpg';
        klon.querySelector("[data-kortbeskrivelse]").textContent = hverRet.kortbeskrivelse;
        klon.querySelector("[data-pris]").textContent = hverRet.pris;
        klon.querySelector("[data-ret]").setAttribute("data-id", hverRet.id);
        klon.querySelector("[data-ret]").addEventListener("click", showSingle);
        templateModtager.appendChild(klon);
    })

}

function showSingle() {
    let retId = this.getAttribute("data-id");

    menu.find(ret => {
        if (retId == ret.id) {
            document.querySelector(".popup").style.visibility = "visible";
            document.querySelector("[data-singlenavn]").textContent = ret.navn;
            document.querySelector("[data-singlebillede]").src = 'imgs/medium/' + ret.billede + '-md.jpg';
            document.querySelector("[data-langbeskrivelse]").textContent = ret.langbeskrivelse;
        }
    })

    document.querySelector("button").addEventListener("click", hideSingle);
}

function hideSingle() {
    document.querySelector(".popup").style.visibility = "hidden";
}

document.addEventListener("DOMContentLoaded", loadJson);
