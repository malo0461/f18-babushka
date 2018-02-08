let menu;

async function loadJson() {
    let liste = await fetch("menu.json");
    menu = await liste.json();
    document.querySelector("nav").addEventListener("click", () => {

        let kategori = event.target.textContent.toLowerCase();

        if (kategori != "alle retter") {
            let kat = menu.filter(ret => ret.kategori == kategori);
            visMenu(kat, kategori);

        } else {

            visMenu(menu, kategori);
        }
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
//Sortering
function sletMarkering() {
    document.querySelector(".alfa").classList.remove("markeret");
    document.querySelector(".prisop").classList.remove("markeret");
    document.querySelector(".prisned").classList.remove("markeret");
}

document.querySelector(".alfa").addEventListener("click", alfaSort);
document.querySelector(".prisop").addEventListener("click", prisopSort);
document.querySelector(".prisned").addEventListener("click", prisnedSort);

function alfaSort() {
    console.log(menu);
    menu.sort((a, b) => a.navn.localeCompare(b.navn));
    visMenu(menu, overskrift);
    sletMarkering();
    this.classList.add("markeret");
}

function prisopSort() {
    menu.sort((a, b) => a.pris - b.pris);
    visMenu(menu, overskrift);
    sletMarkering();
    this.classList.add("markeret");
}

function prisnedSort() {
    menu.sort((a, b) => b.pris - a.pris);
    visMenu(menu, overskrift);
    sletMarkering();
    this.classList.add("markeret");
}
