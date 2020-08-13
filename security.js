function initSecurity(bool){
    if(bool){
        document.getElementById('security-div-container').style.display = "block";
    }
}

document.getElementById('sec-move-forward').addEventListener("click", ()=> {
    
    document.getElementById('group-Id-sec').style.display = "block";
    document.getElementById('security-desc').style.display = "none";
    document.getElementById('sd-2').style.backgroundColor = "hotpink"
})

document.getElementById('enter-stitch').addEventListener("click", ()=> {
    document.getElementById('security-div-container').style.display = "none";
    document.getElementById('validating-id').style.display = "block";
    firebase.firestore().collection('users').doc(me).update({
        firstTime :false
    });
    executeTutorial(groupIdentif.slice(1));

})





function setValText1 (){
    document.getElementById('sec-val-word').innerText = "Checking against current Organisations..."
    setTimeout(setValText2, 3000);
}
function setValText2 (){
    document.getElementById('sec-val-word').innerText = "Checking against current Organisations..."
    setValText3 ()
}
function setValText3 (){
    document.getElementById('sec-val-word').innerText = "Configuring your profile";
    setTimeout(setValText4, 3000);
}
function setValText4 (){
    document.getElementById('sec-val-word').innerText = "Setting permissions..."
    setTimeout(setValText5, 3000);
   
}
function setValW (){
    document.getElementById('sec-val-word').innerText = "Your credential is wrong... try again";
    setTimeout(closeVallog, 1000)
}

function setValText5 (){
    document.getElementById('sec-val-word').innerHTML = "<span style='color:green'>Complete</span>"
    setTimeout(setVal6,1000);
}

function setVal6(){
    document.getElementById('validating-id').style.display = "none";
    document.getElementById('group-Id-sec').style.display = "none";
    document.getElementById('sec-your-id').style.display = "block";
    document.getElementById('sd-3').style.backgroundColor = 'hotpink'



}

function closeVallog(){
    document.getElementById('validating-id').style.display = "none";
}
document.getElementById('validating-id').style.display = "none";







