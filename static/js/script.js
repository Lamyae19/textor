//page Home


let slideIndex = 0;
showSlide(slideIndex);

function showSlide(index) {
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("dot");
  
  if (index >= slides.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = slides.length - 1;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  slides[slideIndex].style.display = "block";
  dots[slideIndex].classList.add("active");
}

function changeSlide(n) {
  showSlide(slideIndex += n);
}

function currentSlide(n) {
  showSlide(slideIndex = n - 1);
}

// Automatic slideshow
function autoSlide() {
  changeSlide(1);
  setTimeout(autoSlide, 3000); // Change slide every 3 seconds
}

autoSlide(); // Start the automatic slideshow
/*
var currentIndex = 0;
var imageElement = document.getElementById("myImage");

var imageSources = [
    "{{ url_for('static', filename='images/img2.png') }}",
    "{{ url_for('static', filename='images/img3.jpg') }}",
    "{{ url_for('static', filename='images/img1.png') }}"
];

function slider()
{
    if(currentIndex<imageSources.length)
    {
        currentIndex=currentIndex+1;
    }
    else
    {
        currentIndex=1;
    }
    console.log(myImage);
    myImage.src = imageSources[currentIndex-1];
}
setInterval(slider,2000);



//////////////////////////////////////////////////////////
mediaStreamObj = navigator.mediaDevices.getUserMedia({audio: true})

var start = document.getElementById('start');
var stop = document.getElementById('stop');
var audio = document.getElementById('audio');
var chunks = [];


function startRecording(){
start.addEventListener('click',(e)=>{
    let mediaRecorder = new MediaRecorder(mediaStreamObj);
    
	mediaRecorder.start();
	console.log(mediaRecorder.state);
});

mediaRecorder.ondataavailable = function(ev) {
	if (ev.data.size > 0 ){
		chunks.push(ev.data);
	}
};

mediaRecorder.onstop = (ev) =>{
	let blob = new Blob(chunks,{ 'type': 'audio/mp3' });
	chunks=[];
	let audioURL = window.URL.createObjectURL(blob);
	audio.src = audioURL;
};
function stopRecording(){
    stop.addEventListener('click',(e)=>{
        mediaRecorder.stop();
        console.log(mediaRecorder.state);
    });
}
}
function uploadAudio(){
document.addEventListener('DOMContentLoaded', (ev)=>{
    let form = document.getElementById('myform');
    let input = document.getElementById('capture');
    input.addEventListener('change', (ev)=>{
        if (input.files[0].type.indexOf("audio/")>-1){
            let audioURL = URL.createObjectURL(input.files[0]);
            document.getElementById('audio').src= window.audioURL;
        }else{
            alert('Please select an audio file.');
        }
    })
    
});
}

///////////////////////////////////////////////////////////////


navigator.mediaDevices.getUserMedia({audio: true})
.then(function(mediaStreamObj) {
	

let start = document.getElementById('start');
let stop = document.getElementById('stop');
var audio = document.getElementById('audio');
let mediaRecorder = new MediaRecorder(mediaStreamObj);
let chunks = [];

start.addEventListener('click',(e)=>{
	mediaRecorder.start();
	console.log(mediaRecorder.state);
});
stop.addEventListener('click',(e)=>{
	mediaRecorder.stop();
	console.log(mediaRecorder.state);
});
mediaRecorder.ondataavailable = function(ev) {
	if (ev.data.size > 0 ){                                                                                                                                                                                                                                 
		chunks.push(ev.data);
	}
};

mediaRecorder.onstop = (ev) =>{
	let blob = new Blob(chunks,{ 'type': 'audio/mp3' });
	chunks=[];
	let audioURL = window.URL.createObjectURL(blob);
	audio.src = audioURL;
};
})
.catch(function(err) {
	console.log(err.name,err.message);
});



const getValuesFromInputs = () =>{
    
    const audiofile = document.querySelector('input.audiofile').files[0];
 
    document.querySelector('form').style.display = 'none';
 
    return [audiofile];
 
 }
 const convertInputValues = () => {
    
    const audiofileURL = URL.createObjectURL(audiofile);
  
    return[audiofileURL]
  }

  const addInputToProfile = () => {

    const [audiofileURL]  = convertInputValues();

    document.querySelector('#audio').setAttribute('src', audiofileURL);

}
document.querySelector('button').addEventListener('click', (e) => {
    e.preventDefault();
    addInputToProfile();
  });

//////////////////////////////////////////////////////
*/

