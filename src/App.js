import './App.css';
import { Component } from 'react';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      taskList: JSON.parse(localStorage.getItem('taskList')) || [],
      isDisplayForm: false,
      taskEditing: null,
      filter: {
        name: '',
        status: -1,
      },
      keyword: '',
      sort: {
        by: 'name',
        value: 1,
      }
    }

  }

  save = (taskList) => {
    localStorage.setItem('taskList', JSON.stringify(taskList))
  }

  generateID = () => {
    let s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  handleToggleForm = () => {
    if (this.state.isDisplayForm && this.state.taskEditing) {
      this.setState({ taskEditing: null })
    } else {
      this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        taskEditing: null
      })
    }
  }

  handleFilter = (filterName, filterStatus) => {
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    })
  }

  handleSubmit = (task) => {
    let newTaskList;
    if (task.id) {
      newTaskList = this.state.taskList.map(item => {
        if (item.id === task.id) return task;
        return item;
      })

      this.setState({ taskEditing: null });
    } else {
      task.id = this.generateID();
      newTaskList = [...this.state.taskList, task];
    }

    this.save(newTaskList);
    this.setState({
      taskList: newTaskList,
      taskEditing: null
    })
  }

  handleUpdateStatus = (id) => {
    const newTaskList = this.state.taskList.map(task => {
      if (task.id === id) {
        task.status = !task.status;
        if (id === this.state.taskEditing?.id) {
          //console.log('Status change: ', task.status)
          this.setState({ taskEditing: { ...this.state.taskEditing, status: task.status } })
        }
      }
      return task;
    })
    this.save(newTaskList)
    this.setState({ taskList: newTaskList });
  }

  handleCloseForm = () => {
    this.setState({ isDisplayForm: false, taskEditing: null });
  }

  handleShowForm = () => {
    this.setState({ isDisplayForm: true });
  }

  handleDeleteTask = (id) => {
    const newTaskList = this.state.taskList.filter(task => task.id !== id);
    this.save(newTaskList);
    this.setState({
      taskList: newTaskList,
    });
    this.handleCloseForm();
  }

  handleUpdateTask = (id) => {
    const task = this.state.taskList.find(task => task.id === id)

    this.setState({
      taskEditing: task,
    });

    this.handleShowForm();
  }

  handleClearTaskEditting = () => {
    this.setState({ taskEditing: null });
  }

  handleSearch = (keyword) => {
    this.setState({
      keyword: keyword,
    })
  }

  handleSort = (by, value) => {
    this.setState({
      sort: {
        by: by,
        value: value
      }
    })
  }

  render() {
    var { isDisplayForm, taskList, taskEditing, filter, keyword, sort } = this.state;

    // Search Data
    if (keyword) {
      taskList = taskList.filter(task => {
        return task.name.toLowerCase().includes(keyword);
      })
    }

    // Filter Data
    if (filter) {
      if (filter.name) {
        taskList = taskList.filter(task => {
          return task.name.toLowerCase().includes(filter.name);
        })
      }
      if (filter.status !== -1) {
        taskList = taskList.filter(task => {
          return task.status === !!filter.status;
        })
      }
    }

    // Sort Value
    if (sort) {
      switch (sort.by) {
        case 'name':
          taskList.sort((a, b) => {
            let nameA = a.name.toLowerCase();
            let nameB = b.name.toLowerCase();

            if (nameA < nameB) return -sort.value
            else if (nameA > nameB) return sort.value
            else return 0;
          })
          break;
        case 'status':
          taskList.sort((a, b) => {
            if (a.status > b.status) return -sort.value; // <0 : ab
            else if (a.status < b.status) return sort.value; // >0: ba
            else return 0;
          })
        default:
          break;
      }
    }

    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
            {isDisplayForm &&
              <TaskForm
                onCloseForm={this.handleCloseForm}
                onClear={this.handleClearTaskEditting}
                onSubmit={this.handleSubmit}
                taskEditing={taskEditing}
              />}
          </div>
          <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.handleToggleForm}
            >
              <span className="fas fa-plus mr-5"></span>Thêm Công Việc
            </button>
            <TaskControl
              onSearch={this.handleSearch}
              onSort={this.handleSort}
            />
            <TaskList
              taskList={taskList}
              onUpdateStatus={this.handleUpdateStatus}
              onDeleteTask={this.handleDeleteTask}
              onUpdateTask={this.handleUpdateTask}
              onFilter={this.handleFilter}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
