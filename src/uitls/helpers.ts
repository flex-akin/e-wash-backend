import axios from 'axios';
import * as dotenv from 'dotenv'

dotenv.config()
export const generateCode = (fullName: string): string => {
  const date = new Date();
  const timeStaamp = date.getTime()
  
  return fullName.substring(0, 2) + timeStaamp;
};

const SECRET_KEY = process.env.PAYSTACK_SECRET_KEY

export const paystackInstance = axios.create({
  baseURL: 'https://api.paystack.co',
  timeout: 3600,
  headers: {
    Authorization: `Bearer ${SECRET_KEY}`,
    'Content-Type': 'application/json'
}
});

export const generatePyastackRef = () => {
  let alphabet = 'abcdefghijklmnopqrstuvwxyz'
  const date = new Date()
  const timeStamp = date.getTime()
  let extraString = shuffleString(alphabet)

  return extraString.substring(0,7) + timeStamp
}

const shuffleString = (inputString: string) =>{
  const characters = inputString.split('');
  
  for (let i = characters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [characters[i], characters[j]] = [characters[j], characters[i]];
  }
  
  return characters.join('');
}
