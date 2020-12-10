# Draggable
## Описание
Маленькая библиотека для интерактивного перемещения элементов страницы. 

## Установка
Для того чтобы добавить библиотеку в ваш проект необходимо выполнить следующую команду
```sh
npm install draggable.io --save
```
либо 

```sh
yarn add draggable.io
```

## Использование
Делаем элемент страницы перемещаемым:
```html
<div id = "draggable">
    Drag It!
</div>
```

```javascript
import Draggable from "draggable.io";

const draggableElement = new Draggable(document.getElementById('draggable'));
```

Бывает нужно что бы перетаскивать можно было схватив лишь за конкретный элемент контейнера, а не любую его область.
Для этого нужно сделать такой элемент перетаскиваемым, а контейнер добавить в группу которая будет следовать за ним:
```html
<div id = "container">
    <div id = "draggable">
        Drag It!
    </div>
    <div>
        Dont draggable container
    </div>
</div>
```

```javascript
import Draggable from "draggable.io";

const draggableElement = new Draggable(document.getElementById('draggable'));
draggableElement.group = document.getElementById('container');
```

Отслеживать перемещения можно установив обработчики событий:
```javascript
// Схватили элемент
draggableElement.onStart = (options) => {
  console.log('onStart', options);
}

// Перемещаем элемент
draggableElement.onMove = (options) => {
  console.log('onMove', options);
}

// Закончили перемещать элемент
draggableElement.onEnd = (options) => {
  console.log('onEnd', options);
}
```

Так же Вы можете ограничить перемещение только в одном направлении, если это нужно:
```javascript
// Ограничиваем перемещение по вертикали
draggableElement.direction = Draggable.Direction.VERTICAL;

// Ограничиваем перемещение по горизонтали
draggableElement.direction = Draggable.Direction.HORIZONTAL;

// Отключаем ограничение направления (перемещать можно во все направления)
draggableElement.direction = Draggable.Direction.FULL;
```