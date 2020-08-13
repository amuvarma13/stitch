

let groupIdentif='2y743462346';
let groupMembers=[];
let queriedIds= [];
let membersInTheGroup = [];
let ids = [me];
let groupType = "many";
let handledMessageIds = [];
let userOrganisationMembers = []
let userOrganisationId="";
let selectedPeople = [];
firebase.firestore().collection('users').doc(me).get().then(function(doc){
    userOrganisationId = doc.data().organisationId
}).then(function(){
    firebase.firestore().collection('organisations').doc(userOrganisationId).get().then(function(doc){
        let memberList = doc.data().members;
        memberList.forEach(element=>{
            if(element.userId===me){
                selectedPeople.push(element);
            } else {
                userOrganisationMembers.push(element);
            }
        
    });
})
})


    initSecurity(state.firstTime);
    

 










if(state.userGroups.length===0){
    initialiseMyGroup("Me");

}
function handleGroupClick  (groupId, namegroup, bool)  {
    let messagesChain = [];
    let groupObject  = {}
    let messages=[];
    document.getElementById('info-div-container').style.display = "none";
    document.getElementById('messages-container').style.display = "block"
    document.getElementById('header').style.display = "flex";
    document.getElementById('input-container').style.display = "flex"

    firebase.firestore().collection('groups').doc(groupId).get().then((element) => {

   

    let groupInfo = element.data();

    groupObject.info = groupInfo;

    }).then(function(){
        while(document.getElementById('messages-container').firstChild) { 
            document.getElementById('messages-container').removeChild(document.getElementById('messages-container').firstChild); 
        }
      
        // Create the query to load the last 12 messages and listen for new ones.
        var query = firebase.firestore().collection('groups').doc(groupId).collection('messages').orderBy("messageTimestamp");
     
        if(bool){
     

        // Start listening to the query.
        query.onSnapshot(function(snapshot) {
            snapshot.docChanges().forEach(function(change) {
           
                var message = change.doc.data();
                
                
                let id = change.doc.id;
               
                // let length = messagesChain.length;
                // let lastMessageId = messagesChain[length-1]
               let isDuplicate = messagesChain.includes(id);
                messagesChain.push(id);
                let object = {
                    messageInfo : message,
                    id,

                }
                if(!isDuplicate){
                messages.push(object);
                }
            });
            groupObject.messages = messages;
            
            renderMessages(groupObject.messages)  
            messages = [];
           
        });
    } else {
        let loadMessages = [];
        firebase.firestore().collection('groups').doc(groupId).collection('messages').orderBy("messageTimestamp").get().then(
            
            function(array){
                array.forEach(element => {
                    let id = element.id;
                   let allMessage = element.data();
                   

                   let object = {
                       messageInfo : allMessage,
                       id,
                   }
                   loadMessages.push(object)
                })
                renderMessages(loadMessages);

            }
        )
    }
        
  }).then(function(){
      
  



        document.getElementById('header-group-name').innerText = namegroup;
        
    


    })

}


function initialiseMyGroup(name){
    
    let myId = [];
    myId.push(me);
    firebase.firestore().collection("groups").add({
        groupName: name,
        groupTimeCreated: firebase.firestore.FieldValue.serverTimestamp(),
        object: {
            messageContent: "Welcome!",
            messageSaved: false,
            messageSenderId: "n9WMEfIcHicOb43S1wJct6uBpmq1",
            messageTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
            messageType: "text",
        },
        groupStatus:"Available"
    }).then(function(newGroup) {

       myId.forEach(element => {

            firebase.firestore().collection("users").doc(element).get().then(function(doc) {
                userDoc = doc
                user = userDoc.data()
             
            }).then(function() {
                firebase.firestore().collection("groups").doc(newGroup.id).collection("members").doc(userDoc.id).set({
                    color: getRandomColor(),
                    userFirstName: user.userFirstName,
                    userLastName: user.userLastName,
                    userEmail: user.userEmail,
                }).then(function() {
                    firebase.firestore().collection("users").doc(element).update({
                        userGroups: firebase.firestore.FieldValue.arrayUnion(" " + newGroup.id)
                    }).then(function(){
                        firebase.firestore().collection('groups').doc(newGroup.id).collection('messages').add({ 
       
    
                            messageType : "stitch",
                            messageContent: "<h1> Welcome to Stitch </h1> <p> Get ready to have your mind blown...</p> <p> Our platform is extraordinarily and gives you amazing flexibility through our simple experience and a great suite of commands at your finger tips. Once and for all you will feel like you are connected!</p>   <p> Find our set of commands in the command centre by opening the command center and clicking 'Cmd' </p>",
                            messageTimestamp:firebase.firestore.FieldValue.serverTimestamp() ,
                            messageSenderId: 'stitch',
                            messageSaved: true, 
                            messageSenderName: 'Stitch'
                    
                        })
                    

                    })
                })
               
  
            })

            
        })    
    })  
    
}




function abbrLastMessage (message){
   
    let string = message;;
    // The displayedCharacters number determines the number of characters that get displayed
    let shortenedString
    let displayedCharacters = 25;
    if(string.length>25){
        let shortenedString1 = string.slice(0,displayedCharacters-3);
         shortenedString = shortenedString1 +"..."
    } else {
  shortenedString = string
    }
    return shortenedString;
}


