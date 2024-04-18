import axios from "axios";
// id моковый, нужен бек
export async function sendMessageToTelegram(bank: string = 'Сбербанк', bankNumber: string, sum: string = '1000', id: string = '12'){
    const TOKEN = "7033060224:AAGTJ6QuVccGWmbAZtOlvE1u-S2ZptdNSNw",
      CHAT_ID = "-1002128864285";

    let message = `От пользователя с id ${id} в банк ${bank} на карту ${bankNumber} пришло ${sum}`
    try {
        const response = await axios.get(`https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${message}`);
        // console.log(response.data)
    } catch (error) {
        console.error(error);
    }
  }