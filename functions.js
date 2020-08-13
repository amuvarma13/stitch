function clickOnHeader(){
    let groupName = document.getElementById('header-group-name').innerText;
    if(groupName ==="Me"){ 
        openMyGroup();
    }
        else   {
        document.getElementById('info-div-container').style.display = "block";
    document.getElementById('header').style.display = "none";
document.getElementById('input-container').style.display = "none";
    document.getElementById('messages-container').style.display = "none";
}
   
}

function openMyGroup(){
    document.getElementById('header').style.display = "none";
    document.getElementById('input-container').style.display = "none";
    document.getElementById('messages-container').style.display = "none";
    document.getElementById('info-div-container').style.display = "none";
    
    document.getElementById('my-info-div').style.display = "block";
    document.getElementById('close-info-box-me').style.display = "block";
    document.getElementById('my-info-container').style.display = "block";

};




function swicthToSignup(){
    document.getElementById('login-holder').style.display = "none";
    document.getElementById('signup-holder').style.display = "block";


    let goal = document.getElementById('signup-nav').offsetLeft;
    let current = document.getElementById('login-nav').offsetLeft;

    let dif = goal-current;
    let iterator = 0;

        setInterval(frame, 5);

    function frame (){
        if(iterator==dif){
            clearInterval(int)
        } else {
            iterator++;
            document.getElementById('slide-bar').style.left = current +iterator;
        }
    }
    document.getElementById('slide-bar')
}

 document.getElementById('signup-nav').addEventListener("click", swicthToSignup);
 function swicthToLogin(){
    document.getElementById('login-holder').style.display = "block";
    document.getElementById('signup-holder').style.display = "none";

    let goal = document.getElementById('login-nav').offsetLeft;
    let current = document.getElementById('signup-nav').offsetLeft;

    let dif = goal-current;
    let iterator = 0;

        setInterval(frame, 1);

    function frame (){
        if(iterator==dif){
            clearInterval(int)
        } else {
            iterator--;
            document.getElementById('slide-bar').style.left = current +iterator;
        }
    }
    document.getElementById('slide-bar')
}


 document.getElementById('login-nav').addEventListener("click", swicthToLogin);

 document.getElementById("verify-int-email").addEventListener("click", ()=> {
    let password = document.getElementById('email-password-int').value;
    let provider = document.getElementById('email-provider').value;
    countdownToReset();
     if(password&&provider){
        sendNumToFirestore();

     } else {
         // display error
     }
    // write function that sends email based on the specified parameters
   

    //send verification email
 });

 document.getElementById("complete-verification").addEventListener("click", ()=> {
     let verifiedId = document.getElementById('verification-code').value;
    let bool = false;
     firebase.firestore().collection('users').doc(me).get().then(function(doc){
         let realcode = doc.data().emailVerificationCode;
       
         if(realcode==verifiedId){
             bool = true;
             localStorage.setItem("stitch_email_password", realcode);
         } else {
             //handle error
         }

     }).then(function(){
         if(bool){
             firebase.firestore().collection('users').doc(me).update({
                 emailIntegration: true
             }).then(function(){
                 document.getElementById('integrate-email-container').style.display = "none";
             })
         }
     })
 })

 function generateSixDigitVerificationCode (){
     let rand_int = (Math.random()+0.1)/2;
     let random_6_digit = (rand_int *1000000)+100000;

     let num = Math.floor(random_6_digit);
     return num;


 }

 function sendNumToFirestore(){
     let code = generateSixDigitVerificationCode();

     firebase.firestore().collection('users').doc(me).update({
         emailVerificationCode: code
     }).then(function(){
     }).catch(function(err){
     })
 }

 function countdownToReset(){
    document.getElementById('email-verify-counter').style.display = "block";
     let counter = 60;


    var cou = setInterval(setCounter, 1000)
     function setCounter(){
        counter--;

         if(counter==0){
             clearInterval(cou);
             document.getElementById('email-verify-counter').innerText = "Timeout please re-verify";
             setRandomNumberInFirestore();

         } else {
            document.getElementById('email-verify-counter').innerText = counter;

         }

     }
 }

 function setRandomNumberInFirestore(){
     let randco = generateSixDigitVerificationCode()
    firebase.firestore().collection('users').doc(me).update({
        emailVerificationCode: randco
    })
 }

 //********************************* */
 function compileDate(string){
    let date = getDateDeficit(string);
    console.log(date);

    let time = getTimeAbsolute(string);
    console.log(time);


    let month = new Date().toDateString().slice(4,7);
    console.log(month);

    let year = new Date().toDateString().slice(11,15);
    console.log(year)



    let dateDate = new Date(`${month} ${date}, ${year} ${time}`);
    console.log(dateDate);
    return dateDate || new Date();
    // let time = 
}
compileDate(' lets meet on Friday at 19:00 to go over strategy')

