import React, { useRef, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gridSettingsStore } from '../../stores/gridStore';
import ProjectCard from './ProjectCard';
import type { Project } from '../../types/project';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectGridProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, onProjectClick }) => {
  const gridSettings = useStore(gridSettingsStore);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || typeof window === 'undefined') return;

    const cards = grid.querySelectorAll('.project-card');
    
    gsap.fromTo(cards, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: grid,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [projects]);

  const getGridCols = (columns: number) => {
    const colsMap = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6'
    };
    return colsMap[columns as keyof typeof colsMap] || 'grid-cols-6';
  };

  return (
    <div
      ref={gridRef}
      className={`grid gap-4 md:gap-6 ${getGridCols(gridSettings.columns)} transition-all duration-500`}
    >
      {projects.map((project) => (
        <a href={`/project/${project.slug}`} key={project.id}>
          <div className="project-card">
            <ProjectCard project={project} onClick={onProjectClick} />
          </div>
        </a>
      ))}
    </div>
  );
};

export default ProjectGrid;
