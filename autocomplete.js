let commandsListAuto = ['/task', '/meet', '/share', '/point'];
console.log("initiated")

function fillAutocompleteBox(array){

    for(var i=0; i++; i<length){
        let element = array[i];
        console.log(element);
        
        let value = document.getElementById('send-message');

        let holder = document.createElement('div');

        holder.innerText = element;

        holder.className = "autocomplete-sec";

        document.getElementById('autocomplete-holder').appendChild(holder);


    }
        
    




}

fillAutocompleteBox(commandsListAuto)