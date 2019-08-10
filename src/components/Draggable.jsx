import React from 'react';

export default class Draggable extends React.Component {

    drag = e => {
        e.dataTransfer.setData('transfer', e.currentTarget.id);
    };

    noAllowDrop = e => {
        e.stopPropagation();
    };

    render() {
        return(
            <div id={this.props.id} draggable="true" onDragStart={(e) => this.drag(e)} onDragOver={this.noAllowDrop} style={this.props.style}>
                {this.props.children}
            </div>
        )
    }
}