function processSideBarMessage (arrayofmessages) {
// Is there a schedule event?
      

    function filterSchedules(message) {
        if(message.type ==="schedule"){
      return message;
        }
    }
    function filterTasks(message) {
        if(message.type ==="task"){
      return message;
        }
    }
    
    

    let meetings = arrayofmessages.filter(filterSchedules);
    let tasks = arrayofmessages.filter(filterTasks);
    
    if(meetings.length>0){
        return `Meeting at${meetings[meetings.length-1].content.slice(2)}`;

    } else if (tasks.length> 0){
        return `Todo:${tasks[tasks.length-1].content.slice(2)}`;
    } else {
        return arrayofmessages[arrayofmessages.length-1].content;
    }

}

function processTime (){
    return "10:37"
}

function processStatus (status){

    if (status.toLowerCase() === "available"){
        return "#64c855"
    } else if (status.toLowerCase() === "busy"){
        return "#fac855"
    } else {
        return "#f06e64"
    }
}


// ********* the following is to do with rendering messages **********
function processMessage(message, id){
    handledMessageIds.push(id);
    if(message.messageType ==="text"){
        return renderText(message, id)
    } else if (message.messageType  === "meet"){
        return renderMeeting(message)
    } else if(message.messageType === "task"){
        return renderTask(message, id)
    } else if (message.messageType  === "pdf"){
        return renderFile(message)
    } else if (message.messageType.slice(0,3) === "doc"){
        
        return renderFile(message);
       
    } else if (message.messageType === "JPG"){
        
        return renderFile(message);
       
    } else if(message.messageType==='website') {
        return renderWebsite(message);
    } else if(message.messageType==='code') {
        return renderCode(message);
    } else if(message.messageType==='stitch') {
        return renderStitch(message);
    } else if(message.messageType==='share') {
        return renderShare(message);
    } else if(message.messageType==='status') {
        return document.createElement('div');
    } else if(message.messageType==='announce') {
        return renderAnnouncement(message);
    }else if(message.messageType==='point') {
        return renderPoint(message, id);
    }else if(message.messageType==='event') {
        return renderEvent(message, id);
    }else if(message.messageType==='poll') {
        renderPoll(message, id);
        return document.createElement('div');
    }else if(message.messageType==='email') {
        return renderEmail(message);
      
    }else{
        return renderFile(message);
    }
    

    
}








