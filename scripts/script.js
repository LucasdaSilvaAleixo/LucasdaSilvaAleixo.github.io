let lang = "pt-BR"
changeLanguage(lang)

function changeLanguage(language) {
    if (language == "pt-BR") {
        for (let i = 0; i < document.getElementsByClassName('en').length; i++) {
            document.getElementsByClassName('pt-BR')[i].hidden = false
            document.getElementsByClassName('en')[i].hidden = true
        }

        document.documentElement.setAttribute("lang", language);
    } else {
        for (let i = 0; i < document.getElementsByClassName('pt-BR').length; i++) {
            document.getElementsByClassName('pt-BR')[i].hidden = true
            document.getElementsByClassName('en')[i].hidden = false
        }

        document.documentElement.setAttribute("lang", language);
    }
}

document.getElementById("portuguese").addEventListener('click', function(event) {
    lang = "pt-BR"
    changeLanguage(lang)
})

document.getElementById("ingles").addEventListener('click', function(event) {
    lang = "en"
    changeLanguage(lang)
})