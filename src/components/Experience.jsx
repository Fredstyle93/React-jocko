import React from 'react';

class Experience extends React.Component{
    render(){
        const width = {
            width: (this.props.user.experience * 100 ) / this.props.user.nextLevelExperience + "%"
        };
        return(
            <div className="progress">
                <div className="progress-bar progress-bar-striped bg-warning progress-bar-animated" role="progressbar"
                     style={width} aria-valuenow="75" aria-valuemin="0"
                     aria-valuemax="100"></div>
            </div>
        )
    }

}

export default Experience