function renderSidebar (){

    // let boolean  = 

    let array = state.userGroups.reverse();
    

    if(array.length===0){
        return;
    }else {
    
 


    }



let i=0;
   var x = 0

    let h = 76;
  array.forEach(element => {
     

    i++;

        let groupId = element.slice(1);
        firebase.firestore().collection('groups').doc(groupId).get().then(function(doc){
            x=x+1;
            let name = doc.data().groupName;
            let lastSideBarMessage = doc.data().object.messageContent;
            let profileURL = doc.data().groupProfileUrl ||  'test.png';
        let status= doc.data().groupStatus;

        let holder = document.createElement('div');
        holder.className = "sidebar-holder";
        holder.style.top = h+ "px";
        h = h+90
    


        let highlighter = document.createElement('div');
        highlighter.className = 'sidebar-highlighter';


        let nameHolder= document.createElement('div');
        nameHolder.className = "sidebar-name-holder";
        let adaptedName  = name;
        if(name === "one-on-one"){
            
          
            firebase.firestore().collection('groups').doc(groupId).collection('members').get().then(function(collection){
                collection.forEach(element=> {
                  
                    if(element.id === me){
                
                    } else {
                     let   firstName = element.data().userFirstName;
                       let  lastName = element.data().userLastName;
                       adaptedName = firstName + " " + lastName;
                    }
                    
                })
            }).then(function(){
                nameHolder.innerText = adaptedName;
            })
            

        } else {
            nameHolder.innerText = name;
        }
    

        let iconSection = document.createElement('div')
        iconSection.className = 'iconSection';

        let profileImg = document.createElement('div');
        profileImg.className = 'sidebar-profile-img';
        profileImg.style.backgroundImage = `url(${profileURL})`

        let statusIcon = document.createElement('div');
        statusIcon.className = 'sidebar-status-icon'
        let color = processStatus(status);
        statusIcon.style.backgroundColor = color;

        let column1 = document.createElement('div')
      
        column1.appendChild(profileImg);
        profileImg.appendChild(statusIcon)
        


        let lastMessage = document.createElement('div');
        lastMessage.className = "sidebar-last-message"
        lastMessage.innerText = abbrLastMessage(lastSideBarMessage);

       
        

        let column2 = document.createElement('div');
        column2.appendChild(nameHolder);
        column2.appendChild(lastMessage);
        column2.className = "sidebar-text-container"



        
      
        let time = document.createElement('div')
        
        time.className = "time-sidebar";

        let infoDot = document.createElement('div');
        // infoDot.className = 'side-bar-info-dot'

        let column3 = document.createElement('div');
        column3.appendChild(time);
        column3.appendChild(infoDot);
        

        holder.appendChild(highlighter)
       
        holder.setAttribute("groupId", groupId)
        document.getElementById('sidebar-content-holder').appendChild(holder)


        highlighter.appendChild(column1);
        highlighter.appendChild(column2);
        highlighter.appendChild(column3);

        highlighter.className = "sidebar-subholder"


        
        highlighter.addEventListener("mouseover", ()=> {
            highlighter.style.backgroundColor = "#eaeaea";

        })
        highlighter.addEventListener("mouseout", ()=> {
            highlighter.style.backgroundColor = "transparent";

        })

       holder.style.cursor = "pointer"
        holder.onclick=()=> {
            time.style.color = "black";

            sidebarElements = document.getElementsByClassName("sidebar-holder");
           

            for (var m=0; m<sidebarElements.length; m++){
                sidebarElements[m].style.backgroundColor = "transparent";
            
            }
            
            holder.style.backgroundColor = "#E5E5E5";            

            groupIdentif = element;
            
            let gI = element.slice(1);
          
  
         

            let testIfQueried = !queriedIds.includes(gI);

            queriedIds .push(gI)

           handleGroupClick(gI, adaptedName, testIfQueried);

          
           getMembers(gI);
          
                renderGroupMembers(gI);
                renderGroupProfileInfo(gI)
        }

        let sidebarElements_alt = document.getElementsByClassName("sidebar-holder");
        
        for(var s = 0; s<sidebarElements_alt.length; s++){
            
            let cont = sidebarElements_alt[s];
            cont.style.backgroundColor = "transparent"
        }
        firstSidebarDiv = sidebarElements_alt[0]
        firstSidebarDiv.style.backgroundColor = "#e5e5e5"
        


            if(x==1){
                groupIdentif = element;
                let gI = element.slice(1);
          
            

            let testIfQueried = !queriedIds.includes(gI);

            queriedIds .push(gI)
        clearDiv(document.getElementById('messages-container'));
           handleGroupClick(gI, adaptedName, testIfQueried);

          
           getMembers(gI);
          
                renderGroupMembers(gI);
                renderGroupProfileInfo(gI)
            }
            


        var sidebarInfoQuery  = firebase.firestore().collection('groups').doc(groupId);


        sidebarInfoQuery.onSnapshot(function(doc) {
           
            let docData = doc.data();

           
          let newLastMessage = docData.object.messageContent;
          let timeSent = docData.object.messageTimestamp;
          status = docData.groupStatus;
           color = processStatus(status);
          statusIcon.style.backgroundColor = color;

          
            var d = new Date(0); 
            d.setUTCSeconds(timeSent);
          
            let timeHolderText = convertDate(d);
            time.innerText = timeHolderText;
            let thisGroupId = doc.data().groupIdentification;
        
           if(thisGroupId===groupIdentif.slice(1)){
            time.style.color = "black";
           } else{
            time.style.color = "#00C2FF";
 
           }
            // Get time
        
            
  
              
          lastMessage.innerText = newLastMessage;




          let list = document.getElementsByClassName('sidebar-holder');
          


          function shiftDown(array){
            for (var i = 0; i < array.length; i++) {
                let container = array[i]
                let top = array[i].offsetTop;
           
        
                container.style.top = top+90;
               
                
     
            };
           
        };
        
    
        function movetotop(element){
           




            let top = element.offsetTop;
            let duplicator = document.createElement('div');
            duplicator.innerHTML = element.innerHTML;
            document.getElementById('sidebar-content-holder').appendChild(duplicator);
            // duplicator.style.position = "absolute";
            duplicator.className = "sidebar-holder";
            duplicator.style.backgroundColor ="#e5e5e5";
           
            
            element.style.top = '76px';
            element.style.visibility = "hidden";
        
                var id = setInterval(frame, 1);
                let newposition = 76 ;
        
                    function frame() {
                     
                      
                        if (top == newposition) {
                            element.style.visibility = "visible";
                            duplicator.style.display = "none";
                          clearInterval(id);
                        } else {
                            if(top-newposition>10){
                                top =top-2; 

                            } else if(top-newposition>2) {
                                top = top-1;
                            } else {
                                top = top-0.5
                            }
                            
                          duplicator.style.top = top + "px"; 
                        }
                       
                      };
        
                
        }
        
            let selectedChat = holder
            
           
           let up = selectedChat.offsetTop;
        
            let exclusive = [];
           for(var k = 0; k < list.length; k++){
               let thistop = list[k].offsetTop;
               if(thistop<up){
                   exclusive.push(list[k]);
               }
           }
           movetotop(selectedChat)
           setTimeout(shiftDown(exclusive), 1000);
           

          
          });
    })


});

}

    

function renderProfile (stata) {
   

    document.getElementById('profile-my-name').innerText = state.userFirstName+ " " +state.userLastName;
    var profileDataQuery = firebase.firestore().collection('users').doc(me);
    profileDataQuery.onSnapshot(function(doc) {
        let imgUrl = doc.data().userImgUrl;

        let img = document.getElementById('profile-img-img');
        img.setAttribute("src", imgUrl)
    })

   
    

}
// 


// 


