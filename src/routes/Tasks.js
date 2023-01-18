import React from 'react';
import TaskController from '../components/TaskController';

class EditComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      loading2: true,
      show: false,
      categories: [],
      tasks: [],
    };
  }
  componentDidMount() {
    // fetch data for tasks and categories from the API
    fetch('http://127.0.0.1:3010/tasks')
      .then((res) => res.json())
      .then(
        (jsonObject) => {
          this.setState({
            loading: false,
            tasks: jsonObject.concat(this.state.tasks),
          });
        },
        (error) => {
          this.setState({
            loading: false,
            error,
          });
        },
      );
    fetch('http://127.0.0.1:3010/categories')
      .then((res) => res.json())
      .then(
        (jsonObject) => {
          this.setState({
            loading2: false,
            categories: jsonObject.concat(this.state.categories),
          });
        },
        (error) => {
          this.setState({
            loading2: false,
            error,
          });
        },
      );
  }

  render() {
    if (this.state.error) {
      return (
        <div className='center'>
          Jokin meni pieleen! <br />
          {this.state.error.message}
        </div>
      );
    } else if (this.state.loading || this.state.loading2) {
      return (
        <div>
          <div className='loading-spinner'></div>
        </div>
      );
    } else {
      return (
        <div>
          <div className='center'>
            <br></br>
            <h1 className='main'>Tehtävät</h1>
          </div>
          <TaskController
            categories={this.state.categories}
            tasks={this.state.tasks}
          />
        </div>
      );
    }
  }
}

export default EditComponent;
