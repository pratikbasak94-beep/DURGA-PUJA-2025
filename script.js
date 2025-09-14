// --------- Countdown to Sasthi ---------
const countdownEl = document.getElementById('countdown');
const sasthiDate = new Date("October 12, 2025 00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = sasthiDate - now;

  if(distance > 0){
    const days = Math.floor(distance / (1000*60*60*24));
    const hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
    const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
    const seconds = Math.floor((distance % (1000*60)) / 1000);
    countdownEl.textContent = Countdown to Sasthi: ${days}d ${hours}h ${minutes}m ${seconds}s;
  } else {
    countdownEl.textContent = "Sasthi has arrived! Let the Durga Puja begin!";
    clearInterval(countdownInterval);
  }
}
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// --------- Durga Puja Dates ---------
const durgaDates = [
  { day: "Sasthi", date: "October 12, 2025" },
  { day: "Saptami", date: "October 13, 2025" },
  { day: "Ashtami", date: "October 14, 2025" },
  { day: "Navami", date: "October 15, 2025" },
  { day: "Dashami", date: "October 16, 2025" }
];

const datesContainer = document.getElementById('durgaDates');
let dateIndex = 0;

function showNextDate() {
  if(dateIndex < durgaDates.length){
    const dateEl = document.createElement('div');
    dateEl.classList.add('fade-in-up');
    dateEl.textContent = ${durgaDates[dateIndex].day} - ${durgaDates[dateIndex].date};
    datesContainer.appendChild(dateEl);
    setTimeout(() => { dateEl.style.opacity = 1; }, 100);
    dateIndex++;
    setTimeout(showNextDate, 2000);
  }
}
setTimeout(showNextDate, 2000);

// --------- Canvas Setup ---------
const canvasLights = document.getElementById('lights');
const canvasPetals = document.getElementById('petals');
const ctxLights = canvasLights.getContext('2d');
const ctxPetals = canvasPetals.getContext('2d');

let lights = [];
let petals = [];

function resizeCanvas() {
  canvasLights.width = window.innerWidth;
  canvasLights.height = window.innerHeight;
  canvasPetals.width = window.innerWidth;
  canvasPetals.height = window.innerHeight;
  initLights();
  initPetals();
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // initial call

// --------- Initialize Lights ---------
function initLights() {
  lights = [];
  for(let i=0; i<120; i++){
    lights.push({
      x: Math.random()*canvasLights.width,
      y: Math.random()*canvasLights.height,
      r: Math.random()*3 + 1,
      speedY: Math.random()*0.5 + 0.2,
      alpha: Math.random()
    });
  }
}

// --------- Initialize Petals ---------
function initPetals() {
  petals = [];
  for(let i=0; i<50; i++){
    petals.push({
      x: Math.random()*canvasPetals.width,
      y: Math.random()*canvasPetals.height,
      r: Math.random()*7 + 3,
      speedY: Math.random()*1 + 0.5,
      speedX: (Math.random()-0.5)*1.5
    });
  }
}

// --------- Animation Loop ---------
function animate() {
  // Lights
  ctxLights.clearRect(0,0,canvasLights.width, canvasLights.height);
  lights.forEach(l => {
    ctxLights.beginPath();
    ctxLights.arc(l.x, l.y, l.r, 0, Math.PI*2);
    ctxLights.fillStyle = rgba(255,255,255,${l.alpha});
    ctxLights.fill();
    l.y -= l.speedY;
    if(l.y < 0){ l.y = canvasLights.height; l.x = Math.random()*canvasLights.width; }
  });

  // Petals
  ctxPetals.clearRect(0,0,canvasPetals.width, canvasPetals.height);
  petals.forEach(p => {
    ctxPetals.beginPath();
    ctxPetals.fillStyle = rgba(255,192,203,0.7);
    ctxPetals.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctxPetals.fill();
    p.y += p.speedY;
    p.x += p.speedX;
    if(p.y > canvasPetals.height){ p.y = 0; p.x = Math.random()*canvasPetals.width; }
    if(p.x > canvasPetals.width){ p.x = 0; }
    if(p.x < 0){ p.x = canvasPetals.width; }
  });

  requestAnimationFrame(animate);
}

animate(); // start animation