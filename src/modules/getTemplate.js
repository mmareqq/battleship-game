export default async function getTemplate(url) {
   try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.text()
      return data
   } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
   }
}
