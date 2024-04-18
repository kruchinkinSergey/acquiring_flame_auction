import './AdviceCard.css';
interface AdviceCardProps {
    num: string;
    text: string;
}
 
const AdviceCard = ({num, text}: AdviceCardProps) => {
    let textArr: string[] = text.split(' ')
    return ( 
        <div className="advice__container">
            <p className="avice_number">{num}</p>
            <p className="avice_text">{textArr[0]}<br/>{textArr[1]}</p>
        </div>
     );
}
 
export default AdviceCard;