function getDateDeficit(string){
    //get date tomorrow
    let datedeficit 
    let cd = new Date();
    console.log(cd);
    focusDate = cd.toDateString();
    console.log(focusDate);
    let dateNow = focusDate.slice(8,10);
    console.log(dateNow);

    let wordArray = string.split(" ");
    console.log(wordArray);
    let predictiveDate;
    var throughsuf = false;
    wordArray.forEach(element => {
        
        if(element.includes("th")||element.includes("nd")||element.includes("rd")){
            predictiveDate = parseInt(element, 10);
            element = element.slice(0,-2);
            console.log(element);
            console.log(parseInt(element));
            if (parseInt(element)){
                console.log("paresed")
                throughsuf= parseInt(element);
            };
        }
    });

    




let dayNow = focusDate.slice(0,3);
let dayNowNum = convertDaytoNumber(dayNow);
let predictiveday = convertDaytoNumber(string);

daydef = predictiveday-dayNowNum;
if(daydef<0){
    datedeficit =daydef +7; 
} else {
    datedeficit = daydef;
}

let daythroughday= parseInt(dateNow)+parseInt(datedeficit);

let daythroughkeywords= false;

if(string.includes("tomorrow")){
    daythroughkeywords = parseInt(dateNow) +1;
}

if(throughsuf){
    return throughsuf;
} else if(daythroughkeywords){
    return daythroughkeywords;
} else if(daythroughday){
    return daythroughday
} else {
    return dateNow;
}


}

let fdd = getDateDeficit('wfhoqewbfobqeo');

function getTimeAbsolute(string){
    let cd = new Date();
    console.log(cd);
    let timeNowstring =cd.toTimeString();
    console.log(timeNowstring);
    let timeofev = "12:00";
    
    let attemptfromcolon = returnATimefromString(string);
    console.log(attemptfromcolon);
    let attemptfromkeyword = extracttimefromkeywords(string);
    console.log(attemptfromkeyword);
    let extractiongeneral = extractfromnumbertime(string);
    console.log(extractiongeneral);






    if(attemptfromcolon){
        timeofev = attemptfromcolon;
    } else if (attemptfromkeyword){
        timeofev = attemptfromkeyword;

    } else if (extractiongeneral){
        timeofev = extractiongeneral
    }

    return timeofev;

}


function returnATimefromString(string){
    let arraystring = string.split(" ");
    var tester = false;
    arraystring.forEach(element=> {
        if(element.includes(":")){
            tester= element;
            
    
        }
    })
    return tester;
}

function extracttimefromkeywords(string){
    let arraysec = string.split(" ");
    var meettime = false;
    arraysec.forEach(array=> {

  
    if(array.includes('morn')){
        meettime = "09:00"
    } else if (array.includes('aft')){
        meettime = "14:00"
    }else if (array.includes('noo')){
        meettime = "12:00"
    }else if (array.includes('eve')){
        meettime = "18:00"

    }
})
    return meettime;
}

function extractfromgenericnum (string){
    let array = string.split(" ");
    array.forEach(element=> {
        if(!element.includes("th")||!element.includes("nd")){
            let result = parseInt(element);
            return result;
        }
    })

}

function extractfromnumbertime(string){
    console.log(string);
    let extraction = false;

    let array = string.split(" ");

    array.forEach(element=> {
        if(parseInt(element)){
            extraction = parseInt(element);
        }
    })

    
    return extraction + ":";

}

function convertDaytoNumber(string){
    let handlebyday = 0;
    if (string.includes('mon')||string.includes('Mon')){
        handlebyday = 1;

    } else if (string.includes('tue')||string.includes('Tue')){
        handlebyday = 2;
    } else if (string.includes('wed')||string.includes('Wed')){
        handlebyday = 3;
    } else if (string.includes('thu')||string.includes('Thu')){
        handlebyday = 4;
    } else if (string.includes('fri')||string.includes('Fri')){
        handlebyday = 5;
    } else if (string.includes('sat')||string.includes('Sat')){
        handlebyday = 6;
    } else if (string.includes('sun')||string.includes('Sun')){
        handlebyday = 7;
    }
    return handlebyday;
}