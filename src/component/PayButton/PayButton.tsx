import './PayButton.css';
import img from '../../assets/payment__img.svg'

interface PayButtonProps {
    payMethod: string;
    onClick: () => void;
}
 
const PayButton = ({payMethod, onClick}: PayButtonProps) => {
    return ( 
        <button onClick={onClick} className="btn" >
            <div className="btn__container">
                <img src={img} alt="изображение банка" />
                <p className="btn__text">{payMethod}</p>
            </div>
        </button>
     );
}
 
export default PayButton;