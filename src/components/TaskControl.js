import { Component } from "react";
import TaskSearchControl from "./TaskSearchControl";
import TaskSortControl from "./TaskSortControl";

class TaskControl extends Component {

    render() {
        return (
            <div className="row mt-15">
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <TaskSearchControl onSearch={this.props.onSearch} />
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <TaskSortControl onSort={this.props.onSort} />
                </div>
            </div>
        )
    }
}

export default TaskControl;