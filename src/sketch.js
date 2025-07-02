let angulos = [];
let raios = [];
let velocidades = [];
let tamanhos = [];
let desvios = [];
const quantidadePontos = 150;

let folhas = [];
let som; 
function preload() {
  
  som = loadSound("Naruto_Musica.mp3");
}

function setup() {
  createCanvas(600, 600);

  for (let i = 0; i < quantidadePontos; i++) {
    angulos.push(random(TWO_PI));
    raios.push(random(10, 60));
    velocidades.push(random(0.1, 0.15));
    tamanhos.push(random(2, 8));
    desvios.push(random(TWO_PI));
  }

  for (let i = 0; i < 50; i++) {
    folhas.push({
      x: random(width),
      y: random(height - 10, height - 80),
      yBase: 0,
      velocidadeFolha: 0,
    });
    folhas[i].yBase = folhas[i].y;
  }
}

function draw() {
  background(10, 10, 30);

  fill(240, 240, 200);
  noStroke();
  ellipse(width - 100, 100, 80, 80);

  fill(10, 10, 30);
  ellipse(width - 80, 100, 80, 80);
  // -----------------------

  fill(30, 100, 30); // Chão
  rect(0, height - 100, width, 100);

  desenharArvore();

  for (let folha of folhas) {
    let distancia = dist(mouseX, mouseY, folha.x, folha.y);

    if (distancia < 80) {
      folha.velocidadeFolha = -2;
    } else {
      folha.velocidadeFolha += 0.1;
    }

    folha.y += folha.velocidadeFolha;

    if (folha.y > folha.yBase) {
      folha.y = folha.yBase;
      folha.velocidadeFolha = 0;
    }

    push();
    translate(folha.x, folha.y);
    fill(34, 139, 34);
    ellipse(0, 0, 18, 8);
    stroke(20, 100, 20);
    line(-6, 0, 6, 0);
    pop();
  }

  translate(mouseX, mouseY);
  for (let i = 0; i < quantidadePontos; i++) {
    angulos[i] += velocidades[i];
    let x = cos(angulos[i] + desvios[i]) * raios[i];
    let y = sin(angulos[i] + desvios[i]) * raios[i];

    fill(100, 200, 255, 180);
    noStroke();
    ellipse(x, y, tamanhos[i]);
  }

  fill(100, 200, 255, 150);
  noStroke();
  ellipse(0, 0, 40);
}

function desenharArvore() {
  push();
  translate(80, height - 100);

  fill(101, 67, 33);
  rect(-10, 0, 20, -80);

  fill(34, 139, 34);
  ellipse(0, -90, 80, 80);
  ellipse(-25, -70, 60, 60);
  ellipse(25, -70, 60, 60);

  pop();
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    if (!som.isPlaying()) {
      som.play();
    }
  }
}
