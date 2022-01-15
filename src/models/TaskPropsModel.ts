import { DragEvent } from "react";

export interface TaskPropsModel {
    name: string;
    id: string;
    onDragStart: (event: DragEvent<HTMLDivElement>) => void
    onDragEnd: (event: DragEvent<HTMLDivElement>) => void
}