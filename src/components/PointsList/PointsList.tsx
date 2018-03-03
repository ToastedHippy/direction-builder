import * as React from "react";
import Point from "../PointComponent/PointComponent";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { IPoint } from "../../models/Point";
import "./PointsList.scss";

interface IPointsListProps {
  points: IPoint[];
  onPointDeleted?: (points: IPoint[]) => any;
  onPointsReordered?: (points: IPoint[]) => any;
}

export default class PointsList extends React.Component<IPointsListProps> {

  constructor(props: IPointsListProps) {
    super(props);
  }

  deletePoint = (id: number) => {
    const remainedPoints = this.props.points.filter(p => p.id !== id);
    this.props.onPointDeleted && this.props.onPointDeleted(remainedPoints);
  }

  reorderPoints = (result: DropResult) => {

    if (!result || !result.destination) {
      return;
    }
    const oldIndex = result.source.index;
    const newIndex = result.destination.index;
    const newPoints = this.props.points.slice();
    const [removed] = newPoints.splice(oldIndex, 1);
    newPoints.splice(newIndex, 0, removed);

    this.props.onPointsReordered && this.props.onPointsReordered(newPoints);
  }

  render() {
    const draggablePoints = this.props.points.map((p, i) => {
      return (
        <Draggable key={p.id} draggableId={p.id.toString()} index={i}>
          {(provided, snapshot) => (
            <div>
              <div ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={provided.draggableProps.style || undefined}
              >
                <Point
                  id={p.id}
                  name={p.name}
                  onPointDeleted={this.deletePoint} />
              </div>
              {provided.placeholder}
            </div>
          )}
        </Draggable>
      );
    });

    return (
      <DragDropContext onDragEnd={this.reorderPoints}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} className="points-list">
              {draggablePoints}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
