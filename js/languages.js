const langElement = document.getElementById("lang");

const textsToChange = document.querySelectorAll("[data-section]");


const changeLanguage = async language =>{
    const requestJson = await fetch(`./languages/${language}.json`);
    const texts = await requestJson.json();

    for(const textToChange of textsToChange){
        const section = textToChange.dataset.section;
        const value = textToChange.dataset.value;

        if (textToChange.tagName === "INPUT" && textToChange.type === "submit") {
            // Si es un input de tipo submit, cambia su valor
            textToChange.value = texts[section][value];
        } else if (textToChange.tagName === "INPUT" || textToChange.tagName === "TEXTAREA" ){
            textToChange.placeholder = texts[section][value];
        } else{
            // De lo contrario, cambia el innerHTML
            textToChange.innerHTML = texts[section][value];
        }
    }
}

langElement.addEventListener("click", (e)=>{
    changeLanguage(e.target.parentElement.dataset.language);
})

//Añadir subrallado al lang seleccionado
document.addEventListener('DOMContentLoaded', function(){
    var langItems = document.querySelectorAll('.lang_item');

    langItems.forEach(function(item){
        item.addEventListener('click', function(event){
            event.preventDefault();
            
            // Quitar la clase 'selected' de todos los elementos
            langItems.forEach(function(el){
                el.classList.remove('selected');
            })

            // Agregar la clase 'selected' al elemento clicado
            this.classList.add('selected');
        })
    })
})