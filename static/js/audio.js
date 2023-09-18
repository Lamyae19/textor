
var start = document.querySelector('button[name="record"]');
var stop = document.querySelector('button[name="stop"]');
var audio = document.querySelector('#audio');

start.addEventListener('click', async () => {
    let stream = await navigator.mediaDevices.getUserMedia({audio: true, video: false});
    let mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();
    let chunks = [];

    mediaRecorder.ondataavailable = (e)=>{
        chunks.push(e.data);
    }
    //function to catch error
    mediaRecorder.onerror = (e)=>{
        alert(e.error);
    }

    mediaRecorder.onstop = (e)=>{
        let blod = new Blob(chunks);
        //create url for audio
        let url = URL.createObjectURL(blod);
        //pass url into audio tag
        audio.src = url;
        // Send the uploaded audio to the Flask server for processing
        sendAudioToServer(blod);
    }
    stop.addEventListener('click',()=>{
            mediaRecorder.stop();
    })
})

function uploadfile()
{
    var audioFileInput = document.getElementById("audiofile");
    if (audioFileInput.files.length > 0) {
        var audioFile = audioFileInput.files[0];
        var audioURL = URL.createObjectURL(audioFile);
        audio.src = audioURL;
        // Send the uploaded audio to the Flask server for processing
        sendAudioToServer(audioFile);
    } 
    else {
        audio.src = "";
    }
}
var index = 0

function sendAudioToServer(file)
{

    const formData = new FormData();
    formData.append('audio',file,"audioFile");



    fetch('/audioToText',{
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
}

