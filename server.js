import express from "express";
import admin from "firebase-admin";

const app = express();

// 🔥 Firebase config (TEMP SIMPLE VERSION)
admin.initializeApp();
const db = admin.firestore();

// 🎲 RESULT
function getResult(){
  const arr=["LOW","HIGH","MID"];
  return arr[Math.floor(Math.random()*3)];
}

// 🎲 DICE
function getDice(r){
  if(r==="LOW") return {d1:1,d2:2};
  if(r==="HIGH") return {d1:6,d2:5};
  return {d1:3,d2:4};
}

// 🔁 LOOP
setInterval(async ()=>{

  const r = getResult();
  const d = getDice(r);

  await db.collection("gameRounds").doc("current").set({
    roundId: Date.now(),
    startTime: Date.now(),
    result: r,
    d1: d.d1,
    d2: d.d2
  });

  console.log("NEW ROUND");

},20000);

// 🌐 SERVER
app.get("/", (req,res)=>{
  res.send("Server running");
});

app.listen(10000, ()=>{
  console.log("Server started");
});
