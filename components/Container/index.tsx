import classNames from 'classnames';
import styles from './styles.module.css';

interface ContainerProps {
  children: JSX.Element;
  className?: string
}

function Container({ children, className }: ContainerProps): JSX.Element {
  const containerClasses = classNames(styles.container, className)
  return <div className={containerClasses}>{children}</div>;
}

export default Container;
