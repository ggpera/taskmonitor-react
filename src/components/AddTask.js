import React from 'react';

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: props.tasks,
      categories: props.categories,
      name: '',
      catId: [],
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
  // Handles the add task text field
  handleChange = (e) => {
    const newName = e.target.value;
    this.setState({
      name: newName,
    });
  };

  // Handles the add task checkboxes
  handleCheck = (e) => {
    const newId = parseInt(e.target.value);
    const checked = [...this.state.isChecked];
    if (!checked[newId - 1]) {
      checked[newId - 1] = true;
      this.setState({ catId: [...this.state.catId, newId] });
    } else if (checked[newId - 1]) {
      checked[newId - 1] = false;
      this.setState({ catId: this.state.catId.filter((cat) => cat !== newId) });
    }

    this.setState({ isChecked: checked });
  };

  // Adds the task to the tasks array
  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.name || !this.state.catId) {
      alert('Täytä molemmat kentät');
    } else {
      const initCheck = [...this.state.categories];
      const checkArr = initCheck.map((i) => false);
      this.setState(
        {
          tasks: [
            ...this.state.tasks,
            {
              id: this.state.tasks.length + 1,
              name: this.state.name,
              catId: this.state.catId,
            },
          ],
          name: '',
          catId: [],
          isChecked: checkArr,
        },
        () => {
          this.props.callback(this.state.tasks);
        },
      );
      fetch('http://127.0.0.1:3010/tasks/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: this.state.tasks.length + 1,
          name: this.state.name,
          catId: this.state.catId,
        }),
      });
    }
  };

  render() {
    return (
      <>
        <div className='form'>
          <form onSubmit={this.handleSubmit}>
            <h2 className='tasktitle'>Lisää tehtävä</h2>
            <label className='title'>Tehtävä</label>
            <br />
            <input
              type='text'
              value={this.state.name}
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
      </>
    );
  }
}
export default AddTask;
