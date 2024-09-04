export function createEl(el, classes) {
   const element = document.createElement(`${el}`)
   if(!classes) return element
   element.setAttribute('class', classes)
   return element
}

export function appendEl(parent, child, classList, textContent) {
   if(!parent || !child) throw new Error('Parent or child missing')
   child = createEl(child, classList); 
   if (textContent) child.textContent = `${textContent}`;
   parent.appendChild(child)
   return child;
}