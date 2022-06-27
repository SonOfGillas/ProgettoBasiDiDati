import styles from './common.css';

const Button = (props) => (
	<div style={styles.Button}>
		<button onClick={props.onClick}>{props.title}</button>
	</div>
);

export default Button;
