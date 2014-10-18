function Ball(){
	position.x;
	position.y;

	velocity.x;
	velocity.y

	var ballReady = false;
	var ballImage = new Image();
	ballImage.onload = function () {
		ballReady = true;
	};
	ballImage.src = "images/InvadingBall.png";
}