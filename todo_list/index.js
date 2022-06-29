const form = document.forms.adder
const inputs = form.querySelectorAll('input')
const container = document.querySelector('.card__container')
const tasks = []
form.onsubmit = (event) => {
    event.preventDefault()
    let error = []
    inputs.forEach(input => {
        if (input.value.length === 0 ) {
            error.push('error')
        } 
    })
    error.length === 0 ? submit() : console.log('Fill the missed fields!')
}
function submit() {
    let task = {}
    
    let fm = new FormData(form)

    fm.forEach((value, key) => {
        task[key] = value
    })

    tasks.push(task)
    showMyTask(tasks)
}
function showMyTask (taskInfo) {
    container.innerHTML = ''
    for (let info of taskInfo) {
       
        let cardBox = document.createElement('div')
        let cardHeading = document.createElement('div')
        let h4 = document.createElement('h4')
        let remove = document.createElement('img')
        let cardBottom = document.createElement('div')
        let spanTime = document.createElement('span')
        cardBox.classList.add('card')
        cardHeading.classList.add('card__heading')
        h4.innerHTML = info.title
        remove.src = './assets/svg/cross__lines.svg'
        cardBottom.classList.add('card__date')
        spanTime.innerHTML = info.time
        container.append(cardBox)
        cardBox.append(cardHeading, cardBottom)
        cardHeading.append(h4, remove)
        cardBottom.append(spanTime)
        let modals = document.querySelectorAll('.modal2Open')
        let btnsCloser = document.querySelectorAll('.toClose')
        let currentName = document.querySelector('.name')
        let name2Change = document.querySelector('.currentName')
        remove.onclick = () => {
            let idx = taskInfo.indexOf(info)
            taskInfo.splice(idx, 1)
            toClose(modals)
            showMyTask(taskInfo)
        }
        cardBox.onclick = () => {
            modals.forEach(modal => {
                toOpen(modal)
            })
            currentName.innerHTML = info.title.toUpperCase()
            name2Change.value = info.title
        }
        btnsCloser.forEach(btn => {
            btn.onclick = () => {
                toClose(modals)
                info.title = name2Change.value 
                showMyTask(taskInfo)
            }
        })
    }
}
showMyTask(tasks)
function toOpen (modal) {
    if (modal.classList.contains('modal__bg')) {
        modal.style.display = 'block'
    } else {
        modal.style.display = 'flex'
    }
    setTimeout(() => {
        modal.style.opacity = '1'
    }, 300);
}
function toClose(closes) {
    closes.forEach(close => {
        close.style.opacity = '0'
        setTimeout(() => {
            close.style.display = 'none'
        }, 300);
    })
}