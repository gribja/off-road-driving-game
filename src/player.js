var R = 20;
var R_CONTACT = R * 1.25;
var MINIMUM_Y_VELOCITY = 4;
var MAXIMUM_Y_VELOCITY = 30;
var IMPACT_FRICTION = 0.5;
var G = -1;
var x = CANVAS_WIDTH * 0.25;
var y = CANVAS_HEIGTH * 0.75;
var vy = 0;
var normal = new Vec2(0, 1);
var a = new Vec2;
var b = new Vec2;
var yTouch = 0;
var angle = 0;
var targetAngle = 0;
var isAlive = false;
var isFlying = true;
var isJumping = true;
var distance = 0;
function initializePlayer() {
    y = CANVAS_HEIGTH - 60;
    vy = 0;
    normal.set(0, 1);
    angle = targetAngle = 0;
    isAlive = isFlying = isJumping = true;
    distance = 0;
}
function hasCollided(danger) {
    var a = danger.a, b = danger.b, a2 = danger.a2, b2 = danger.b2;
    return (a != -1 && y + R >= a && y - R < a + b) || (a2 != -1 && y + R >= a2 && y - R < a2 + b2);
}
function updatePlayer() {
    if (!isAlive)
        return;
    y += vy;
    vy += G;
    var col = getColumn(x + scrollAccel * 20);
    if (hasCollided(col.danger)) {
        isAlive = false;
        gameover();
    }
    var t = (colOffset + HALF_COLUMN_WIDTH) / COLUMN_WIDTH;
    a.set(t * COLUMN_WIDTH, yTouch = lerp(col.height, col.next.height, easeInOutQuad(t)));
    if (y - R_CONTACT < yTouch) {
        b.set((t + 0.05) * COLUMN_WIDTH, lerp(col.height, col.next.height, easeInOutQuad(t + 0.05)));
        normal.setNormal(a, b);
        if (isJumping)
            aa.play('hit');
        isFlying = isJumping = false;
        scrollAccel = clamp(scrollAccel + normal.x, -4, 2);
    }
    else
        isFlying = true;
    if (yTouch < 0)
        yTouch = 0;
    if (y - R < yTouch) {
        vy += (yTouch + R - y) * IMPACT_FRICTION;
        y = yTouch + R;
        if (vy > MAXIMUM_Y_VELOCITY * 0.5) {
            isJumping = true;
            aa.play('jmp');
        }
        if (vy > MAXIMUM_Y_VELOCITY) {
            vy = MAXIMUM_Y_VELOCITY;
        }
        else if (vy < 0) {
            vy *= -IMPACT_FRICTION;
        }
        // if (Math.abs(vy) < MINIMUM_Y_VELOCITY) {
        //     vy = 0
        // }
    }
    distance += 4 * T * (scrollSpeed + scrollAccel);
}
function formatDistance(distance) {
    return distance < 1000 ? Math.floor(distance) + " m" : (distance * 0.001).toFixed(1) + " km";
}
var wn = 0;
function paintPlayer(t) {
    if (!isAlive)
        return;
    if (isFlying)
        targetAngle -= Math.PI * 0.005;
    else
        targetAngle = Math.atan2(normal.y, normal.x) - Math.PI * 0.5;
    angle += clamp(targetAngle - angle, -Math.PI * 0.05, Math.PI * 0.05);
    canvas.save();
    canvas.translate(x + scrollAccel * 20, y + (vy < 0 ? vy - G : vy) * t);
    canvas.rotate(angle);
    // canvas.fillStyle = '#CDDC39'
    // canvas.fillRect(-30, -20, 60, 40)
    wn = (wn + 1) % 4;
    canvas.drawImage(carSprite, -33, isFlying ? -9 : -12);
    canvas.drawImage(wheelSprites[wn], -36, -21);
    canvas.drawImage(wheelSprites[wn + 1], 9, -21);
    canvas.restore();
    canvas.save();
    canvas.scale(1, -1);
    canvas.fillStyle = '#FFF';
    canvas.fillText("Distance: " + formatDistance(distance), CANVAS_WIDTH * 0.4, -CANVAS_HEIGTH * 0.94);
    canvas.restore();
}