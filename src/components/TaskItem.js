import { Component } from "react";

class TaskItem extends Component {

    render() {

        const { task, index } = this.props;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span
                        id="task-status" 
                        className={`label ${task.status ? 'label-danger' : 'label-success'}`}
                        onClick={() => this.props.onUpdateStatus(task.id)}
                    >
                        { task.status ? 'Kích hoạt' : 'Ẩn' }
                    </span>
                </td>
                <td className="text-center">
                    <button onClick={() => this.props.onUpdateTask(task.id)} type="button" className="btn btn-warning">
                        <span className="fas fa-pencil mr-5"></span>Sửa
                    </button>
                    &nbsp;
                    <button onClick={() => this.props.onDeleteTask(task.id)} type="button" className="btn btn-danger">
                        <span
                            className="fas fa-trash mr-5"    
                        ></span>Xóa
                    </button>
                </td>
            </tr>
        )
    }
}

export default TaskItem;




