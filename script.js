const ans = document.getElementById("ans");

function speak(text) {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "hi-IN";
  speechSynthesis.speak(u);
}

async function ask() {
  ans.innerText = "Jarvis सोच रहा है...";

  const q = document.getElementById("q").value;

  const res = await fetch("https://YOUR-BACKEND.onrender.com/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ q })
  });

  const data = await res.json();
  ans.innerText = data.a;
  speak(data.a);
}

function voice() {
  const r = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  r.lang = "hi-IN";
  r.onresult = e => {
    document.getElementById("q").value = e.results[0][0].transcript;
    ask();
  };
  r.start();
}