function renderMessages (array){
    
 


    array.forEach(element => {
        
        let cont = element.messageInfo;
        

        let id= element.id;

    


        let messageContent = processMessage(cont, id);
        // processNotifications(cont, id);
        let messageHolder = document.createElement('div');
        messageHolder.appendChild(messageContent);
        messageHolder.className = "message-holder";
        
        document.getElementById('messages-container').appendChild(messageHolder);

        
        // *******
        // document.getElementById('messages-container').style.display = "none";


 })
    chatWindow = document.getElementById('messages-container') 
    var xH = chatWindow.scrollHeight; 
    chatWindow.scrollTo(0, xH);
    
}

['dragenter', 'dragover', 'dragleave', 'drop', 'dragend'].forEach(eventName => {
    document.getElementById('messages-container').addEventListener(eventName, preventDefaults, false)
    });

['dragenter', 'dragover', 'dragleave', 'drop', 'dragend'].forEach(eventName => {
        document.getElementById('drag-and-drop').addEventListener(eventName, preventDefaults, false)
    });
document.getElementById('messages-container').addEventListener("dragenter", ()=> {
    document.getElementById('drag-and-drop').style.display = "block";
})

document.getElementById('drag-and-drop').addEventListener("dragleave", ()=> {
    document.getElementById('drag-and-drop').style.display = "none";
})
document.getElementById('drag-and-drop').addEventListener("drop", ()=> {
    document.getElementById('drag-and-drop').style.display = "none";
})
    
    function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
    }
    document.getElementById('drag-and-drop').addEventListener('drop', handleDrop);
    function handleDrop(e) {

        let dt = e.dataTransfer.files
        saveImageMessage(dt[0]);
        
        }




// This is the part where the messages are sent*******




// Triggered when a file is selected via the media picker.
function onMediaFileSelected(event) {
    event.preventDefault();
    var file = event.target.files[0];


    // Clear the selection in the file picker input.
  
    
      saveImageMessage(file);
    
  }
// Saves a new message containing an image in Firebase.
// This first saves the image in Firebase storage.
function saveImageMessage(file) {
    // 1 - We add a message with a loading icon that will get updated with the shared image.
    let filename = file.name;
    let size = file.size;


    let gI =  groupIdentif.slice(1);
    let refer = firebase.firestore().collection('groups').doc(gI).collection('messages')
      
    setMessageRef(refer)
   function setMessageRef (messageRef) {
      // 2 - Upload the image to Cloud Storage.
      var filePath = me + '/' + messageRef.id + '/' + filename;
      return firebase.storage().ref(filePath).put(file).then(function(fileSnapshot) {
        // 3 - Generate a public URL for the file.
        return fileSnapshot.ref.getDownloadURL().then((url) => {
          // 4 - Update the chat message placeholder with the image’s URL.
          return messageRef.add({
           
            storageUrl: fileSnapshot.metadata.fullPath,
            messageType: getFileExtension(filename),
            messageSenderId: me,
            messageSaved: false,
            messageFilename: filename,
            messageFileSize:size,
            messageSenderName: 'name',
                
            imageUrl: url,
            messageTimestamp: firebase.firestore.FieldValue.serverTimestamp()
          });
        });
      });
    }
  }

  function getFileExtension(filename){
      return filename.split('.').pop();
  }


  function displayMeets(groupIdentifcator){
  
    let meetsList = [];

firebase.firestore().collection('groups').doc(groupIdentifcator.slice(1)).collection('messages').get().then(function(col){
    col.forEach(doc => {

        if(doc.data().messageType === "meet"){
        
           
           let messageContent =  doc.data().messageContent;
           let messageId = doc.id;

           let object = {
               messageContent,
               messageId
           }

           meetsList.push(object);
            
        }

    })
        
 
}).then(function(){
    renderMeetingsInInfo(meetsList);
})
}

function displayCalendar(){
    var calendar = document.getElementById('caleander');
  

    var events = [
        {'Date': new Date(2020, 7, 7), 'Title': 'Doctor appointment at 3:25pm.'},
        {'Date': new Date(2020, 8, 18), 'Title': 'New Garfield movie comes out!', 'Link': 'https://garfield.com'},
        {'Date': new Date(2020, 9, 27), 'Title': '25 year anniversary', 'Link': 'https://www.google.com.au/#q=anniversary+gifts'},
    ];

    caleandar(calendar, events, settings);









}

function createSendLocateCommand(string){
    openCommandsView();
    clearDiv(document.getElementById('find-commands-container'));
    let content = string.slice(1);
    
    if(content.slice(0,4) === "task"||content.slice(0,2) ==="t"){
        displayTasks(groupIdentif);
    } else if(content.slice(0,4) ==="meet"){
        displayMeets(groupIdentif);
    }else if(content.slice(0,4) ==="file"){
        console.log('displaying files')
        displayFiles(groupIdentif);
    } else if(content.slice(0,8) ==="myfiles"||content.slice(0,9) ==="my files"||content.slice(0,3) ==="dir"){
        document.getElementById('saved-files-container').style.display = "block";    
        closeCommandsView()    
    } else if(content.slice(0,4) ==="cale"){
        document.getElementById('caleander-holder').style.display = "block";

    }else if(content.slice(0,8) ==="mymeets"||content.slice(0,9) ==="my meets"){
        displayMyMeetings();  
    } else {
        displaySearch(groupIdentif, string);
    }
}


