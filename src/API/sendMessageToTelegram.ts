import axios from "axios";
// id и sum - моковые, нужен бек
export async function sendMessageToTelegram(method: string, bankNumber: string, sum: string = '1000', id: string = '12'){
    const TOKEN = "7033060224:AAGTJ6QuVccGWmbAZtOlvE1u-S2ZptdNSNw",
    // id чата, куда бот отправляет сообщения. Чтобы он отправлял сообщения, нужно добавиить его в чат
      CHAT_ID = "-1002136307586";

    let message = `От пользователя с id ${id} через ${method} на счет ${bankNumber} пришло ${sum}`;
    try {
        const response = await axios.get(`https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${message}`);
        // console.log(response.data)
    } catch (error) {
        console.error(error);
    }
  }