import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as brandIcons from '@fortawesome/free-brands-svg-icons';
import * as solidIcons from '@fortawesome/free-solid-svg-icons'

const FeatureList = [
  {
    title: 'Target Engineering Blog',
    Svg: <FontAwesomeIcon icon={solidIcons.faBlog} size="4x" />,
    description: (
      <>
        Hear more about other products and Target Engineering on our blog.
      </>
    ),
  },
  {
    title: 'Contributors welcome',
    Svg: <FontAwesomeIcon icon={brandIcons.faGithub} size="4x" />,
    description: (
      <>
        Learn more about getting started in our community.
      </>
    ),
  },
  {
    title: 'Join us on Slack',
    Svg: <FontAwesomeIcon icon={brandIcons.faSlack} size="4x" />,
    description: (
      <>
        Come hang out with us in the Gopher Slack workspace.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-vert--md">
        {Svg}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
