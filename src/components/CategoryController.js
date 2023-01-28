import React from 'react';

class CategoryController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: props.categories,
      type: '',
    };
  }

  // Removes a category by id from the categories array
  handleDelete = (id) => {
    const newCategories = [...this.state.categories];
    const deleteCategories = newCategories.filter((cat) => cat.id !== id);
    this.setState({
      categories: deleteCategories,
    });
    fetch('http://127.0.0.1:3010/categories/' + id, {
      method: 'DELETE',
    });
  };

  // Handles the task name field
  handleChange = (e) => {
    const newType = e.target.value;
    this.setState({
      type: newType,
    });
  };

  // Handles the submit task button
  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.type) {
      alert('Täytä kenttä');
    } else {
      const newState = {
        id: this.state.categories.length + 1,
        type: this.state.type,
      };
      this.setState({
        categories: [...this.state.categories, newState],
        type: '',
      });
      fetch('http://127.0.0.1:3010/categories/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: this.state.categories.length + 1,
          type: this.state.type,
        }),
      });
    }
  };

  render() {
    return (
      <>
        <div className='middle'>
          <ul className='editul'>
            {this.state.categories.map((cat) => (
              <li key={cat.id} style={{ marginBottom: '1em' }}>
                <span className='type'>{cat.type}</span>
                <button
                  className='delete'
                  onClick={() => this.handleDelete(cat.id)}
                >
                  Poista
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className='form' style={{ backgroundColor: '#e9dfdf' }}>
          <form onSubmit={this.handleSubmit}>
            <h2 className='tasktitle'>Lisää kategoria</h2>
            <label className='title'>Kategoria</label>
            <br />
            <input
              type='text'
              value={this.state.type}
              onChange={this.handleChange}
            />
            <br />
            <input type='submit' value='Tallenna' className='add' />
          </form>
        </div>
      </>
    );
  }
}
export default CategoryController;
