import { locations } from '#constants';
import useLocationStore from '#store/location';
import useWindowStore from '#store/window';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import { Draggable } from 'gsap/Draggable';
import React from 'react';

const projects = locations.work?.children ?? [];

const Home = () => {
  const { openWindow } = useWindowStore();
  const { setActiveLocation } = useLocationStore();

  const handleOpenProject = (project) => {
    setActiveLocation(project);
    openWindow('finder');
  };

  useGSAP(() => {
    Draggable.create('.folder');
  }, []);
  return (
    <section id="home">
      <ul>
        {projects.map((item, i) => (
          <li
            key={item.id}
            className={clsx('group folder', item.windowPosition)}
            onClick={() => handleOpenProject(item)}
          >
            <img src="/images/folder.png" alt={item.name} />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;
