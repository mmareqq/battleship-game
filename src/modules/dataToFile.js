export default function getDataToFile(data) {
   data.forEach(ship => {
      delete ship.hits;
   });
   data = JSON.stringify(data);
   const blob = new Blob([data], { type: 'text/plain' });
   const url = URL.createObjectURL(blob);

   const a = document.createElement('a');
   a.href = url;
   a.download = 'output.txt';
   document.body.appendChild(a);
   a.click();
   document.body.removeChild(a);
   URL.revokeObjectURL(url);
}
