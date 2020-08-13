function renderText(message, id){
    

 
    
    let content = message.messageContent; 
    let timestamp = message.messageTimestamp;
    let name = message.messageSenderName;
    let senderId = message.messageSenderId;
    let edit = message.messageEdit;
    
  
    let nameColor= 'red'; 
   
        if(me===senderId){
             name = "Me"
         nameColor = 'blue';
        }

      
            textNotification(message);
        



    






    let nameHolder = document.createElement('div');
     nameHolder.innerText = name;
     nameHolder.style.color = nameColor;
     nameHolder.className = 'message-name-container'

   let timeHolder =  document.createElement('div');
    timeHolder.innerText = timestampToTime(timestamp)
    timeHolder.className = "message-time-holder";

   let messageHolder = document.createElement('div');
   messageHolder.addEventListener("click", ()=> {
    if(me===senderId||senderId === "$$repeat"+me){
        messageHolder.setAttribute("contenteditable", true);
    }
   })
   

   messageHolder.addEventListener("focusout", ()=>{
       let newText = messageHolder.innerText;
       if(content===newText){
       }else {
          
           updateMessageText(newText, id);
       }
      
   });




   messageHolder.innerHTML = content;
   messageHolder.className = "message-holder";

   let box = document.createElement('div');

    let row1 = document.createElement('div');
    row1.className = "message-name-and-time";

    let deleteMessage = document.createElement('div');
    deleteMessage.innerText ="DELETE";
    deleteMessage.className = "delete-message-icon";

    deleteMessage.addEventListener("click", ()=> {
        firebase.firestore().collection('groups').doc(groupIdentif.slice(1)).collection('messages').doc(id).set({
            deleteMessage: true,

        })
    })

   

   row1.appendChild(nameHolder);
   row1.appendChild(timeHolder);
   row1.appendChild(deleteMessage);

   let editDiv = document.createElement('div');
   editDiv.innerHTML = `<span class="editted-message">${name}  editted this message</span>`

  
       if(senderId.slice(0,8)==="$$repeat"){
          if(edit){
            let row1d = document.createElement('div');
            row1d.className = "message-name-and-time";
            row1d.appendChild(editDiv);
            row1d.appendChild(deleteMessage);
            box.appendChild(row1d);
            messageHolder.style.fontStyle = "italic";
          }
          box.appendChild(deleteMessage);
       }else {
           row1.appendChild(editDiv);
           
        box.appendChild(row1);
       }
   
   






   box.appendChild(messageHolder);
    box.className = "message-container";

    box.addEventListener("mouseover", ()=> {
        timeHolder.style.visibility = "visible"
        box.style.backgroundColor = 'lightgrey';
        deleteMessage.style.visibility = "visible"
    })
    box.addEventListener("mouseout", ()=> {
        timeHolder.style.visibility = "hidden";
        box.style.backgroundColor = 'transparent';
        deleteMessage.style.visibility = "hidden";
    })

    box.addEventListener("click",()=> {
        if(box.style.borderLeft == "none"){
            box.style.borderLeft = `solid ${nameColor} 2px`;
            // Execute function which saves this message

        // message.messageSaved = true;
            // saveMessage();


        } else {
            box.style.borderLeft = "none";
                // Execute function which unsaves this message

            // unsaveMessage();

        }
        
    } )


  





    var textQuery =  firebase.firestore().collection('groups').doc(groupIdentif.slice(1)).collection('messages').doc(id);

    textQuery.onSnapshot(function(doc) {
        
            let newContent = doc.data().messageContent
            messageHolder.innerText = newContent;

            let deleter = doc.data().deleteMessage;
            if(deleter){
            // messageHolder.innerHTML = "<em> This message has been deleted</em>"
            clearDiv(box);
            box.style.display = "none";
            }
        
    })
   return box;

}
function renderStitch(message){
    let box = document.createElement('div');
    let frame1 = document.createElement('div');
    let frame2 = document.createElement('div');
    let frame3 = document.createElement('div');

     frame1.className = 'stitch_frame';
     frame2.className = 'stitch_frame';
     frame3.className = 'stitch_frame';

    box.appendChild(frame1);
    box.appendChild(frame2);
    box.appendChild(frame3)

    box.className = "stitch_container"

   return box;

}

