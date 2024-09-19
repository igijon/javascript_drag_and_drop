// Selecciona todos los divs con la clase 'draggable'
const draggables = document.querySelectorAll('.draggable');
const container = document.getElementById('container');

// Variable para almacenar el elemento que se está arrastrando
let draggedElement = null;

// Evento cuando se comienza a arrastrar un div
draggables.forEach(div => {
  div.addEventListener('dragstart', (e) => {
    // Añade una clase para estilo visual (opcional)
    div.classList.add('dragging');
    draggedElement = div; // Guarda el div arrastrado
    e.dataTransfer.effectAllowed = "move";
  });

  // Evento cuando se deja de arrastrar el div
  div.addEventListener('dragend', () => {
    // Elimina la clase de estilo visual
    div.classList.remove('dragging');
    draggedElement = null; // Limpia la referencia al div arrastrado
  });
});

// Permitir el evento 'dragover' en el contenedor
container.addEventListener('dragover', (e) => {
  e.preventDefault(); // Necesario para permitir el drop y mover el elemento
  const afterElement = getDragAfterElement(container, e.clientY);
  const draggingElement = document.querySelector('.dragging');

  // Inserta el elemento arrastrado antes del div correcto o al final si no hay ningún div después
  if (afterElement == null) {
    container.appendChild(draggingElement);
  } else {
    container.insertBefore(draggingElement, afterElement);
  }
});

// Función para determinar el div que está justo después de la posición donde se arrastra
const getDragAfterElement = (container, y) => {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];
  
    return draggableElements.find(child => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      return offset < 0;
    });
  }
  
