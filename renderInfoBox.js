// Rendering meetings and tasks 
function renderTasksInInfo (array){
 
  
    array.forEach(element=> {
        let container = document.createElement('div');
        container.className = "task-info-container";

        let buttonsContainer = document.createElement('div');
        buttonsContainer.className = "task-meet-btns-container";


        let remove = document.createElement('div');
         remove.innerText ="-";
        remove.className = 'task-meet-remove-btn' 


        let mark = document.createElement('div');
        mark.className = 'task-meet-circle-btn';
        mark.innerText = 'B';

        let marked = document.createElement('div');
        marked.className = 'task-meet-icon-btn';
        marked.innerText = 'A';

        let swapIcon = document.createElement('div');
        swapIcon.appendChild(mark);
        swapIcon.appendChild(marked)
        swapIcon.className = "task-meet-iconswapper"

        buttonsContainer.appendChild(remove);

        buttonsContainer.appendChild(swapIcon);

        
        let holder = document.createElement('div');
        holder.innerText = element;
        holder.className = "task-holder";

        container.addEventListener("mouseover", ()=>{
            remove.style.visibility = "visible";
            container.style.backgroundColor = "#E5E5E5";
        })
        container.addEventListener("mouseout", ()=>{
            remove.style.visibility = "hidden";
            container.style.backgroundColor = "transparent";
        })


        marked.addEventListener("click", ()=> {
            marked.style.display = "none";
            mark.style.display = "block";

        })

        mark.addEventListener("click", ()=> {
            marked.style.display = "block";
            mark.style.display = "none";

        })





        let addtocal  = document.createElement('div');
        let dateinput = document.createElement('input');
        dateinput.setAttribute("type", "datetime-local");
        dateinput.className = "date-task-input"

        
        addtocal.className = "addtocal";
        addtocal.style.display = "none";
        dateinput.addEventListener("change", ()=> {
            addtocal.style.display = "block"
        })

 
        addtocal.addEventListener("click", ()=> {
            let datetime = dateinput.value;
            let d = new Date(datetime)

            if(addtocal.style.backgroundColor === "green"){
             addtocal.style.backgroundColor = "white";
            } else {
 
             addtocal.style.backgroundColor = "green"
             //add to firebase

             let object = {
                 date:firebase.firestore.Timestamp.fromDate(d),
                 content: element,
                 type: "task"
             }
             addToCal(object);
            }
        })



        container.appendChild(buttonsContainer);
        container.appendChild(holder);
        container.appendChild(dateinput);

        container.appendChild(addtocal);
        document.getElementById('find-commands-container').appendChild(container);



        
    })



}



