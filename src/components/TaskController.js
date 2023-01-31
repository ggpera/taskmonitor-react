import React from 'react';
import AddTask from './AddTask';
class TaskController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: props.tasks,
      categories: props.categories,
      edit: { id: '', name: '', catId: [] },
      isChecked: [],
    };
  }

  // Initializes the isChecked array to the length of categories and set values to false
  componentDidMount() {
    const initCheck = [...this.state.categories];
    const checkArr = initCheck.map((i) => false);
    this.setState({
      isChecked: checkArr,
    });
  }
  // Handles the edit task checkboxes
  handleCheck = (e) => {
    const newId = parseInt(e.target.value);
    const edit = { ...this.state.edit };
    const checked = [...this.state.isChecked];
    if (!checked[newId - 1]) {
      checked[newId - 1] = true;
      edit.catId = [...edit.catId, newId];
      this.setState({ edit });
    } else if (checked[newId - 1]) {
      checked[newId - 1] = false;
      edit.catId = edit.catId.filter((cat) => cat !== newId);
      this.setState({ edit });
    }
    this.setState({ isChecked: checked });
  };

  // Checks if a typed task is found from the tasks array
  // and adds it to the edit array if found
  handleChange = (e) => {
    const edit = { ...this.state.edit };
    edit.name = e.target.value;
    let check = this.state.tasks.some((task) => task.name === edit.name);
    if (check) {
      let findId = this.state.tasks.find((task) => task.name === edit.name);
      edit.id = findId.id;
    }
    this.setState({ edit });
  };

  // Handles the edit button
  handleEdit = (id, name, cat) => {
    const edit = { ...this.state.edit };
    edit.id = id;
    edit.name = name;
    edit.catId = cat;
    const initCheck = [...this.state.categories];
    const checkArr = initCheck.map((i) => false);
    this.setState(
      {
        isChecked: checkArr,
      },
      () => {
        const checked = [...this.state.isChecked];
        for (let i of cat) {
          if (!checked[i - 1]) {
            checked[i - 1] = true;
          } else if (checked[i - 1]) {
            checked[i - 1] = false;
          }
        }
        this.setState({ edit, isChecked: checked });
      },
    );
  };

  // Removes a task by id from the tasks array
  handleDelete = (id) => {
    const newTasks = [...this.state.tasks];
    const deleteTask = newTasks.filter((task) => task.id !== id);
    this.setState({
      tasks: deleteTask,
    });
    fetch(`${process.env.REACT_APP_BACKEND}/tasks/`  + id, {
      method: 'DELETE',
    });
  };

  // Handles the saving of an edited task
  handleSave = (e) => {
    e.preventDefault();
    if (!this.state.edit.name) {
      alert('Täytä tehtäväkenttä');
    } else {
      const initCheck = [...this.state.categories];
      const checkArr = initCheck.map((i) => false);
      const edit = { ...this.state.edit };
      edit.name = '';
      let newTasks = [...this.state.tasks];
      newTasks[this.state.edit.id - 1] = this.state.edit;
      this.setState({
        tasks: newTasks,
        isChecked: checkArr,
        edit,
      });
      fetch(`${process.env.REACT_APP_BACKEND}/tasks/`  + this.state.edit.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: this.state.edit.id,
          name: this.state.edit.name,
          catId: this.state.edit.catId,
        }),
      });
    }
  };

  // Callback from the AddTask component
  buttonCallback = (tasks) => {
    let newTasks = tasks;
    this.setState({ tasks: newTasks });
  };

  render() {
    return (
      <>
        <div className='middle'>
          <ul className='editul'>
            {this.state.tasks.map((task) => (
              <li key={task.id}>
                <span className='type'>{task.name}</span>
                <div className='buttons'>
                  <button
                    className='edit'
                    onClick={() =>
                      this.handleEdit(task.id, task.name, task.catId)
                    }
                  >
                    Muokkaa
                  </button>
                  <button
                    className='delete'
                    onClick={() => this.handleDelete(task.id)}
                  >
                    Poista
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className='form' style={{ backgroundColor: '#e9dfdf' }}>
          <form onSubmit={this.handleSave}>
            <h2 className='tasktitle'>Muokkaa tehtävää</h2>
            <label className='title'>Tehtävä</label>
            <br />
            <input
              type='text'
              value={this.state.edit.name}
              onChange={this.handleChange}
            />
            <br />
            <label className='title'>Kategoria</label>
            <br />
            <div>
              <ul className='editul' style={{ justifyContent: 'left' }}>
                {this.state.categories.map((cat) => (
                  <li key={cat.id} style={{ marginBottom: '1em' }}>
                    <label className='checkbox'>
                      <input
                        value={cat.id || ''}
                        onChange={this.handleCheck}
                        checked={this.state.isChecked[cat.id - 1] || ''}
                        type='checkbox'
                        className='checkbox'
                      />
                      {cat.type}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <br />
            <input type='submit' value='Tallenna' className='add' />
          </form>
        </div>
        <AddTask
          tasks={this.state.tasks}
          categories={this.state.categories}
          callback={this.buttonCallback}
        />
      </>
    );
  }
}
export default TaskController;
