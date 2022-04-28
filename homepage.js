let submit = document.getElementById('submit')
let title = document.getElementsByTagName('h1')[0]

submit.addEventListener('click', function(e) {
    e.preventDefault()
    let elements = document.querySelectorAll('form > div.mb-3, h5')
    elements.forEach((element) => {
        element.setAttribute('style', 'display: none;')
    })

    title.innerText = 'Congrats! Your smart contract has been created!'

    let subheading = document.createElement("p");
    let description = document.createTextNode("After our team reviews your article and deems it fit to be displayed, the smart contract will execute.")
    subheading.appendChild(description)

    document.querySelector('form').appendChild(subheading)
    console.log(elements)
})