function renderMeetingsInInfo (array){

    

    if(array.length === 0){
        let noMeets= document.createElement('div');

       noMeets.innerHTML = "you have no current meetings planned"
       document.getElementById('find-commands-container').appendChild(noTasks);
    };

    array.forEach(element=> {
        
        let meetInfo = element.messageContent;
        let meetId = element.messageId;


        let meetingDesc = meetInfo.meetingDesc;
        let meetingTime = meetInfo.time;
        let objectTempData = getDateAndTimeObject(meetingTime);
        dateData = objectTempData.finalStringMeetingDue;
        timeData = objectTempData.finalStringTimeMeetDue;
        

       

         
        

        let container = document.createElement('div');
        container.className = "meet-info-container";

        let buttonsContainer = document.createElement('div');
        buttonsContainer.className = "task-meet-btns-container";


        let remove = document.createElement('div');
         remove.innerText ="-";
        remove.className = 'task-meet-remove-btn' 


        let mark = document.createElement('div');
        mark.className = 'meet-datetime-holder-info';
        
        let dateHolder = document.createElement('div');
        let timeHolder = document.createElement('div');

         dateHolder.innerText = dateData;
         timeHolder.innerText = timeData;



        mark.appendChild(dateHolder);
        mark.appendChild(timeHolder);

        

        let swapIcon = document.createElement('div');
        swapIcon.appendChild(mark);
    
        swapIcon.className = "meet-iconswapper"

        buttonsContainer.appendChild(remove);

        buttonsContainer.appendChild(swapIcon);

        
        let holder = document.createElement('div');
        let textHolder = document.createElement('div');

        holder.appendChild(textHolder);
        textHolder.innerText = meetingDesc;
        textHolder.className = "text-holder-meet"
        holder.setAttribute("contenteditable", "true");

        holder.className = "meet-holder-cmd";

        container.addEventListener("mouseover", ()=>{
            remove.style.visibility = "visible";
            container.style.backgroundColor = "#E5E5E5";
        })
        container.addEventListener("mouseout", ()=>{
            remove.style.visibility = "hidden";
            container.style.backgroundColor = "transparent";
        })

        


       let setDT = document.createElement('input');
       setDT.setAttribute("type", "datetime-local");
       setDT.className = "reset-meet-time"

       
       var fTime = meetingTime
     
          
       setDT.addEventListener("focusout", ()=> {
  
        let newTime = setDT.value;
        var d = new Date(newTime);
        
       
        let val = isValidDate(d);
        if(val){
           fTime = new firebase.firestore.Timestamp.fromDate(d);

        }
           

        objectTempData = getDateAndTimeObject(fTime);
        dateData = objectTempData.finalStringMeetingDue;
        timeData = objectTempData.finalStringTimeMeetDue;

        dateHolder.innerText = dateData;
        timeHolder.innerText = timeData;



        updateFirebaseMeetingTime (meetId,fTime);
       });

       holder.addEventListener("focusout", ()=> {
           let newText = holder.innerText;
           updateMeetingDescription(meetId,newText)
       })



       swapIcon.appendChild(setDT);

   

       let addtocal  = document.createElement('div');
       addtocal.className = "addtocal"

       addtocal.addEventListener("click", ()=> {
           if(addtocal.style.backgroundColor === "red"){
            addtocal.style.backgroundColor = "white";
           } else {

            addtocal.style.backgroundColor = "red"
            //add to firebase
            let object = {
                date: fTime, 
                content: meetingDesc,
                type: "meet"
            }
            addToCal(object);
           }
       })

        container.appendChild(buttonsContainer);

        let secondRow = document.createElement('div');
        secondRow.className = "meet-main-body-info"

        secondRow.appendChild(holder);
        secondRow.appendChild(addtocal)

        container.appendChild(secondRow);
        document.getElementById('find-commands-container').appendChild(container);




        
    })



}

function addToCal(object){
  
    let content = object.content;
  
    let date = object.date;
    
    let type = object.type;
    firebase.firestore().collection('users').doc(me).collection('calendar').add({ 
       
        content,
        timestamp:date,
        type:"meet"
    })
}


function displayTasks(groupIdentifcator){

    
    let tasksList = [];


firebase.firestore().collection('groups').doc(groupIdentifcator.slice(1)).collection('messages').get().then(function(element){
    element.forEach(doc => {
        if(doc.data().messageType === "task"){
            tasksList.push(doc.data().messageContent);
            
        }
        

    })
        
 
}).then(function(){

    renderTasksInInfo(tasksList);
})
}


function displaySearch(groupIdentificator, string){
    let content = string.slice(1);
    let searchMessages = [];
    let displaySearchMessages = [];
    firebase.firestore().collection('groups').doc(groupIdentificator.slice(1)).collection('messages').get().then(function(col){
    
            col.forEach(element=> {
                let message = element.data()
                let messageType = message.messageType;
                if(messageType==="text"){
                    searchMessages.push(message)
                }
            })
        }).then(function(){
                searchMessages.forEach(element=> {
                    let messageCont = element.messageContent;
                    if(messageCont.includes(content)){
                        displaySearchMessages.push(element);
                    }

                })

                renderDisplaySearch(displaySearchMessages, content);
            })
    
   

}

