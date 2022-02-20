var ball;  // ボールのオブジェクト
var x =  50; // ボールの位置のx
var y = 160; // ボールの位置のy
var dx = 5;  // 移動速度のx
var dy = 5;  // 移動速度のy
var ballSize = 10; // ボールの半径(固定)

var racketX = 200;  // バーの位置のx
var racketY = 400;    // バーの位置のy(固定)
var racketWidth = 50; // バーの幅(固定)

var wallTop    =  50; // 壁の上端のY座標(固定)
var wallBottom = 450; // 壁の底端のY座標(固定)
var wallRight  = 450; // 壁の右端のX座標(固定)
var wallLeft   =  50; // 壁の左端のX座標(固定)

var blockY    = 150; // ブロックのY座標(固定)
var blockSize =  10; // ブロックの厚さ(固定)
var numBlocks =   8; // ブロックの数は8個(固定)
var block     =  []; // ブロック用
var count     =   0; // ブロック数カウント用

var timeId; // タイマー実行制御用

window.onload = function() {
  ball = document.getElementById("ball");
  ball.style.visibility = "hidden"; 
  document.getElementById("start").onclick = function() {
    x = wallLeft + Math.floor(Math.random()*40)*5;
    y = blockY + ballSize + Math.floor(Math.random()*20)*5;
    ball.style.visibility="visible";
    count　= 0;
		for(i=0;i<8;i++)
		{
			block[i]=document.getElementById("block"+i);
			block[i].style.visibility="visible";
		}
    timeId = setTimeout(move, 0);
  }
  document.onmousemove = racket;
};

// ボール移動
function move() {
  // 50ミリ秒(0.05秒)後に、またmove関数を実行する
  timeId = setTimeout(move, 50);

  // ボールの位置座標を変化させる
  x = x+dx;
  y = y+dy;
  // 変化後の位置座標を反映
  ball.style.left = x;
  ball.style.top  = y;

  reflect();
  fall();
  erase();
}

// ボール跳ね返り
function reflect() {
  if (x <= wallLeft) { // 左壁に当たったとき
    dx = -dx;
  }
  if (x+10 >= wallRight) { // 右壁に当たったとき
    dx = -dx;
  }
  if (y <= wallTop) { // 上壁に当たったとき
    dy = -dy;
  }
	//if (y+10 >= wallBottom){ // 下壁に当たったとき
    //dy = -dy;
  //}

  if (racketX-ballSize <= x && x <= racketX+racketWidth) {  // バーにヒットしたとき
    if (y+ballSize == racketY) {
      dy=-dy;
    }
  }
}

// ラケット移動
function racket(event) {
  var bar = document.getElementById("bar");
  
  racketX = event.clientX-(racketWidth/2);
	
  if (racketX >= wallLeft && racketX+racketWidth <= wallRight){
    bar.style.left=racketX;
  }
}

function fall() {
  if (y+ballSize >= wallBottom) {
    clearTimeout(timeId);
    ball.style.visibility = "hidden";
    alert("Game over");
  }
}

///
// ブロック消滅
function erase() {
  for (var i = 0; i < numBlocks; i++) {
    block[i] = document.getElementById("block" + i);
    if (block[i].style.visibility != "hidden") {
      if (x >= 50+i*50) {
        if (x+ballSize <= 100+i*50) {
          if (y == blockY+blockSize || y+ballSize == blockY) {
            dy=-dy;
            block[i].style.visibility = "hidden";
            count++;
          }
        }
      }
    }
  }
  // ブロック完全消滅
  if (count == numBlocks) {
    clearTimeout(timeId);
    ball.style.visibility = "hidden";
    alert("Clear!");
  }
}
