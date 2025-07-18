import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function cardAppear() {
  const projectCells = document.querySelectorAll('.project_cell');

  if (!projectCells.length) return;

  // Grouper les cartes par position Y (même ligne)
  const rowGroups: Element[][] = [];
  let currentRow: Element[] = [];
  let currentTop = -1;

  projectCells.forEach((cell) => {
    const rect = cell.getBoundingClientRect();
    const top = Math.round(rect.top);

    if (currentTop === -1 || Math.abs(top - currentTop) < 10) {
      // Même ligne (tolérance de 10px)
      currentRow.push(cell);
      currentTop = top;
    } else {
      // Nouvelle ligne
      if (currentRow.length > 0) {
        rowGroups.push([...currentRow]);
      }
      currentRow = [cell];
      currentTop = top;
    }
  });

  // Ajouter la dernière ligne
  if (currentRow.length > 0) {
    rowGroups.push(currentRow);
  }

  // Animer chaque ligne séparément
  rowGroups.forEach((rowCells) => {
    gsap.fromTo(
      rowCells,
      {
        y: '24rem',
        opacity: 0,
      },
      {
        y: '0rem',
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: rowCells[0], // Premier élément de la ligne comme trigger
          start: '0% 100%',
          end: '100% 75%',
          markers: false,
          toggleActions: 'play none none reverse',
        },
      }
    );
  });
}
