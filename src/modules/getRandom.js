export default function getRandomNum(start = 5, end = 10) {
   return Math.floor(Math.random() * (end + 1 - start)) + start
}