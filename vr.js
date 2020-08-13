
console.log("vr initiation")
var SpeechRecognition = window.speechRecognition||window.webkitSpeechRecognition;
let voiceRecognitionCounter = 0;
const keywords = ['email', 'task', 'meet','meat','dire', 'cale', 'shar']
var recognition = new SpeechRecognition();
recognition.continuous= true;
recognition.start();
recognition.onresult = function(event){
    const current = event.resultIndex;
    let transcript = event.results[current][0].transcript;
    console.log(transcript);

        let bool = true;
        if(bool){
            console.log("processing transcript")
            console.log(transcript)
            processTranscript(transcript);

        }
    //check if stitch is enabled 
}
recognition.onend = function(){
    recognition.start();
}

function processTranscript(transcript){
    while(transcript.slice(0,1)=== " "){
        transcript = transcript.slice(1);
    };
    console.log('processing transcript')

    let splitTrans = transcript.split(" ");
    // identify tasks

    if(splitTrans[0]==="new" ||splitTrans[0]=== "set"  ||splitTrans[0]=== "you" ){
        console.log('processing slash')
        
        console.log(splitTrans[1]);
        console.log()
        //handle meetings and tasks 
        if(splitTrans[1].slice(0,4)==="task"  ||splitTrans[1].slice(0,4)==="meet"  ){
            console.log(splitTrans)
            splitTrans[0] = "/"
            splitTrans[1]=splitTrans[1].slice(0,4);
            splitTrans.splice(0, 1);
            let adapted = splitTrans.join(" ");
             let handleString = "/"+adapted;
             console.log('handling string')
             console.log(handleString)
             while(handleString.slice(0,1)=== " "){
                handleString = handleString.slice(1);
            };
            handleSendMessage(handleString, '2625624362');
        } else if (splitTrans[1].slice(0,5)==="share"  ||splitTrans[1].slice(0,5)==="point"){
            splitTrans[0] = "/"
            splitTrans[1]=splitTrans[1].slice(0,5);
            splitTrans.splice(0, 1);
            let adapted = splitTrans.join(" ");         
           let handleString = "/"+adapted;
            console.log(adapted);
            while(handleString.slice(0,1)=== " "){
                handleString = handleString.slice(1);
            };
            console.log(handleString);
           handleSendMessage(handleString, '2625624362');
        }


}
console.log(splitTrans[0]);
while(splitTrans[0].slice(0,1)=== " "){
    splitTrans[0] = splitTrans[0].slice(1);
};
if(splitTrans[0]=== "open" ||splitTrans[0]=== "find"){
   console.log(splitTrans[1].slice(0,4));
        //handle meetings and tasks 
            splitTrans[0] = "/"
            splitTrans[1]=splitTrans[1].slice(0,4);
            splitTrans.splice(0, 1);
            let adapted = splitTrans.join(" ");         

             let handleString = "!"+adapted;
             console.log(handleString)

             while(handleString.slice(0,1)=== " "){
                handleString = handleString.slice(1);
            };
            handleSendMessage(handleString, '2625624362');
        
}
if(splitTrans[0].slice(0,3)=== "clo"){
    console.log('cloding')
    console.log(transcript[1]);
        closeCommandsView();
        document.getElementById('caleander-holder').style.display = "none";

}

}