function displayFiles(groupIdentificator){
    console.log('displaying files in function')
    searchFile = []
    firebase.firestore().collection('groups').doc(groupIdentificator.slice(1)).collection('messages').get().then(function(col){
        console.log(col)
        col.forEach(element=> {
           
            let message = element.data();
            let messageType = message.messageType;
            if(messageType.slice(0,3)==="doc"|| messageType.slice(0,1)==="xlsx"||messageType==="pdf"){
                searchFile.push(message)
            }
        })
    }).then(function(){
            console.log(searchFile)

            renderDisplayFiles(searchFile);
        })

}
function displayMeets(){
    // This function is fully optimising for limiting CRUD requests
    let myMeets = [];
    if(myMeets.length==0){
    firebase.firestore().collection('users').doc(me).collection('savedMeets').get().then(function(collection){
            collection.forEach(doc=> {
                myMeets.push(doc);
            })
    }).then(function(){
        renderMyMeets(myMeets);
    })
    } else {
        renderMyMeets(myMeets);
    };


}

function renderMyMeets (array){
 array.forEach(element=> {
    
        let time = element.messageContent.time;

     let container = document.createElement('div');
     let firstRow = document.createElement('div');
     let secondRow = document.createElement('div');



 })
}

function renderDisplaySearch(array, content){
  
   
    array.forEach(element=> {
        let container= renderTextSearch(element, content);
        document.getElementById('find-commands-container').appendChild(container);

    })




    
}

function renderGroupProfileInfo (groupIdentificator){
     
        var groupInfoQuery = firebase.firestore().collection('groups').doc(groupIdentificator);

        groupInfoQuery.onSnapshot(function(doc) {
 
        let profileImg = doc.data().groupProfileUrl;

        document.getElementById('group-profile-img').setAttribute("src", profileImg);
 
         let groupName = doc.data().groupName;
        
         let imgUrl  = doc.data().groupImgUrl;
         let groupDescription = doc.data().groupDescription;
 
 
 
 
         if(groupName==="one-on-one"){
             groupName= document.getElementById('header').innerText;
         }
 
 
         document.getElementById('group-stats-name').innerText = groupName;
         document.getElementById('group-stats-description').innerText = groupDescription;
 
         // Set these functions as local variables, we can move this event listener out if we make the variables have a global scope
 
         // Dont look
        
         
         document.getElementById('cancel-group-info').addEventListener("click", ()=> {
             document.getElementById('group-stats-name').innerText = groupName;
             document.getElementById('group-stats-description').innerText = groupDescription;
             if(imgUrl){
                 document.getElementById('group-image-info').innerHTML = `<img class= "group-profile-image"src=${imgUrl}> </img>`
             }
         })
 
         if(imgUrl){
             document.getElementById('group-image-info').innerHTML = `<img class= "group-profile-image"src=${imgUrl}> </img>`
         }
         
     
        })

 }

function renderGroupMembers(groupIdentificator){
    let members  = []
    firebase.firestore().collection('groups').doc(groupIdentificator).collection('members').get().then(function(doc){


        doc.forEach(element=> {
            let fn = element.data().userFirstName;
        let ln = element.data().userLastName;
        let userProfileImg = element.data().userProfileImg;
        let name = fn + " "+ ln;
        let id = element.id;
        let userEmail = element.data().userEmail;
        
        let object = {
            name,
            id,
            userProfileImg,
            userEmail
        }
        members.push(object);
        })
        
        

    }).then(function(){
        listMembers(members)
    })

}

