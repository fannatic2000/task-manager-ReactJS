import { Component } from "react";


class TaskSortControl extends Component {

    constructor(props) {
        super(props);

        this.state = {
            by: 'name',
            value: 1
        }
    }

    handleClick = (sortBy, sortValue) => {
        this.setState({
            by: sortBy,
            value: sortValue
        })
        this.props.onSort(sortBy, sortValue);
    }

    render() {
        const isChecked = (by, value) => {
            return (by === this.state.by && value === this.state.value ) ? 'sort_selected' : '' ;
        }

        return (
            <div className="btn-group">
                <button
                    type="button"
                    className="btn btn-primary dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    Sắp xếp <span className="caret ml-5"></span>
                </button>
                <ul className="dropdown-menu">
                    <li
                        onClick={(e) => this.handleClick('name', 1)}
                    >
                        <a role="button" className={isChecked('name', 1)} >
                            <span className="fas fa-sort-alpha-asc mr-5">
                            </span> Tên A-Z
                        </a>
                    </li>
                    <li
                        onClick={(e) => this.handleClick('name', -1)}
                    ><a role="button" className={isChecked('name', -1)}>
                            <span className="fas fa-sort-alpha-desc mr-5">
                            </span>Tên Z-A</a></li>
                    <li role="separator" className="divider"></li>
                    <li
                        onClick={(e) => this.handleClick('status', 1)}
                    ><a role="button" className={isChecked('status', 1)}>Trạng thái hoạt động</a></li>
                    <li
                        onClick={(e) => this.handleClick('status', -1)}
                    ><a role="button" className={isChecked('status', -1)}>Trạng thái ẩn</a></li>
                </ul>
            </div>
        )
    }
}

export default TaskSortControl;