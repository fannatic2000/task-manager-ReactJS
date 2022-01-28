import { Component } from "react";
import TaskItem from "./TaskItem";

class TaskList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterName: '',
            filterStatus: -1 // -1: all, 1:active, 0:deactive
        }
    }

    handleChange = (e) => {
        let target = e.target;

        let value = target.name === 'filterStatus' ? +target.value : target.value;
        
        this.props.onFilter(
            target.name === 'filterName' ? value : this.state.filterName,
            target.name === 'filterStatus' ? value : this.state.filterStatus
        )

        this.setState({
            [target.name]: value
        })
    }

    render() {
        const { filterName, filterStatus } = this.state

        return (
            <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Tên</th>
                                <th className="text-center">Trạng Thái</th>
                                <th className="text-center">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <input 
                                        type="text" 
                                        name="filterName" 
                                        className="form-control"
                                        value={filterName}
                                        onChange={this.handleChange} 
                                        />
                                </td>
                                <td>
                                    <select 
                                        name="filterStatus" 
                                        className="form-control"
                                        value={filterStatus}
                                        onChange={this.handleChange}
                                    >
                                        <option value="-1">Tất Cả</option>
                                        <option value="0">Ẩn</option>
                                        <option value="1">Kích Hoạt</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>
                            { this.props.taskList.map(
                                (task, index) => 
                                    <TaskItem 
                                        key={task.id} 
                                        task={task} 
                                        index={index} 
                                        onUpdateStatus={this.props.onUpdateStatus} 
                                        onDeleteTask={this.props.onDeleteTask}
                                        onUpdateTask={this.props.onUpdateTask}
                                    />    
                                ) }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default TaskList;