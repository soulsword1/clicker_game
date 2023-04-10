import monsters from "./monsters.json" assert { type: "json" };

//Saving user details
const userDetails = JSON.parse(localStorage.getItem("userDetails"));

const spanScoreEl = document.querySelector(".score");
const spanLvllEl = document.querySelector(".lvl");
const spanCoinsEl = document.querySelector(".coins");
const monsterImgEl = document.querySelector(".monsterImg");
const bodyEl = document.querySelector("body");
const usernameSpanEl = document.querySelector(".username");
const announceEl = document.querySelector(".announce");
const announceBtnEl = document.querySelector(".announce_button");
const levelupImgEl = document.querySelector(".levelup_img");
const backdropEl = document.querySelector(".backdrop");

//Show username
const { username } = userDetails;
usernameSpanEl.textContent = username;
bodyEl.style.backgroundImage = `url("./images/drakedog_background.jpg")`;
bodyEl.style.backgroundPositionY = "-100px";
let clicks = 0;
let clicksLvlUp = 5;
let lvl = 1;
let coins = 0;
let maxLvl = 5;
let img = 0;

announceBtnEl.addEventListener("click", beginTheGame);
monsterImgEl.addEventListener("click", countClicks);

//Function to start game
function beginTheGame() {
  spanScoreEl.textContent = clicks;
  spanLvllEl.textContent = lvl;
  spanCoinsEl.textContent = coins;

  backdropEl.classList.add("hidden");
  monsterImgEl.classList.remove("hidden");
}

//Counting clicks
function countClicks() {
  clicks += 1;
  spanScoreEl.textContent = clicks;
  monsterImgEl.classList.add("slash");
  increaseLvlUpClicks();
  setTimeout(() => monsterImgEl.classList.remove("slash"), 150);
}

//Increasing amount of clicks if clicks have reached clicksLvlUp amount
function increaseLvlUpClicks() {
  if (clicks === clicksLvlUp) {
    lvl += 1;
    spanLvllEl.textContent = lvl;

    if (lvl !== maxLvl) {
      levelupImgEl.classList.add("hidden");
      levelupImgEl.classList.remove("levelup_img_appear");
      clicksLvlUp *= 2;
      changeImg();
      lvlUpNotification();
      return;
    }

    if (lvl === maxLvl) {
      checkLvlGetToMax();
      return;
    }
  }
}

//Checking if lvl reached max lvl in a game
function checkLvlGetToMax() {
  increaseAmountOfCoins();
  victoryNotification();
  const victoryUrl = "./images/victory.jpg";
  changeBackground(victoryUrl);
  monsterImgEl.removeEventListener("click", countClicks);
  monsterImgEl.classList.add("hidden");
}

//Changing monster image and background image
function changeImg() {
  img += 1;
  const imgUrl = monsters[img].url;
  const backgroundUrl = monsters[img].background_url;
  monsterImgEl.setAttribute("src", imgUrl);
  changeBackground(backgroundUrl);
  increaseAmountOfCoins();
}

//Changing background image
function changeBackground(background) {
  const backgroundUrl = `url("${background}")`;
  bodyEl.style.backgroundPositionY = "-100px";
  bodyEl.style.background = backgroundUrl;
  bodyEl.style.backgroundRepeat = "no-repeat";
  bodyEl.style.backgroundSize = "cover";
  console.log(bodyEl.style)
}

//Increasing amount of coins
function increaseAmountOfCoins() {
  const coinsForMonster = monsters[img - 1].coins;
  coins += coinsForMonster;
  spanCoinsEl.textContent = coins;
}

//Level up notification
function lvlUpNotification() {
  levelupImgEl.classList.remove("hidden");
  setTimeout(() => {
    levelupImgEl.classList.add("levelup_img_appear"), 500;
  });
}

//Victory notification
function victoryNotification() {
  announceBtnEl.removeEventListener("click", beginTheGame);
  announceBtnEl.addEventListener("click", playAgain);
  announceBtnEl.textContent = "Play again";
  backdropEl.classList.remove("hidden");
  announceEl.textContent = `I can't believe it ! Our hope, You, actually wasn't in vain.
  Our lands are no longer under the threat of attack by dark forces.
  I can't even find the words to thank you! Now we can live without fear for tomorrow. 
  From now on, you are a hero, ${username}, and your name will be sung in all legends.
  Also, don't forget to stop by our tavern for a free mug of ale.`;
}

//Function to start game again after victory
function playAgain() {
  clicks = 0;
  clicksLvlUp = 5;
  lvl = 1;
  coins = 0;
  img = 0;
  beginTheGame();
  const imgUrl = monsters[img].url;
  const backgroundUrl = monsters[img].background_url;
  monsterImgEl.setAttribute("src", imgUrl);
  changeBackground(backgroundUrl);
  monsterImgEl.addEventListener("click", countClicks);
}
