import './AdviceCard.css';
import num from '../../assets/AdviceCard_num.png'
//  фото для наглядности 
interface AdviceCardProps {
    num: string;
    text: string;
}
 
const AdviceCard = ({ text }: AdviceCardProps) => {
    let textArr: string[] = text.split(' ')
    return ( 
        <div className="advice__container">
            <img src={num} className="avice_number" />
            <p className="avice_text">{textArr[0]}<br/>{textArr[1]}</p>
        </div>
     );
}
 
export default AdviceCard;