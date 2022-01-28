import { Component } from "react";

class TaskForm extends Component {
  constructor(props) {
    super(props);
    //console.log('cons')
    this.state = {
      id: '',
      name: '',
      status: true
    }
  }

  componentDidMount() {
    //console.log('moutn');
    const taskEditing = this.props.taskEditing;
    if (taskEditing) {
      this.setState({
        name: taskEditing.name,
        id: taskEditing.id,
        status: taskEditing.status
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    //console.log('component receive props');
    if (nextProps && nextProps.taskEditing) {
      this.setState({
        name: nextProps.taskEditing.name,
        status: nextProps.taskEditing.status,
        id: nextProps.taskEditing.id
      })
    } else if (!nextProps.task) {
      this.setState({
        id: '',
        name: '',
        status: true
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const task = {
      id: this.state.id,
      name: this.state.name,
      status: this.state.status
    }

    this.props.onSubmit(task);
    this.props.onCloseForm();
  }

  handleClear = () => {
    if (this.props.taskEditing) {
      this.props.onClear()
    } else {
      this.setState({ name: '', status: true, id: '' })
    }
  }

  render() {
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            {this.state.id ? 'Cập Nhật Công Việc' : 'Thêm Công Việc'}
            <span
              id="panel__close-btn"
              className="fas fa-times-circle"
              onClick={this.props.onCloseForm}
            ></span>
          </h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Tên :</label>
              <input
                type="text"
                className="form-control"
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </div>
            <label>Trạng Thái :</label>
            <select
              className="form-control"
              required="required"
              value={this.state.status}
              onChange={(e) => this.setState({ status: String(e.target.value) === 'true' ? true : false })}
            >
              <option value={true}>Kích Hoạt</option>
              <option value={false}>Ẩn</option>
            </select>
            <br />
            <div className="text-center">
              <button type="submit" className="btn btn-warning">
                <span className="fas fa-plus mr-5"></span> {this.state.id ? 'Lưu lại' : 'Thêm'}
              </button>&nbsp;
              <button onClick={this.handleClear} type="button" className="btn btn-danger">
                <span className="fas fa-times mr-5"></span>Hủy Bỏ
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default TaskForm;