import { useState, useRef, useEffect } from 'react';
import './App.css';
import PayButton from './component/PayButton/PayButton';
import AdviceCard from './component/AdviceCard/AdviceCard';
import copy_btn from './assets/copy__btn.svg';
import { sendMessageToTelegram } from './API/sendMessageToTelegram';
import img1 from './assets/overlay-process-img1.svg';
import img768 from './assets/overlay-process-img1-768.svg';
import cardImg from './assets/card-img.png';

function App() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayProcessImgRef = useRef<HTMLDivElement>(null);
  const overlayContent = useRef<HTMLDivElement>(null);
  const cardNumberRef = useRef<HTMLParagraphElement>(null)
  const cardPersonRef = useRef<HTMLParagraphElement>(null)
  const [copiedNumber, setCopiedNumber] = useState<string | null>();
  const [time, setTime] = useState<number>(300);
  const intervalRef = useRef<number | null>(null);
  const [methodName, setMethodName] = useState<string>('');

  const openOverlay = ([num, person, method]: string[]) => {
    if (overlayRef.current) overlayRef.current.style.width = '100%';
    if (overlayProcessImgRef.current) overlayProcessImgRef.current.style.display = 'flex';
    if (overlayContent.current) overlayContent.current.style.display = 'block';
    if (cardNumberRef.current) cardNumberRef.current.innerText = num;
    if (cardPersonRef.current) cardPersonRef.current.innerText = person;

    setMethodName(method)
  };

  const closeOverlay = () => {
    if (overlayRef.current) overlayRef.current.style.width = '0%';
    if (overlayProcessImgRef.current) overlayProcessImgRef.current.style.display = 'none';
    if (overlayContent.current) overlayContent.current.style.display = 'none';
  };

  const copyNumber = async (text: string) => {

    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedNumber(text);
    } catch (error) {
      console.error(`Failed copying the text ${text}`, error);
      setCopiedNumber(null);
    }
  };

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime - 1);
    }, 1000);
    if (cardNumberRef.current) sendMessageToTelegram(methodName, cardNumberRef.current.innerText, '1000')
  };

  useEffect(() => {
      if (time === 0 && intervalRef.current) {
          clearInterval(intervalRef.current);
      }
  }, [time]);



  return (
    <>
      <div className="payment__container">
        <h2 className="payment__title">Выбрать способ оплаты</h2>
        <div className="payButton__container">
          {/* данные моковые, фио и номер картыи способ оплаты с админки */}
          <PayButton onClick={() => (openOverlay(['1323 2139 9021 9210', 'Иванов В.В.', 'P2P перевод']))} payMethod={'P2P перевод'} />
          <PayButton onClick={() => (openOverlay(['1111 2222 3333 4444', 'Иванов В.В.', 'Банк. карта']))} payMethod={'Банк. карта'} />
          <PayButton onClick={() => (openOverlay(['1111 2222 3333 4444', 'Иванов В.В.', 'SberPay']))} payMethod={'SberPay'} />
          <PayButton onClick={() => (openOverlay(['1111 2222 3333 4444', 'Иванов В.В.', 'СПБ']))} payMethod={'СПБ'} />
          <PayButton onClick={() => (openOverlay(['1111 2222 3333 4444', 'Иванов В.В.', 'Bitcoin']))} payMethod={'Bitcoin'} />
          <PayButton onClick={() => (openOverlay(['1111 2222 3333 4444', 'Иванов В.В.', 'Etherum']))} payMethod={'Etherum'} />
          <PayButton onClick={() => (openOverlay(['1111 2222 3333 4444', 'Иванов В.В.', 'USDT ERC-20']))} payMethod={'USDT ERC-20'} />
          <PayButton onClick={() => (openOverlay(['1111 2222 3333 4444', 'Иванов В.В.', 'BNB']))} payMethod={'BNB'} />
          <PayButton onClick={() => (openOverlay(['1111 2222 3333 4444', 'Иванов В.В.', 'Tron']))} payMethod={'Tron'} />
        </div>
      </div>
      <div className="overlay" ref={overlayRef}>
          <div className="overlay-process-img" ref={overlayProcessImgRef}>
            <div className="overlay-process-img__circle">
              {/* фото с бека */}
              <img src={img1} alt="img1" className="overlay-process-img__circle-img" />
              <img src={img768} alt="img1" className="overlay-process-img__circle-img-768" />
            </div>
            <div className="overlay-process-img__line1"></div>
            <div className="overlay-process-img__circle">
              {/* фото с бека */}
              <img src={img1} alt="img1" className="overlay-process-img__circle-img" />
              <img src={img768} alt="img1" className="overlay-process-img__circle-img-768" />
            </div>
            <div className="overlay-process-img__line2"></div>
            <div className="overlay-process-img__circle">
              {/* фото с бека */}
              <img src={img1} alt="img1" className="overlay-process-img__circle-img" />
              <img src={img768} alt="img1" className="overlay-process-img__circle-img-768" />
            </div>
          </div>
          <div className="overlay__content" ref={overlayContent}>
            <h2 className="overlay__title">Совершите перевод на сумму (сайт)</h2>
            <div className="advice__inner">
              {/* фото с бека */}
              <AdviceCard num={'бек'} text={'Скопируйте реквезиты'}/>
              <AdviceCard num={'бек'} text={'Совершите перевод'}/>
              <AdviceCard num={'бек'} text={'Ожидайте обработки'}/>
            </div>
            <div className="card">
              {/* фото с бека */}
              <div className='card_img-container'>
                <img src={cardImg} className="card__img" />
              </div>
              <div className="card__info">
                <p className="card__text">Номер карты</p>
                <div className="number__container">
                  <p ref={cardNumberRef} className="card__number"></p>
                  <button className='copy__btn' onClick={() => {if (cardNumberRef.current) (copyNumber(cardNumberRef.current.innerText))}}>
                    {/* фото с бека */}
                    <img  src={copy_btn} alt="copy btn" />
                  </button>
                </div>
                <p className="card__text" ref={cardPersonRef}></p>
              </div>
            </div>
            <div className="taimer">
              <p className="taimer__text">Оставшееся на оплату время:</p>
              <div className="taimer__time-container">
                <p className="taimer__number" id="taimer">00:</p>
                <p className="taimer__number" id="taimer">{(Math.floor(time / 60)) > 0 ? '0' + (Math.floor(time / 60)) : '00'}:</p>
                <p className="taimer__number" id="taimer">{(time % 60) > 0 ? (time % 60 < 10) ? '0' + (time % 60) : time % 60 : '00'}</p>
              </div>      
            </div>
            <div className="btn__inner">
              <button onClick={() => (startTimer())} className="ready__btn">Готово</button>
              <button onClick={() => (closeOverlay())} className="cancel__btn">Отмена</button>
            </div>  
        </div>
      </div>
    </>
  )
}

export default App
