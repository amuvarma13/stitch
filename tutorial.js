//rHnohvqovsaP5SuKYmYw
let h = document.getElementById('hole');
let t = document.getElementById('text');
let tar = document.getElementById('send-message');





function executeTutorial (groupId){
    document.getElementById('blocker').style.display = "block";
    tutChat();
    
    h.style.display = "block";
    t.style.display = "block"
  
function tutChat(){
    h.style.height = "92vh";
    h.style.width = "100vw"
    h.style.top = "60px";
    h.style.left = "320px";


    t.style.width = "20vw"
    t.style.top = "50vh";
    t.style.left = "50vw";
    

    t.innerText = "This is your chat where you can view messages, tasks, meetings, polls, drag-and-drop files amongst hundreds of other things, and interact with your colleagues!"
    setTimeout(tutSend, 8000)
}

function tutSend(){
    h.style.height = "10vh";
    h.style.width = "100vw"
    h.style.top = "90vh";
    h.style.left = "320px";


    t.style.width = "10vw"
    t.style.top = "50vh";
    t.style.left = "50vw";
    

    t.innerText = "This is your chat where you can send messages, execute commands, and interact with your colleagues!"
    setTimeout(tutMessage, 3000)
}

function tutMessage(){
    h.style.height = "10vh";
    h.style.width = "100vw"
    h.style.top = "90vh";
    h.style.left = "320px";


    t.style.width = "10vw"
    t.style.top = "50vh";
    t.style.left = "50vw";
    
    t.innerText = "Let's send your first message!"

    typingAnim("Hey everyone checkout this great new platform");
    setTimeout(sendingMessage, 3000)
}



function sendingMessage(){
    h.style.height = "92vh";
    h.style.width = "100vw"
    h.style.top = "60px";
    h.style.left = "320px";


    t.style.width = "10vw"
    t.style.top = "50vh";
    t.style.left = "50vw";
    t.innerText = "Press enter to send"
    document.getElementById('send-message').value = "Hey everyone checkout this great new platform"
    setTimeout(actSend1, 3000)
}

function actSend1 (){
    let messageValue = document.getElementById('send-message').value;
        if(messageValue.length>0){
        


            let lastMessageSenderId = "31415926"
            firebase.firestore().collection('groups').doc(groupIdentif.slice(1)).get().then(function (doc){


            if(doc.data()){
                lastMessageSenderId = doc.data().object.messageSenderId;
            }
                
              
          
     
                handleSendMessage(messageValue, lastMessageSenderId)
            })
        

        
      
    
        }
    
    
        document.getElementById('send-message').value = "";
        setTimeout(tutTask, 3000)

}

function tutTask (){
    h.style.height = "10vh";
    h.style.width = "100vw"
    h.style.top = "90vh";
    h.style.left = "320px";


    t.style.width = "10vw"
    t.style.top = "50vh";
    t.style.left = "50vw";
    
    t.innerText = "Lets set a task using commands!"

    document.getElementById('send-message').value = ""
    setTimeout(tutsetTask, 3000)
}
function tutsetTask (){
    h.style.height = "10vh";
    h.style.width = "100vw"
    h.style.top = "90vh";
    h.style.left = "320px";


    t.style.width = "10vw"
    t.style.top = "50vh";
    t.style.left = "50vw";
    
    t.innerText = "Start a task with /t or /task!"

    document.getElementById('send-message').value = "/t hey can everyone please look at the whole list of commands";

setTimeout(actSend2, 2000)
}

function actSend2 (){
    let messageValue = document.getElementById('send-message').value;
        if(messageValue.length>0){
        


            let lastMessageSenderId = "31415926"
            firebase.firestore().collection('groups').doc(groupIdentif.slice(1)).get().then(function (doc){


            if(doc.data()){
                lastMessageSenderId = doc.data().object.messageSenderId;
            }
                
              
          
     
                handleSendMessage(messageValue, lastMessageSenderId)
            })
        

        
      
    
        }
    
    
        document.getElementById('send-message').value = "";
        setTimeout(tutSetMeet, 3000)

}

function tutSetMeet(){
    h.style.height = "10vh";
    h.style.width = "100vw"
    h.style.top = "90vh";
    h.style.left = "320px";


    t.style.width = "10vw"
    t.style.top = "50vh";
    t.style.left = "50vw";
    
    t.innerText = "Let's set a meeting...set a task with /m or /meet!"

    document.getElementById('send-message').value = "/meet Stitch can we meet tomorrow at 19:00 to discuss how we can make the most of this platform";

    setTimeout(actSend3, 5000)

}
function actSend3 (){
    let messageValue = document.getElementById('send-message').value;
        if(messageValue.length>0){
        


            let lastMessageSenderId = "31415926"
            firebase.firestore().collection('groups').doc(groupIdentif.slice(1)).get().then(function (doc){


            if(doc.data()){
                lastMessageSenderId = doc.data().object.messageSenderId;
            }
                
              
          
     
                handleSendMessage(messageValue, lastMessageSenderId)
            })
        

        
      
    
        }
    
    
        document.getElementById('send-message').value = "";
        setTimeout(tutSetShare, 3000)

}

function tutSetShare(){
    h.style.height = "10vh";
    h.style.width = "100vw"
    h.style.top = "90vh";
    h.style.left = "320px";


    t.style.width = "10vw"
    t.style.top = "50vh";
    t.style.left = "50vw";
    
    t.innerText = "Let's try one more...lets see how stitch integrate Microsoft 365 and Google Drive"

    document.getElementById('send-message').value = "/share" ;

    setTimeout(sendSharetut, 5000);
}

function sendSharetut(){
    h.style.height = "10vh";
    h.style.width = "100vw"
    h.style.top = "90vh";
    h.style.left = "320px";


    t.style.width = "10vw"
    t.style.top = "50vh";
    t.style.left = "50vw";
    
    t.innerText = "We can use a /share to collaborate on a file"

    document.getElementById('send-message').value = "/share https://docs.google.com/document/d/1x9CxSU3rGP8C1I2UdYXaPX47yYHJjcyIQEvqKB5mMnI/edit?usp=sharing";

    setTimeout(actSend4, 3000);
}

function actSend4 (){
    let messageValue = document.getElementById('send-message').value;
        if(messageValue.length>0){
        


            let lastMessageSenderId = "31415926"
            firebase.firestore().collection('groups').doc(groupIdentif.slice(1)).get().then(function (doc){


            if(doc.data()){
                lastMessageSenderId = doc.data().object.messageSenderId;
            }
                
              
          
     
                handleSendMessage(messageValue, lastMessageSenderId)
            })
        

        
      
    
        }
    
    
        document.getElementById('send-message').value = "";
        setTimeout(tutLetsee, 3000)

}

function tutLetsee(){
    h.style.height = "92vh";
    h.style.width = "100vw"
    h.style.top = "60px";
    h.style.left = "320px";


    t.style.width = "10vw"
    t.style.top = "50vh";
    t.style.left = "50vw";
    

    t.innerText = "We can see out tasks and meetings are shown here..."
    setTimeout(adjustmeettut, 3000)

}

function adjustmeettut(){
    h.style.height = "92vh";
    h.style.width = "100vw"
    h.style.top = "60px";
    h.style.left = "320px";


    t.style.width = "10vw"
    t.style.top = "50vh";
    t.style.left = "50vw";
    

    t.innerText = "TOP TIP: stitch uses a nifty algorithm to pick up on the semantic meaning of what you are saying. Thats why we know when to schedule the meeting for and we are nearly always right, but of countdownToReset, if we do make a mistake we make it very easy for you to change the time (don't worry we dont make mistakes)"
    setTimeout(openShareTut, 7000)
}

function openShareTut(){
    t.innerText = "We can click and start collborating"
 setTimeout(viewshareTut, 3000);
}

function viewshareTut(){
    h.style.height = "100vh";
    h.style.width = "100vw"
    h.style.top = "0px";
    h.style.left = "320px";


    t.style.width = "10vw"
    t.style.top = "50vh";
    t.style.left = "50vw";

    openCommandsView();
        let frame = document.createElement('iframe');
        frame.className = "share-frame"
        frame.setAttribute("src","https://docs.google.com/document/d/1x9CxSU3rGP8C1I2UdYXaPX47yYHJjcyIQEvqKB5mMnI/edit?usp=sharing");
        document.getElementById('find-commands-container').appendChild(frame);
        document.getElementById('fadeout').style.display = "none";
        document.getElementById('find-commands-container').style.height= "100vh";
        t.innerText = "Just start typing!"

    setTimeout(closesharetut, 6000)
}

function closesharetut(){
    t.style.width = "10vw"
    t.style.top = "10vh";
    t.style.left = "80vw";
    t.innerText = "Lets close this and keep going"

    setTimeout(excloseSharetut, 3000)

}

function excloseSharetut(){
    closeCommandsView()
    setTimeout(sidebartut, 3000)

}

function sidebartut(){
    h.style.height = "92vh";
    h.style.width = "320px"
    h.style.top = "60px";
    h.style.left = "0px";


    t.style.width = "10vw"
    t.style.top = "50vh";
    t.style.left = "330px";
    

    t.innerText = "See you chats... notice a nifty chat with yourself which unlocks another layer of productivity!"
    setTimeout(searchtutview, 3000);
}
function searchtutview(){
    h.style.height = "10vh";
    h.style.width = "320px"
    h.style.top = "0px";
    h.style.left = "0px";


    t.style.width = "10vw"
    t.style.top = "20vh";
    t.style.left = "330px";

    t.innerText = "Lets enter the command center.... "
    setTimeout(tutentercommandcenter, 3000)
}

function tutentercommandcenter(){
    h.style.height = "90vh";
    h.style.width = "80vw"
    h.style.top = "5vh";
    h.style.left = "10vw";


    t.style.width = "10vw"
    t.style.top = "20vh";
    t.style.left = "330px";
    document.getElementById('search-whole-container').style.display = "block";
    t.innerText = "Lets trying finding someone in our company"
    fadeIn();
    setTimeout(cc1tut, 3000)

}

function cc1tut (){
    document.getElementById('search-form').value = "a";
    grabSearchResults("a");
    t.innerText = "Just click on them to add them!"
    setTimeout(cc2tut, 3000)
}

function cc2tut(){
    t.innerText = "But what if we want to add someone outside of our company?";
    setTimeout(addextSol, 3000)
}

function addextSol(){
    t.style.width = "20vw"
    t.innerText = "We put a hashtag before their id and hit enter, this adds them as a guest member to your organisatiion so you can collaborate easily. As a guest, they remain behind many layers of security!";
    setTimeout(addstitchtut, 6000);
}

function addstitchtut(){
    t.innerText = "Why dont you add Stitch, our id is Itjn1QXpP6jLtnJlLUKq";
    setTimeout(addsttut2, 3000)

}
function addsttut2(){
    document.getElementById('search-form').value = "#Itjn1QXpP6jLtnJlLUKq";
    t.innerText = "Dont forget the hashtag and click enter!";

    setTimeout(finsttut, 5000)

}
function finsttut(){
    t.innerText = "When you restart the app you will be able to interact with Stitch just like everyone else... alright let's move on";
    document.getElementById('search-form').value = ""
    setTimeout(findstuftut, 3000);
}
function findstuftut(){
    fadeOutSearch();
 setTimeout(exctutintro, 1000)
};
function exctutintro(){
    h.style.height = "92vh";
    h.style.width = "100vw"
    h.style.top = "60px";
    h.style.left = "320px";


    t.style.width = "10vw"
    t.style.top = "50vh";
    t.style.left = "50vw";
    

    t.innerText = "You can access everything our exclamation point...!"

    setTimeout(searchMeetingstut, 3000)
}
function searchMeetingstut(){
    t.innerText = "Why dont we locate all our meetings, its !m or !meet as you expect!"
 setTimeout(searchMeetstut2, 2000)
}

function searchMeetstut2(){
    document.getElementById('send-message').value = "!meet"

    t.innerText = "We can hit enter to pull up all our meetings "
    setTimeout(showmeetsboxtut, 2000)
}

function showmeetsboxtut(){
    
    openCommandsView();
    clearDiv(document.getElementById('find-commands-container'));
    displayMeets(groupIdentif);
    t.innerText = "Click on the place where it displays the time to set a new time";

    setTimeout(editmeettut, 3000);

}
function editmeettut(){
    h.style.height = "92vh";
    h.style.width = "100vw"
    h.style.top = "60px";
    h.style.left = "320px";


    t.style.width = "20vw"
    t.style.top = "50vh";
    t.style.left = "50vw";
    

    

    t.innerText = "Click on a meeting box and start typing to set a new meeting description";

    setTimeout(addmeettocal, 4000)
  
   
}

function addmeettocal(){
    h.style.height = "92vh";
    h.style.width = "100vw"
    h.style.top = "60px";
    h.style.left = "320px";


    t.style.width = "20vw"
    t.style.top = "50vh";
    t.style.left = "50vw";
    t.innerText = "We can also add a meeting task or anything else to your personal calendar from here with just one click!";

    setTimeout(closemeetforcaltut, 4000)


}

function closemeetforcaltut(){
    closeCommandsView();
    t.innerText = "We can use many commands to get to our calendar, so lets !calendar. Remember as this is a command to locate something it has to start with an !";
    setTimeout(setcommandforcaltut, 4000)

}

function setcommandforcaltut(){
    h.style.height = "10vh";
    h.style.width = "100vw"
    h.style.top = "90vh";
    h.style.left = "320px";


    t.style.width = "10vw"
    t.style.top = "50vh";
    t.style.left = "50vw";
    document.getElementById('send-message').value = "!calendar";
    setTimeout(actSend100, 4000)



}

function actSend100 (){
    let messageValue = document.getElementById('send-message').value;
        if(messageValue.length>0){
        


            let lastMessageSenderId = "31415926"
            firebase.firestore().collection('groups').doc(groupIdentif.slice(1)).get().then(function (doc){


            if(doc.data()){
                lastMessageSenderId = doc.data().object.messageSenderId;
            }
                
              
          
     
                handleSendMessage(messageValue, lastMessageSenderId)

            })
        

        
      
    
        }
    
        setTimeout(understandcaltut, 4000)

        document.getElementById('send-message').value = "";
       
}

function understandcaltut(){
    h.style.height = "100vh";
    h.style.width = "100vw"
    h.style.top = "0vh";
    h.style.left = "0px";


    t.style.width = "20vw"
    t.style.top = "50vh";
    t.style.left = "50vw";

t.innerText = "Just add items to your calendar, by clicking on the round circle next to whatever you want to add. You may be prompted for a date";
setTimeout(closecaltut, 4000)

}

function closecaltut(){
    h.style.height = "100vh";
    h.style.width = "100vw"
    h.style.top = "0vh";
    h.style.left = "320px";


    t.style.width = "20vw"
    t.style.top = "50vh";
    t.style.left = "50vw";
    t.innerText = "Alright lets move one from that and check out your super fast cloud-based file directory";
    setTimeout(sdftut, 4000);
    document.getElementById('caleander-holder').style.display = "none";
    closeCommandsView();



}
function sdftut(){
    t.innerText = "We are sending you a file to demonstrate your personal directory (btw you can find a wider range of productivity tools here)";
    firebase.firestore().collection('groups').doc(groupId).collection('messages').add({
        
        messageType: "pdf",
        messageSenderId: "Itjn1QXpP6jLtnJlLUKq",
        messageSaved: false,
        messageFilename: "stitch_commands",
        messageFileSize:0,
        messageSenderName: 'name',
            
        imageUrl: "test.png",
        messageTimestamp: firebase.firestore.FieldValue.serverTimestamp()
}).then(function(ref){
    setTimeout(saveinstructiontut, 2000)
})
}

function saveinstructiontut(){
    t.innerText = "You can save a file to your directory by clicking the bookmark";
    setTimeout(savetodirectory, 3000)
}
function savetodirectory(){



firebase.firestore().collection('users').doc(me).collection('savedFiles').add({ 
   

    fileName: 'stitch_commands',
    fileType: "PDF",
    fileSize: 0,
    fileUrl: 'test.png'

})
t.innerText = "Access all of your stuff by using the keyword MY";

setTimeout(tutmyfiles, 4000);
}

function tutmyfiles(){
    t.innerText = "For example you can access your files through !my files or a variation on this";
    setTimeout(accessmyfiles, 3000)
}

function accessmyfiles(){
    t.innerText = "Lets test it out";

    document.getElementById('send-message').value = "!my files";
    setTimeout(actSend6, 3000)

}
function actSend6 (){
        let messageValue = document.getElementById('send-message').value;
            if(messageValue.length>0){
            
    
    
                let lastMessageSenderId = "31415926"
                firebase.firestore().collection('groups').doc(groupIdentif.slice(1)).get().then(function (doc){
    
    
                if(doc.data()){
                    lastMessageSenderId = doc.data().object.messageSenderId;
                }
                    
                  
              
         
                    handleSendMessage(messageValue, lastMessageSenderId)
                })
            
    
            
          
        
            }
        
        
            document.getElementById('send-message').value = "";
            setTimeout(summaryTut, 12000)
            t.innerText = "Use simple find commands to access anything from anywhere. Put files you want to access quickly here, your personal directory is an incredibly versatile space! Also only you have access to this space it is completely secure. No one even within your company can access anything you store for yourself!"

    }
    


function summaryTut (){
    t.innerText = "Stitch is a platform with unlimited versatility and ease of use. Yes you have the potential to boost your productivity with incredible tools, but fundamentally stitch is as simple as it gets. Why not scan over some of our docs to checkout out all the ways you can make your remote office as productiveas possible ";
    setTimeout(wntut, 5000)
}
function wntut(){
    t.innerText = "So what's next? Look forward to a new set of AI and voice recognition features! At Stitch we are innovating on our ONE-SECOND-RULE, where anything, talking to colleagues, sending a file, sharing your screen, send an email.... anything... can be accomplished in less than one second without touching your keyboard! Be ready :)";
 setTimeout(closetut);
}
function closetut(){
    h.style.display = "none";
    t.style.display = "none";
    document.getElementById('blocker').style.display = "none";
}
//


















}

function typingAnim(string){
    let i = 0;
    let l = string.length;
while (i < l) { 
  task(i); 
   i++; 
} 
function task(i) { 
  setTimeout(function() { 
       writeString(string, i)
  }, 100 * i); 
} 
function writeString (string, i){
    tar.innerText = string.slice(0,i);
}

}





//Itjn1QXpP6jLtnJlLUKq
//https://docs.google.com/document/d/1x9CxSU3rGP8C1I2UdYXaPX47yYHJjcyIQEvqKB5mMnI/edit?usp=sharing