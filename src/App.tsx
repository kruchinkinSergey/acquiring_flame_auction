import { useState, useRef, useEffect } from 'react'
import './App.css'
import PayButton from './component/PayButton/PayButton'
import AdviceCard from './component/AdviceCard/AdviceCard';
import copy_btn from './assets/copy__btn.svg';
import { sendMessageToTelegram } from './API/sendMessageToTelegram';

function App() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardNumberRef = useRef<HTMLParagraphElement>(null)
  const cardPersonRef = useRef<HTMLParagraphElement>(null)
  const [copiedNumber, setCopiedNumber] = useState<string | null>();
  const [time, setTime] = useState<number>(300);
  const intervalRef = useRef<number | null>(null);

  const openOverlay = ([num, person]: string[]) => {
    if (overlayRef.current) overlayRef.current.style.width = '100%';
    if (cardNumberRef.current) cardNumberRef.current.innerText = num;
    if (cardPersonRef.current) cardPersonRef.current.innerText = person;
  };

  const closeOverlay = () => {
    if (overlayRef.current) overlayRef.current.style.width = '0%';
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
    if (cardNumberRef.current) sendMessageToTelegram('Сбербанк', cardNumberRef.current.innerText, '1000')
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
          {/* данные моковые, фио и номер карты с бека */}
          <PayButton onClick={() => (openOverlay(['1323 2139 9021 9210', 'Иванов В.В.']))} payMethod={'P2P перевод'} />
          <PayButton onClick={() => (openOverlay(['1111 2222 3333 4444', 'Иванов В.В.']))} payMethod={'Банк. карта'} />
          <PayButton onClick={() => (openOverlay(['1111 2222 3333 4444', 'Иванов В.В.']))} payMethod={'SberPay'} />
          <PayButton onClick={() => (openOverlay(['1111 2222 3333 4444', 'Иванов В.В.']))} payMethod={'СПБ'} />
          <PayButton onClick={() => (openOverlay(['1111 2222 3333 4444', 'Иванов В.В.']))} payMethod={'Bitcoin'} />
          <PayButton onClick={() => (openOverlay(['1111 2222 3333 4444', 'Иванов В.В.']))} payMethod={'Etherum'} />
          <PayButton onClick={() => (openOverlay(['1111 2222 3333 4444', 'Иванов В.В.']))} payMethod={'USDT ERC-20'} />
          <PayButton onClick={() => (openOverlay(['1111 2222 3333 4444', 'Иванов В.В.']))} payMethod={'BNB'} />
          <PayButton onClick={() => (openOverlay(['1111 2222 3333 4444', 'Иванов В.В.']))} payMethod={'Tron'} />
        </div>
      </div>
      <div className="overlay" ref={overlayRef}>
          <div className="overlay__container">
            <h2 className="payment__title">Совершите перевод на сумму (сайт)</h2>
            <div className="advice__inner">
              {/* фото с бека */}
              <AdviceCard num={'бек'} text={'Скопируйте реквезиты'}/>
              <AdviceCard num={'бек'} text={'Совершите перевод'}/>
              <AdviceCard num={'бек'} text={'Ожидайте обработки'}/>
            </div>
            <div className="card">
              {/* фото с бека */}
              <p className="card__img">изображение с бека</p>
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
                <p className="taimer__number" id="taimer">{'0' + Math.floor(time / 60)}:</p>
                <p className="taimer__number" id="taimer">{(time % 60 < 10) ? '0' + (time % 60) : time % 60}</p>
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