function listMembers(array){
    let groupStatuses = [];

    clearDiv(document.getElementById('list-group-members'));

     array.forEach(element=> {
    

         let id = element.id;

         let container = document.createElement('div');
         container.className = "list-members-container"
        
         let profileUrl = element.userImgUrl;
        
         let nameContainer = document.createElement('div');
         nameContainer.className = "list-members-name-container";
         nameContainer.innerHTML = element.name + "<br/>";
 
 
         let profileImgContainer = document.createElement('div');
        let statusContainer = document.createElement('div');
        statusContainer.className = "info-box-status-container";
    
 
         // Set this to the correct profile Url
     
       
         let imgTag = document.createElement('img');
         profileImgContainer.appendChild(imgTag);
         profileImgContainer.className = "list-members-profile-image"
         imgTag.setAttribute("src", profileUrl);
         imgTag.className = "list-member-user-img"
         
 
         let userEmailContainer = document.createElement('div');
         userEmailContainer.innerText = element.userEmail;
         userEmailContainer.className = "list-members-email"
 
         let userTextCotainer = document.createElement('div');
         userTextCotainer.className = "list-members-text";
 
 
         // To be edited
         let startChatHolder = document.createElement('div');
          startChatHolder.innerText = 'PLUS';
          startChatHolder.className = "start-chat-plus";
          startChatHolder.style.display= "none"
 
 
             startChatHolder.addEventListener("click",()=> {
                 let groupMembers1on1 = [me, element.id]; 
                 let groupMembersNames  = [name, element.name]
                
                 let groupObjectData = {
                     members: groupMembers1on1,
                     membersNames: groupMembersNames
                 }
 
                 createPersonGroup(groupObjectData)
                
 
 
             })
 
 
 
 
 
             userTextCotainer.appendChild(nameContainer);
             userTextCotainer.appendChild(userEmailContainer)
             container.appendChild(profileImgContainer);
             container.appendChild(statusContainer);
             container.appendChild(userTextCotainer);
             container.appendChild(startChatHolder);
 
         
 
         document.getElementById('list-group-members').appendChild(container);

             var groupMemberQueriesList = firebase.firestore().collection('users').doc(id);

             

             groupMemberQueriesList.onSnapshot(function(doc) {
                let newStatus =  "Available";
                   
               
           
                let imgUrl = "test.png";
                
                let myStatusColor = 'orange';
                if(newStatus === "Available"){
                    myStatusColor  = "green";
                } else if (newStatus ==="Busy"){
                    myStatusColor = "orange";
                } else if (newStatus=== "Away"){
                    myStatusColor = 'red';
                }
                statusContainer.style.backgroundColor = myStatusColor;

                imgTag.setAttribute("src", imgUrl);



             });









     })
    
 
 
 }

function openCommandsView(){
    document.getElementById('header').style.display = "none";
    document.getElementById('messages-container').style.display = "none";
    document.getElementById('input-container').style.display = "none";
    document.getElementById('find-commands-wrapper').style.display = "block";
}

function closeCommandsView(){
    document.getElementById('header').style.display = "flex";
    document.getElementById('messages-container').style.display = "block";
    document.getElementById('input-container').style.display = "flex";
    document.getElementById('find-commands-wrapper').style.display = "none";
   clearDiv( document.getElementById('find-commands-container'));
        document.getElementById('fadeout').style.display = "block";
        document.getElementById('find-commands-container').style.height= "600px";
}

function saveGroupInfoChanges (){
    let newGroupName = document.getElementById('group-stats-name').innerText;
    let newGroupDescription = document.getElementById('group-stats-description').innerText;


  

    firebase.firestore().collection("groups").doc(groupIdentif.slice(1)).update({
        groupName: newGroupName,
        groupDescription: newGroupDescription
    })
}

function convertLocalTimeToFirebaseTime(time){
    let firestoreTime = firebase.firestore.Timestamp.fromDate(time);
    

    return firestoreTime;
}

