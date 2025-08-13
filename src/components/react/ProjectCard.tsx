import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import type { Project } from '../../types/project';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const overlay = overlayRef.current;
    const title = titleRef.current;

    if (!card || !overlay || !title) return;

    // Set initial states
    gsap.set(overlay, { opacity: 0 });
    gsap.set(title, { y: 20, opacity: 0 });

    const tl = gsap.timeline({ paused: true });
    
    tl.to(overlay, { opacity: 0.2, duration: 0.3 })
      .to(title, { y: 0, opacity: 1, duration: 0.3 }, "-=0.2");

    const handleMouseEnter = () => tl.play();
    const handleMouseLeave = () => tl.reverse();

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative aspect-[4/5] cursor-pointer group overflow-hidden"
    >
      <img
        src={project.coverImage}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      
      <div
        ref={overlayRef}
        className="absolute inset-0 z-10 bg-black flex"
      >
      </div>
      <div ref={titleRef} className="absolute inset-0 z-20 text-white flex flex-col justify-between items-center p-2.5">
        <h3 className="text-lg font-bold uppercase mb-1">[{ project.id }] {project.title}</h3>
        <p className="text-sm opacity-90 uppercase tracking-wide">{project.category}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