function renderMeeting(message){
  
    let content = message.messageContent.meetingDesc; 
    let meetingTime = message.messageContent.time;
    

            
    finalStringMeetingDue = getDateAndTimeObject(meetingTime).finalStringMeetingDue;
    finalStringTimeMeetDue = getDateAndTimeObject(meetingTime).finalStringTimeMeetDue;

    let notificationObject = {
        time: finalStringMeetingDue,
        date: finalStringTimeMeetDue, 
        name: message.messageSenderName,
        dateF: meetingTime
    }
   
    meetNotifcation(notificationObject);

    let senderName = message.messageSenderName;
    let senderId = message.senderId;


    if(!meetingTime){
        finalStringTimeMeetDue = "";
        finalStringMeetingDue = "";
    }
  
    let nameColor= 'red'; 
   
    if(me===senderId){
         name = "Me"
     nameColor = 'blue'

    }


let nameHolder = document.createElement('div');
 nameHolder.innerText = senderName;
 nameHolder.style.color = nameColor;
 nameHolder.className = 'message-name-container'

let timeHolder =  document.createElement('div');
timeHolder.innerText = "10:47"//timestampToTime(timestamp)
timeHolder.className = "message-time-holder";


let row1 = document.createElement('div');
row1.className = "message-name-and-time"

row1.appendChild(nameHolder)
row1.appendChild(timeHolder);


let row2 = document.createElement('div');

let messageDateAndTime = document.createElement('div');
messageDateAndTime.className = "message-date-and-time"


let messageDate = document.createElement('div');
let messageTime = document.createElement('div');

messageDate.innerText = finalStringMeetingDue;
messageTime.innerText = finalStringTimeMeetDue;

messageDateAndTime.appendChild(messageDate);
messageDateAndTime.appendChild(messageTime);


let contentHolder = document.createElement('div');
contentHolder.innerHTML = changeStringColorToRed(content);
// contentHolder.innerHTML = content;


row2.appendChild(contentHolder);








   


let mainBody = document.createElement('div');
// mainBody.appendChild(row1);
mainBody.appendChild(row2);

mainBody.className = "meeting-main-body"

  
   



   let box = document.createElement('div');
   box.className = "meet-container";

    box.appendChild(messageDateAndTime)
  box.appendChild(mainBody)


        box.addEventListener("mouseover", ()=> {
            timeHolder.style.visibility = "visible" 
        })

        box.addEventListener("mouseout", ()=> {
            timeHolder.style.visibility = "hidden" 
        })

   return box;

}

function renderTask(message, id){

    let content = message.messageContent; 
    let timestamp = message.messageTimestamp;

    let senderName = message.messageSenderName;
    let senderId = message.senderId;


    let nameColor= 'red'; 
   
    if(me===senderId){
         name = "Me"
     nameColor = 'blue'

    }

    taskNotifcation(message)


let nameHolder = document.createElement('div');
 nameHolder.innerText = senderName;
 nameHolder.style.color = nameColor;
 nameHolder.className = 'message-name-container'

let timeHolder =  document.createElement('div');
timeHolder.innerText = "10:47"//timestampToTime(timestamp)
timeHolder.className = "message-time-holder";


let row1 = document.createElement('div');
row1.className = "message-name-and-time"

row1.appendChild(nameHolder)
row1.appendChild(timeHolder);


let row2 = document.createElement('div');

let taskComplete = document.createElement('div');
taskComplete.className = "task-complete-marker";





let taskCompleteOrNot = document.createElement('div');
taskCompleteOrNot.appendChild(taskComplete)
taskCompleteOrNot.className = "task-complete-or-not"


taskComplete.addEventListener("click", ()=> {
    if(taskComplete.style.backgroundColor === "white"){
        taskComplete.style.backgroundColor = "#64C855";
        taskComplete.style.border = "none";
       
        firebase.firestore().collection('groups').doc(groupIdentif.slice(1)).collection('messages').doc(id).update({
            messageSaved: false
        })

    } else {
        taskComplete.style.backgroundColor = "white";
        taskComplete.style.border = "grey solid 0.5px";
        firebase.firestore().collection('groups').doc(groupIdentif.slice(1)).collection('messages').doc(id).update({
            messageSaved: true
        })


            //update firebase 

    }
})


let contentHolder = document.createElement('div');
contentHolder.innerHTML = changeStringColorToGreen (content);


row2.appendChild(contentHolder);












   


let mainBody = document.createElement('div');
// mainBody.appendChild(row1);
mainBody.appendChild(row2);

mainBody.className = "task-main-body"

  
   



   let box = document.createElement('div');
   box.className = "task-container";

    box.appendChild(taskCompleteOrNot)
  box.appendChild(mainBody)


        box.addEventListener("mouseover", ()=> {
            timeHolder.style.visibility = "visible" 
        })

        box.addEventListener("mouseout", ()=> {
            timeHolder.style.visibility = "hidden" 
        })

   return box;

}

