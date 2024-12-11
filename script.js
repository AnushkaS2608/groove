console.log("welcome");
//initialize the variable
let songIndex=0;
let audioelement=new Audio(`songs/${songIndex+1}.mpeg`);
let masterplay=document.getElementById('masterplay');
let progressbar=document.getElementById('progressbar');
let songitem=Array.from(document.getElementsByClassName('songItem'));
let Mastersong=document.getElementById("Mastersong");
let songitemplay=Array.from(document.getElementsByClassName('songitemplay'))
let songs=[
    
       { songName: "DEKHA TAINU", filepath: "songs/1.mpeg", coverpath: "songcover/song1.jpg"},
       { songName: "Tu Hai Toh", filepath: "songs/2.mpeg", coverpath: "songcover/song2.jpeg"},
       { songName: "Heeriye", filepath: "songs/3.mpeg", coverpath: "songcover/song3.jpg"},
       { songName: "Meherbani", filepath: "songs/4.mpeg", coverpath: "songcover/song4.jpg"},
       { songName: "Duniya Yeh Thodi Thodi", filepath:"songs/5.mpeg", coverpath: "songcover/song5.jpg"},
       { songName: "Maan Meri Jaan", filepath: "songs/6.mpeg", coverpath: "songcover/song6.jpg"},
       { songName: "Keseriya", filepath: "songs/7.mpeg", coverpath: "songcover/song7.jpg"},
       { songName: "Jaadui", filepath: "songs/8.mpeg", coverpath: "songcover/song8.jpg"},
       { songName: "Mast Magan", filepath: "songs/9.mpeg", coverpath: "songcover/song9.jpg"},
       { songName: "Sukoon Mila", filepath: "songs/10.mpeg", coverpath: "songcover/song10.jpg"},
    
]
let gif=document.getElementById('gif')

///handle master play
masterplay.addEventListener('click',()=>{
    if(audioelement.paused || audioelement.currentTime==0 ){
        audioelement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        updateSongPlayButtons(songIndex,true);
        gif.style.opacity=1;
        Mastersong.style.display='block';
    }
    else{
        audioelement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        updateSongPlayButtons(songIndex,false);
        gif.style.opacity=0;
    }

})

//listen to event
    
audioelement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    // update seek bar
 progress=parseInt((audioelement.currentTime/audioelement.duration)*100);
    progressbar.value=progress;

})
progressbar.addEventListener('change',()=>{
    audioelement.currentTime=progressbar.value*audioelement.duration/100;
    
})
songitem.forEach((element,i)=>{
    console.log(element,i);
    element.getElementsByTagName('img')[0].src=songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
});
const makeAllplay=()=>{
    songitemplay.forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
}
    )}
songitemplay.forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllplay();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
       audioelement.src=`songs/${songIndex+1}.mpeg`;
       console.log(`Audio source set to: songs/${songIndex + 1}.mpeg`);
       Mastersong.innerText=songs[songIndex].songName;
        audioelement.currentTime=0;
        audioelement.addEventListener('canplay', () => {
            audioelement.play();
        }, { once: true });
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
        Mastersong.style.display='block';
    })
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0)
         songIndex=0;
    else
        songIndex-=1;
        audioelement.src=`songs/${songIndex+1}.mpeg`;
        console.log(`Audio source set to: songs/${songIndex + 1}.mpeg`);
        Mastersong.innerText=songs[songIndex].songName;
         audioelement.currentTime=0;
        audioelement.play();
         masterplay.classList.remove('fa-circle-play');
         masterplay.classList.add('fa-circle-pause');
         gif.style.opacity=1;
         Mastersong.style.display='block';
})
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9)
         songIndex=0;
    else
        songIndex+=1;
        audioelement.src=`songs/${songIndex+1}.mpeg`;
        console.log(`Audio source set to: songs/${songIndex + 1}.mpeg`);
        Mastersong.innerText=songs[songIndex].songName;
         audioelement.currentTime=0;
              audioelement.play();
         
         masterplay.classList.remove('fa-circle-play');
         masterplay.classList.add('fa-circle-pause');
         gif.style.opacity=1;
         Mastersong.style.display='block';
})
const updateSongPlayButtons = (currentsong,isPlaying) => {
    songitemplay.forEach((element,index) => {
        if (index === currentsong) {
        if (isPlaying) {
            element.classList.remove('fa-circle-play');
            element.classList.add('fa-circle-pause');
        } else {
            element.classList.remove('fa-circle-pause');
            element.classList.add('fa-circle-play');
        }}
        else{
            element.classList.remove('fa-circle-pause');
            element.classList.add('fa-circle-play');
        }
    });
}