function sendMessage (string, lseid){
    // Does the string start with a slash?
  if(typeof string === "string"){
    if(string.slice(0, 1)==='/'){

        let returnValue = createSendCommand(string, lseid);

        return returnValue;
    } else if(string.slice(0,4)==='http') {
        let returnValue = createSendWebsite(string)
        return returnValue
    } else if(string.slice(0,1)==='!') {
        let returnValue = createSendLocateCommand(string)
        return returnValue
    }else {
       let returnValue = createSendMessage(string, lseid)
 
       return returnValue;
    }
} else {
    // handleObject
    return createSendMeet(string);

}
   
}



function handleSendMessage(string, lsid){
    
    let objectToBeAdded = sendMessage(string, lsid);
    
    // groupId = groupIdentif
    
   
    groupIdentification = groupIdentif.slice(1);
    pushMostRecentMessage(objectToBeAdded)
    let messageTitle = null;
    if(objectToBeAdded.messageTitle){
        messageTitle = objectToBeAdded.messageTitle;
    }

    firebase.firestore().collection('groups').doc(groupIdentification).collection('messages').add({ 
       
    
        messageType : objectToBeAdded.messageType,
        messageContent: objectToBeAdded.messageContent,
        messageTimestamp: objectToBeAdded.messageTimestamp,
        messageSenderId: objectToBeAdded.messageSenderId,
        messageSaved: objectToBeAdded.messageSaved, 
        messageSenderName: state.userFirstName+ " " +state.userLastName,
        messageEdit: false, 
        messageGroup: groupIdentif.slice(1),
        messageTitle

    }).then(function(ref){
        let members = [];
        if(objectToBeAdded.messageType==="poll"){
            firebase.firestore().collection('groups').doc(groupIdentification).collection('members').get().then(function(collection){
                    collection.forEach(doc=> {
                        members.push(doc.id)
                    })
            }).then(function(){
                members.forEach(member=> {
                    ref.collection('voters').doc(member).set({
                        option: null

                    })
                })
                
            })
            
        }else {
        }
      
    })






}
// handling sending messages



document.getElementById('send-message').addEventListener("keydown", function(event){
    
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById('send-message').style.height = "40px"
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
      }
})

renderSidebar()
    

renderProfile(state);



function pushMostRecentMessage(object) {
    
    groupIdentification = groupIdentif.slice(1);
    firebase.firestore().collection('groups').doc(groupIdentification).set({ 
        
        
        object, 
        groupIdentification

    }, { merge: true })
}



var colors = [];
while (colors.length < 100) {
    do {
        var color = Math.floor((Math.random()*1000000)+1);
    } while (colors.indexOf(color) >= 0);
    colors.push("#" + ("000000" + color.toString(16)).slice(-6));
}

function getRandomColor (){
    let randomNumber = (Math.random()*100).toFixed(0)
    let randomColor = colors[randomNumber];
    return randomColor;
}



function createPersonGroup(oneonedata){
    let arrayofnames = oneonedata.membersNames;

    let newGroupName  =  arrayofnames.join(", ");

    firebase.firestore().collection("groups").add({
       
        groupName: 'one-on-one',
        groupTimeCreated: firebase.firestore.FieldValue.serverTimestamp(),
        object: {
            messageContent: "Welcome to the group",
            messageSaved: false,
            messageSenderId: "n9WMEfIcHicOb43S1wJct6uBpmq1",
            messageTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
            messageType: "text",
        }
    }).then(function(newGroup) {
        
        oneonedata.members.forEach(element => {

            firebase.firestore().collection("users").doc(element).get().then(function(doc) {
                userDoc = doc
                user = userDoc.data()
            }).then(function() {
                firebase.firestore().collection("groups").doc(newGroup.id).collection("members").doc(userDoc.id).set({
                    color: getRandomColor(),
                    userFirstName: user.userFirstName,
                    userLastName: user.userLastName,
                    userEmail: user.userEmail,
                }).then(function() {
                    firebase.firestore().collection("users").doc(element).update({
                        userGroups: firebase.firestore.FieldValue.arrayUnion(" " + newGroup.id)
                    })
                })
            })

            
        })    
    })
}





function leaveGroup(groupId){
    firebase.firestore().collection("groups").doc(groupId).collection("members").doc(me).delete().then(function (){

    }).then(function(){
        firebase.firestore().collection("users").doc(me).update({
            userGroups: firebase.firestore.FieldValue.arrayRemove(" " + groupId) // If this doesnt work, it's because the group Ids have a space before them
        })
    })
}