function renderFile (message){
    
    let type = message.messageType;
    let title = message.messageFilename;
    let size = getMegabytes(message.messageFileSize).toFixed(2)+"  MB";
    let url = message.imageUrl;

    let documentType;
    if(type.slice(0,3)==="doc"){
        documentType = "Word Document"
    } else if(type ==="pdf"){
        documentType = "PDF"
    } else {
        documentType = type;
    }


    let titleDiv = document.createElement('div');
    
    titleDiv.className = "file-title";

    let bottomRowType = document.createElement('div');
  

    let typeDiv = document.createElement('div');
    typeDiv.innerText = documentType;

    let sizeDiv = document.createElement('div');
    sizeDiv.className  = "file-size"
    sizeDiv.innerText = size;

    let typeImg = document.createElement('div');
    typeImg.innerHTML = "<b> IC </b> "
    typeImg.className = "img-type-icon"

    bottomRowType.appendChild(typeImg)
    bottomRowType.appendChild(typeDiv)

    bottomRowType.className = "bottom-row-file"
    
   
    
    let firstColumn = document.createElement('div');
    firstColumn.appendChild(sizeDiv)
    firstColumn.appendChild(bottomRowType);
    



    let secondRow = document.createElement('div');
    secondRow.className = "file-second-row"




    let secondColumn = document.createElement('div');



    let filePreview = document.createElement('div');
 
   


    secondColumn.appendChild(filePreview);



    secondRow.appendChild(firstColumn);
    secondRow.appendChild(secondColumn);


    let box = document.createElement('div');
    box.appendChild(titleDiv);
    box.appendChild(secondRow);
    box.className = "file-inner-container"
    
    let spacer = document.createElement('div');
    spacer.className = "file-spacer";
    let container = document.createElement('div');
    


    let iconSave = document.createElement('div');
    iconSave.className = 'file-icon-save';
    iconSave.innerHTML = `<i class="fa fa-bookmark" aria-hidden="true"></i>`

    iconSave.addEventListener("click", ()=> {
        saveFile(message,url);
    })

    let iconUnsave = document.createElement('div');
    iconUnsave.className = 'file-icon-unsave';
    iconUnsave.innerHTML = `<i class="fa fa-bookmark-o" aria-hidden="true">`


    let saveIconHolder = document.createElement('div');
    saveIconHolder.appendChild(iconSave);
    saveIconHolder.appendChild(iconUnsave);

    iconSave.addEventListener('click', ()=> {
        iconSave.style.display = "none";
        iconUnsave.style.display = "block";
        // unsave message from firestore
    })
    iconUnsave.addEventListener('click', ()=> {
        iconSave.style.display = "block";
        iconUnsave.style.display = "none";
        // save message onto firestore
    })

    let iconDownload = document.createElement('div');
    iconDownload.className = 'file-icon-download';
    

    container.appendChild(iconDownload);
    


    
    container.appendChild(spacer);
    container.appendChild(saveIconHolder);
    
    container.appendChild(box);


    container.className = "file-container";
      titleDiv.innerHTML = `<a  href = '${url}' class = 'title-file'> ${title}</a>`;
      iconDownload.innerHTML = `<a class ="link" href = '${url}'> <i class="fa fa-cloud-download" aria-hidden="true"></i></a>`;
      titleDiv.addEventListener("click", ()=> {
          
      })

      if(type === "pdf"){
      let iframe = document.createElement('iframe')    
      iframe.setAttribute("src", url);
      iframe.className = "iframe-previewer"
      filePreview.appendChild(iframe);
      }
      if(type === "png" ||type === "jpg"){
        let img = document.createElement('img')    
        img.setAttribute("src", url);
        img.className = "iframe-previewer"
        filePreview.appendChild(img);
      } else if(type.slice(0,3) === "doc"){
          let img = document.createElement('img');
          img.setAttribute("src", "test.png");
          img.className = "iframe-previewer";
          filePreview.appendChild(img);
      } else if (type.slice(0,1)=== "x"){
        let img = document.createElement('img');
        img.setAttribute("src", "test.png");
        img.className = "iframe-previewer";
        filePreview.appendChild(img);
      }

      filePreview.className ="iframe-holder";
           



    
    






    
    return container;
 
    
}
function renderShare(message){

    let link = message.messageContent;
    let origin = "";
    if(link.includes("google")){
        origin = "<span style ='color:blue'> GOOGLE</span>"
    } else if (link.includes("sharepoint")){
        origin = "<span color = 'color:red'> MICROSOFT </span>"
    }

    let fileType = "<span style ='color:red'> please check your link again</span>";
    if(link.includes("spreadsheet")){
        fileType = "<span style ='color:green'> SHEET</span>"
    } else if(link.includes("slide")){
        fileType = "<span style ='color:yellow'> SLIDES</span>"
    }else if(link.includes("document")){
        fileType = "<span style ='color:blue'> DOC</span>";
    }
    


    let senderName = message.messageSenderName;

    let container = document.createElement('div');
    let nameDiv = document.createElement('div');
    let plusDiv = document.createElement('div');
    nameDiv.innerHTML = senderName.toUpperCase() + " " + "invites you to collaborate".toUpperCase();
    nameDiv.className = "share-invite"

    let sharedata = document.createElement('div');
    sharedata.className = "share-data-cont";



    sharedata.innerHTML = origin +" " + fileType;
    


    plusDiv.innerHTML = '<i class="fas fa-expand-alt"></i>';
    plusDiv.className = "share-expand-icon";
    let firstSection = document.createElement('div');
    firstSection.className = "share-main-body";
    firstSection.appendChild(nameDiv);
    firstSection.appendChild(sharedata);
    container.appendChild(firstSection);
    container.appendChild(plusDiv);
    container.className = "share-container";

    plusDiv.addEventListener("click", ()=>{
        openCommandsView();
        let frame = document.createElement('iframe');
        frame.className = "share-frame"
        frame.setAttribute("src", link);
        document.getElementById('find-commands-container').appendChild(frame);
        document.getElementById('fadeout').style.display = "none";
        document.getElementById('find-commands-container').style.height= "100vh";
        document.getElementById('close-commands-view').className = "close-commands-view-share";

    })
   
    return container;
  
}

