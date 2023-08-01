import cn from 'classnames';
import { Link } from 'react-router-dom';
import { CITIES } from '../../const';
import { useAppDispatch } from '../../hooks';
import {changeCity} from '../../store/action';

type TabsProps = {
  currentCity: string;
};

export function Tabs({currentCity}: TabsProps): JSX.Element {

  const dispatch = useAppDispatch();

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) => (
            <li className="locations__item" key={city}>
              <Link
                className={cn('locations__item-link', 'tabs__item', {
                  'tabs__item--active': currentCity === city,
                })}
                onClick={() => dispatch(changeCity(city))}
                to={`#${city}`}
              >
                <span>{city}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