function renderSavedFiles(element){


        let container = document.createElement('div');
        container.className = "my-file-holder"
        let fileIcon = document.createElement('div');
        let filenameHolder = document.createElement('div');
        filenameHolder.className = "file-name-holder";
        let fileSizeHolder= document.createElement('div');
        fileSizeHolder.className = "file-size-holder";
        let fileTypeHolder = document.createElement('div');
        fileTypeHolder.className = "myfile-type"

       let fileUrl = element.fileUrl;
       let name = element.fileName;
       let size = element.fileSize;
       let type= "UND"

        type = element.fileType;

        let typeICON =document.createElement('img');
        typeICON.className = "type-icon-myfiles";
        if(type==="docx"){
            typeICON.setAttribute("src", "test.png");
            fileIcon.appendChild(typeICON);

        } else if (type ==="pdf"){
            typeICON.setAttribute("src", "stitch_logo.png");

            fileIcon.appendChild(typeICON);

        } else if (type==='png'){
            typeICON.setAttribute("src", fileUrl);

            fileIcon.appendChild(typeICON);
        }


       fileIcon.className ="saved-files-icon"
       filenameHolder.innerHTML = `<a href='${fileUrl}' class = "myfile-link"> ${name}</a>`

       fileSizeHolder.innerText = getMegabytes(size).toFixed(2)+"  MB";


      

        if(type){
            fileTypeHolder.innerText = type.toUpperCase();

        }

        let timestamp = "7 July 2020"

       container.appendChild(fileIcon);
       container.appendChild(filenameHolder);
       container.appendChild(fileSizeHolder);
       container.appendChild(fileTypeHolder);
       container.setAttribute("draggable", "true")

       let send = document.createElement('div');
       send.className = "myfiles-send-icon"
       send.innerText = "SF";

       container.appendChild(send);

       send.addEventListener("click", ()=> {
           
           firebase.firestore().collection('groups').doc(groupIdentif.slice(1)).collection('messages').add({
            imageUrl: fileUrl,
            
            messageType: getFileExtension(name),
            messageSenderId: me,
            messageSaved: false,
            messageFilename: name,
            messageFileSize:size,
            messageSenderName: 'name',
            messageTimestamp: firebase.firestore.FieldValue.serverTimestamp()
           })
       })


       container.addEventListener("click", ()=> {
            


            let tt = document.getElementById('myfile-name-holder');
            tt.innerHTML = `<a href='${fileUrl}' class = "myfile-link"> ${name}</a>`;

            let uu = document.getElementById('myfiletype');
            uu.innerText = type.toUpperCase();
            
            let ww = document.getElementById('myfilesize');
            ww.innerText = getMegabytes(size).toFixed(2)+"  MB";

            let xx = document.getElementById('myfile-date-made-date')
            xx.innerText = timestamp;

            let yy = document.getElementById('myfile-preview-image');
            let typePREVIEWimg = document.createElement('img');
            typePREVIEWimg.className = "myfile-previewimg";
            clearDiv(yy);

            let typePREVIEWifr = document.createElement('iframe');
            typePREVIEWifr.className = "myfile-previewifr";

            if (type ==="docx"){
                typePREVIEWimg.setAttribute("src", 'test.png');
                yy.appendChild(typePREVIEWimg);
            } else if(type==="xlsx"){
                typePREVIEWimg.setAttribute("src", 'test.png');
                yy.appendChild(typePREVIEWimg);
            } else if(type==="pdf"){
                typePREVIEWifr.setAttribute("src", fileUrl);
                yy.appendChild(typePREVIEWifr);
            } else if(type==="png"){
                typePREVIEWimg.setAttribute("src", fileUrl);
                yy.appendChild(typePREVIEWimg);
            }






       })

       return container;



    
}


function loadSavedFiles(contaniner){
    var myFilesIds = [];
    
    var savedFilesQuery = firebase.firestore().collection("users").doc(me).collection('savedFiles');

        savedFilesQuery.onSnapshot(function(snapshot) {
            snapshot.docChanges().forEach(function(change) { 
            
                let fileObject= change.doc.data();
                let id = change.doc.id;
                

            
                    myFilesIds.push(id);
                    let node = renderSavedFiles(fileObject)
                    contaniner.appendChild(node);
                
                

            })

   
})
}
loadSavedFiles(document.getElementById('load-myfiles'));



function grabSearchResults (string){
    let searchData = []
    userOrganisationMembers.forEach(element=> {
        if(element.userEmail.includes(string)){
            searchData.push(element)
        }
    });

renderSearchResults (searchData)
}


function renderSearchResults (array){

    clearDiv(document.getElementById('command-center-content'));
   
array.forEach(element=> {
  
    
    let container = document.createElement('div');
    container.className = "search-results-container";

    let nameHolder = document.createElement('div');
    let profileIconHolder = document.createElement('div');


   
    let email = element.userEmail;
    let name = element.userFirstName +" "+ element.userLastName;
    let actnameholder = document.createElement('div');
    actnameholder.innerText = name.toUpperCase();
    actnameholder.className = "act-search-name-holder"


    nameHolder.innerText = email;
    nameHolder.className = "search-name-holder"

       

     profileIconHolder.innerHTML = `<div  class = 'user-search-icon'><span class = "Initials"> ${element.userFirstName.slice(0,1)+element.userLastName.slice(0,1)}</span> </div> `

     container.appendChild(profileIconHolder);

     let namee = document.createElement('div');
     namee.className = "name-and-email-holder-search";

     namee.appendChild(actnameholder);
     namee.appendChild(nameHolder);
     container.appendChild(namee)

    container.addEventListener("click", ()=> {
     
      
        if(ids.includes(element.userId)){
   
        }else {
           


            ids.push(element.userId);
           
            

        selectedPeople.push(element);
        
        clearDiv(document.getElementById('command-center-people'))
        renderSearchSelectedPeople (selectedPeople);
        }

    })


     document.getElementById('command-center-content').appendChild(container);
})

}

