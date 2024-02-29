let lists = document.getElementsByClassName("list")
let container = document.querySelector(".container")
let delet = document.querySelector(".delete")
let menu = document.querySelector(".menu")
let body = document.querySelector(".body")





function getRandomInt(min, max) {
    min = Math.ceil(-7);
    max = Math.floor(7);
    return Math.floor(Math.random() * (max - min) + min);
}
function colorRandom(max) {
    min = 0;
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
function add(e) {
    let stick = document.createElement("div")
    let text = document.createElement("textarea")
    let cores = ["#db96b9","#e4a8b9","#c8a8d5","#d2ccf2","#e4eeff"]
    let data = document.createElement("h1")
    
            let date = new Date();
            mes = date.getMonth() + 1
            dia = date.getDate()
            if(dia < 10){
                dia = "0"+dia
            }
            if(mes < 10){
                mes = "0"+mes
            }
            ano = date.getFullYear()

    data.innerHTML = dia + "/" + mes + "/" + ano

    data.setAttribute("class", "data")
    stick.setAttribute("class", "list")
    stick.setAttribute("draggable", "true")
    let valor = container.children.length
    stick.setAttribute("value", valor)
    text.setAttribute("class", "texto")
    stick.appendChild(text)
    stick.appendChild(data)
    random = getRandomInt()
    stick.style.transform = "rotateZ(" + random + "deg"
    stick.style.backgroundColor = cores[colorRandom(cores.length)]
    container.appendChild(stick)



    move()

}
var db = {}
// window.localStorage.clear()  

function move() {
    for (list of lists) {
        list.addEventListener("dragstart", function (e) {
            let selected = e.target;
            let num = e.target.attributes["value"].value
            console.log(num)

            container.addEventListener("dragover", function (e) {
                e.preventDefault()

            })
            delet.addEventListener("drop", function (e) {
                e.preventDefault()
                container.removeChild(selected)
                window.localStorage.removeItem(num)
                console.log(localStorage)
                save()


            })
            container.addEventListener("drop", function (e) {

                let left = e.x
                let top = e.y
                selected.style.position = "absolute"
                selected.style.left = left - 60 + "px"
                selected.style.top = top - 60 + "px"
                selected = null
            })
        })
    }
}




function save() {


    if (container.children.length - 1 === 0) {
        console.log(container.children)
        let texto = container.children[1].children[0].value
        let data = container.children[1].children[1].innerHTML
        let x = container.children[1].style.left
        let y = container.children[1].style.top
        db = {
            text: texto,
            data: data,
            x:x,
            y:y
        }

        window.localStorage.setItem(1, JSON.stringify(db))
    } else {
        let i = 0
        window.localStorage.clear()
        while (i < container.children.length - 1) {

            let texto = container.children[i + 1].children[0].value
            let data = container.children[i + 1].children[1].innerHTML
            let x = container.children[i+1].style.left
            let y = container.children[i+1].style.top
            db = {
                text: texto,
                data: data,
                x:x,
                y:y
            }

            window.localStorage.setItem(i + 1, JSON.stringify(db))
            i++
        }
    }





}
window.onload = function () {
    if (localStorage.length > 0) {

        let cont = localStorage.length
        for (let i = 1; i <= cont; i++) {
            let stick = document.createElement("div")
            let text = document.createElement("textarea")
            item = JSON.parse(localStorage.getItem([i]))
            text.value = item["text"]
            let cores = ["#db96b9","#e4a8b9","#c8a8d5","#d2ccf2","#e4eeff"]
            let data = document.createElement("h1")
            let x = Object.values(JSON.parse(window.localStorage.getItem(i)))[2]
            let y = Object.values(JSON.parse(window.localStorage.getItem(i)))[3]
            
            let date = new Date();
            mes = date.getMonth() + 1
            dia = date.getDate()
            if(dia < 10){
                dia = "0"+dia
            }
            if(mes < 10){
                mes = "0"+mes
            }
            ano = date.getFullYear()

            data.innerHTML = dia + "/" + mes + "/" + ano
            let valor = container.children.length
            stick.setAttribute("value", valor)
            data.setAttribute("class", "data")
            stick.setAttribute("class", "list")
            stick.setAttribute("draggable", "true")
            text.setAttribute("class", "texto")
            stick.appendChild(text)
            stick.appendChild(data)
            random = getRandomInt()
            stick.style.transform = "rotateZ(" + random + "deg"
            stick.style.backgroundColor = cores[colorRandom(cores.length)]
            stick.style.position = "absolute"
                stick.style.left = x
                stick.style.top = y 
            container.appendChild(stick)
        }

        move()

    }

}

