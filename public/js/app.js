console.log('app.js working')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message = document.querySelector('#message')

message.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    message.textContent = 'loading...'
    const location = search.value
    fetch('/weather?address=' + location).then(response => {
    response.json().then(data => {
        if (data.error) {
            console.log(data.error)
            message.textContent = data.error
        }
        else {
            console.log(data)
            message.textContent = data.temperature
        }
    })
})
})