let me;



setTimeout(removeSplash, 4000)
function removeSplash (){
    document.getElementById('loading-splash-screen').style.display = "none";
}
document.getElementById("login-container").style.display = "block";
function loadScript(url){
    
    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
               
            }
        };
    } else {  //Others
        script.onload = function(){
       
        };
    }

    script.src = url;
    document.getElementsByTagName("body")[0].appendChild(script);
}

let state = {
    userStatus: "Busy", 
    darkModeSelected: false, 
    notifications: true,
    notificationSounds: true,
    photoUrl: 'test.png'
}

firebase.auth().onAuthStateChanged(function(authUser) {
    if (authUser) {
        document.getElementById('main-app').style.display = "flex";
        document.getElementById('login-container').style.display = "none";
        me = authUser.uid;
        document.getElementById('my-profile-container').style.display = "flex";
       
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get().then((element) => {
           
            state.userFirstName = element.data().userFirstName;
            state.userLastName = element.data().userLastName;
            state.userGroups = element.data().userGroups;
            state.myGroup = element.data().myGroup;
            state.firstTime = element.data().firstTime;
            state.organisationId = element.data().organisationId;
            state.userEmail = element.data().userEmail;

        }).then(() => {
            loadScript("dom.js")

                    
            
        });

        

        



      
    } else {

        document.getElementById('main-app').style.display = "none";
        document.getElementById('login-container').style.display = "block";
        document.getElementById('my-profile-container').style.display = "none";
      
    }
});


function signup() {
    var newUserFirstName = document.getElementById("new-first-name-input").value;
    var newUserLastName = document.getElementById("new-last-name-input").value;

    var newUserEmail = document.getElementById("new-email-input").value;
    var newUserPassword = document.getElementById("new-password-input").value;




    firebase.auth().createUserWithEmailAndPassword(newUserEmail, newUserPassword).then(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });

    
}



function login() {

    var userEmail = document.getElementById("email-input").value;
    var userPassword = document.getElementById("password-input").value;
  
    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
  
      window.alert("Error : " + errorMessage);
  
      // ...
    });

}

function logout() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        

      }).catch(function(error) {
        // An error happened.
      });
}