function updateFirebaseMeetingTime (messageId,meetTime){

    let content;
    let type;
    let messageSenderId;
    let messageSaved;
    let messageTimestamp;
    firebase.firestore().collection('groups').doc(groupIdentif.slice(1)).collection('messages').doc(messageId).get().then(function(doc){
         content = doc.data().messageContent.meetingDesc;
         type = doc.data().messageType;
         messageSenderId = doc.data().messageSenderId;
         messageSaved = doc.data().messageSaved;
         messageTimestamp = doc.data().messageTimestamp;

    }).then(function() {firebase.firestore().collection('groups').doc(groupIdentif.slice(1)).collection('messages').doc(messageId).set({

        messageType : type,
        messageContent: {
            meetingDesc: content, 
            time: meetTime
        },
        messageTimestamp,
        messageSenderId,
        messageSaved
        
    })
})
}

function updateMeetingDescription(messageId,meetDesc){

    let timeSetFor;
    let type;
    let messageSenderId;
    let messageSaved;
    let messageTimestamp;
    firebase.firestore().collection('groups').doc(groupIdentif.slice(1)).collection('messages').doc(messageId).get().then(function(doc){
         timeSetFor = doc.data().messageContent.time;
         type = doc.data().messageType;
         messageSenderId = doc.data().messageSenderId;
         messageSaved = doc.data().messageSaved;
         messageTimestamp = doc.data().messageTimestamp;

    }).then(function() {firebase.firestore().collection('groups').doc(groupIdentif.slice(1)).collection('messages').doc(messageId).set({

        messageType : type,
        messageContent: {
            meetingDesc: meetDesc, 
            time: timeSetFor
        },
        messageTimestamp,
        messageSenderId,
        messageSaved
        
    })
})




}

function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}

function renderTextSearch(message, keywords){
    
 
    
    let content = message.messageContent; 
    let timestamp = message.messageTimestamp;
    let name = message.messageSenderName;
    let senderId = message.messageSenderId;
    let edit = message.messageEdit;
    
  
    let nameColor= 'red'; 
   
        if(me===senderId){
             name = "Me"
         nameColor = 'blue'

        }



    






    let nameHolder = document.createElement('div');
     nameHolder.innerText = name;
     nameHolder.style.color = nameColor;
     nameHolder.className = 'message-name-container'

   let timeHolder =  document.createElement('div');
    timeHolder.innerText = timestampToTime(timestamp)
    timeHolder.className = "message-time-holder";

   let messageHolder = document.createElement('div');
   
   

   




   messageHolder.innerHTML = findSearchHighlight(content, keywords);
   messageHolder.className = "message-holder";

   let box = document.createElement('div');

    let row1 = document.createElement('div');
    row1.className = "message-name-and-time";

    

  
   

   row1.appendChild(nameHolder);
   row1.appendChild(timeHolder);
   

   let editDiv = document.createElement('div');
   editDiv.innerHTML = `<span class="editted-message">${name}  editted this message</span>`

  
      
   
       box.appendChild(row1);
   






   box.appendChild(messageHolder);
    box.className = "message-container";

    box.addEventListener("mouseover", ()=> {
        timeHolder.style.visibility = "visible"
        box.style.backgroundColor = 'lightgrey';
       
    })
    box.addEventListener("mouseout", ()=> {
        timeHolder.style.visibility = "hidden";
        box.style.backgroundColor = 'transparent';
       
    })

    return box;

 
}

function findSearchHighlight(string, value){

    let arrayOfWords = string.split(" ");//[heyter,heybidbc] 
    newArrayOfWords =[]
    arrayOfWords.forEach(element => {
        if(element.includes(value)){
            newArrayOfWords.push(`<span class="search-key-word"> ${element}</span>`)
        } else {
            newArrayOfWords.push(element);
        }
    });
    let newString = newArrayOfWords.join(" ");
    return newString;

  
}

function renderDisplayFiles (array){
    array.forEach(element=> {
        // let container = renderFile(element);
        // document.getElementById('find-commands-container').appendChild(container);
        loadSavedFiles(document.getElementById('find-commands-container'))

    })
}