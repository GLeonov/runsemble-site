(function () {
  function init() {
    var canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      canvas.style.opacity = '0.3';
      return;
    }

    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w, h;

    function resize() {
      var rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    // Brand colors
    var colors = [
      { r: 74, g: 115, b: 213 },   // accent blue
      { r: 125, g: 89, b: 210 },    // purple
      { r: 204, g: 77, b: 153 },    // pink
      { r: 40, g: 60, b: 140 }      // deep navy-blue
    ];

    // Fluid blobs
    var blobs = [];
    for (var i = 0; i < 4; i++) {
      blobs.push({
        x: 0.2 + Math.random() * 0.6,
        y: 0.2 + Math.random() * 0.6,
        vx: (Math.random() - 0.5) * 0.0003,
        vy: (Math.random() - 0.5) * 0.0003,
        radius: 0.15 + Math.random() * 0.12,
        color: colors[i % colors.length],
        phase: Math.random() * Math.PI * 2,
        morphSpeed: 0.0003 + Math.random() * 0.0002
      });
    }

    // Data particles
    var particles = [];
    var particleLabels = ['5K - 24:10', '5K - 30:20', '5K - 18:45', '10K - 45:20', '10K - 52:08', '10K - 1:02:30', 'HM - 1:45:12', 'HM - 2:05:33', 'HM - 1:32:08', 'M - 3:15:40', 'M - 4:02:18', 'M - 3:45:55', '5K - 27:45', '10K - 1:20:56', 'HM - 1:55:20'];
    for (var j = 0; j < 18; j++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vy: -0.15 - Math.random() * 0.25,
        vx: (Math.random() - 0.5) * 0.1,
        opacity: 0.06 + Math.random() * 0.14,
        label: particleLabels[j % particleLabels.length],
        size: 13 + Math.random() * 5,
        phase: Math.random() * Math.PI * 2
      });
    }

    var breathPhase = 0;

    function tick(ts) {
      ctx.clearRect(0, 0, w, h);
      breathPhase = ts * 0.001;

      // Global brightness oscillation (12s cycle)
      var breathAlpha = 0.55 + 0.15 * Math.sin(breathPhase * (Math.PI * 2 / 12));

      // Draw blobs
      for (var i = 0; i < blobs.length; i++) {
        var b = blobs[i];
        b.phase += b.morphSpeed;
        b.x += b.vx;
        b.y += b.vy;

        // Soft bounce
        if (b.x < 0.1 || b.x > 0.9) b.vx *= -1;
        if (b.y < 0.1 || b.y > 0.9) b.vy *= -1;

        var morphedRadius = b.radius * (1 + 0.15 * Math.sin(b.phase));
        var cx = b.x * w;
        var cy = b.y * h;
        var r = morphedRadius * Math.min(w, h);

        var grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0, 'rgba(' + b.color.r + ',' + b.color.g + ',' + b.color.b + ',' + (0.18 * breathAlpha) + ')');
        grad.addColorStop(0.5, 'rgba(' + b.color.r + ',' + b.color.g + ',' + b.color.b + ',' + (0.08 * breathAlpha) + ')');
        grad.addColorStop(1, 'rgba(' + b.color.r + ',' + b.color.g + ',' + b.color.b + ',0)');

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Draw particles
      ctx.font = '500 ' + 15 + 'px -apple-system, system-ui, sans-serif';
      ctx.textAlign = 'center';

      for (var k = 0; k < particles.length; k++) {
        var p = particles[k];
        p.y += p.vy;
        p.x += p.vx + Math.sin(breathPhase * 0.5 + p.phase) * 0.08;

        // Reset when off screen
        if (p.y < -30) {
          p.y = h + 20;
          p.x = Math.random() * w;
        }

        var pAlpha = p.opacity * breathAlpha;
        ctx.fillStyle = 'rgba(255,255,255,' + pAlpha + ')';
        ctx.fillText(p.label, p.x, p.y);
      }

      // Draw connecting lines between nearby particles
      ctx.strokeStyle = 'rgba(74,115,213,' + (0.04 * breathAlpha) + ')';
      ctx.lineWidth = 0.5;
      for (var m = 0; m < particles.length; m++) {
        for (var n = m + 1; n < particles.length; n++) {
          var dx = particles[m].x - particles[n].x;
          var dy = particles[m].y - particles[n].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            var lineAlpha = (1 - dist / 120) * 0.06 * breathAlpha;
            ctx.strokeStyle = 'rgba(74,115,213,' + lineAlpha + ')';
            ctx.beginPath();
            ctx.moveTo(particles[m].x, particles[m].y);
            ctx.lineTo(particles[n].x, particles[n].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