function saveFile (filemessage,url){
    let fileName = filemessage.messageFilename;
    let fileType = filemessage.messageType;
    let fileSize = filemessage.messageFileSize;


    firebase.firestore().collection('users').doc(me).collection('savedFiles').add({ 
       
    
        fileName,
        fileType,
        fileSize,
        fileUrl: url

    })


}
function renderCode(message){
    let content = message.messageContent; 
    let timestamp = message.messageTimestamp;
    let name = message.messageSenderName;
    let senderId = message.messageSenderId
    
  
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
   messageHolder.innerText = content;
 
   messageHolder.className = "code-holder";

   let box = document.createElement('div');

    let row1 = document.createElement('div');
    row1.className = "message-name-and-time"

   row1.appendChild(nameHolder)
   row1.appendChild(timeHolder);


   if(senderId==="$$repeat"){

   } else{
    box.appendChild(row1);
   }






   box.appendChild(messageHolder);
    box.className = "message-container";

    box.addEventListener("mouseover", ()=> {
        timeHolder.style.visibility = "visible"
        box.style.backgroundColor = '#fafafa'
    })
    box.addEventListener("mouseout", ()=> {
        timeHolder.style.visibility = "hidden";
        box.style.backgroundColor = 'transparent'
    })

    box.addEventListener("click",()=> {
        if(box.style.borderLeft == "none"){
            box.style.borderLeft = `solid ${nameColor} 2px`;
            // Execute function which saves this message

        // message.messageSaved = true;
            saveMessage();


        } else {
            box.style.borderLeft = "none";
                // Execute function which unsaves this message

            unsaveMessage();

        }
        
    } )

   return box;

}

