let myLinks = {}
const inputEl = document.getElementById("input-el")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delete-btn")

let ulEl = document.getElementById("ul-el")

const linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"))

if (linksFromLocalStorage) {
    myLinks = linksFromLocalStorage;
    renderLinks(myLinks);
}

deleteBtn.addEventListener("dblclick", ()=> {
    localStorage.removeItem("myLinks");
    myLinks = {};
    renderLinks(myLinks);
})

tabBtn.addEventListener("click", ()=> {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs)=>{
        if(inputEl.value) {
            myLinks[inputEl.value] = tabs[0].url;
            inputEl.value = null;
        } else {
            myLinks[tabs[0].title] = tabs[0].url;
        }
        localStorage.setItem("myLinks",JSON.stringify(myLinks))
        renderLinks(myLinks)
    })
})

function renderLinks(links) {
    let listitems = ""
    for(let key in links) {
        listitems += `
            <li>
                <a href='${links[key]}' target='_blank'>
                    ${key}
                </a>
                <button class='delete-item-btn' data-key='${key}'>delete</button>
            </li>
        `
    }
    ulEl.innerHTML = listitems
    
    const deleteItemBtns = document.querySelectorAll(".delete-item-btn");
    for (let i = 0; i < deleteItemBtns.length; i++) {
        deleteItemBtns[i].addEventListener("click", (event) => {
            const key = event.target.getAttribute("data-key");
            deleteItem(key);
        });
    }
}

function deleteItem(key) {
    delete myLinks[key];
    localStorage.removeItem("myLinks")
    localStorage.setItem("myLinks",JSON.stringify(myLinks))
    renderLinks(myLinks)
}
