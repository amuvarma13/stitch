

document.getElementById('close-info-box').addEventListener("click", ()=> {
    document.getElementById('header').style.display = "block";
    document.getElementById('messages-container').style.display = "block";
    document.getElementById('input-container').style.display = "flex";
    document.getElementById('info-div-container').style.display = "none";
})
document.getElementById('close-info-box-me').addEventListener("click", ()=> {
    document.getElementById('header').style.display = "block";
    document.getElementById('messages-container').style.display = "block";
    document.getElementById('input-container').style.display = "flex";
    document.getElementById('info-div-container').style.display = "none";
    document.getElementById('close-info-box-me').style.display = "none";
    document.getElementById('my-info-container').style.display = "none";
})



document.getElementById('close-files-box').addEventListener("click", ()=> {
    document.getElementById('saved-files-container').style.display = "none";
})




document.getElementById('command-center-options').addEventListener("click", ()=> {
    
    if(selectedPeople.length ==1){
    }else if(selectedPeople.length ==2){
        let myGroups = [];
        let group;
        let theirGroups = [];
        let sharedGroups = [];
        let otherId = selectedPeople[1].userId;
        let bool = true;
        firebase.firestore().collection('users').doc(me).get().then(function(doc){
            
            myGroups = doc.data().userGroups;
        }).then(function(){
            firebase.firestore().collection('users').doc(otherId).get().then(function(doc){
                theirGroups = doc.data().userGroups;
            }).then(function(){
                 sharedGroups = myGroups.filter(value => theirGroups.includes(value))
            }).then(function(){
                sharedGroups.forEach(element=> {
                    firebase.firestore().collection('groups').doc(element.slice(1)).collection('members').get().then(function(col){
                        let c = 0;
                        col.forEach(doc=> {
                            c++;
                        })
                        
                        if(c== 2){
                            bool = false;
                           
                        }
                         group = element.slice(1);
                        })

                        })
                    }).then(function(){
                        
                        if(bool){
                            


                                

                                let groupNameFormer = [];
                                selectedPeople.forEach(element=> {
                                    groupNameFormer.push(element.userFirstName);
                                });
                                newGroupName = groupNameFormer.join(", ");



                                createNewGroupObject(newGroupName);



                        } else {
                            //navigate to the group 
                            firebase.firestore().collection('groups').doc(element.slice(1)).get().then(function(doc){
                                fadeOutSearch();
                                let adaptedName = doc.data().groupName;
                            
                                let testIfQueried = !queriedIds.includes(group);
                                //load this group
                                handleGroupClick(group, adaptedName, testIfQueried);


                                let sidebarElements_alt = document.getElementsByClassName("sidebar-holder");
        
                                for(var s = 0; s<sidebarElements_alt.length; s++){
                                   let holderEl = sidebarElements_alt[s];
                                   let cont = sidebarElements_alt[s];
                                  let  holderElId = holderEl.getAttribute("groupId");
                                
                                    if(holderElId === group){

                                        cont.style.backgroundColor = "#e5e5e5"
                                    } else{

                                        
                                        cont.style.backgroundColor = "transparent"
                                    }

                                }


                                
                                
                        
                        
                                   
                            })
                            
                        }
                        
                })
                
            
        })









    } else { 
        let newGroupName = 'New Group'

        let groupNameFormer = [];
        selectedPeople.forEach(element=> {
            groupNameFormer.push(element.userFirstName);
        });
        newGroupName = groupNameFormer.join(", ");
          createNewGroupObject(newGroupName);

    }
   


});

document.getElementById('save-group-info').addEventListener("click", ()=> {
    if(groupType === "many"){
        saveGroupInfoChanges();
    } else {
    }
    
})


// 
document.getElementById('header').addEventListener("click", ()=> {
    


    document.getElementById('search-whole-container').style.opacity = 1;

    clickOnHeader();
   

})

// 
document.getElementById('leave-group-info').addEventListener("click", ()=> {
    
    leaveGroup(groupIdentif.slice(1));

})






function returnManualMeet (){

  
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
    holder.setAttribute("class", 'create-a-task-contenteditable');
    holder.setAttribute("contenteditable", 'true');
    holder.setAttribute('data-text', "Enter Text here...");


    let dateAndTimeHolder = document.createElement('div');
    dateAndTimeHolder.className = "date-and-time-holder";


    let dateHolder = document.createElement('div');
    dateHolder.setAttribute("contenteditable", "true");
    dateHolder.setAttribute("data-text", "dd/mm");
    dateHolder.className= "add-meeting-date";

    let timeHolder = document.createElement('div');
    // timeHolder.innerText = "degdg"
    timeHolder.setAttribute("contenteditable", "true");
    timeHolder.setAttribute("data-text", "hh:mm");
    timeHolder.className= "add-meeting-time";
    

    dateAndTimeHolder.appendChild(dateHolder);
    dateAndTimeHolder.appendChild(timeHolder);







    container.addEventListener("keydown", (event)=> {
        if (event.keyCode === 13) {
        
            event.preventDefault();
            let taskValue = holder.innerText;
            let date = dateHolder.innerText;
            let time = timeHolder.innerText;
            if (taskValue.length>0){
                let meetObject = {
                        meetingDesc: taskValue,
                        timeDue: {
                            date,
                            time
                        }
                };
                handleSendMessage(meetObject, me);
            }
        }
    })
    

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


    

       




    container.appendChild(buttonsContainer);
    container.appendChild(holder);

    container.appendChild(dateAndTimeHolder);


    document.getElementById('list-meetings-container').appendChild(container);

    

    

 }

 document.getElementById('close-commands-view').addEventListener("click", ()=> {
     closeCommandsView();
     document.getElementById('close-commands-view').className = "close-commands-view"
 })
 

document.getElementById('search-whole-container').addEventListener("click", (e)=> {
   if( document.getElementById('command-center-container').contains(e.target)){
   } else {
    fadeOutSearch();
    
    
   }
})

document.getElementById('enter-stitch-skiptut').addEventListener("click", ()=> {
    document.getElementById('security-div-container').style.display = "none";
})






 function returnManualTask (){

  
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
    holder.setAttribute("class", 'create-a-task-contenteditable');
    holder.setAttribute("contenteditable", 'true');
    holder.setAttribute('data-text', "Enter Text here...");

    holder.addEventListener("keydown", (event)=> {
        if (event.keyCode === 13) {
        
            event.preventDefault();
            let taskValue = holder.innerText;
            if (taskValue.length>0){
                let taskValueWithPrefix = "/t " +taskValue;
                handleSendMessage(taskValueWithPrefix, me);
            }
        }
    })

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



       




    container.appendChild(buttonsContainer);
    container.appendChild(holder);
    document.getElementById('list-tasks-container').appendChild(container);

    

    

 }
function dismissSearchDiv(){
    document.getElementById('search-whole-container').style.display = "none";
  
}
 function fadeOutSearch (){
    document.getElementById('search-whole-container').className = "fade-out";
    setTimeout(dismissSearchDiv,450)
 }

 

 document.getElementById('search-bar-container').addEventListener("click", ()=> {

    document.getElementById('search-whole-container').style.display = "block";
    fadeIn();
})

function fadeIn (){
    document.getElementById('search-whole-container').className = "fade-in";
}

document.getElementById('send-message').addEventListener("focusout", ()=> {
    document.getElementById('send-message').style.height = "40px"
})