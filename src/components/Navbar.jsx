import { navLinks, navIcons } from '#constants';
import useWindowStore from '#store/window';
import dayjs from 'dayjs';

const Navbar = () => {
  const { openWindow } = useWindowStore();
  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-bold">Egnoel's Portfolio</p>
        <ul>
          {navLinks.map((item) => (
            <li key={item.id} onClick={() => openWindow(item.type)}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} alt={`icon-${id}`} className="icon-hover" />
            </li>
          ))}
        </ul>
        <time>{dayjs().format('ddd MMM D, h:mm A')}</time>
      </div>
    </nav>
  );
};

export default Navbar;