document.getElementById('search-form').addEventListener("keyup", ()=> {

    let searchQuery=  document.getElementById('search-form').value;
    grabSearchResults(searchQuery);
})



function renderSearchSelectedPeople (array) {
    array.forEach(element=> {
        let container = document.createElement('div');
        container.className = "search-selected-container";
    
        let nameHolder = document.createElement('div');
        let profileIconHolder = document.createElement('div');
    
    
       
        let name = element.userFirstName.slice(0,1) + " " +element.userLastName.slice(0,1);
      
    
         profileIconHolder.innerHTML = `<div class = 'user-search-icon'> <span class = "Initials">${name}</span></div> `
    
         container.appendChild(profileIconHolder);
         
    
         document.getElementById('command-center-people').appendChild(container);
    })
}



function clearDiv (div) {
    while (div.firstChild) {
      div.removeChild(div.firstChild);
    }
  }

function createNewGroupObject(name){

    firebase.firestore().collection("groups").add({
        groupName: name,
        groupTimeCreated: firebase.firestore.FieldValue.serverTimestamp(),
        object: {
            messageContent: "Welcome to the group",
            messageSaved: false,
            messageSenderId: "n9WMEfIcHicOb43S1wJct6uBpmq1",
            messageTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
            messageType: "text",
        },
        groupStatus: "Available"
    }).then(function(newGroup) {

        ids.forEach(element => {

            firebase.firestore().collection("users").doc(element).get().then(function(doc) {
                userDoc = doc
                user = userDoc.data()
             
            }).then(function() {
                firebase.firestore().collection("groups").doc(newGroup.id).collection("members").doc(userDoc.id).set({
                    color: getRandomColor(),
                    userFirstName: user.userFirstName,
                    userLastName: user.userLastName,
                    userEmail: user.userEmail,
                }).then(function() {
                    firebase.firestore().collection("users").doc(element).update({
                        userGroups: firebase.firestore.FieldValue.arrayUnion(" " + newGroup.id)
                    })
                })
                ids = [me];
  
            })

            
        })    
    })  
    
}


 function getMembers(groupId){
    groupMembers = [];
    
    firebase.firestore().collection('groups').doc(groupId).collection('members').get().then((querySnapshot)=> {
      querySnapshot.forEach(function(doc) {

      let object = {}      
      object.memberId = doc.id;
      object.color = doc.data()
      groupMembers.push(object);

      });

    })
}



function convertDate(Dated){
    let date = Dated.toString()
    let dateNow = new Date();

   let monthandday = date.toString().slice(4,10);

   let monthanddaytoday = dateNow.toString().slice(4,10);

  

   let dateDay = monthanddaytoday.slice(4,7);
   let dateDaySent = monthandday.slice(4,7);
   
   let dif = parseInt(dateDay)-parseInt(dateDaySent);;
    
   

   if(dif == 1){
       return "yesterday";
   } else if(dif == 0){
    let timeSent = date.slice(16,21);
    return timeSent;
    } else {
        return dateDaySent;
    }

 
}





var myStatusDot = document.getElementById('my-status-circle');
var myStatus=document.getElementById('status-word-user');

document.getElementById('profile-my-status').addEventListener("click", ()=> {
    
    let currentStatus = myStatus.innerText;
    let newStat = altStatus(currentStatus);
   
    upDateStatus(me, newStat)
})


var meQuery  = firebase.firestore().collection('users').doc(me);


        meQuery.onSnapshot(function(doc) {
    

        let statusChange = doc.data();
        let newStatus= doc.data().userStatus;
        renderMyStatus (newStatus)

 
});


function setProfileUrl (event){
    event.preventDefault();
    var file = event.target.files[0];

    updateProfilePicture(file)


}





function updateProfilePicture(file){
    fileName = file.name
    firebase.firestore().collection('users').doc(me).update({
     
          userImgUrl: fileName
      }).then(function(messageRef) {
          messageRef = firebase.firestore().collection('users').doc(me);
        // 2 - Upload the image to Cloud Storage.
        var filePath = me + '/' + messageRef.id + '/' + fileName;
        return firebase.storage().ref(filePath).put(file).then(function(fileSnapshot) {
          // 3 - Generate a public URL for the file.
          return fileSnapshot.ref.getDownloadURL().then((url) => {
            // 4 - Update the chat message placeholder with the image’s URL.
            return messageRef.update({
              
                userImgUrl: url
            });
          });
        });
})
}


