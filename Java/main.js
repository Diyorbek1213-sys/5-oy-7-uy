const form = document.getElementById('form')
const username = document.getElementById('username')
const label = document.getElementById('label')
const wrapper = document.getElementById('wrapper')
const done = document.getElementById('done')
const h3_1 = document.getElementById('h3_1')
const span = document.getElementById('span')
let counter = 0

function validate(username) {
    if (username.value.length < 3) {
        username.focus()
        username.style.outlineColor = 'red'
        label.style.display = 'block'
        return false
    } else {
        username.style.outlineColor = ''
        label.style.display = 'none'
    }
    return true
}

function createCard(user) {
    return `
    <div class="mt-[10px]" id="to_create">
                <div
                    class="flex items-center py-[23px] px-[21px] bg-[#15101C] rounded-[10px] justify-between mt-[17px]">
                    <div>
                        <h3 class="text-[#9E78CF]" id="h3_2">${user.username}</h3>
                    </div>
                    <div class="flex items-center gap-[8px]">
                        <button id="tick"><img src="images/Tick.svg" alt="Tick"></button>
                        <button id="dustbin" data-id = "${user.id}"><img src="images/Dustbin.svg" alt="Dustbin"></button>
                    </div>
                </div>
            </div>
    `
}

form && form.addEventListener('submit', function (event) {
    event.preventDefault()

    const isValid = validate(username)

    if (!isValid) {
        return;
    }

    h3_1.style.display = 'block'

    const user = {
        username: username.value,
        id: Date.now()
    }

    const card = createCard(user)
    wrapper.innerHTML += card

    window.location.reload()

    let data = []
    if (localStorage.getItem('users')) {
        data = JSON.parse(localStorage.getItem('users'))
    }

    data.push(user)
    localStorage.setItem('users', JSON.stringify(data))

    form.reset()
})

document.addEventListener('DOMContentLoaded', function () {
    let data = []
    if (localStorage.getItem('users')) {
        data = JSON.parse(localStorage.getItem('users'))
    }

    data.length > 0 && data.forEach(value => {
        let card = createCard(value)
        wrapper.innerHTML += card
    })

    const dustbin = document.querySelectorAll('#dustbin')

    dustbin.length > 0 && dustbin.forEach(btn => {
        btn.addEventListener('click', function () {
            let conf = confirm('rostdan ham ochirib yubormoqchimisiz')
            if (!conf) {
                return;
            }
            let users = []
            if (localStorage.getItem('users')) {
                users = JSON.parse(localStorage.getItem('users'))
            }

            let id = this.getAttribute('data-id')

            if (id) {
                users = users.filter(user => {
                    return user.id != id
                })
            }

            localStorage.setItem('users', JSON.stringify(users))
            this.parentNode.parentNode.parentNode.remove()
        })
    })

    const tick = document.querySelectorAll('#tick')

    tick.length > 0 && tick.forEach(value => {
        value.addEventListener('click', function() {
            alert("The tick button isn't working because it doesn't have any code")
        })
    })
})