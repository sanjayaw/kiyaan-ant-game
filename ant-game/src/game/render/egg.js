// Draws a single egg: a cream-colored oval nestled in the nest, with a
// tiny dot of the hatching caste's color so you can tell what's coming.

import { COLORS } from '../constants.js';

function casteDot(caste) {
  switch (caste) {
    case 'soldier': return COLORS.soldierBody;
    case 'nurse':   return COLORS.nurseBody;
    case 'forager': return COLORS.foragerBody;
    default:        return COLORS.workerBody;
  }
}

export function drawEgg(ctx, egg) {
  // Egg shadow
  ctx.fillStyle = COLORS.shadow;
  ctx.beginPath();
  ctx.ellipse(egg.x, egg.y + 1.5, 3.5, 1.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Egg body
  ctx.fillStyle = COLORS.eggShellDark;
  ctx.beginPath();
  ctx.ellipse(egg.x, egg.y, 3.5, 2.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Highlight
  ctx.fillStyle = COLORS.eggShell;
  ctx.beginPath();
  ctx.ellipse(egg.x - 0.8, egg.y - 0.6, 2.3, 1.4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Tiny caste dot (hints what it will hatch into)
  ctx.fillStyle = casteDot(egg.caste);
  ctx.beginPath();
  ctx.arc(egg.x, egg.y, 0.8, 0, Math.PI * 2);
  ctx.fill();
}
