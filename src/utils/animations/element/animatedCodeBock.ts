/**
 * Injects animated code blocks into specific card divs,
 * hiding the original placeholder images.
 */

const CODE_BLOCKS: Record<string, string> = {
  'raise-funds':
    `<div id="radar-wrap" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:transparent;">
<svg id="radar-svg" viewBox="0 0 240 216" style="width:100%;height:auto;display:block;overflow:visible;max-width:350px;"></svg>
</div>
<script>
(function() {
  var LABELS = ["Trust","Recognition","Value","Memorability","Clarity","Consistency"];
  var N = 6;
  var CX = 120, CY = 108, R = 74;
  var ANGLES = Array.from({length:N},function(_,i){return (i*2*Math.PI)/N - Math.PI/2});
  var DATA_FINAL = [0.96, 0.89, 0.84, 0.8, 0.87, 0.93];
  var DRAW_MS = 1400;
  var BREATH = 0.038;
  var FONT = "'Instrument Sans', -apple-system, sans-serif";

  function easeOutBack(t) {
    var c = 1.70158;
    return 1 + (c+1)*Math.pow(t-1,3) + c*Math.pow(t-1,2);
  }

  var toPoints = function(data) { return data.map(function(v,i) { return [
    CX + R*v*Math.cos(ANGLES[i]),
    CY + R*v*Math.sin(ANGLES[i])
  ]; }); };

  var toPath = function(pts) { return pts.map(function(p,i) { return (i===0?'M':'L')+p[0].toFixed(2)+','+p[1].toFixed(2); }).join('') + 'Z'; };

  var hexPath = function(r) { return Array.from({length:N},function(_,i) { return (i===0?'M':'L')+(CX+r*Math.cos(ANGLES[i])).toFixed(2)+','+(CY+r*Math.sin(ANGLES[i])).toFixed(2); }).join('') + 'Z'; };

  var svg = document.getElementById('radar-svg');
  var ns = 'http://www.w3.org/2000/svg';

  function createEl(tag, attrs) {
    var el = document.createElementNS(ns, tag);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  }

  var style = document.createElement('style');
  style.textContent = "@import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap');";
  document.head.appendChild(style);

  [0.25, 0.5, 0.75, 1].forEach(function(l) {
    svg.appendChild(createEl('path', { d: hexPath(R*l), fill: 'none', stroke: 'rgba(0,0,0,0.07)', 'stroke-width': '0.8' }));
  });

  ANGLES.forEach(function(a) {
    svg.appendChild(createEl('line', { x1: CX, y1: CY, x2: (CX + R*Math.cos(a)).toFixed(2), y2: (CY + R*Math.sin(a)).toFixed(2), stroke: 'rgba(0,0,0,0.07)', 'stroke-width': '0.8' }));
  });

  var dataPath = createEl('path', { d: toPath(toPoints(DATA_FINAL.map(function(){return 0}))), fill: 'rgba(99,102,241,0.10)', stroke: 'rgb(99,102,241)', 'stroke-width': '1.8', 'stroke-linejoin': 'round' });
  svg.appendChild(dataPath);

  var dots = [];
  toPoints(DATA_FINAL.map(function(){return 0})).forEach(function(p) {
    var dot = createEl('circle', { cx: p[0].toFixed(2), cy: p[1].toFixed(2), r: '3.2', fill: 'rgb(99,102,241)' });
    svg.appendChild(dot);
    dots.push(dot);
  });

  LABELS.forEach(function(lbl, i) {
    var lr = R + 17;
    var lx = CX + lr * Math.cos(ANGLES[i]);
    var ly = CY + lr * Math.sin(ANGLES[i]);
    var text = createEl('text', { x: lx.toFixed(2), y: ly.toFixed(2), 'text-anchor': lx < CX-8 ? 'end' : lx > CX+8 ? 'start' : 'middle', 'dominant-baseline': ly < CY-8 ? 'auto' : ly > CY+8 ? 'hanging' : 'middle', 'font-size': '8.5', 'font-family': FONT, fill: 'rgba(0,0,0,0.38)', 'font-weight': '400' });
    text.textContent = lbl;
    svg.appendChild(text);
  });

  var start = 0;
  function tick(now) {
    if (!start) start = now;
    var elapsed = now - start;
    var data;
    if (elapsed < DRAW_MS) {
      var progress = easeOutBack(elapsed / DRAW_MS);
      data = DATA_FINAL.map(function(v) { return v * progress; });
    } else {
      var breathT = (elapsed - DRAW_MS) / 1000;
      var pulse = Math.sin(breathT * 0.6) * BREATH;
      data = DATA_FINAL.map(function(v) { return v + pulse; });
    }
    var pts = toPoints(data);
    dataPath.setAttribute('d', toPath(pts));
    pts.forEach(function(p, i) { dots[i].setAttribute('cx', p[0].toFixed(2)); dots[i].setAttribute('cy', p[1].toFixed(2)); });
    requestAnimationFrame(tick);
  }

  start = 0;
  requestAnimationFrame(tick);
})();
<` + `/script>`,

  'launch-strong':
    `<div id="launch-wrap" style="width:100%;max-width:350px;margin:0 auto;aspect-ratio:350/265;">
<canvas id="launch-canvas" style="width:100%;height:100%;display:block;"></canvas>
</div>
<script>
(function() {
  var BLOCKS = [
    {top:9.3,left:4.1,w:62,h:2.9,r:3},{top:9.3,left:76,w:20,h:13.6,r:4},
    {top:13.6,left:4.1,w:48,h:1.8,r:3},{top:17.1,left:4.1,w:32,h:1.8,r:3},
    {top:22.1,left:4.1,w:13,h:3.9,r:4},{top:34.3,left:4.1,w:27,h:15.7,r:4},
    {top:34.3,left:33,w:27,h:15.7,r:4},{top:34.3,left:62,w:27,h:15.7,r:4},
    {top:54.3,left:4.1,w:44,h:2.5,r:3},{top:54.3,left:58,w:38,h:12.1,r:4},
    {top:58.6,left:4.1,w:34,h:1.8,r:3},{top:62.1,left:4.1,w:38,h:1.8,r:3},
    {top:70.7,left:4.1,w:58,h:13.6,r:4},{top:77.1,left:76,w:20,h:2.5,r:3}
  ];
  var STOPS = [
    {x:10,y:23,color:[255,80,120]},{x:30,y:12,color:[255,160,50]},
    {x:82,y:14,color:[255,200,60]},{x:18,y:40,color:[80,200,220]},
    {x:48,y:42,color:[140,100,255]},{x:14,y:58,color:[255,120,80]},
    {x:16,y:76,color:[255,100,140]}
  ];
  var STOP_DURATION = 1200, BLUR_LIFETIME = 1000, CURSOR_EASE_MS = 500;

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  var canvas = document.getElementById('launch-canvas');
  var ctx = canvas.getContext('2d');
  var dpr = window.devicePixelRatio || 2;
  var W = 350, H = 265;
  canvas.width = W * dpr; canvas.height = H * dpr; ctx.scale(dpr, dpr);

  var PAD_X = 45, PAD_TOP = 20;
  var WF_W = W - PAD_X * 2, WF_H = H - PAD_TOP - 30;
  var WF_X = PAD_X, WF_Y = PAD_TOP;

  var startTime = 0;
  var cursorX = WF_X + (STOPS[0].x / 100) * WF_W;
  var cursorY = WF_Y + (STOPS[0].y / 100) * WF_H;
  var targetX = cursorX, targetY = cursorY;
  var moveStart = 0, blurs = [], lastStopIndex = 0, running = false;

  function tick(now) {
    if (!startTime) startTime = now;
    var elapsed = now - startTime;
    var stopIndex = Math.floor(elapsed / STOP_DURATION) % STOPS.length;
    var stop = STOPS[stopIndex];

    if (stopIndex !== lastStopIndex) {
      targetX = WF_X + (stop.x / 100) * WF_W;
      targetY = WF_Y + (stop.y / 100) * WF_H;
      moveStart = now;
      blurs.push({ x: targetX, y: targetY, r: stop.color[0], g: stop.color[1], b: stop.color[2], born: now });
      lastStopIndex = stopIndex;
    }

    var moveElapsed = now - moveStart;
    var moveT = Math.min(moveElapsed / CURSOR_EASE_MS, 1);
    var eased = easeOutCubic(moveT);
    var prevStop = STOPS[(stopIndex - 1 + STOPS.length) % STOPS.length];
    var fromX = WF_X + (prevStop.x / 100) * WF_W;
    var fromY = WF_Y + (prevStop.y / 100) * WF_H;
    cursorX = fromX + (targetX - fromX) * eased;
    cursorY = fromY + (targetY - fromY) * eased;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'hsla(0,0%,96%,1)';
    ctx.beginPath(); ctx.roundRect(WF_X, WF_Y, WF_W, WF_H, 10); ctx.fill();
    ctx.strokeStyle = 'hsla(0,0%,0%,0.05)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(WF_X + 0.5, WF_Y + 0.5, WF_W - 1, WF_H - 1, 10); ctx.stroke();

    for (var i = 0; i < 3; i++) {
      ctx.fillStyle = 'rgba(0,0,0,0.07)'; ctx.beginPath();
      ctx.arc(WF_X + 12 + i * 8, WF_Y + 10, 2.5, 0, Math.PI * 2); ctx.fill();
    }

    ctx.fillStyle = 'rgba(0,0,0,0.03)';
    ctx.fillRect(WF_X + 10, WF_Y + WF_H * 0.30, WF_W - 20, 1);

    for (var j = 0; j < BLOCKS.length; j++) {
      var b = BLOCKS[j];
      var bx = WF_X + (b.left / 100) * WF_W;
      var by = WF_Y + (b.top / 100) * WF_H;
      var bw = (b.w / 100) * WF_W;
      var bh = (b.h / 100) * WF_H;
      ctx.fillStyle = 'hsla(0,0%,0%,0.025)'; ctx.strokeStyle = 'hsla(0,0%,0%,0.03)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, b.r); ctx.fill(); ctx.stroke();
    }

    for (var k = blurs.length - 1; k >= 0; k--) {
      var blur = blurs[k];
      var age = now - blur.born;
      if (age > BLUR_LIFETIME) { blurs.splice(k, 1); continue; }
      var t = age / BLUR_LIFETIME;
      var scale = 0.3 + t * 1.5;
      var opacity = t < 0.3 ? (t / 0.3) * 0.6 : 0.6 * (1 - (t - 0.3) / 0.7);
      var radius = 18 * scale;
      var gradient = ctx.createRadialGradient(blur.x, blur.y, 0, blur.x, blur.y, radius);
      gradient.addColorStop(0, 'rgba(' + blur.r + ',' + blur.g + ',' + blur.b + ',' + opacity + ')');
      gradient.addColorStop(0.5, 'rgba(' + blur.r + ',' + blur.g + ',' + blur.b + ',' + (opacity * 0.4) + ')');
      gradient.addColorStop(1, 'rgba(' + blur.r + ',' + blur.g + ',' + blur.b + ',0)');
      ctx.fillStyle = gradient; ctx.beginPath();
      ctx.arc(blur.x, blur.y, radius, 0, Math.PI * 2); ctx.fill();
    }

    ctx.save(); ctx.translate(cursorX, cursorY);
    ctx.shadowColor = 'rgba(0,0,0,0.12)'; ctx.shadowBlur = 3; ctx.shadowOffsetY = 1;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(10, 5.7); ctx.lineTo(5.7, 7.1); ctx.lineTo(3.6, 11.4); ctx.closePath();
    ctx.fillStyle = 'rgba(83,104,235,0.75)'; ctx.fill();
    ctx.strokeStyle = 'white'; ctx.lineWidth = 1; ctx.stroke(); ctx.restore();

    requestAnimationFrame(tick);
  }

  running = true; startTime = 0; lastStopIndex = 0; blurs = [];
  requestAnimationFrame(tick);
})();
<` + `/script>`,

  'scale-fast':
    `<div id="retention-wrap" style="width:100%;max-width:350px;margin:0 auto;aspect-ratio:350/265;">
<svg id="retention-svg" viewBox="0 0 350 265" style="width:100%;height:auto;display:block;overflow:visible;"></svg>
</div>
<script>
(function() {
  var TARGET_PCT = 76, COUNT_MS = 1800, CIRCLE_DRAW_MS = 1600, BREATH = 0.012;
  var CX = 175, CY = 132.5, R = 58, ORBIT_R = 100, ORBIT_SPEED = 0.00025, STROKE = 6;
  var FILL_COLOR = 'hsla(232,79%,62%,1)', TRACK_COLOR = 'rgba(0,0,0,0.08)', TEXT_DIM = 'rgba(0,0,0,0.25)';
  var FONT = "'Instrument Sans',-apple-system,sans-serif";
  var circumference = 2 * Math.PI * R;
  var targetDash = (TARGET_PCT / 100) * circumference;

  var AVATARS = [
    { offset: -Math.PI/2, skin:'#c8a282', suit:'#2c3e50', tie:'#5368EB', hair:'#3d2b1f' },
    { offset: 0, skin:'#d4a574', suit:'#1a2634', tie:'#e74c3c', hair:'#1a1a2e' },
    { offset: Math.PI, skin:'#f0c8a0', suit:'#34495e', tie:'#2ecc71', hair:'#5c3a1e' },
    { offset: Math.PI/2, skin:'#c49a6c', suit:'#2c3e50', tie:'#f39c12', hair:'#2c1810' }
  ];

  function easeOutExpo(t) { return t===1 ? 1 : 1 - Math.pow(2, -10*t); }

  var style = document.createElement('style');
  style.textContent = "@import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap');";
  document.head.appendChild(style);

  var svg = document.getElementById('retention-svg');
  var ns = 'http://www.w3.org/2000/svg';

  function el(tag, attrs) {
    var e = document.createElementNS(ns, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  var defs = el('defs', {});
  var avClip = el('clipPath', { id: 'av-clip' });
  avClip.appendChild(el('circle', { cx: 0, cy: 0, r: 16 }));
  defs.appendChild(avClip);
  svg.appendChild(defs);

  svg.appendChild(el('circle', { cx:CX, cy:CY, r:ORBIT_R, fill:'none', stroke:'rgba(0,0,0,0.1)', 'stroke-width':'1.2', 'stroke-dasharray':'3 5' }));
  svg.appendChild(el('circle', { cx:CX, cy:CY, r:R, fill:'none', stroke:TRACK_COLOR, 'stroke-width':STROKE }));

  var fillCircle = el('circle', { cx:CX, cy:CY, r:R, fill:'none', stroke:FILL_COLOR, 'stroke-width':STROKE, 'stroke-linecap':'round', 'stroke-dasharray':'0 ' + circumference, transform:'rotate(-90 ' + CX + ' ' + CY + ')' });
  svg.appendChild(fillCircle);

  var pctText = el('text', { x:CX, y:CY-2, 'text-anchor':'middle', 'dominant-baseline':'middle', 'font-family':FONT, 'font-size':'32', 'font-weight':'600', fill:FILL_COLOR, 'letter-spacing':'-1.5' });
  pctText.textContent = '0%';
  svg.appendChild(pctText);

  var retLabel = el('text', { x:CX, y:CY+26, 'text-anchor':'middle', 'dominant-baseline':'middle', 'font-family':FONT, 'font-size':'10', 'font-weight':'500', fill:TEXT_DIM, 'letter-spacing':'2' });
  retLabel.textContent = 'RETENTION';
  svg.appendChild(retLabel);

  var avatarWrappers = [];
  AVATARS.forEach(function(av) {
    var initX = CX + ORBIT_R * Math.cos(av.offset);
    var initY = CY + ORBIT_R * Math.sin(av.offset);
    var wrapper = el('g', { transform: 'translate(' + initX + ',' + initY + ')' });
    var g = el('g', { 'clip-path': 'url(#av-clip)' });
    g.appendChild(el('circle', { cx:0, cy:0, r:16, fill:'#e8e0d8' }));
    g.appendChild(el('ellipse', { cx:0, cy:20, rx:14, ry:10, fill:av.suit }));
    g.appendChild(el('polygon', { points: '-4,12 0,16 4,12', fill: 'white' }));
    g.appendChild(el('polygon', { points: '-1.5,13 0,20 1.5,13', fill: av.tie }));
    g.appendChild(el('rect', { x:-3, y:6, width:6, height:7, rx:2, fill:av.skin }));
    g.appendChild(el('ellipse', { cx:0, cy:-1, rx:8, ry:9, fill:av.skin }));
    g.appendChild(el('ellipse', { cx:0, cy:-6, rx:8.5, ry:5, fill:av.hair }));
    g.appendChild(el('circle', { cx:-3, cy:-1, r:1, fill:'#1a1a2e' }));
    g.appendChild(el('circle', { cx:3, cy:-1, r:1, fill:'#1a1a2e' }));
    g.appendChild(el('circle', { cx:0, cy:0, r:16, fill:'none', stroke:'rgba(0,0,0,0.08)', 'stroke-width':'1.5' }));
    wrapper.appendChild(g);
    svg.appendChild(wrapper);
    avatarWrappers.push(wrapper);
  });

  var start = 0, running = false;
  function tick(now) {
    if (!start) start = now;
    var elapsed = now - start;
    var drawT = Math.min(elapsed / CIRCLE_DRAW_MS, 1);
    var easedDraw = easeOutExpo(drawT);
    var currentDash = targetDash * easedDraw;
    if (drawT >= 1) {
      var breathT = (elapsed - CIRCLE_DRAW_MS) / 1000;
      currentDash += Math.sin(breathT * 0.6 * Math.PI * 2) * BREATH * circumference;
    }
    fillCircle.setAttribute('stroke-dasharray', currentDash + ' ' + (circumference - currentDash));
    var countT = Math.min(elapsed / COUNT_MS, 1);
    pctText.textContent = Math.round(TARGET_PCT * easeOutExpo(countT)) + '%';
    var orbitAngle = elapsed * ORBIT_SPEED;
    AVATARS.forEach(function(av, i) {
      var a = av.offset + orbitAngle;
      var ax = CX + ORBIT_R * Math.cos(a);
      var ay = CY + ORBIT_R * Math.sin(a);
      avatarWrappers[i].setAttribute('transform', 'translate(' + ax.toFixed(2) + ',' + ay.toFixed(2) + ')');
    });
    requestAnimationFrame(tick);
  }

  running = true; start = 0;
  requestAnimationFrame(tick);
})();
<` + `/script>`,

  performance:
    `<div id="analytics-wrap" style="width:100%;max-width:350px;margin:0 auto;display:flex;align-items:center;justify-content:center;aspect-ratio:350/265;">
<svg id="analytics-svg" viewBox="0 0 296 203" style="width:296px;height:203px;display:block;overflow:visible;"></svg>
</div>
<script>
(function() {
  var DRAW_MS = 2000;
  var LINE_COLOR = 'hsla(232,79%,62%,1)';
  var LINE_DIM = 'hsla(232,79%,62%,0.2)';
  var RIPPLE_X = 130, RIPPLE_Y = 120;

  var MAIN = [[0,185],[30,178],[60,170],[100,145],[130,120],[140,105],[160,112],[185,100],[220,92],[260,82],[296,65]];
  var SEC = [[0,195],[30,190],[60,183],[100,170],[130,158],[160,148],[185,140],[220,132],[260,125],[296,118]];

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function getPartialPoints(pts, progress) {
    if (progress <= 0) return [pts[0]];
    if (progress >= 1) return pts;
    var totalLen = pts.length - 1;
    var exactIdx = progress * totalLen;
    var idx = Math.floor(exactIdx);
    var frac = exactIdx - idx;
    var result = pts.slice(0, idx + 1);
    if (idx < totalLen) {
      var x = pts[idx][0] + (pts[idx+1][0] - pts[idx][0]) * frac;
      var y = pts[idx][1] + (pts[idx+1][1] - pts[idx][1]) * frac;
      result.push([x, y]);
    }
    return result;
  }

  function toPolyline(pts) { return pts.map(function(p) { return p[0]+','+p[1]; }).join(' '); }

  function toAreaPath(pts, bottom) {
    if (pts.length < 2) return '';
    var d = 'M' + pts[0][0] + ',' + bottom;
    for (var i = 0; i < pts.length; i++) d += ' L' + pts[i][0] + ',' + pts[i][1];
    d += ' L' + pts[pts.length-1][0] + ',' + bottom + ' Z';
    return d;
  }

  var svg = document.getElementById('analytics-svg');
  var ns = 'http://www.w3.org/2000/svg';

  function el(tag, attrs) {
    var e = document.createElementNS(ns, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  var defs = el('defs', {});
  var grad = el('linearGradient', { id:'areaGrad', x1:'0', y1:'0', x2:'0', y2:'1' });
  grad.appendChild(el('stop', { offset:'0%', 'stop-color':'hsla(218,100%,78%,0.15)' }));
  grad.appendChild(el('stop', { offset:'100%', 'stop-color':'hsla(218,100%,78%,0)' }));
  defs.appendChild(grad);
  svg.appendChild(defs);

  var areaPath = el('path', { d:'', fill:'url(#areaGrad)' });
  svg.appendChild(areaPath);

  var secLine = el('polyline', { points: toPolyline([SEC[0]]), fill:'none', stroke:LINE_DIM, 'stroke-width':'2.5', 'stroke-linecap':'round', 'stroke-linejoin':'round' });
  svg.appendChild(secLine);

  var mainLine = el('polyline', { points: toPolyline([MAIN[0]]), fill:'none', stroke:LINE_COLOR, 'stroke-width':'3', 'stroke-linecap':'round', 'stroke-linejoin':'round' });
  svg.appendChild(mainLine);

  var ripples = [];
  for (var i = 0; i < 3; i++) {
    var rip = el('circle', { cx:RIPPLE_X, cy:RIPPLE_Y, r:'6', fill:'none', stroke:'hsla(232,79%,62%,0.18)', 'stroke-width':'1.5', opacity:'0' });
    svg.appendChild(rip);
    ripples.push(rip);
  }

  svg.appendChild(el('circle', { cx:RIPPLE_X, cy:RIPPLE_Y, r:'3.5', fill:'white', stroke:'hsla(232,79%,62%,0.25)', 'stroke-width':'2' }));

  var start = 0;
  function tick(now) {
    if (!start) start = now;
    var elapsed = now - start;
    var t = Math.min(elapsed / DRAW_MS, 1);
    var eased = easeOutCubic(t);

    var mainPts = getPartialPoints(MAIN, eased);
    var secPts = getPartialPoints(SEC, eased);
    mainLine.setAttribute('points', toPolyline(mainPts));
    secLine.setAttribute('points', toPolyline(secPts));
    areaPath.setAttribute('d', toAreaPath(mainPts, 203));

    var rippleProgress = Math.max(0, (eased - 0.4) / 0.6);
    if (rippleProgress > 0) {
      var pulse = ((elapsed - DRAW_MS * 0.4) % 3000) / 3000;
      var rs = [pulse, (pulse + 0.33) % 1, (pulse + 0.66) % 1];
      for (var ri = 0; ri < 3; ri++) {
        ripples[ri].setAttribute('r', 6 + rs[ri] * 30);
        ripples[ri].setAttribute('opacity', 0.25 * (1 - rs[ri]));
      }
    }

    if (t >= 1) {
      var breathT = (elapsed - DRAW_MS) / 1000;
      var offset = Math.sin(breathT * 0.5 * Math.PI * 2) * 2;
      var breathMain = MAIN.map(function(p) { return [p[0], p[1] + offset]; });
      var breathSec = SEC.map(function(p) { return [p[0], p[1] + offset * 0.5]; });
      mainLine.setAttribute('points', toPolyline(breathMain));
      secLine.setAttribute('points', toPolyline(breathSec));
      areaPath.setAttribute('d', toAreaPath(breathMain, 203));
    }

    requestAnimationFrame(tick);
  }

  start = 0;
  requestAnimationFrame(tick);
})();
<` + `/script>`,

  network:
    `<div id="network-wrap" style="width:100%;max-width:350px;margin:0 auto;aspect-ratio:350/265;">
<svg id="network-svg" viewBox="0 0 350 265" style="width:100%;height:auto;display:block;overflow:visible;"></svg>
</div>
<script>
(function() {
  var W=350, H=265, DRAW_MS=2000, NODE_POP_MS=300, BREATH=0.03;

  var NODES = [
    {x:100,y:75,r:12,isCenter:false},
    {x:255,y:65,r:12,isCenter:false},
    {x:70,y:145,r:9,isCenter:false},
    {x:175,y:135,r:18,isCenter:true},
    {x:255,y:135,r:11,isCenter:false},
    {x:130,y:205,r:10,isCenter:false},
    {x:260,y:215,r:12,isCenter:false}
  ];

  var EDGES = [
    [0,3],[1,3],[2,3],[4,3],[5,3],[6,3],
    [0,2],[0,5],[1,4],[4,6],[2,5],[5,6]
  ];

  var BG_NODE='hsla(216,8%,24%,1)';
  var BORDER_NODE='hsla(0,0%,100%,0.12)';
  var DOT_COLOR='hsla(0,0%,100%,0.3)';
  var DOT_CENTER='hsla(0,0%,100%,1)';
  var BORDER_CENTER='hsla(0,0%,100%,0.5)';

  function easeOutCubic(t) { return 1-Math.pow(1-t,3); }
  function easeOutBack(t) { var c=1.7; return 1+(c+1)*Math.pow(t-1,3)+c*Math.pow(t-1,2); }

  var svg = document.getElementById('network-svg');
  var ns = 'http://www.w3.org/2000/svg';

  function el(tag, attrs) {
    var e = document.createElementNS(ns, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  var glow = el('circle', { cx:NODES[3].x, cy:NODES[3].y, r:'25', fill:'white', opacity:'0' });
  svg.appendChild(glow);

  var lines = [];
  for (var i = 0; i < EDGES.length; i++) {
    var a = EDGES[i][0];
    var line = el('line', { x1:NODES[a].x, y1:NODES[a].y, x2:NODES[a].x, y2:NODES[a].y, stroke:'white', 'stroke-width':'1.2', opacity:'0' });
    svg.appendChild(line);
    lines.push(line);
  }

  var nodeGs = [];
  for (var j = 0; j < NODES.length; j++) {
    var node = NODES[j];
    var g = el('g', { transform:'translate('+node.x+','+node.y+') scale(0)' });
    g.appendChild(el('circle', { cx:0, cy:0, r:node.r, fill:BG_NODE, stroke: node.isCenter ? BORDER_CENTER : BORDER_NODE, 'stroke-width': node.isCenter ? '2' : '1.5' }));
    g.appendChild(el('circle', { cx:0, cy:0, r: node.isCenter ? 8 : node.r * 0.4, fill: node.isCenter ? DOT_CENTER : DOT_COLOR }));
    svg.appendChild(g);
    nodeGs.push(g);
  }

  var start = 0;
  function tick(now) {
    if (!start) start = now;
    var elapsed = now - start;

    for (var i = 0; i < EDGES.length; i++) {
      var a = EDGES[i][0], b = EDGES[i][1];
      var delay = i * 80;
      var t = Math.max(0, Math.min((elapsed - delay) / (DRAW_MS * 0.6), 1));
      var eased = easeOutCubic(t);
      lines[i].setAttribute('x2', NODES[a].x + (NODES[b].x - NODES[a].x) * eased);
      lines[i].setAttribute('y2', NODES[a].y + (NODES[b].y - NODES[a].y) * eased);
      lines[i].setAttribute('opacity', eased * 0.15);
    }

    for (var j = 0; j < NODES.length; j++) {
      var delay2 = 200 + j * 150;
      var t2 = Math.max(0, Math.min((elapsed - delay2) / NODE_POP_MS, 1));
      var eased2 = easeOutBack(t2);
      var scale = eased2;
      if (t2 >= 1) {
        var breathT = (elapsed - delay2 - NODE_POP_MS) / 1000;
        scale = 1 + Math.sin(breathT * 0.5 + j * 0.8) * BREATH;
      }
      nodeGs[j].setAttribute('transform', 'translate('+NODES[j].x+','+NODES[j].y+') scale('+scale+')');
    }

    var pulseT = (elapsed % 3000) / 3000;
    glow.setAttribute('r', 25 + pulseT * 15);
    glow.setAttribute('opacity', 0.06 * (1 - pulseT));

    requestAnimationFrame(tick);
  }

  start = 0;
  requestAnimationFrame(tick);
})();
<` + `/script>`,

  boost:
    `<div id="speed-wrap" style="width:100%;max-width:350px;margin:0 auto;aspect-ratio:350/265;">
<svg id="speed-svg" viewBox="0 0 350 265" style="width:100%;height:auto;display:block;overflow:visible;"></svg>
</div>
<script>
(function() {
  var W=350, H=265, CX=175, CY=155, R=95, NEEDLE_LEN=72;
  var ARC_START_DEG=150, ARC_SPAN=240;
  var NEEDLE_START_PCT=0.0, NEEDLE_END_PCT=0.72;
  var SWING_MS=1800, BREATH_DEG=1.2;
  var TICK_COUNT=40, MAJOR_EVERY=5;

  var BLUE='hsla(232,79%,62%,1)';
  var PINK='hsla(337,100%,54%,1)';
  var TICK_DIM='hsla(0,0%,0%,0.12)';

  function easeOutBack(t) { var c=1.5; return 1+(c+1)*Math.pow(t-1,3)+c*Math.pow(t-1,2); }
  function degToRad(d) { return d*Math.PI/180; }

  var svg = document.getElementById('speed-svg');
  var ns = 'http://www.w3.org/2000/svg';

  function el(tag, attrs) {
    var e = document.createElementNS(ns, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  var defs = el('defs', {});
  var sGrad = el('radialGradient', { id:'sGrad', cx:'40%', cy:'35%' });
  sGrad.appendChild(el('stop', { offset:'0%', 'stop-color':'hsla(0,0%,75%,1)' }));
  sGrad.appendChild(el('stop', { offset:'100%', 'stop-color':'hsla(0,0%,35%,1)' }));
  defs.appendChild(sGrad);
  var swGrad = el('radialGradient', { id:'sweepGrad', cx:'50%', cy:'50%', r:'50%' });
  swGrad.appendChild(el('stop', { offset:'0%', 'stop-color':'hsla(232,79%,62%,0.06)' }));
  swGrad.appendChild(el('stop', { offset:'100%', 'stop-color':'hsla(232,79%,62%,0.02)' }));
  defs.appendChild(swGrad);
  svg.appendChild(defs);

  var sweepPath = el('path', { d:'', fill:'url(#sweepGrad)' });
  svg.appendChild(sweepPath);

  for (var i = 0; i <= TICK_COUNT; i++) {
    var pct = i / TICK_COUNT;
    var angleDeg = ARC_START_DEG + pct * ARC_SPAN;
    var angleRad = degToRad(angleDeg);
    var isMajor = i % MAJOR_EVERY === 0;
    var outerR = R;
    var innerR = isMajor ? R - 16 : R - 8;
    svg.appendChild(el('line', {
      x1: CX + innerR * Math.cos(angleRad), y1: CY + innerR * Math.sin(angleRad),
      x2: CX + outerR * Math.cos(angleRad), y2: CY + outerR * Math.sin(angleRad),
      stroke: isMajor ? BLUE : TICK_DIM, 'stroke-width': isMajor ? '2.8' : '1', 'stroke-linecap': 'round'
    }));
  }

  var needleG = el('g', { transform: 'rotate(' + ARC_START_DEG + ' ' + CX + ' ' + CY + ')' });
  needleG.appendChild(el('line', { x1:CX, y1:CY, x2:CX+NEEDLE_LEN, y2:CY, stroke:PINK, 'stroke-width':'5', 'stroke-linecap':'round', opacity:'0.15' }));
  needleG.appendChild(el('line', { x1:CX+8, y1:CY, x2:CX+NEEDLE_LEN, y2:CY, stroke:PINK, 'stroke-width':'3', 'stroke-linecap':'round', opacity:'0.85' }));
  svg.appendChild(needleG);

  svg.appendChild(el('circle', { cx:CX, cy:CY, r:'14', fill:'url(#sGrad)' }));
  svg.appendChild(el('circle', { cx:CX-3, cy:CY-4, r:'5', fill:'hsla(0,0%,100%,0.2)' }));

  var start = 0;
  function tick(now) {
    if (!start) start = now;
    var elapsed = now - start;
    var t = Math.min(elapsed / SWING_MS, 1);
    var eased = easeOutBack(t);
    var needlePct = NEEDLE_START_PCT + (NEEDLE_END_PCT - NEEDLE_START_PCT) * eased;
    if (t >= 1) {
      var breathT = (elapsed - SWING_MS) / 1000;
      needlePct += (Math.sin(breathT * 0.5 * Math.PI * 2) * BREATH_DEG) / ARC_SPAN;
    }
    var needleDeg = ARC_START_DEG + needlePct * ARC_SPAN;
    needleG.setAttribute('transform', 'rotate(' + needleDeg + ' ' + CX + ' ' + CY + ')');

    var startRad = degToRad(ARC_START_DEG);
    var endRad = degToRad(needleDeg);
    var x1 = CX + R * Math.cos(startRad), y1 = CY + R * Math.sin(startRad);
    var x2 = CX + R * Math.cos(endRad), y2 = CY + R * Math.sin(endRad);
    var largeArc = needlePct * ARC_SPAN > 180 ? 1 : 0;
    sweepPath.setAttribute('d', 'M'+CX+','+CY+' L'+x1+','+y1+' A'+R+','+R+' 0 '+largeArc+' 1 '+x2+','+y2+' Z');

    requestAnimationFrame(tick);
  }

  start = 0;
  requestAnimationFrame(tick);
})();
<` + `/script>`,
};

/**
 * Injects HTML + script into a container div and hides its image.
 * Uses a Range to parse the HTML so that <script> tags execute properly.
 */
function injectBlock(container: HTMLElement, html: string): void {
  const img = container.querySelector<HTMLElement>('img');
  if (img) img.style.visibility = 'hidden';

  const wrapper = document.createElement('div');
  wrapper.style.width = '100%';
  wrapper.style.height = '100%';
  container.appendChild(wrapper);

  const range = document.createRange();
  range.selectNode(wrapper);
  const fragment = range.createContextualFragment(html);
  wrapper.appendChild(fragment);
}

export function animatedCodeBlocks(): void {
  const injected = new Set<string>();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const { target } = entry;
        const el = target as HTMLElement;
        const { id } = el;
        if (injected.has(id)) return;

        injected.add(id);
        observer.unobserve(el);
        injectBlock(el, CODE_BLOCKS[id]);
      });
    },
    { threshold: 0.3 }
  );

  for (const id of Object.keys(CODE_BLOCKS)) {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  }
}
