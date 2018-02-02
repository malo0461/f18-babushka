let menu;

document.addEventListener("DOMContentLoaded", loadJson);

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
    document.querySelector("[data-overskrift]").textContent = overskrift;

    let menuTemplate = document.querySelector("[data-template]");
    let templateModtager = document.querySelector("[data-modtager]");

    templateModtager.innerHTML = "";

    menu.forEach(hverRet => {

        let klon = menuTemplate.cloneNode(true).content;
        klon.querySelector("[data-navn]").textContent = hverRet.navn;
        klon.querySelector("[data-billede]").src = 'imgs/small/' + hverRet.billede + '-sm.jpg';
        klon.querySelector("[data-kortbeskrivelse]").textContent = hverRet.kortbeskrivelse;
        klon.querySelector("[data-pris]").textContent = hverRet.pris;

        templateModtager.appendChild(klon);
    })

}
