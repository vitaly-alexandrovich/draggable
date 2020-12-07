interface ElementCoordinates
{
    top: number;
    left: number;
}

enum Direction {
    VERTICAL = 'vertical',
    HORIZONTAL = 'horizontal',
    FULL = 'full'
}

export default class Draggable
{
    protected element: HTMLElement;

    public onStart?: Function;
    public onEnd?: Function;
    public onMove?: Function;

    public group?: HTMLElement;

    public enabled: boolean = true;
    public direction: Direction = Direction.FULL;

    static Direction = Direction;

    public constructor(element: HTMLElement)
    {
        this.element = element;

        this.element.onmousedown = (event: MouseEvent): void => {
            if (!this.enabled) {
                return;
            }

            const x = event.pageX;
            const y = event.pageY;

            const coordinates = this.getElementCoordinates();
            const shiftX = x - coordinates.left;
            const shiftY = y - coordinates.top;

            this.draggableElement.style.position = 'absolute';

            const defaultUseSelect = this.draggableElement.style.userSelect;
            this.draggableElement.style.userSelect = 'none';

            document.body.appendChild(this.draggableElement);

            this.move(y - shiftY, x - shiftX);

            this.triggerOnStart();

            document.onmousemove = (event: MouseEvent) => {
                this.move(event.pageY - shiftY, event.pageX - shiftX);
                this.triggerOnMove();
            }

            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;
                this.draggableElement.style.userSelect = defaultUseSelect;
                this.triggerOnEnd();
            }

            this.element.ondragstart = () => {
                return false;
            }
        }
    }

    private triggerOnEnd() {
        if (this.onEnd) {
            this.onEnd({
                element: this.element,
                coordinates: this.getElementCoordinates(),
            });
        }
    }

    private triggerOnMove()
    {
        if (this.onMove) {
            this.onMove({
                element: this.element,
                coordinates: this.getElementCoordinates(),
            });
        }
    }

    protected triggerOnStart()
    {
        if (this.onStart) {
            this.onStart({
                element: this.element,
                coordinates: this.getElementCoordinates(),
            });
        }
    }

    get draggableElement(): HTMLElement {
        return this.group || this.element;
    }

    protected availableHorizontalDirection()
    {
        return this.direction === Direction.HORIZONTAL || this.direction === Direction.FULL;
    }

    protected availableVerticalDirection()
    {
        return this.direction === Direction.VERTICAL || this.direction === Direction.FULL;
    }

    protected move(top: number, left: number)
    {
        if (this.availableHorizontalDirection()) {
            this.draggableElement.style.top = top + 'px';
        }

        if (this.availableVerticalDirection()) {
            this.draggableElement.style.left = left + 'px';
        }
    }

    protected getElementCoordinates(): ElementCoordinates
    {
        const rect = this.element.getBoundingClientRect();

        return {
            top:    rect.top + pageYOffset,
            left:   rect.left + pageXOffset,
        };
    }
}

if (document && window) {
    // @ts-ignore
    window['Draggable'] = Draggable;
}