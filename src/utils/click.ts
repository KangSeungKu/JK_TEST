import { MouseEvent } from "react";

export const pop = (e: MouseEvent) => {
    for (let i = 0; i < 30; i++) {
      createParticle(e.clientX, e.clientY);
    }
}
  
export const createParticle = (x:number, y:number) => {
    const particle = document.createElement("particle");
    document.body.appendChild(particle);
  
    const size = Math.floor(Math.random() * 20 + 5);
  
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
  
    const destinationX = x + (Math.random() - 0.5) * 2 * 75;
    const destinationY = y + (Math.random() - 0.5) * 2 * 75;
  
    particle.style.background = `hsl(${Math.random() * 90 + 270}, 100%, ${Math.random() * 25 + 50}%)`;
    particle.style.borderRadius = "50%";
    particle.style.border = "1px solid white";
  
    particle.animate(
        [
            {
                // Set the origin position of the particle
                // We offset the particle with half its size to center it around the mouse
                transform: `translate(${x - size / 2}px, ${y - size / 2}px)`,
                opacity: 1,
            },
            {
                // We define the final coordinates as the second keyframe
                transform: `translate(${destinationX}px, ${destinationY}px)`,
                opacity: 0,
            },
        ],
        {
            duration: 500 + Math.random() * 1000,
            easing: "cubic-bezier(0, .9, .57, 1)",
            delay: Math.random() * 200,
        }
    );
}