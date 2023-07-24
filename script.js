const songs = [
  { sName: "Cielo - Huma-Huma", sCover: "./1.jpg", sPath: "./1.mp3" },
  { sName: "Cielo - Huma-Huma-2", sCover: "./2.jpg", sPath: "./2.mp3" },
  {
    sName: "DEAF KEV - Invincible [NCS Release]-320k",
    sCover: "./3.jpg",
    sPath: "./3.mp3",
  },
  { sName: "Different Heaven & EH!DE", sCover: "./4.jpg", sPath: "./4.mp3" },
  { sName: "Janji-Heroes-Tonight-feat", sCover: "./5.jpg", sPath: "./5.mp3" },
  { sName: "Rabba - Salam-e-Ishq", sCover: "./6.jpg", sPath: "./6.mp3" },
  { sName: "Ham tere bina jeena", sCover: "./7.jpg", sPath: "./7.mp3" },
  { sName: "Hoke judda tujhse", sCover: "./8.jpg", sPath: "./8.mp3" },
  { sName: "Love to me for you", sCover: "./9.jpg", sPath: "./9.mp3" },
  { sName: "Na Jaana - Salam-e-Ishq", sCover: "./10.jpg", sPath: "./10.mp3" },
];

let i = 1;
let myAudio = new Audio(songs[0].sPath);

// insert songs item in songs container dynamically
let songsContainer = document.querySelector(".Songs");
songs.forEach((e) => {
  songsContainer.innerHTML += `  
    <li class="song">
        <img id="cover" src="${e.sCover}" alt="img">
        <p id="SongsName">${e.sName}</p>
        <p id="Songlength">5:25</p>
        <i class="${i} far fa-2x fa-play-circle playbtn"></i>
    </li>`;
  i++;
});
// myAudio.play();

// variable initilization

let playBtn = document.querySelectorAll(".playbtn");
let allSongs = document.querySelectorAll(".song");
let masterPlayBtn = document.querySelector("#masterPlayBtn");
i = 1;
/*=======================Previous Btn========================*/
document.getElementById("previous").addEventListener("click", () => {
  if (i > 1) i--;
  else i = songs.length;
  myAudio.src = `songs/${i}.mp3`;
  myAudio.play();
  masterPlayBtn.classList.replace(masterPlayBtn.classList[0], `${i}`);
  pauseAllPlay();
  masterPlayBtn.classList.replace("fa-pause-circle", "fa-play-circle");
  masterPlayBtnControl();
  document.querySelector("#SongNameMaster").innerHTML = songs[i - 1].sName;
});

/*=======================Next Btn========================*/
document.getElementById("next").addEventListener("click", () => {
  if (songs.length > i) i++;
  else i = 1;
  myAudio.src = `songs/${i}.mp3`;
  myAudio.play();
  masterPlayBtn.classList.replace(masterPlayBtn.classList[0], `${i}`);
  pauseAllPlay();
  masterPlayBtn.classList.replace("fa-pause-circle", "fa-play-circle");
  masterPlayBtnControl();
  document.querySelector("#SongNameMaster").innerHTML = songs[i - 1].sName;
});

function ChangeSong(This) {
  myAudio.src = `./songs/${parseInt(This.classList[0])}.mp3`;
}

function pauseAllPlay() {
  playBtn.forEach((e) => {
    e.classList.replace("fa-pause-circle", "fa-play-circle");
  });
}
/*======================= ========================*/

let PreviousPlaySong = 1;
function songItem() {
  document.querySelector("#SongNameMaster").innerHTML =
    songs[parseInt(this.classList[0]) - 1].sName;
  if (this.classList[3] === "fa-pause-circle") {
    myAudio.pause();
    this.classList.replace("fa-pause-circle", "fa-play-circle");
  } else {
    if (!(PreviousPlaySong === parseInt(this.classList[0]))) {
      PreviousPlaySong = parseInt(this.classList[0]);
      i = this.classList[0];
      myAudio.src = `./songs/${parseInt(this.classList[0])}.mp3`;
      pauseAllPlay();
      myAudio.play();
    } else {
      PreviousPlaySong = parseInt(this.classList[0]);
    }

    this.classList.replace("fa-play-circle", "fa-pause-circle");
    masterPlayBtn.classList.replace("fa-pause-circle", "fa-play-circle");
  }
  masterPlayBtn.classList.replace(
    masterPlayBtn.classList[0],
    `${PreviousPlaySong}`
  );
  masterPlayBtnControl();
}

playBtn.forEach((link) => {
  link.addEventListener("click", songItem);
});

/*=======================for play audio========================*/
function playAudio(i) {
  playBtn.forEach((e) => {
    if (e.classList[0] === i) {
      e.classList.replace("fa-play-circle", "fa-pause-circle");
    }
  });
}

/*=======================for pause audio========================*/
function pauseAudio(i) {
  playBtn.forEach((e) => {
    if (e.classList[0] === i) {
      e.classList.replace("fa-pause-circle", "fa-play-circle");
    }
  });
}
/*=======================Master Play Btn========================*/
masterPlayBtn.addEventListener("click", masterPlayBtnControl);
function masterPlayBtnControl() {
  if (masterPlayBtn.classList[3] === "fa-play-circle") {
    masterPlayBtn.classList.replace("fa-play-circle", "fa-pause-circle");
    myAudio.play();
    playAudio(masterPlayBtn.classList[0]);

    document.querySelectorAll(".GIF").forEach((e) => {
      e.classList.replace("op-0", "op-1");
    });
  } else {
    masterPlayBtn.classList.replace("fa-pause-circle", "fa-play-circle");
    myAudio.pause();
    pauseAudio(masterPlayBtn.classList[0]);

    document.querySelectorAll(".GIF").forEach((e) => {
      e.classList.replace("op-1", "op-0");
    });
  }
}

let ProgressBar = document.getElementById("ProgressBar");
/*=======================set progresBar value over audio current time========================*/
myAudio.addEventListener("timeupdate", () => {
  ProgressBar.value = parseInt((myAudio.currentTime / myAudio.duration) * 100);
});

/*=======================set audio current time over progresBar value========================*/
ProgressBar.addEventListener("change", () => {
  myAudio.currentTime = (ProgressBar.value * myAudio.duration) / 100;
});
