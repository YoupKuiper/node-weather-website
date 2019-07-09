const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const dataResponse = document.querySelector('#data-response')
const errorResponse = document.querySelector('#error-response')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    var location = search.value;
    dataResponse.textContent = 'Loading....'
    errorResponse.textContent = ''

    fetch('http://localhost:3000/weather?location=' + location).then((res) => {
        res.json().then((data) => {
            if(data.err){
                errorResponse.textContent = data.err
                dataResponse.textContent = ''
            }else{
                dataResponse.textContent = data.location + ' ' + data.forecast
                errorResponse.textContent = ''
                console.log(data.location);
                console.log(data.forecast);
            }
        })
    })

})