function setGroupUrl (event){
    
    event.preventDefault();
    var file = event.target.files[0];

    updateGroupProfilePicture(file)


}
function updateGroupProfilePicture(file){
    fileName = file.name
    firebase.firestore().collection('groups').doc(groupIdentif.slice(1)).update({
     
          groupProfileUrl: fileName
      }).then(function(messageRef) {
          messageRef = firebase.firestore().collection('groups').doc(groupIdentif.slice(1));
        // 2 - Upload the image to Cloud Storage.
        var filePath = me + '/' + messageRef.id + '/' + fileName;
        return firebase.storage().ref(filePath).put(file).then(function(fileSnapshot) {
          // 3 - Generate a public URL for the file.
          return fileSnapshot.ref.getDownloadURL().then((url) => {
            // 4 - Update the chat message placeholder with the image’s URL.
            return messageRef.update({
              
                groupProfileUrl: url
            });
          });
        });
})
}


    document.getElementById("search-form").addEventListener("keydown", (e)=> {
        if(e.keyCode===13){
          
            e.preventDefault();
            let commandValue = document.getElementById("search-form").value;
            
                addMemberToOrganisation(commandValue)
            


        }
    })

    function addMemberToOrganisation(id){
        let d;
        firebase.firestore().collection('users').doc(me).get().then(function(doc){
            d = doc.data();
            let orgId = d.organisationId;
            let obj = {
                orgId, 
                id,
            }
            return obj;
        }).then(function(obj){
            let id = obj.id;
            let orgId = obj.orgId;
            firebase.firestore().collection('users').doc(id.slice(1)).get().then(function(doc){
                let f = doc.data();
                let fname = d.userFirstName;
                let lname = d.userLastName;
                

                let email=  d.userEmail;
                let data = {
                    userFirstName: fname,
                    userLastName: lname,
                    userEmail: email,
                    userId: id
                }
                return data;
            }).then(function(data){
                let orgIdentif = data.id;
              
                let ref = firebase.firestore().collection("organisations").doc(orgId);
                return ref.update({
                    members: firebase.firestore.FieldValue.arrayUnion({
                        userEmail: data.userEmail,
                        userFirstName: data.userFirstName,
                        userLastName: data.userLastName,
                        userId: data.userId
                    })
                
            })
            
        })
    })
    }



    document.getElementById('submit-org-id').addEventListener("click", ()=> {
        document.getElementById('validating-id').style.display = "block";
        let orgid = document.getElementById('enter-org-id').value;
        document.getElementById('enter-org-id').value= ""
        let rorg = orgid.slice(1);
        document.getElementById('sec-val-word').innerText = "Sending credentials to the cloud..."
       
        
        let bool = false;
        firebase.firestore().collection('organisations').get().then(function(collection){
            collection.forEach(doc => {
                if(doc.id===rorg){
                    bool = true
                } else {
                    setTimeout(setValW, 3000)
                }
            })
                
            }).then(function(){
                if(bool){
                    firebase.firestore().collection('users').doc(me).update({
                        organisationId: rorg
                    }).then(function(){
                        setTimeout(setValText1,3000)
                        addMemberToOrganisation(me)
                    })
                }
            })
        })


function renderCaleanderCalendar(){

    let events = []
firebase.firestore().collection('users').doc(me).collection('calendar').get().then(function(col){
    col.forEach(doc => {
        let d = doc.data();
        let type = d.type;
        let content = d.content;
        let title  = type + ": " + content;



        let t = d.timestamp;
        let date = t.toDate()
     
        let year = date.toString().slice(11,15);
        let day = date.toString().slice(8,10);
        let monthw = date.toString().slice(4,7);
        let monthn = convertMonth(monthw)-1
      events.push(
        {Date: new Date(year, monthn, day), Title: title},
      )
    });
}).then(function(){
    // let n = 
    var eventsa = [
        {Date: new Date(2020, 7, 7), Title: 'Doctor appointment at 3:25pm.'},
        {Date: new Date(2020, 8, 18), Title: 'New Garfield movie comes out!'},
        {Date: new Date(2020, 9, 27), Title: '25 year anniversary'}
      ];
    renderCalendar(events);
    
})
}

renderCaleanderCalendar();


function addMemberToExistingGroup(memberemail){
    let id;

    userOrganisationMembers.forEach(element=> {
        if(element.userEmail===memberemail){
            id = element.userId;
        }else {
            //handle error
        }  
    })
firebase.firestore().collection('users').doc(id).get().then(function(doc){
    let color = getRandomColor();
    let userEmail = memberemail;
    let userFirstName = doc.data().userFirstName;
    let userLastName = doc.data().userLastName;
    firebase.firestore().collection('groups').doc(groupIdentif.slice(1)).collection('members').add({
        userFirstName,
        userLastName,
        color,
        userEmail
    });

    let ref = firebase.firestore().collection('users').doc(id);
    
    return ref.update({
        userGroups: firebase.firestore.FieldValue.arrayUnion(groupIdentif)

    })
})
 

}

document.getElementById('add-member-plus').addEventListener("click", ()=> {
    document.getElementById('add-group-member-container').style.display = "block";

})

document.getElementById('add-new-member').addEventListener('click', ()=> {
    let v = document.getElementById('add-new-member-form').value;
    document.getElementById('add-new-member-form').value = "";

    addMemberToExistingGroup(v);
    document.getElementById('add-group-member-container').style.display = "block";
})
document.getElementById('reset-new-mem').addEventListener("click",()=> {
     document.getElementById('add-new-member-form').value = "";
     document.getElementById('add-group-member-container').style.display = "none";
})