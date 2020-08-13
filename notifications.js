const myNotification = new Notification('Title', {
    body: 'Lorem Ipsum Dolor Sit Amet'
  })
  
  myNotification.onclick = () => {
    console.log('Notification clicked')
  }


 function textNotification(message){

  console.log(message);
  let sender = message.messageSenderName; 
  let cont = message.messageContent;

  const myNotification = new Notification(sender, {
    body: cont, 
    icon: "test.png"
  })
  
  myNotification.onclick = () => {
    console.log('Notification clicked')
  }


 }


 

 function meetNotifcation(message){

  console.log(message);

  let sender = message.name; 

  let cont = `Meeting scheduled for 10:47`;

  const myNotification = new Notification("Click to add to calendar", {
    body: sender + "wants to schedule a meeting", 
    icon: "test.png"
  })
  
  myNotification.onclick = () => {
    let content = object.content;
  
    let dateFirebase = message.dateF;
    
   
    firebase.firestore().collection('users').doc(me).collection('calendar').add({ 
       
        content,
        timestamp:dateFirebase,
        type:"meet", 

    })
  }


 }


 function taskNotifcation(message){
  let pname =message.messageSenderName;
  let mcont = message.messageContent;

  console.log(message);

 



  const taskNotification = new Notification(pname + " " + "set you a task!", {
    body: mcont, 
    icon: "test.png"
  })
  
  taskNotification.onclick = () => {
    console.log('Notification clicked')
  }


 }

//  function shareNotification(share){
//    console.log(share);
//   let  link = share.messageContent;
//    let sender = share.messageSenderName;

//    const taskNotification = new Notification(sender + " " + "shared a file", {
//     body: "Click to view file", 
  
//   })
  

//  }