function renderEmail(message){
    console.log(message);
    console.log('render emial')
    let container = document.createElement('div');
    container.class = "email-container";

    let emailBody = message.messageContent.content;
    console.log(emailBody);
    let emailTitle = message.messageContent.title;
    console.log(emailTitle)
    let sender = message.messageSenderName;

    let topDiv = document.createElement('div');
    topDiv.className = "email-top-div";
    let midDiv = document.createElement('div');
    midDiv.className = "email-subject-div";
    let bodyDiv = document.createElement('div');
    bodyDiv.className = "email-body-div";

     topDiv.innerHTML = `${sender} SENT AN EMAIL`;
     midDiv.innerText = emailTitle;
     bodyDiv.innerText = emailBody;

    container.appendChild(topDiv);
    container.appendChild(midDiv);
    container.appendChild(bodyDiv);


    return container;
}
function renderPoll (message, id){
    
    let title = message.messageTitle;
    let options = message.messageContent.split(";");
    let votes = [];
    firebase.firestore().collection('groups').doc(groupIdentif.slice(1)).collection('messages').doc(id).collection('voters').get().then(function(coll){
       coll.forEach(document=> {
        
        let c = document.data();

        let vote = c.option;
        
        votes.push(vote);
       })
    
   }).then( function(){
       let titleDiv = document.createElement('div');
       titleDiv.innerText = title;
       let node = document.createElement('div');
       node.appendChild(titleDiv);
       let highlightCircles = [];
       let optionHolders = [];
    options.forEach(option=> {
        let container = document.createElement('div');
        let optionVotes = [];
        votes.forEach(vote=> {
          if(option===vote){
              optionVotes.push(vote)
          };
        })
          let novotes = optionVotes.length;
          let optionHolder = document.createElement('div');
          optionHolder.className = "option-poll-top-row";

          

        optionHolders.push(optionHolder);

          let optionTitle =document.createElement('div');
          optionTitle.innerText = option;
          let optionSelector = document.createElement('div');
          highlightCircles.push(optionSelector)
          optionSelector.className = "poll-choose-option-circle";
          optionHolder.addEventListener("click", addVote)
        function addVote (){
            removeOther();
            optionSelector.style.backgroundColor = "blue";
            let votes = voteNumber.innerText;
            voteNumber.innerText = parseInt(votes)+1;
            updateFirebaseVote()
            optionHolders.forEach(element=> {
                element.removeEventListener("click",addVote)
            })

        }

        function updateFirebaseVote(){
            firebase.firestore().collection('groups').doc(groupIdentif.slice(1)).collection('messages').doc(id).collection('voters').doc(me).update({
                option
            })


        }
          let voteRow = document.createElement('div');
          voteRow.className = "voteRow"
          let width = novotes*30;
            voteRow.style.width = width + "px";

          let voteNumber = document.createElement('div');
          voteNumber.innerText = novotes;
          let voteContainer = document.createElement('div');
          voteContainer.appendChild(voteRow);
          voteContainer.className = "vote-node-container"

            optionHolder.appendChild(optionTitle);
            optionHolder.appendChild(optionSelector);

          voteContainer.appendChild(voteNumber);
          container.appendChild(optionHolder)
          container.appendChild(voteContainer);
          container.className = "poll-option"

          node.appendChild(container);
       
        

         

        

    })

    function removeOther(){
        highlightCircles.forEach(circle=> {
            circle.style.backgroundColor = "transparent"
        })
    }
    
    }).then(function(node){
        // let node = document.createElement('div')
        // document.getElementById('messages-container').appendChild(node);
    })
    return document.createElement('div');
    
   
 

    

}

