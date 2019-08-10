import React from 'react';

export default class Droppable extends React.Component {

        drop = e => {
            e.preventDefault();

            const data = e.dataTransfer.getData('transfer');
            console.log(e.currentTarget);
            e.currentTarget.appendChild(document.getElementById(data));
        };

        allowDrop = e => {
            e.preventDefault();
        }

    render() {
        return(
            <div id={this.props.id} onDrop={(e) => this.drop(e)} onDragOver={this.allowDrop} style={this.props.style}>
                {this.props.children}
            </div>
        )
    }
}