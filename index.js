let myLinks = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")

let ulEl = document.getElementById("ul-el")

const tabs = [
    {url: "https://www.youtube.com/"}
]

const linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"))

if (linksFromLocalStorage) {
    myLinks = linksFromLocalStorage;
    renderLinks(myLinks);
}

deleteBtn.addEventListener("dblclick", ()=> {
    localStorage.removeItem("myLinks");
    myLinks = [];
    renderLinks(myLinks);
})

tabBtn.addEventListener("click", ()=> {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs)=>{
        myLinks.push(tabs[0].url)
        localStorage.setItem("myLinks",JSON.stringify(myLinks))
        renderLinks(myLinks)
    })
})

inputBtn.addEventListener("click", ()=> {
    myLinks.push(inputEl.value)
    inputEl.value = null
    localStorage.setItem("myLinks",JSON.stringify(myLinks))
    renderLinks(myLinks)
})

function renderLinks(links) {
    let listitems = ""
    for(let i = 0; i<links.length; i++) {
        listitems += `
            <li>
                <a href='${links[i]}' target='_blank'>
                    ${links[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listitems
}