function renderEvent(message, id){

    let real = message.messageTitle;
    
    let container  = document.createElement('div');
    let datetimecont = document.createElement('div');
    let dateholder = document.createElement('div');
    let timeHolder = document.createElement('div');
    let calenderinputholder = document.createElement('div');
    let calenderinput = document.createElement('input');
    calenderinput.setAttribute("type", "datetime-local");

    calenderinput.addEventListener("change", ()=> {
        let date = calenderinput.value;
        var d = new Date(date);
        
       
        let val = isValidDate(d);
        if(val){
           fTime = new firebase.firestore.Timestamp.fromDate(d);

        }
        updateFirebaseEventTime (id,fTime);

    })


    let objectTempData = getDateAndTimeObject(message.messageContent);
    dateData = objectTempData.finalStringMeetingDue;
    timeData = objectTempData.finalStringTimeMeetDue;

   

    dateholder.innerText = dateData;
    timeHolder.innerText = timeData;


    let contentHolder = document.createElement('div');
    contentHolder.innerText = real;

    let addcont = document.createElement('div');
    let addbtn  = document.createElement('div');
    addbtn.innerText = "ADD EVENT";

    addcont.appendChild(addbtn);
    calenderinputholder.appendChild(calenderinput);
    datetimecont.appendChild(dateholder);
    datetimecont.appendChild(timeHolder);
    datetimecont.appendChild(calenderinputholder)
    container.appendChild(datetimecont);
    container.appendChild(contentHolder);
    container.appendChild(addcont);






    return container;


}

function updateFirebaseEventTime (messageId,meetTime){

    
    let messageSenderId;
    let messageSaved;
    let messageTimestamp;
    firebase.firestore().collection('groups').doc(groupIdentif.slice(1)).collection('messages').doc(messageId).get().then(function(doc){
         
         
         messageSenderId = doc.data().messageSenderId;
         messageSaved = doc.data().messageSaved;
         messageTimestamp = doc.data().messageTimestamp;

    }).then(function() {firebase.firestore().collection('groups').doc(groupIdentif.slice(1)).collection('messages').doc(messageId).set({

        messageType : "event",
        messageContent: meetTime,
        messageTimestamp,
        messageSenderId,
        messageSaved
        
    })
})
}

function makePoll(message, id){
    
}


function timestampToTime(timestamp) {
    return timestamp.toDate().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
}

function getMegabytes (bytes){
    return (bytes/(1048576));
}

function renderWebsite (message){
    let content = message.messageContent; 
    let timestamp = message.messageTimestamp;
    let name = message.messageSenderName;
    let senderId = message.messageSenderId
  
    let color= 'blue'; 
    groupMembers.forEach(member => {
        if(member.memberId===senderId){
         
            if(member.memberId===me){
            }else{
                color = member.color;
            }
   
        }
    })

    let nameColor = color.color || color;






    let nameHolder = document.createElement('div');
     nameHolder.innerText = name;
     nameHolder.style.color = nameColor;
     nameHolder.className = 'message-name-container'

   let timeHolder =  document.createElement('div');
    timeHolder.innerText = timestampToTime(timestamp)
    timeHolder.className = "message-time-holder";

   let messageHolder = document.createElement('div');
   messageHolder.innerHTML = content;
   messageHolder.className = "message-holder";

   let box = document.createElement('div');

    let row1 = document.createElement('div');
    row1.className = "message-name-and-time"

   row1.appendChild(nameHolder)
   row1.appendChild(timeHolder);


   if(senderId==="$$repeat"){

   } else{
    box.appendChild(row1);
   }


   let iframeContainer = document.createElement('div');
    iframeContainer.className = "website-iframe-style";
    // iframeContainer.innerHTML = `<iframe src="${content}" title="W3Schools Free Online Web Tutorials"></iframe>`
    iframeContainer.innerHTML = "<iframe src='https://www.w3schools.com' title='W3Schools Free Online Web Tutorials'> </iframe>"

    messageHolder.appendChild(iframeContainer);



   box.appendChild(messageHolder);
    box.className = "message-container";

    box.addEventListener("mouseover", ()=> {
        timeHolder.style.visibility = "visible"
        box.style.backgroundColor = 'lightgrey'
    })
    box.addEventListener("mouseout", ()=> {
        timeHolder.style.visibility = "hidden";
        box.style.backgroundColor = 'transparent'
    })

    box.addEventListener("click",()=> {
        if(box.style.borderLeft == "none"){
            box.style.borderLeft = `solid ${nameColor} 2px`;
            // Execute function which saves this message

        // message.messageSaved = true;
            saveMessage();


        } else {
            box.style.borderLeft = "none";
                // Execute function which unsaves this message

            unsaveMessage();

        }
        
    } )

   return box;

}


