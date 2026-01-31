function reveal() {
  const choice = document.getElementById("choice").value;
  const box = document.getElementById("editBox");

  if (choice === "") {
    box.style.display = "block";
    box.innerHTML = "Choose something fast!! 🩸";
    return;
  }

  box.style.display = "block";
  box.innerHTML = `
    You selected <b>${choice}</b> ❌<br><br>
    <b>Wrong type.</b><br><br>
    <b>Too late…</b>
  `;

  // Fade to black
  setTimeout(() => {
    document.getElementById("fade").classList.add("show");
  }, 1500);

  // Show final screen + FORCE video play
  setTimeout(() => {
    document.getElementById("card").style.display = "none";
    document.getElementById("final").style.display = "flex";

    const video = document.getElementById("editVideo");

    // Reset and force play (IMPORTANT for mobile)
    video.currentTime = 0;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log("Video autoplay blocked:", error);
      });
    }

    // Start flying emojis
    startAnimation();
  }, 3500);
}

/* ============================= */
/* Flying hearts ❤️ and doves 🕊️ */
/* ============================= */

function createFlyingObject(type) {
  const container = document.getElementById("animationContainer");
  const emoji = document.createElement("div");

  emoji.style.position = "absolute";
  emoji.style.fontSize = `${20 + Math.random() * 15}px`;
  emoji.style.left = Math.random() * window.innerWidth + "px";
  emoji.style.bottom = "-40px";
  emoji.style.opacity = "1";
  emoji.style.pointerEvents = "none";

  emoji.innerHTML = type === "heart" ? "❤️" : "🕊️";

  container.appendChild(emoji);

  const duration = 2000 + Math.random() * 2000;
  const xMove = Math.random() * 120 - 60;
  const rotate = Math.random() * 360;

  emoji.style.transition = `transform ${duration}ms linear, opacity ${duration}ms linear`;

  setTimeout(() => {
    emoji.style.transform = `translateY(-420px) translateX(${xMove}px) rotate(${rotate}deg)`;
    emoji.style.opacity = "0";
  }, 50);

  setTimeout(() => emoji.remove(), duration + 100);
}

function startAnimation() {
  const interval = setInterval(() => {
    createFlyingObject("heart");
    createFlyingObject("dove");
  }, 300);

  setTimeout(() => clearInterval(interval), 5000);
}
