var myStatusDot = document.getElementById('my-status-circle');
var myStatus=document.getElementById('status-word-user');

// Post Firebase

// Pre Firebase
function altStatus (status){
    if(status === "Available"){
        return "Busy";
    } else if (status ==="Busy"){
        return "Away";
    } else if (status=== "Away"){
        return "Available";
    }
}



function upDateStatus (me, newStatus){
   
    firebase.firestore().collection('users').doc(me).update({
        userStatus: newStatus
    })
}

function renderMyStatus (status){
let myStatusColor;
if(status === "Available"){
    myStatusColor  = "green";
} else if (status ==="Busy"){
    myStatusColor = "orange";
} else if (status=== "Away"){
    myStatusColor = 'red';
}
myStatusDot.style.backgroundColor = myStatusColor;
myStatus.innerText = status;

}