function changeStringColorToRed(string){
    let array = ['evening', 'morning', 'tomorrow', 'noon', "mon", 'tue', 'wed', 'thu', 'fri', 'sat', 'sun', 
'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    let arrayOfWords = string.split(" ");
    newArrayOfWords =[]
    arrayOfWords.forEach(element => {
        if(array.includes(element)|| element.split("").includes(":")){
            newArrayOfWords.push(`<span class="meet-key-word" onclick="openMeets()"> ${element}</span>`)
        } else if(array.forEach(word=> {
            element.includes(word)
        })){
            newArrayOfWords.push(`<span class="meet-key-word" onclick="openMeets()"> ${element}</span>`)

        } else {
            newArrayOfWords.push(element);
        }
    });
    let newString = newArrayOfWords.join(" ");
    return newString;

  
}

function changeStringColorToGreen(string){
    let array = ['evening', 'morning', 'tomorrow'];
    let arrayOfWords = string.split(" ");
    newArrayOfWords =[]
    arrayOfWords.forEach(element => {
        if(array.includes(element)|| element.split("").includes(":")){
            newArrayOfWords.push(`<span class="task-key-word" onclick="openTasks()"> ${element}</span>`)
        } else {
            newArrayOfWords.push(element);
        }
    });
    let newString = newArrayOfWords.join(" ");
    return newString;

  
}
function openTasks(){
 
}

function openMeets(){
  
}

function convertMonth(string){
    if(string==="Jan"){
        return "01"
    } else if(string ==="Feb"){
        return "02"
    }else if(string ==="Mar"){
        return "03"
    }else if(string ==="Apr"){
        return "04"
    }else if(string ==="May"){
        return "05"
    }else if(string ==="Jun"){
        return "06"
    }else if(string ==="Jul"){
        return "07"
    }else if(string ==="Aug"){
        return "08"
    }else if(string ==="Sep"){
        return "09"
    }else if(string ==="Oct"){
        return "10"
    }else if(string ==="Nov"){
        return "11"
    }else if(string ==="Dec"){
        return "12"
    } else {
        return "und";
    }
}

function getDateAndTimeObject(meetingTime){



var stringifiedDate = meetingTime.toDate();

stringifiedDate = stringifiedDate.toString();

let monthWord = stringifiedDate.slice(4,7);

let monthNum = convertMonth(monthWord)
let dayNum = stringifiedDate.slice(8,10)

let finalStringMeetingDue = monthNum +"/" +dayNum;

let stringifiedTime = stringifiedDate.slice(16)
let finalStringTimeMeetDue = stringifiedTime.slice(0,5);

    let object = {
         finalStringMeetingDue,
      finalStringTimeMeetDue
    }
    return object;
}


function updateMessageText(newText, id){
    let messageTimestamp;
    let messageSenderName;
    let messageSaved;
    let messageType;
    let messageSenderId;
    firebase.firestore().collection('groups').doc(groupIdentif.slice(1)).collection('messages').doc(id).get().then(function(doc){
        let d = doc.data();
        messageTimestamp = d.messageTimestamp;
        messageSenderName = d.messageSenderName;
        messageSaved = d.messageSaved;
        messageType = d.messageType;
        messageSenderId = d.messageSenderId;
    }).then(function(){
        firebase.firestore().collection('groups').doc(groupIdentif.slice(1)).collection('messages').doc(id).set({
            messageSenderName,
            messageSenderId,
            messageSaved,
            messageTimestamp,
            messageType,
            messageEdit: true,
            messageContent: newText

            })
    })
    
    
}


function renderAnnouncement(message){
    let mcontent = message.messageContent;
    let title = mcontent.title;


    let content = mcontent.content;
    content.className = "content-title"


    let container = document.createElement('div');
    let titleHolder = document.createElement('div');
    titleHolder.innerText = title;
    titleHolder.className = "announcement-title"

    let secondRow = document.createElement('div');
    secondRow.innerText = content;
    secondRow.className = "second-row-announce"

    container.appendChild(titleHolder);
    container.appendChild(secondRow);
    container.className = "announce-container"

    return container;

    
}

function renderPoint(message, id){

    let gi = groupIdentif.slice(1)
    
    let title  = message.messageTitle;


    let container = document.createElement('div');
    container.className = "point-container";


    ['dragenter', 'dragover', 'dragleave', 'drop', 'dragend'].forEach(eventName => {
        container.addEventListener(eventName, preventDefaultsPoint, false);
        })

        let containerCover = document.createElement('div');
        containerCover.className = "point-drop-indicator";
        containerCover.innerText = "DRAG AND DROP INTO SHAREPOINT";

        ['dragenter', 'dragover', 'dragleave', 'drop', 'dragend'].forEach(eventName => {
            containerCover.addEventListener(eventName, preventDefaultsPoint, false);
            })

        container.addEventListener("dragenter", ()=> {
            containerCover.style.display = "block";
        })
        
        containerCover.addEventListener("dragleave", ()=> {
            containerCover.style.display = "none";
        })
        containerCover.addEventListener("drop", ()=> {
            containerCover.style.display = "none";
        })
            
    
        container.appendChild(containerCover);
        
        function preventDefaultsPoint (e) {
        e.preventDefault()
        e.stopPropagation()
        }
        containerCover.addEventListener('drop', handleDropPoint);
        function handleDropPoint(e) {
            let dt = e.dataTransfer.files
            let thisFile= dt[0]   
            handlePointDrop(thisFile, id, gi)         
            }
    
            function handlePointDrop(file, id, gi)  {
      
                let filename = file.name;
                let size = file.size;
            
            
                let gI =  groupIdentif.slice(1);
                let refer = firebase.firestore().collection('groups').doc(gi).collection('messages').doc(id);
                  
                setMessageRefPoint(refer)
               function setMessageRefPoint (messageRef) {
                  // 2 - Upload the image to Cloud Storage.
                  var filePath = me + '/' + messageRef.id + '/' + filename;
                  return firebase.storage().ref(filePath).put(file).then(function(fileSnapshot) {
                    // 3 - Generate a public URL for the file.
                    return fileSnapshot.ref.getDownloadURL().then((url) => {
                      // 4 - Update the chat message placeholder with the image’s URL.
                      let downloadUrl = url;
                      let object = {
                          downloadUrl,
                          filename
                      }
                      return messageRef.update({
                        messageContent: firebase.firestore.FieldValue.arrayUnion(object)
                      });
                    });
                  });
                }
            }













    let pointTitle = document.createElement('div');
    pointTitle.className = "point-title-holder"

    pointTitle.innerText = title;
    let fileLister = document.createElement('div');
    fileLister.className = "file-lister-point"
    var pointQuery = firebase.firestore().collection('groups').doc(gi).collection('messages').doc(id);

    let max = document.createElement('div');
    max.innerText = "open/close";
    
    max.addEventListener("click", ()=> {
       if( fileLister.style.display ==="none"){
        fileLister.style.display ="block";
       } else {
        fileLister.style.display ="none";
       }
    })

    pointQuery.onSnapshot(function(doc){
        let files = doc.data().messageContent;
        
            files.forEach(file=> {
                let filename = file.filename;
                let fileUrl= file.downloadUrl;

                let object  = {
                    filename, 
                    fileUrl
                }

               
                renderFileInPoint(object);
            })

        function renderFileInPoint(object){
           
                
           
                let newNode =  createFileNode(object);
                newNode.className="indi-file-point"
                
                fileLister.appendChild(newNode)
        }
    
        
    })
    let firstRow= document.createElement('div');
    firstRow.className = "point-top-row"
    firstRow.appendChild(pointTitle);
    firstRow.appendChild(max)
    container.appendChild(firstRow);
    container.appendChild(fileLister)
    
    
    return container;
}


function createFileNode(fileObject){

    let nameF = fileObject.filename;
    let urlF = fileObject.fileUrl;

    let container = document.createElement('div');
    let nameCont = document.createElement('div');
    let linkCont = document.createElement('div');

    linkCont.innerHTML = "<a href = "+urlF+"> Download</a>"
    nameCont.innerHTML = nameF;

    container.appendChild(nameCont);
    container.appendChild(linkCont);
    
    return container;


}



