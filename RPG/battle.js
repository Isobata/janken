// プレイヤーと敵のオブジェクトを定義する
let player = {
	name: '勇者',
	health: 100,
	attack: 10,
};

class Enemy {
	constructor(name, maxHealth, damage) {
		this.name = name;
		this.maxHealth = maxHealth;
		this.health = maxHealth;
		this.damage = damage;
	}
	// 攻撃するメソッド
	attack(target) {
		const damage = this.damage;
		logMessage(`${this.name}の攻撃！ ${target.name}に${damage}のダメージ！`);
		target.health -= damage;
	}
}

// 新しい敵の種類「スライム」を追加する
const slime = new Enemy('スライム', 20, 5, 'fire');

// ステータスバーを更新する関数
function updateStatusBar() {
	document.getElementById('player-health').textContent = `HP: ${player.health}`;

	// 新しい敵の名前とHPを表示する
	document.getElementById('enemy-name').textContent = enemy.name;
	document.getElementById('enemy-health').textContent = `HP: ${enemy.health}/${enemy.maxHealth}`;

	// もしプレイヤーまたは敵のHPが0以下になったらバトル終了
	if (player.health <= 0) {
		logMessage(`${player.name}は倒れた！あなたの負けです。`);
		document.getElementById('attack-btn').disabled = true;
	} else if (enemy.health <= 0) {
		logMessage(`${enemy.name}は倒れた！あなたの勝ちです。`);
		document.getElementById('attack-btn').disabled = true;
	}
}

function playerAttack() {
	// プレイヤーが攻撃したときの処理
	player.attack(enemy);
	updateStatusBar();

	// 敵が攻撃する
	enemy.attack(player);
	updateStatusBar();
}

// バトルログにメッセージを追加する関数
function logMessage(message) {
	let log = document.getElementById('log');
	let li = document.createElement('li');
	li.textContent = message;
	log.appendChild(li);
}

// 攻撃を行う関数
function attack(attacker, defender) {
	let damage = attacker.attack;

	// ダメージを計算する
	if (Math.random() < 0.1) {  // 10%の確率でクリティカルヒット
		damage *= 2;
		logMessage(`${attacker.name}の攻撃！クリティカルヒット！`);
	} else {
		logMessage(`${attacker.name}の攻撃！`);
	}
	logMessage(`${defender.name}に${damage}のダメージ！`);

	// ダメージを適用する
	defender.health -= damage;

	// ステータスバーを更新する
	function updateStatusBar() {
		document.getElementById('player-health').textContent = `HP: ${player.health}`;
		document.getElementById('enemy-health').textContent = `HP: ${enemy.health}`;

		// もしプレイヤーまたは敵のHPが0以下になったらバトル終了
		if (player.health <= 0) {
			logMessage(`${player.name}は倒れた！あなたの負けです。`);
			document.getElementById('attack-btn').disabled = true;
		} else if (enemy.health <= 0) {
			logMessage(`${enemy.name}は倒れた！あなたの勝ちです。`);
			document.getElementById('attack-btn').disabled = true;
		}
	}

	// 攻撃ボタンをクリックしたときの処理
	document.getElementById('attack-btn').addEventListener('click', function () {
		// プレイヤーが攻撃する
		attack(player, enemy);
		// 敵が攻撃する
		if (enemy.health > 0) {
			attack(enemy, player);
		}

		// ステータスバーを更新する
		updateStatusBar();
	});
	class Player {
		constructor(name, maxHealth, damage) {
			this.name = name;
			this.maxHealth = maxHealth;
			this.health = maxHealth;
			this.damage = damage;
			this.level = 1;
			this.exp = 0;
		}

		// 攻撃するメソッド
		attack(target) {
			const damage = this.damage;
			logMessage(`${this.name}の攻撃！ ${target.name}に${damage}のダメージ！`);
			target.health -= damage;
		}

		// 経験値を獲得するメソッド
		gainExp(exp) {
			this.exp += exp;
			if (this.exp >= 100) {
				this.levelUp();
			}
		}

		// レベルアップするメソッド
		levelUp() {
			logMessage(`${this.name}はレベルアップした！`);
			this.level += 1;
			this.exp = 0;
			this.maxHealth += 10;
			this.damage += 5;
			this.health = this.maxHealth;
		}
	}

	// プレイヤーを作成する
	const player = new Player('勇者', 30, 10);

	// 敵をランダムに作成する関数
	function createRandomEnemy() {
		const enemies = [
			new Enemy('スライム', 20, 5, 'fire'),
			new Enemy('ゴブリン', 30, 8, 'wind'),
			new Enemy('ドラゴン', 50, 15, 'ice')
		];
		const randomIndex = Math.floor(Math.random() * enemies.length);
		return enemies[randomIndex];
	}
	let enemy = createRandomEnemy(); // 最初の敵をランダムに作成する

	// 初期状態でステータスバーを更新する
	updateStatusBar();

	document.getElementById('attack-btn').addEventListener('click', playerAttack);
}