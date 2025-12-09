// 定数（0:グー, 1:チョキ, 2:パー）
const HANDS = ["グー", "チョキ", "パー"];

// カウンタ
let winCount = 0;
let loseCount = 0;
let drawCount = 0;

// HTMLの要素を取得
const userHandLabel = document.getElementById("user-hand");
const cpuHandLabel = document.getElementById("cpu-hand");
const resultLabel = document.getElementById("result");
const statsText = document.getElementById("stats-text");

// 各ボタンにイベントを設定
const buttons = document.querySelectorAll(".buttons button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const userHand = Number(button.getAttribute("data-hand"));
    playJanken(userHand);
  });
});

// ジャンケン実行
function playJanken(userHand) {
  const cpuHand = Math.floor(Math.random() * 3); // 0〜2の乱数
  const result = judge(userHand, cpuHand);

  // カウント更新
  if (result === "win") winCount++;
  else if (result === "lose") loseCount++;
  else drawCount++;

  updateView(userHand, cpuHand, result);
}

// 勝敗判定
function judge(userHand, cpuHand) {
  if (userHand === cpuHand) return "draw";

  const userWin =
    (userHand === 0 && cpuHand === 1) ||
    (userHand === 1 && cpuHand === 2) ||
    (userHand === 2 && cpuHand === 0);

  return userWin ? "win" : "lose";
}

// 画面更新
function updateView(userHand, cpuHand, result) {
  userHandLabel.textContent = `あなたの手：${HANDS[userHand]}`;
  cpuHandLabel.textContent = `コンピュータの手：${HANDS[cpuHand]}`;

  if (result === "win") {
    resultLabel.textContent = "結果：あなたの勝ち！";
  } else if (result === "lose") {
    resultLabel.textContent = "結果：あなたの負け…";
  } else {
    resultLabel.textContent = "結果：引き分け";
  }

  statsText.textContent =
    `勝ち：${winCount}回　負け：${loseCount}回　引き分け：${drawCount}回`;
}
