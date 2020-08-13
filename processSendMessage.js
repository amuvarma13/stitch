function createSendWebsite(string){
    let newMessage = {
        messageType : 'website',
        messageContent: string, 
        messageTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        messageSenderId: me,
        messageSaved: false
    }

    return newMessage;

}

function createSendMessage(string, lmseid){
 
    let newMessage;
if(lmseid===me||lmseid==="$$repeat"+me){
    newMessage = {
        messageType : 'text',
        messageContent: string, 
        messageTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        messageSenderId: "$$repeat"+me,
        messageSaved: false
    }
    } else {
        newMessage = {
            messageType : 'text',
            messageContent: string,
            messageTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
            messageSenderId: me,
            messageSaved: false
        }
    
}
  
    return newMessage;

}

function createSendCommand(string, lsd){
  if(string.slice(0,5)==='/task' || string.slice(0,2)==='/t'){
 
      return createSendTask(string);
  } else if(string.slice(0,5)==='/meet' || string.slice(0,2)==='/m'){
    return createSendMeet(string);
  } else if (string.slice(0,7)==='/remind' || string.slice(0,2)==='/r'){
      handleReminder(string);
      return createSendReminder(string);
  } else if(string.slice(0,5)==='/code' || string.slice(0,2)==='/c'){
    return createSendCode(string);
  }else if(string.slice(0,5)==='/poll'){
    return createSendPoll(string,lsd);
  }else if(string.slice(0,6)==='/share'){
    return createSendShare(string);
  }else if(string.slice(0,5)==='/busy'||string.slice(0,5)==='/away'||string.slice(0,10)==='/available'){
     
    
    return createSendStatus(string);
  }else if(string.slice(0,6)==='/event'){

    
    return createSendEvent(string);
  }else if(string.slice(0,9)==='/announce'){
    
  
  return createSendAnnouncement(string);
}else if(string.slice(0,6)==='/point'){
    
    return createSendPoint(string);
  }else if(string.slice(0,6)==='/email'){
    
    return createSendEmail(string);
  }
}

function createSendEmail(string){

    let content = string.slice(6);
    let subject = content.split(":")[0];
    let body = content.split(":")[1];

    //Send the email
   // sendEmail(state.userEmail, subject, body);


    let newEmail = {
        messageType : 'email',
        messageContent:{
            title: subject, 
            content: body
        }, 
        messageTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        messageSenderId: me,
        messageSaved: true
    }

    return newEmail;
}








function createSendTask (string){
    // get the actual content of the task 
    let content;
    if(string.slice(0,5)==='/task'){
        content = string.slice(5);
    } else {
        content = string.slice(2);
    }

    let newTask = {
        messageType : 'task',
        messageContent: content, 
        messageTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        messageSenderId: me,
        messageSaved: true
    }

    return newTask;
}

function createSendMeet (string){
    // get the actual content of the task 



    let content;
    let timeDue = null;

   


        if(string.slice(0,5)==='/meet'){
            content = string.slice(5);
        } else {
            content = string.slice(2);
        }
       
    let newMeet = {
        messageType : 'meet',
        messageContent: {
            meetingDesc: content, 
            time: firebase.firestore.Timestamp.fromDate(compileDate(string))
        },
        messageTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        messageSenderId: me,
        messageSaved: true
    }

    return newMeet;

}

function createSendShare(string){
    let content;


   


      
            content = string.slice(6);
       
       
    let newMeet = {
        messageType : 'share',
        messageContent: content,
        messageTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        messageSenderId: me,
        messageSaved: true
    }

    return newMeet;
}

function createSendEvent(string){
    // get the actual content of the task 
    let content;
    
        content = string.slice(6);
    

    let newEvent = {
        messageType : 'event',
        messageContent:firebase.firestore.Timestamp.fromDate(new Date()), 
        messageTitle: content,
        messageTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        messageSenderId: me,
        messageSaved: true
    }

    return newEvent;
}


function createSendPoll (string){
   
    
    let content;
    if(string.slice(0,5)==='/poll'){
        content = string.slice(5);
    } else {
        content = string.slice(2);
    }
    let polls = content.split(':');
    let pollTitle = polls[0];

    let pollOptions = polls[1].split(";");
    let people = [];
    

    let newPoll = {
        messageType : 'poll',
        messageContent: polls[1], 
        messageTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        messageSenderId: me,
        messageSaved: true, 
        messagePollOptions: pollOptions,
        messagePollPeople: people,
        messageTitle: pollTitle
    }

    return newPoll;
}

function createSendCode (string){
    // get the actual content of the task 
    let content;
    if(string.slice(0,5)==='/code'){
        content = string.slice(5);
    } else {
        content = string.slice(2);
    }
    
    let newMeet = {
        messageType : 'code',
        messageContent: content, 
        messageTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        messageSenderId: me,
        messageSaved: true
    }

    return newMeet;
}
function createSendStatus(string){



    firebase.firestore().collection('groups').doc(groupIdentif.slice(1)).update({
        groupStatus: string.slice(1)
    })
   let newMessage = {
        messageType : 'status',
        messageContent: string.slice(1),
        messageTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        messageSenderId: me,
        messageSaved: false
}
    return newMessage;
}

function createSendAnnouncement(string){
    let removePrefix = string.slice(9);
    let announceArray = removePrefix.split(":");
    let firstPart = announceArray[0];
    let secondPart = announceArray[1];
    
    newMessage = {
        messageType : 'announce',
        messageContent: {
            title: firstPart,
            content: secondPart
        },
        messageTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        messageSenderId: me,
        messageSaved: false
    }
    return newMessage;
}

function createSendPoint(string){
    let name = string.slice(6)

    newMessage = {
        messageType : 'point',
        messageTitle: name,
        messageContent:[],
        messageTimestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        messageSenderId: me,
        messageSaved: false
    }
    return newMessage;
}